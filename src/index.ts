// Tipos
import type {App} from "vue";

// Composables
import {useGmapLoader} from "@/composables/gmapLoader";

// Componentes
import VGoogleMap from "@/components/VGoogleMap.vue";

export {
  useGmapLoader,
};

export const vGoogleMaps = (app: App) => {
  app.component("VGoogleMaps", VGoogleMap);
};
