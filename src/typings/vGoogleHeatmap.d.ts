import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";

export declare interface VGoogleHeatmapProps {
  options: google.maps.visualization.HeatmapLayerOptions;
}

export declare const IVGoogleHeatmap: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VGoogleHeatmapProps;
};
