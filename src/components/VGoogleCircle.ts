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

    const { gmapApi } = useGmapLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Mounted

    onMounted(() => {
      if (map.value && gmapApi.value) {
        const options: google.maps.CircleOptions = {
          ...props.options,
        };
        if (centerValue.value) {
          options.center = {
            ...centerValue.value,
          };
        }
        if (radiusValue.value) {
          options.radius = radiusValue.value;
        }
        circle.value = markRaw(
          new gmapApi.value.maps.Circle({
            map: map.value,
            ...options,
          }),
        );
        addListeners();
      }
    });

    // Data

    const circle = ref<google.maps.Circle | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let radiusChangedListener: google.maps.MapsEventListener | null = null;
    let centerChangedListener: google.maps.MapsEventListener | null = null;

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
      clickListener = circle.value.addListener("click", onClick);
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
      if (clickListener) {
        clickListener.remove();
      }
      if (radiusChangedListener) {
        radiusChangedListener.remove();
      }
      if (centerChangedListener) {
        centerChangedListener.remove();
      }
    }

    // Emits

    function onClick(ev: google.maps.MapMouseEvent) {
      emit("click", ev);
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
        if (equal(newValue, oldValue) || !circle.value || !newValue) return;
        circle.value.setCenter({
          ...newValue,
        });
      },
    );

    watch(radiusValue, (newValue: number | null, oldValue: number | null) => {
      if (equal(newValue, oldValue) || !circle.value || !newValue) return;
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
