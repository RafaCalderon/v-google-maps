import type { App, Ref } from "vue";
import type { Libraries, Loader } from "@googlemaps/js-api-loader";
import type { MarkerClustererOptions } from "@googlemaps/markerclusterer";

import type VGoogleMap from "@/components/VGoogleMap.vue";
import type VGoogleMarker from "@/components/VGoogleMarker.vue";
import type { VGoogleCircleType } from "@/components/VGoogleCircle";
import type { VGoogleHeatmapType } from "@/components/VGoogleHeatmap";
import type { VGooglePolygonType } from "@/components/VGooglePolygon";
import type VGoogleInfoWindow from "@/components/VGoogleInfoWindow.vue";
import type { VGooglePolylineType } from "@/components/VGooglePolyline";
import type { VGoogleRectangleType } from "@/components/VGoogleRectangle";
import type { VGoogleMarkerClustererType } from "@/components/VGoogleMarkerClusterer";

export declare interface VGoogleMaps {
  install(app: App): void;
}

export declare function useGoogleMapsLoader(): {
  loader: Ref<Loader | null>;
  maps: Ref<google.maps.MapsLibrary | null>;
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
    VGoogleCircle: VGoogleCircleType;
    VGoogleHeatmap: VGoogleHeatmapType;
    VGooglePolygon: VGooglePolygonType;
    VGoogleMarker: typeof VGoogleMarker;
    VGooglePolyline: VGooglePolylineType;
    VGoogleRectangle: VGoogleRectangleType;
    VGoogleInfoWindow: typeof VGoogleInfoWindow;
    VGoogleMarkerClusterer: VGoogleMarkerClustererType;
  }
}
