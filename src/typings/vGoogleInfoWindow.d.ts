import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";

export declare interface VGoogleInfoWindowProps {
  options: google.maps.InfoWindowOptions;
  modelValue?: boolean | null | undefined;
  "@click"?: (ev: google.maps.MapMouseEvent) => void;
  "@update:model-value"?: (value: boolean | null) => void;
}

export declare const IVGoogleInfoWindow: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VGoogleInfoWindowProps;
};
