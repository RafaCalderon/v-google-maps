import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";

export declare interface VGoogleMarkerProps {
  options: google.maps.MarkerOptions;
  modelValue?: google.maps.LatLngLiteral | null | undefined;
  "@click"?: (ev: google.maps.MapMouseEvent) => void;
  "@update:model-value"?: (value: google.maps.LatLngLiteral | null) => void;
}

export declare const IVGoogleMarker: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VGoogleMarkerProps;
};
