import type { App, Ref } from "vue";
import type { Libraries } from "@googlemaps/js-api-loader";
import type { MarkerClustererOptions } from "@googlemaps/markerclusterer";

import { VGoogleMap } from "./vGoogleMap";
import { VGoogleCircle } from "./vGoogleCircle";
import { VGoogleMarker } from "./vGoogleMarker";
import { VGoogleHeatmap } from "./vGoogleHeatmap";
import { VGooglePolygon } from "./vGooglePolygon";
import { VGooglePolyline } from "./vGooglePolyline";
import { VGoogleRectangle } from "./vGoogleRectangle";
import { VGoogleInfoWindow } from "./vGoogleInfoWindow";
import { VGoogleMarkerClusterer } from "./vGoogleMarkerClusterer";

export declare interface VGoogleMaps {
  install(app: App): void;
}

export declare function useGmapLoader(): {
  gmapApi: Ref<typeof google | null>;
  load: (apiKey: string, libraries: Libraries = []) => Promise<void>;
};

export declare function vGoogleMaps(): VGoogleMaps;

export { type MarkerClustererOptions };

export interface VGoogleMapRef {
  map: google.maps.Map;
}

export interface VGoogleCircleRef {
  circle: google.maps.Circle;
}

export interface VGoogleMarkerRef {
  marker: google.maps.Marker;
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
