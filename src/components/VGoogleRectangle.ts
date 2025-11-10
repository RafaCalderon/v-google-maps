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

    const vm = getCurrentInstance();
    const internalModelValue = ref(props.modelValue);
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
            bounds: props.modelValue ?? props.options?.bounds,
          }),
        );
        addListeners();
      }
    });

    // Methods

    function addListeners() {
      removeListeners();
      if (!rectangle.value) return;
      const vmProps = vm?.vnode?.props;
      if (vmProps?.onClick) {
        clickListener = rectangle.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
          emit("click", ev);
        });
      }
      if (vmProps?.["onUpdate:modelValue"]) {
        boundsChangedListener = rectangle.value.addListener("bounds_changed", () => {
          const bounds = rectangle.value?.getBounds()?.toJSON();
          if (!bounds) return;
          internalModelValue.value = { ...bounds };
          emit("update:model-value", internalModelValue.value);
        });
      }
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
      () => props.modelValue,
      (value) => {
        if (!rectangle.value || !value || equal(value, internalModelValue.value)) return;
        rectangle.value.setBounds(value);
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
