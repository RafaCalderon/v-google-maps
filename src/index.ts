// Types
import type { App } from "vue";

// Composables
import { useGoogleMapsLoader } from "@/composables/googleMapsLoader";

// Components
import VGoogleMap from "@/components/VGoogleMap.vue";
import VGoogleCircle from "@/components/VGoogleCircle";
import VGoogleHeatmap from "@/components/VGoogleHeatmap";
import VGooglePolygon from "@/components/VGooglePolygon";
import VGoogleMarker from "@/components/VGoogleMarker.vue";
import VGooglePolyline from "@/components/VGooglePolyline";
import VGoogleRectangle from "@/components/VGoogleRectangle";
import VGoogleInfoWindow from "@/components/VGoogleInfoWindow.vue";
import VGoogleMarkerClusterer from "@/components/VGoogleMarkerClusterer";

export { useGoogleMapsLoader };

export function vGoogleMaps(app: App) {
  app.component("VGoogleMap", VGoogleMap);
  app.component("VGoogleCircle", VGoogleCircle);
  app.component("VGoogleMarker", VGoogleMarker);
  app.component("VGoogleHeatmap", VGoogleHeatmap);
  app.component("VGooglePolygon", VGooglePolygon);
  app.component("VGooglePolyline", VGooglePolyline);
  app.component("VGoogleRectangle", VGoogleRectangle);
  app.component("VGoogleInfoWindow", VGoogleInfoWindow);
  app.component("VGoogleMarkerClusterer", VGoogleMarkerClusterer);
}

export * from "./components/index";