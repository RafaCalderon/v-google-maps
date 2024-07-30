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

    const { maps } = useGoogleMapsLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Data

    const polyline = ref<google.maps.Polyline | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let mouseUpListener: google.maps.MapsEventListener | null = null;

    // Mounted

    onMounted(() => {
      if (map.value && maps.value) {
        polyline.value = markRaw(
          new maps.value.Polyline({
            ...props.options,
            map: map.value,
            path: model.value ? [...model.value] : props.options?.path,
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
      set(value: google.maps.LatLngLiteral[] | null) {
        emit("update:model-value", value);
      },
    });

    // Methods

    function addListeners() {
      if (!polyline.value) return;
      clickListener = polyline.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
        emit("click", ev);
      });
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
      clickListener?.remove();
      mouseUpListener?.remove();
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
        if (!polyline.value || !newValue || equal(newValue, oldValue)) return;
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
