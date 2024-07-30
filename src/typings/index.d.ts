import type { App, Ref } from "vue";
import type { Libraries, Loader } from "@googlemaps/js-api-loader";
import type { MarkerClustererOptions } from "@googlemaps/markerclusterer";

import type { VGoogleMap } from "./vGoogleMap";
import type { VGoogleCircle } from "./vGoogleCircle";
import type { VGoogleMarker } from "./vGoogleMarker";
import type { VGoogleHeatmap } from "./vGoogleHeatmap";
import type { VGooglePolygon } from "./vGooglePolygon";
import type { VGooglePolyline } from "./vGooglePolyline";
import type { VGoogleRectangle } from "./vGoogleRectangle";
import type { VGoogleInfoWindow } from "./vGoogleInfoWindow";
import type { VGoogleMarkerClusterer } from "./vGoogleMarkerClusterer";

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
    VGoogleMap: VGoogleMap;
    VGoogleCircle: VGoogleCircle;
    VGoogleMarker: VGoogleMarker;
    VGoogleHeatmap: VGoogleHeatmap;
    VGooglePolygon: VGooglePolygon;
    VGooglePolyline: VGooglePolyline;
    VGoogleRectangle: VGoogleRectangle;
    VGoogleInfoWindow: VGoogleInfoWindow;
    VGoogleMarkerClusterer: VGoogleMarkerClusterer;
  }
}
