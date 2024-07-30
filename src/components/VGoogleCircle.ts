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

const VGoogleCircle = defineComponent({
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
            center: centerValue.value ?? props.options?.center,
            radius: radiusValue.value ?? props.options?.radius,
          }),
        );
        addListeners();
      }
    });

    // Computed

    const centerValue = computed({
      get() {
        return props.center;
      },
      set(value: google.maps.LatLngLiteral | null) {
        emit("update:center", value);
      },
    });

    const radiusValue = computed({
      get() {
        return props.radius;
      },
      set(value: number | null) {
        emit("update:radius", value);
      },
    });

    // Methods

    function addListeners() {
      if (!circle.value) return;
      clickListener = circle.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
        emit("click", ev);
      });
      radiusChangedListener = circle.value.addListener("radius_changed", () => {
        radiusValue.value = circle.value?.getRadius() ?? null;
      });
      centerChangedListener = circle.value.addListener("center_changed", () => {
        const center = circle.value?.getCenter()?.toJSON();
        if (!center) return;
        centerValue.value = {
          ...center,
        };
      });
    }

    function removeListeners() {
      clickListener?.remove();
      radiusChangedListener?.remove();
      centerChangedListener?.remove();
    }

    // Watchs

    watch(
      () => props.options,
      (newValue: google.maps.CircleOptions, oldValue: google.maps.CircleOptions) => {
        if (!circle.value || equal(newValue, oldValue)) return;
        circle.value.setOptions(props.options);
      },
      {
        deep: true,
      },
    );

    watch(
      centerValue,
      (newValue: google.maps.LatLngLiteral | null, oldValue: google.maps.LatLngLiteral | null) => {
        if (!circle.value || !newValue || equal(newValue, oldValue)) return;
        circle.value.setCenter({
          ...newValue,
        });
      },
    );

    watch(radiusValue, (newValue: number | null, oldValue: number | null) => {
      if (!circle.value || !newValue || equal(newValue, oldValue)) return;
      circle.value.setRadius(newValue);
    });

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

export type VGoogleCircleType = typeof VGoogleCircle;

export default VGoogleCircle;
