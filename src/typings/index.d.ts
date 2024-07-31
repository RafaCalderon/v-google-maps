import type { App } from "vue";
import type { useGoogleMapsLoader } from "./composables/googleMapsLoader";
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

export type { useGoogleMapsLoader };

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
