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
  name: "VGooglePolyline",
  props: {
    options: {
      required: true,
      type: Object as PropType<google.maps.PolylineOptions>,
    },
    modelValue: {
      default: null,
      type: Object as PropType<google.maps.LatLngLiteral[] | null>,
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
        const options: google.maps.PolylineOptions = {
          ...props.options,
        };
        if (model.value) {
          options.path = [...model.value];
        }
        polyline.value = markRaw(
          new gmapApi.value.maps.Polyline({
            ...options,
            map: map.value,
          }),
        );
        addListeners();
      }
    });

    // Data

    const polyline = ref<google.maps.Polyline | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let mouseUpListener: google.maps.MapsEventListener | null = null;

    // Computed

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: google.maps.LatLngLiteral[] | null) {
        emit("update:model-value", value);
      },
    });

    // Methods

    function addListeners() {
      if (!polyline.value) return;
      clickListener = polyline.value.addListener("click", onClick);
      mouseUpListener = polyline.value.addListener("mouseup", () => {
        const path = polyline.value
          ?.getPath()
          ?.getArray()
          ?.map((position) => position.toJSON());
        if (!path) return;
        model.value = [...path];
      });
    }

    function removeListeners() {
      if (clickListener) {
        clickListener.remove();
      }
      if (mouseUpListener) {
        mouseUpListener.remove();
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
        if (!polyline.value || equal(newValue, oldValue)) return;
        polyline.value.setOptions(props.options);
      },
      {
        deep: true,
      },
    );

    watch(
      model,
      (
        newValue: google.maps.LatLngLiteral[] | null,
        oldValue: google.maps.LatLngLiteral[] | null,
      ) => {
        if (equal(newValue, oldValue) || !polyline.value || !newValue) return;
        polyline.value.setPath(newValue);
      },
    );

    // Exposes

    expose({
      polyline,
    });

    // BeforeUnmount

    onBeforeUnmount(() => {
      removeListeners();
      if (!polyline.value) return;
      polyline.value.setMap(null);
      polyline.value = null;
    });

    return () => slots.default?.();
  },
});
