import type CSS from "csstype";
import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";

export declare interface VGoogleMapProps {
  options: google.maps.MapOptions;
  center?: google.maps.LatLngLiteral | null;
  zoom?: number | null;
  width: CSS.Property.Width;
  height: CSS.Property.Height;
  borderRadius?: CSS.Property.BorderRadius;
  "@click"?: (ev: google.maps.MapMouseEvent) => void;
  "@update:center"?: (center: google.maps.LatLngLiteral | null) => void;
  "@update:zoom"?: (zoom: number | null) => void;
}

export declare const IVGoogleMap: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VGoogleMapProps;
};
