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
  name: "VGoogleCircle",
  props: {
    options: {
      required: true,
      type: Object as PropType<google.maps.CircleOptions>,
    },
    center: {
      default: null,
      type: Object as PropType<google.maps.LatLngLiteral | null>,
    },
    radius: {
      default: null,
      type: Number as PropType<number | null>,
    },
  },
  emits: ["click", "update:center", "update:radius"],
  setup(props, { emit, expose, slots }) {
    // Composables

    const { maps } = useGoogleMapsLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Data

    const vm = getCurrentInstance();
    const internalCenter = ref(props.center);
    const internalRadius = ref(props.radius);
    const circle = ref<google.maps.Circle | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let radiusChangedListener: google.maps.MapsEventListener | null = null;
    let centerChangedListener: google.maps.MapsEventListener | null = null;

    // Mounted

    onMounted(() => {
      if (map.value && maps.value) {
        circle.value = markRaw(
          new maps.value.Circle({
            ...props.options,
            map: map.value,
            center: props.center ?? props.options?.center,
            radius: props.radius ?? props.options?.radius,
          }),
        );
        addListeners();
      }
    });

    // Methods

    function addListeners() {
      removeListeners();
      if (!circle.value) return;
      const props = vm?.vnode?.props;
      if (props?.["onClick"]) {
        clickListener = circle.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
          emit("click", ev);
        });
      }
      if (props?.["onUpdate:radius"]) {
        radiusChangedListener = circle.value.addListener("radius_changed", () => {
          internalRadius.value = circle.value?.getRadius() ?? 0;
          emit("update:radius", internalRadius.value);
        });
      }
      if (props?.["onUpdate:center"]) {
        centerChangedListener = circle.value.addListener("center_changed", () => {
          const center = circle.value?.getCenter()?.toJSON();
          if (!center) return;
          internalCenter.value = { ...center };
          emit("update:center", internalCenter.value);
        });
      }
    }

    function removeListeners() {
      clickListener?.remove();
      radiusChangedListener?.remove();
      centerChangedListener?.remove();
    }

    // Watchs

    watch(
      () => props.options,
      (newValue, oldValue) => {
        if (!circle.value || equal(newValue, oldValue)) return;
        circle.value.setOptions(props.options);
      },
      {
        deep: true,
      },
    );

    watch(
      () => props.center,
      (value) => {
        if (!circle.value || !value || equal(value, internalCenter.value)) return;
        circle.value.setCenter({ ...value });
      },
    );

    watch(
      () => props.radius,
      (value: number | null) => {
        if (!circle.value || !value || equal(value, internalRadius.value)) return;
        circle.value.setRadius(value);
      },
    );

    // Exposes

    expose({
      circle,
    });

    // BeforeUnmount

    onBeforeUnmount(() => {
      removeListeners();
      if (!circle.value) return;
      circle.value.setMap(null);
      circle.value = null;
    });

    return () => slots.default?.();
  },
});
