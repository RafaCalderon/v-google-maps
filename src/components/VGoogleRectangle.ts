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

// Deep equal
import equal from "fast-deep-equal";

// Composables
import { useGoogleMapsLoader } from "@/composables/googleMapsLoader";

// Symbols
import { mapSymbol } from "@/shared/symbols";

const VGoogleRectangle = defineComponent({
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

    const { maps } = useGoogleMapsLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Data

    const rectangle = ref<google.maps.Rectangle | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let boundsChangedListener: google.maps.MapsEventListener | null = null;

    // Mounted

    onMounted(() => {
      if (map.value && maps.value) {
        rectangle.value = markRaw(
          new maps.value.Rectangle({
            ...props.options,
            map: map.value,
            bounds: model.value ?? props.options?.bounds,
          }),
        );
        addListeners();
      }
    });

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
      clickListener = rectangle.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
        emit("click", ev);
      });
      boundsChangedListener = rectangle.value.addListener("bounds_changed", () => {
        const bounds = rectangle.value?.getBounds()?.toJSON();
        if (!bounds) return;
        model.value = {
          ...bounds,
        };
      });
    }

    function removeListeners() {
      clickListener?.remove();
      boundsChangedListener?.remove();
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
        if (!rectangle.value || !newValue || equal(newValue, oldValue)) return;
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

export type VGoogleRectangleType = typeof VGoogleRectangle;

export default VGoogleRectangle;
