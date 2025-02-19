import type { App, Ref } from "vue";
import type { Libraries, Loader } from "@googlemaps/js-api-loader";
import type { MarkerClustererOptions } from "@googlemaps/markerclusterer";

import type VGoogleMap from "./components/VGoogleMap.vue";
import type VGoogleCircle from "./components/VGoogleCircle";
import type VGoogleHeatmap from "./components/VGoogleHeatmap";
import type VGooglePolygon from "./components/VGooglePolygon";
import type VGoogleMarker from "./components/VGoogleMarker.vue";
import type VGooglePolyline from "./components/VGooglePolyline";
import type VGoogleRectangle from "./components/VGoogleRectangle";
import type VGoogleInfoWindow from "./components/VGoogleInfoWindow.vue";
import type VGoogleMarkerClusterer from "./components/VGoogleMarkerClusterer";

export declare interface VGoogleMaps {
  install(app: App): void;
}

export declare function useGoogleMapsLoader(): {
  loader: Ref<Loader | null>;
  maps: Ref<google.maps.MapsLibrary | null>;
  core: Ref<google.maps.CoreLibrary | null>;
  markers: Ref<google.maps.MarkerLibrary | null>;
  visualization: Ref<google.maps.VisualizationLibrary | null>;
  init: (apiKey: string, libraries: Libraries = []) => Promise<void>;
};

export declare function vGoogleMaps(): VGoogleMaps;

export type { MarkerClustererOptions };

export interface VGoogleMapRef {
  map: google.maps.Map;
}

export interface VGoogleCircleRef {
  circle: google.maps.Circle;
}

export interface VGoogleMarkerRef {
  marker: google.maps.marker.AdvancedMarkerElement;
}

export interface VGoogleHeatmapRef {
  heatmap: google.maps.visualization.HeatmapLayer;
}

export interface VGooglePolygonRef {
  polygon: google.maps.Polygon;
}

export interface VGooglePolylineRef {
  polyline: google.maps.Polyline;
}

export interface VGoogleRectangleRef {
  rectangle: google.maps.Rectangle;
}

export interface VGoogleInfoWindowRef {
  infoWindow: google.maps.InfoWindow;
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    VGoogleMap: typeof VGoogleMap;
    VGoogleCircle: typeof VGoogleCircle;
    VGoogleMarker: typeof VGoogleMarker;
    VGoogleHeatmap: typeof VGoogleHeatmap;
    VGooglePolygon: typeof VGooglePolygon;
    VGooglePolyline: typeof VGooglePolyline;
    VGoogleRectangle: typeof VGoogleRectangle;
    VGoogleInfoWindow: typeof VGoogleInfoWindow;
    VGoogleMarkerClusterer: typeof VGoogleMarkerClusterer;
  }
}
