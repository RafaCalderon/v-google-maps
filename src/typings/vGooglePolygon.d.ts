import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";

export declare interface VGooglePolygonProps {
  options: google.maps.PolygonOptions;
  modelValue?: google.maps.LatLngLiteral[] | null | undefined;
  "@click"?: (ev: google.maps.MapMouseEvent) => void;
  "@update:model-value"?: (value: google.maps.LatLngLiteral[] | null) => void;
}

export declare const IVGooglePolygon: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VGooglePolygonProps;
};
