import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";

export declare interface VGoogleCircleProps {
  options: google.maps.CircleOptions;
  center?: google.maps.LatLngLiteral | null | undefined;
  radius?: number | null | undefined;
  "@click"?: (ev: google.maps.MapMouseEvent) => void;
  "@update:center"?: (center: google.maps.LatLngLiteral | null) => void;
  "@update:radius"?: (zoom: number | null) => void;
}

export declare const IVGoogleCircle: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VGoogleCircleProps;
};
