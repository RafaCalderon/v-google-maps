// Vue
import {
  ref,
  watch,
  inject,
  markRaw,
  onMounted,
  defineComponent,
  onBeforeUnmount,
  getCurrentInstance,
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
  emits: ["click", "mouseover", "mouseout", "contextmenu", "update:model-value"],
  setup(props, { emit, expose, slots }) {
    // Composables

    const { maps } = useGoogleMapsLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Data

    const vm = getCurrentInstance();
    const internalModelValue = ref(props.modelValue);
    const polygon = ref<google.maps.Polygon | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let mouseUpListener: google.maps.MapsEventListener | null = null;
    let mouseOutListener: google.maps.MapsEventListener | null = null;
    let mouseOverListener: google.maps.MapsEventListener | null = null;
    let contextmenuListener: google.maps.MapsEventListener | null = null;

    // Mounted

    onMounted(() => {
      if (map.value && maps.value) {
        polygon.value = markRaw(
          new maps.value.Polygon({
            ...props.options,
            map: map.value,
            paths: props.modelValue ? [...props.modelValue] : props.options?.paths,
          }),
        );
        addListeners();
      }
    });

    // Methods

    function addListeners() {
      removeListeners();
      if (!polygon.value) return;
      const props = vm?.vnode?.props;
      if (props?.["onClick"]) {
        clickListener = polygon.value.addListener("click", (ev: google.maps.PolyMouseEvent) => {
          emit("click", ev);
        });
      }
      if (props?.["onContextmenu"]) {
        contextmenuListener = polygon.value.addListener(
          "contextmenu",
          (ev: google.maps.PolyMouseEvent) => {
            emit("contextmenu", ev);
          },
        );
      }
      if (props?.["onMouseout"]) {
        mouseOutListener = polygon.value.addListener(
          "mouseout",
          (ev: google.maps.MapMouseEvent) => {
            emit("mouseout", ev);
          },
        );
      }
      if (props?.["onMouseover"]) {
        mouseOverListener = polygon.value.addListener(
          "mouseover",
          (ev: google.maps.MapMouseEvent) => {
            emit("mouseover", ev);
          },
        );
      }
      if (props?.["onUpdate:modelValue"]) {
        mouseUpListener = polygon.value.addListener("mouseup", () => {
          const path = polygon.value
            ?.getPath()
            ?.getArray()
            ?.map((position) => position.toJSON());
          if (!path) return;
          internalModelValue.value = [...path];
          emit("update:model-value", internalModelValue.value);
        });
      }
    }

    function removeListeners() {
      clickListener?.remove();
      mouseUpListener?.remove();
      mouseOutListener?.remove();
      mouseOverListener?.remove();
      contextmenuListener?.remove();
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
      () => props.modelValue,
      (value) => {
        if (!polygon.value || !value || equal(value, internalModelValue.value)) return;
        polygon.value.setPath(value);
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
