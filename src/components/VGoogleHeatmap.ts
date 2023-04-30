// Vue
import {
  ref,
  watch,
  inject,
  markRaw,
  onMounted,
  onUnmounted,
  defineComponent,
  type Ref,
  type PropType,
} from "vue";

// Composables
import {useGmapLoader} from "@/composables/gmapLoader";

// Utils
import equal from "fast-deep-equal";

export default defineComponent({
  name: "VGoogleHeatmap",
  props: {
    options: {
      required: true,
      type: Object as PropType<google.maps.visualization.HeatmapLayerOptions>,
    },
  },
  setup(props, {expose, slots}) {
    // Composables

    const {gmapApi} = useGmapLoader();

    // Injects

    const map = inject<Ref<google.maps.Map | null>>("google-map");

    // Mounted

    onMounted(() => {
      if (map?.value && gmapApi.value) {
        const options: google.maps.visualization.HeatmapLayerOptions = {
          ...props.options,
        };
        heatmap.value = markRaw(new gmapApi.value.maps.visualization.HeatmapLayer({
          map: map.value,
          ...options,
        }));
      }
    });

    // Data

    const heatmap = ref<google.maps.visualization.HeatmapLayer | null>(null);

    // Watchs

    watch(() => props.options, (newValue: google.maps.visualization.HeatmapLayerOptions, oldValue: google.maps.visualization.HeatmapLayerOptions) => {
      if (!heatmap.value || equal(newValue, oldValue)) return;
      heatmap.value.setOptions(props.options);
    }, {
      deep: true,
    });

    // Unmounted

    onUnmounted(() => {
      if (!heatmap.value) return;
      heatmap.value.setMap(null);
      heatmap.value = null;
    });

    // Exposes

    expose({
      heatmap,
    });


    return () => slots.default?.();
  },
});
