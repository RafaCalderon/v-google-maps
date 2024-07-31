interface Props {
  options?: google.maps.InfoWindowOptions | null;
}
declare let __VLS_typeProps: Props;
type __VLS_PublicProps = {
  modelValue?: boolean;
} & typeof __VLS_typeProps;
declare function __VLS_template(): {
  default?(_: {}): any;
};
declare const __VLS_component: import("vue").DefineComponent<
  __VLS_WithDefaults<
    __VLS_TypePropsToOption<__VLS_PublicProps>,
    {
      options: null;
    }
  >,
  {
    infoWindow: import("vue").Ref<{
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
    } | null>;
  },
  unknown,
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {
    "update:modelValue": (modelValue: boolean) => void;
  },
  string,
  import("vue").PublicProps,
  Readonly<
    import("vue").ExtractPropTypes<
      __VLS_WithDefaults<
        __VLS_TypePropsToOption<__VLS_PublicProps>,
        {
          options: null;
        }
      >
    >
  > & {
    "onUpdate:modelValue"?: ((modelValue: boolean) => any) | undefined;
  },
  {
    options: google.maps.InfoWindowOptions | null;
  },
  {}
>;
declare const _default: __VLS_WithTemplateSlots<
  typeof __VLS_component,
  ReturnType<typeof __VLS_template>
>;
export default _default;

type __VLS_WithDefaults<P, D> = {
  [K in keyof Pick<P, keyof P>]: K extends keyof D
    ? __VLS_Prettify<
        P[K] & {
          default: D[K];
        }
      >
    : P[K];
};
type __VLS_Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
  [K in keyof T]-?: {} extends Pick<T, K>
    ? {
        type: import("vue").PropType<__VLS_NonUndefinedable<T[K]>>;
      }
    : {
        type: import("vue").PropType<T[K]>;
        required: true;
      };
};
