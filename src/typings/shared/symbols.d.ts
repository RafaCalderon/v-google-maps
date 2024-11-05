import type { Ref, InjectionKey } from "vue";
import type { MarkerClusterer } from "@googlemaps/markerclusterer";
export declare const mapSymbol: InjectionKey<Ref<google.maps.Map | null>>;
export declare const markerSymbol: InjectionKey<Ref<google.maps.marker.AdvancedMarkerElement | null>>;
export declare const markerClustererSymbol: InjectionKey<Ref<MarkerClusterer | null>>;
