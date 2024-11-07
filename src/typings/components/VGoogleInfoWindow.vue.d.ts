interface Props {
  options?: google.maps.InfoWindowOptions | null;
}
type __VLS_Props = Props;
type __VLS_PublicProps = {
  modelValue?: boolean;
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
    infoWindow: import("vue").Ref<
      {
        close: () => void;
        focus: () => void;
        getContent: () => string | Element | null | Text | undefined;
        getHeaderContent: () => string | Element | null | Text | undefined;
        getHeaderDisabled: () => boolean | undefined;
        getPosition: () => google.maps.LatLng | null | undefined;
        getZIndex: () => number;
        isOpen: boolean;
        open: (
          options?:
            | google.maps.InfoWindowOpenOptions
            | null
            | google.maps.Map
            | google.maps.StreetViewPanorama,
          anchor?: google.maps.MVCObject | null | google.maps.marker.AdvancedMarkerElement,
        ) => void;
        setContent: (content?: string | Element | null | Text) => void;
        setHeaderContent: (headerContent?: string | Element | null | Text) => void;
        setHeaderDisabled: (headerDisabled?: boolean | null) => void;
        setOptions: (options?: google.maps.InfoWindowOptions | null) => void;
        setPosition: (position?: google.maps.LatLng | null | google.maps.LatLngLiteral) => void;
        setZIndex: (zIndex: number) => void;
        addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
        bindTo: (
          key: string,
          target: google.maps.MVCObject,
          targetKey?: string | null,
          noNotify?: boolean,
        ) => void;
        get: (key: string) => any;
        notify: (key: string) => void;
        set: (key: string, value: unknown) => void;
        setValues: (values?: object | null) => void;
        unbind: (key: string) => void;
        unbindAll: () => void;
      } | null,
      | google.maps.InfoWindow
      | {
          close: () => void;
          focus: () => void;
          getContent: () => string | Element | null | Text | undefined;
          getHeaderContent: () => string | Element | null | Text | undefined;
          getHeaderDisabled: () => boolean | undefined;
          getPosition: () => google.maps.LatLng | null | undefined;
          getZIndex: () => number;
          isOpen: boolean;
          open: (
            options?:
              | google.maps.InfoWindowOpenOptions
              | null
              | google.maps.Map
              | google.maps.StreetViewPanorama,
            anchor?: google.maps.MVCObject | null | google.maps.marker.AdvancedMarkerElement,
          ) => void;
          setContent: (content?: string | Element | null | Text) => void;
          setHeaderContent: (headerContent?: string | Element | null | Text) => void;
          setHeaderDisabled: (headerDisabled?: boolean | null) => void;
          setOptions: (options?: google.maps.InfoWindowOptions | null) => void;
          setPosition: (position?: google.maps.LatLng | null | google.maps.LatLngLiteral) => void;
          setZIndex: (zIndex: number) => void;
          addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
          bindTo: (
            key: string,
            target: google.maps.MVCObject,
            targetKey?: string | null,
            noNotify?: boolean,
          ) => void;
          get: (key: string) => any;
          notify: (key: string) => void;
          set: (key: string, value: unknown) => void;
          setValues: (values?: object | null) => void;
          unbind: (key: string) => void;
          unbindAll: () => void;
        }
      | null
    >;
  },
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {
    "update:modelValue": (value: boolean) => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<__VLS_PublicProps> &
    Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    }>,
  {
    options: google.maps.InfoWindowOptions | null;
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
