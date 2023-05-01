import type {App} from "vue";
import {IVGoogleMap} from "@/typings/vGoogleMap";
import type {useGmapLoader as GmapLoader} from "@/composables/gmapLoader";

export declare interface VGoogleMaps {
  install(app: App): void;
}

export declare function useGmapLoader(): typeof GmapLoader;

export declare function vGoogleMaps(): VGoogleMaps;

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VGoogleMap: typeof IVGoogleMap;
  }
}
