import { VNodeProps, ComponentCustomProps, AllowedComponentProps } from "vue";

declare const VGooglePolyline: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps;
};

declare module "vue" {
  export interface GlobalComponents {
    VGooglePolyline: typeof VGooglePolyline;
  }
}