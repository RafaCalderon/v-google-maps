import type {App, Ref} from "vue";
import type {Libraries} from "@googlemaps/js-api-loader";

import {IVGoogleMap} from "@/typings/vGoogleMap";

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
  }
}
