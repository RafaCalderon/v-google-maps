import type { PropType, DefineComponent } from "vue";

export type VGoogleHeatmap = DefineComponent<
  {
    options: {
      required: true;
      type: PropType<google.maps.visualization.HeatmapLayerOptions>;
    };
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {}
>;
