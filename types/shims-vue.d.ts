import { VNodeProps, ComponentCustomProps, AllowedComponentProps } from "vue";

declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare const VGooglePolyline: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps;
};

declare module "vue" {
  export interface GlobalComponents {
    VGooglePolyline: typeof VGooglePolyline;
  }
}