import type { PropType, DefineComponent } from "vue";
import type { MarkerClustererOptions } from "@googlemaps/markerclusterer";

export type VGoogleMarkerClusterer = DefineComponent<
  {
    options: {
      default: null;
      type: PropType<MarkerClustererOptions | null>;
    };
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {}
>;
