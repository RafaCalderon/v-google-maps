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
