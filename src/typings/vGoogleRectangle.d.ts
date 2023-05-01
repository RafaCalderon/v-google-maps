import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";

export declare interface VGoogleRectangleProps {
  options: google.maps.RectangleOptions;
  modelValue?: google.maps.LatLngBoundsLiteral | null | undefined;
  "@click"?: (ev: google.maps.MapMouseEvent) => void;
  "@update:model-value"?: (value: google.maps.LatLngBoundsLiteral | null) => void;
}

export declare const IVGoogleRectangle: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VGoogleRectangleProps;
};
