// Vue
import {
  ref,
  watch,
  inject,
  markRaw,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  type PropType,
} from "vue";

// Deep equal
import equal from "fast-deep-equal";

// Composables
import { useGoogleMapsLoader } from "@/composables/googleMapsLoader";

// Symbols
import { mapSymbol } from "@/shared/symbols";

export default defineComponent({
  name: "VGoogleHeatmap",
  props: {
    options: {
      required: true,
      type: Object as PropType<google.maps.visualization.HeatmapLayerOptions>,
    },
  },
  setup(props, { expose, slots }) {
    // Composables

    const { visualization } = useGoogleMapsLoader();

    // Injects

    const map = inject(mapSymbol, ref(null));

    // Data

    const heatmap = ref<google.maps.visualization.HeatmapLayer | null>(null);

    // Mounted

    onMounted(() => {
      if (map.value && visualization.value) {
        heatmap.value = markRaw(
          new visualization.value.HeatmapLayer({
            map: map.value,
            ...props.options,
          }),
        );
      }
    });

    // Watchs

    watch(
      () => props.options,
      (newValue, oldValue) => {
        if (!heatmap.value || equal(newValue, oldValue)) return;
        heatmap.value.setOptions(props.options);
      },
      {
        deep: true,
      },
    );

    // Exposes

    expose({
      heatmap,
    });

    // Unmounted

    onBeforeUnmount(() => {
      if (!heatmap.value) return;
      heatmap.value.setMap(null);
      heatmap.value = null;
    });

    return () => slots.default?.();
  },
});
