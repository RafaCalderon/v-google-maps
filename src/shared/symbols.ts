import type { Ref, InjectionKey } from "vue";
import type { MarkerClusterer } from "@googlemaps/markerclusterer";

export const mapSymbol: InjectionKey<Ref<google.maps.Map | null>> = Symbol("map");
export const markerSymbol: InjectionKey<Ref<google.maps.Marker | null>> = Symbol("marker");
export const markerClustererSymbol: InjectionKey<Ref<MarkerClusterer | null>> =
  Symbol("marker-clusterer");
