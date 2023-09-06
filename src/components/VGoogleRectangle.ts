// Vue
import {
  ref,
  watch,
  inject,
  markRaw,
  computed,
  onMounted,
  defineComponent,
  onBeforeUnmount,
  type PropType,
} from "vue";

// Composables
import { useGmapLoader } from "@/composables/gmapLoader";

// Utils
import equal from "fast-deep-equal";
import { mapSymbol } from "@/shared/symbols";

export default defineComponent({
  name: "VGoogleRectangle",
  props: {
    options: {
      required: true,
      type: Object as PropType<google.maps.RectangleOptions>,
    },
    modelValue: {
      default: null,
      type: Object as PropType<google.maps.LatLngBoundsLiteral | null>,
    },
  },
  emits: ["click", "update:model-value"],
  setup(props, { emit, expose, slots }) {
    // Composables

    const { gmapApi } = useGmapLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Mounted

    onMounted(() => {
      if (map.value && gmapApi.value) {
        const options: google.maps.RectangleOptions = {
          ...props.options,
        };
        if (model.value) {
          options.bounds = {
            ...model.value,
          };
        }
        rectangle.value = markRaw(
          new gmapApi.value.maps.Rectangle({
            map: map.value,
            ...options,
          }),
        );
        addListeners();
      }
    });

    // Data

    const rectangle = ref<google.maps.Rectangle | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let boundsChangedListener: google.maps.MapsEventListener | null = null;

    // Computed

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: google.maps.LatLngBoundsLiteral | null) {
        emit("update:model-value", value);
      },
    });

    // Methods

    function addListeners() {
      if (!rectangle.value) return;
      clickListener = rectangle.value.addListener("click", onClick);
      boundsChangedListener = rectangle.value.addListener("bounds_changed", () => {
        const bounds = rectangle.value?.getBounds()?.toJSON();
        if (!bounds) return;
        model.value = {
          ...bounds,
        };
      });
    }

    function removeListeners() {
      if (clickListener) {
        clickListener.remove();
      }
      if (boundsChangedListener) {
        boundsChangedListener.remove();
      }
    }

    // Emits

    function onClick(ev: google.maps.MapMouseEvent) {
      emit("click", ev);
    }

    // Watchs

    watch(
      () => props.options,
      (newValue: google.maps.PolylineOptions, oldValue: google.maps.PolylineOptions) => {
        if (!rectangle.value || equal(newValue, oldValue)) return;
        rectangle.value.setOptions(props.options);
      },
      {
        deep: true,
      },
    );

    watch(
      model,
      (
        newValue: google.maps.LatLngBoundsLiteral | null,
        oldValue: google.maps.LatLngBoundsLiteral | null,
      ) => {
        if (equal(newValue, oldValue) || !rectangle.value || !newValue) return;
        rectangle.value.setBounds(newValue);
      },
    );

    // Exposes

    expose({
      rectangle,
    });

    // BeforeUnmount

    onBeforeUnmount(() => {
      removeListeners();
      if (!rectangle.value) return;
      rectangle.value.setMap(null);
      rectangle.value = null;
    });

    return () => slots.default?.();
  },
});
