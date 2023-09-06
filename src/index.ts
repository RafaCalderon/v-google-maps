// Tipos
import type { App } from "vue";

// Composables
import { useGmapLoader } from "@/composables/gmapLoader";

// Componentes
import VGoogleMap from "@/components/VGoogleMap.vue";
import VGoogleCircle from "@/components/VGoogleCircle";
import VGoogleMarker from "@/components/VGoogleMarker";
import VGoogleHeatmap from "@/components/VGoogleHeatmap";
import VGooglePolygon from "@/components/VGooglePolygon";
import VGooglePolyline from "@/components/VGooglePolyline";
import VGoogleRectangle from "@/components/VGoogleRectangle";
import VGoogleInfoWindow from "@/components/VGoogleInfoWindow.vue";

export { useGmapLoader };

export const vGoogleMaps = (app: App) => {
  app.component("VGoogleMap", VGoogleMap);
  app.component("VGoogleCircle", VGoogleCircle);
  app.component("VGoogleMarker", VGoogleMarker);
  app.component("VGoogleHeatmap", VGoogleHeatmap);
  app.component("VGooglePolygon", VGooglePolygon);
  app.component("VGooglePolyline", VGooglePolyline);
  app.component("VGoogleRectangle", VGoogleRectangle);
  app.component("VGoogleInfoWindow", VGoogleInfoWindow);
};
