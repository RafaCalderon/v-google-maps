import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";

export declare interface VGooglePolylineProps {
  options: google.maps.PolylineOptions;
  modelValue?: google.maps.LatLngLiteral[] | null | undefined;
  "@click"?: (ev: google.maps.MapMouseEvent) => void;
  "@update:model-value"?: (value: google.maps.LatLngLiteral[] | null) => void;
}

export declare const IVGooglePolyline: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VGooglePolylineProps;
};
