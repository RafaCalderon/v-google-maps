import type {App} from "vue";

import {IVGoogleMap} from "@/typings/vGoogleMap";

export declare interface VGoogleMaps {
  install(app: App): void;
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VGoogleMap: typeof IVGoogleMap;
  }
}
