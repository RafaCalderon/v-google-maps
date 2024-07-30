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
  name: "VGooglePolygon",
  props: {
    options: {
      required: true,
      type: Object as PropType<google.maps.PolygonOptions>,
    },
    modelValue: {
      default: null,
      type: Object as PropType<google.maps.LatLngLiteral[] | null>,
    },
  },
  emits: ["click", "mouseover", "mouseout", "update:model-value"],
  setup(props, { emit, expose, slots }) {
    // Composables

    const { maps } = useGoogleMapsLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Data

    const polygon = ref<google.maps.Polygon | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let mouseUpListener: google.maps.MapsEventListener | null = null;
    let mouseOutListener: google.maps.MapsEventListener | null = null;
    let mouseOverListener: google.maps.MapsEventListener | null = null;

    // Mounted

    onMounted(() => {
      if (map.value && maps.value) {
        polygon.value = markRaw(
          new maps.value.Polygon({
            ...props.options,
            map: map.value,
            paths: model.value ? [...model.value] : props.options?.paths,
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
      if (!polygon.value) return;
      clickListener = polygon.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
        emit("click", ev);
      });
      mouseOutListener = polygon.value.addListener("mouseout", (ev: google.maps.MapMouseEvent) => {
        emit("mouseout", ev);
      });
      mouseOverListener = polygon.value.addListener(
        "mouseover",
        (ev: google.maps.MapMouseEvent) => {
          emit("mouseover", ev);
        },
      );
      mouseUpListener = polygon.value.addListener("mouseup", () => {
        const path = polygon.value
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
      mouseOutListener?.remove();
      mouseOverListener?.remove();
    }

    // Watchs

    watch(
      () => props.options,
      (newValue: google.maps.PolylineOptions, oldValue: google.maps.PolylineOptions) => {
        if (!polygon.value || equal(newValue, oldValue)) return;
        polygon.value.setOptions(props.options);
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
        if (!polygon.value || !newValue || equal(newValue, oldValue)) return;
        polygon.value.setPath(newValue);
      },
    );

    // Exposes

    expose({
      polygon,
    });

    // BeforeUnmount

    onBeforeUnmount(() => {
      removeListeners();
      if (!polygon.value) return;
      polygon.value.setMap(null);
      polygon.value = null;
    });

    return () => slots.default?.();
  },
});
