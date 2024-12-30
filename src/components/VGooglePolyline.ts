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

    const vm = getCurrentInstance();
    const internalModelValue = ref(props.modelValue);
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
            path: props.modelValue ? [...props.modelValue] : props.options?.path,
          }),
        );
        addListeners();
      }
    });

    // Methods

    function addListeners() {
      removeListeners();
      if (!polyline.value) return;
      const props = vm?.vnode?.props;
      if (props?.["onClick"]) {
        clickListener = polyline.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
          emit("click", ev);
        });
      }
      if (props?.["onUpdate:modelValue"]) {
        mouseUpListener = polyline.value.addListener("mouseup", () => {
          const path = polyline.value
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
      () => props.modelValue,
      (value) => {
        if (!polyline.value || !value || equal(value, internalModelValue.value)) return;
        polyline.value.setPath(value);
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
