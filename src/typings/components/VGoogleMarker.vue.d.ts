import { type Ref } from "vue";
interface Props {
  options?: google.maps.marker.AdvancedMarkerElementOptions;
  modelValue?: google.maps.LatLngLiteral | google.maps.LatLng | null;
}
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<
  Props,
  {
    marker: Ref<
      google.maps.marker.AdvancedMarkerElement | null,
      google.maps.marker.AdvancedMarkerElement | null
    >;
  },
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {} & {
    click: (event: google.maps.MapMouseEvent) => any;
    "update:model-value": (value: google.maps.LatLng | google.maps.LatLngLiteral | null) => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<Props> &
    Readonly<{
      onClick?: ((event: google.maps.MapMouseEvent) => any) | undefined;
      "onUpdate:model-value"?:
        | ((value: google.maps.LatLng | google.maps.LatLngLiteral | null) => any)
        | undefined;
    }>,
  {
    options: google.maps.marker.AdvancedMarkerElementOptions;
    modelValue: google.maps.LatLngLiteral | google.maps.LatLng | null;
  },
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  false,
  {},
  any
>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
