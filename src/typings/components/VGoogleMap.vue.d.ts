import type { VNode, VNodeProps, ComponentCustomProps, AllowedComponentProps } from "vue";

export declare const VGoogleMap: new () => {
  $props: AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps & {
      class?: string;
      zoom?: number | null;
      options: google.maps.MapOptions;
      center?: google.maps.LatLngLiteral | null;
    };
  $emit: {
    (event: "ready"): void;
    (event: "update:zoom", value: number): void;
    (event: "click", ev: google.maps.MapMouseEvent): void;
    (event: "update:center", value: google.maps.LatLngLiteral): void;
  };
  $slots: {
    default?: (({ Component }: { Component: VNode }) => VNode[]) | undefined;
  };
};
