import type {App, Ref} from "vue";
import type {Libraries} from "@googlemaps/js-api-loader";

import {IVGoogleMap} from "./vGoogleMap";
import {IVGoogleCircle} from "./vGoogleCircle";
import {IVGoogleMarker} from "./vGoogleMarker";
import {IVGoogleHeatmap} from "./vGoogleHeatmap";
import {IVGooglePolygon} from "./vGooglePolygon";
import {IVGooglePolyline} from "./vGooglePolyline";
import {IVGoogleRectangle} from "./vGoogleRectangle";
import {IVGoogleInfoWindow} from "./vGoogleInfoWindow";

export declare interface VGoogleMaps {
  install(app: App): void;
}

export declare function useGmapLoader(): {
  gmapApi: Ref<typeof google | null>;
  load: (apiKey: string, libraries: Libraries = []) => Promise<void>;
}

export declare function vGoogleMaps(): VGoogleMaps;

export interface VGoogleMapRef {
  map: Ref<google.maps.Map>;
}

export interface VGoogleCircleRef {
  circle: Ref<google.maps.Circle>;
}

export interface VGoogleMarkerRef {
  marker: Ref<google.maps.Marker>;
}

export interface VGoogleHeatmapRef {
  heatmap: Ref<google.maps.Heatmap>;
}

export interface VGooglePolygonRef {
  polygon: Ref<google.maps.Polygon>;
}

export interface VGooglePolylineRef {
  polyline: Ref<google.maps.Polyline>;
}

export interface VGoogleRectangleRef {
  rectangle: Ref<google.maps.Rectangle>;
}

export interface VGoogleInfoWindowRef {
  infoWindow: Ref<google.maps.InfoWindow>;
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VGoogleMap: typeof IVGoogleMap;
    VGoogleCircle: typeof IVGoogleCircle;
    VGoogleMarker: typeof IVGoogleMarker;
    VGoogleHeatmap: typeof IVGoogleHeatmap;
    VGooglePolygon: typeof IVGooglePolygon;
    VGooglePolyline: typeof IVGooglePolyline;
    VGoogleRectangle: typeof IVGoogleRectangle;
    VGoogleInfoWindow: typeof IVGoogleInfoWindow;
  }
}
