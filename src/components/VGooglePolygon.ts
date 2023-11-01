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

    const { gmapApi } = useGmapLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Mounted

    onMounted(() => {
      if (map.value && gmapApi.value) {
        const options: google.maps.PolygonOptions = {
          ...props.options,
        };
        if (model.value) {
          options.paths = [...model.value];
        }
        polygon.value = markRaw(
          new gmapApi.value.maps.Polygon({
            map: map.value,
            ...options,
          }),
        );
        addListeners();
      }
    });

    // Data

    const polygon = ref<google.maps.Polygon | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let mouseUpListener: google.maps.MapsEventListener | null = null;
    let mouseOutListener: google.maps.MapsEventListener | null = null;
    let mouseOverListener: google.maps.MapsEventListener | null = null;

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
      clickListener = polygon.value.addListener("click", onClick);
      mouseOutListener = polygon.value.addListener("mouseout", onMouseOut);
      mouseOverListener = polygon.value.addListener("mouseover", onMouseOver);
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
      if (clickListener) {
        clickListener.remove();
      }
      if (mouseUpListener) {
        mouseUpListener.remove();
      }
      if (mouseOutListener) {
        mouseOutListener.remove();
      }
      if (mouseOverListener) {
        mouseOverListener.remove();
      }
    }

    // Emits

    function onClick(ev: google.maps.MapMouseEvent) {
      emit("click", ev);
    }

    function onMouseOver(ev: google.maps.MapMouseEvent) {
      emit("mouseover", ev);
    }

    function onMouseOut(ev: google.maps.MapMouseEvent) {
      emit("mouseout", ev);
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
        if (equal(newValue, oldValue) || !polygon.value || !newValue) return;
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
