interface Props {
    options?: google.maps.InfoWindowOptions | null;
}
type __VLS_Props = Props;
type __VLS_ModelProps = {
    modelValue?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {
    infoWindow: import("vue").Ref<{
        close: () => void;
        focus: () => void;
        getContent: () => string | Element | null | Text | undefined;
        getHeaderContent: () => string | Element | null | Text | undefined;
        getHeaderDisabled: () => boolean | undefined;
        getPosition: () => google.maps.LatLng | null | undefined;
        getZIndex: () => number;
        isOpen: boolean;
        open: (options?: google.maps.InfoWindowOpenOptions | null | google.maps.Map | google.maps.StreetViewPanorama, anchor?: google.maps.MVCObject | null | google.maps.marker.AdvancedMarkerElement) => void;
        setContent: (content?: string | Element | null | Text) => void;
        setHeaderContent: (headerContent?: string | Element | null | Text) => void;
        setHeaderDisabled: (headerDisabled?: boolean | null) => void;
        setOptions: (options?: google.maps.InfoWindowOptions | null) => void;
        setPosition: (position?: google.maps.LatLng | null | google.maps.LatLngLiteral) => void;
        setZIndex: (zIndex: number) => void;
        addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
        bindTo: (key: string, target: google.maps.MVCObject, targetKey?: string | null, noNotify?: boolean) => void;
        get: (key: string) => any;
        notify: (key: string) => void;
        set: (key: string, value: unknown) => void;
        setValues: (values?: object | null) => void;
        unbind: (key: string) => void;
        unbindAll: () => void;
    } | null, google.maps.InfoWindow | {
        close: () => void;
        focus: () => void;
        getContent: () => string | Element | null | Text | undefined;
        getHeaderContent: () => string | Element | null | Text | undefined;
        getHeaderDisabled: () => boolean | undefined;
        getPosition: () => google.maps.LatLng | null | undefined;
        getZIndex: () => number;
        isOpen: boolean;
        open: (options?: google.maps.InfoWindowOpenOptions | null | google.maps.Map | google.maps.StreetViewPanorama, anchor?: google.maps.MVCObject | null | google.maps.marker.AdvancedMarkerElement) => void;
        setContent: (content?: string | Element | null | Text) => void;
        setHeaderContent: (headerContent?: string | Element | null | Text) => void;
        setHeaderDisabled: (headerDisabled?: boolean | null) => void;
        setOptions: (options?: google.maps.InfoWindowOptions | null) => void;
        setPosition: (position?: google.maps.LatLng | null | google.maps.LatLngLiteral) => void;
        setZIndex: (zIndex: number) => void;
        addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
        bindTo: (key: string, target: google.maps.MVCObject, targetKey?: string | null, noNotify?: boolean) => void;
        get: (key: string) => any;
        notify: (key: string) => void;
        set: (key: string, value: unknown) => void;
        setValues: (values?: object | null) => void;
        unbind: (key: string) => void;
        unbindAll: () => void;
    } | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    options: google.maps.InfoWindowOptions | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
