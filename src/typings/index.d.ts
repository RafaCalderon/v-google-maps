import type { App, Ref } from "vue";
import type { Libraries, Loader } from "@googlemaps/js-api-loader";
import type { MarkerClustererOptions } from "@googlemaps/markerclusterer";

import type { vGoogleMap } from "./vGoogleMap";
import type { vGoogleCircle } from "./vGoogleCircle";
import type { vGoogleMarker } from "./vGoogleMarker";
import type { vGoogleHeatmap } from "./vGoogleHeatmap";
import type { vGooglePolygon } from "./vGooglePolygon";
import type { vGooglePolyline } from "./vGooglePolyline";
import type { vGoogleRectangle } from "./vGoogleRectangle";
import type { vGoogleInfoWindow } from "./vGoogleInfoWindow";
import type { vGoogleMarkerClusterer } from "./vGoogleMarkerClusterer";

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
    VGoogleMap: vGoogleMap;
    VGoogleCircle: vGoogleCircle;
    VGoogleMarker: vGoogleMarker;
    VGoogleHeatmap: vGoogleHeatmap;
    VGooglePolygon: vGooglePolygon;
    VGooglePolyline: vGooglePolyline;
    VGoogleRectangle: vGoogleRectangle;
    VGoogleInfoWindow: vGoogleInfoWindow;
    VGoogleMarkerClusterer: vGoogleMarkerClusterer;
  }
}
