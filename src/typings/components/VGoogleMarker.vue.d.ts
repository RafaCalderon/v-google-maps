import { type Ref } from "vue";
interface Props {
  options?: google.maps.marker.AdvancedMarkerElementOptions;
}
type __VLS_Props = Props;
type __VLS_PublicProps = {
  modelValue?: google.maps.LatLngLiteral | google.maps.LatLng | null;
} & __VLS_Props;
declare function __VLS_template(): {
  attrs: Partial<{}>;
  slots: {
    default?(_: {}): any;
  };
  refs: {
    contentRef: HTMLDivElement;
  };
  rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<
  __VLS_PublicProps,
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
  {
    "update:modelValue": (value: google.maps.LatLngLiteral | google.maps.LatLng | null) => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<__VLS_PublicProps> &
    Readonly<{
      "onUpdate:modelValue"?:
        | ((value: google.maps.LatLngLiteral | google.maps.LatLng | null) => any)
        | undefined;
    }>,
  {
    options: google.maps.marker.AdvancedMarkerElementOptions;
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
declare const _default: __VLS_WithTemplateSlots<
  typeof __VLS_component,
  __VLS_TemplateResult["slots"]
>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
