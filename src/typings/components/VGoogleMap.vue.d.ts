import { type Ref } from "vue";
interface Props {
    class?: string;
    options: google.maps.MapOptions;
}
declare let __VLS_typeProps: Props;
type __VLS_PublicProps = {
    "zoom"?: number | null;
    "center"?: google.maps.LatLngLiteral | null;
} & typeof __VLS_typeProps;
declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_TypePropsToOption<__VLS_PublicProps>, {
    map: Ref<{
        controls: {
            clear: () => void;
            forEach: (callback: (a: HTMLElement, b: number) => void) => void;
            getArray: () => HTMLElement[];
            getAt: (i: number) => HTMLElement;
            getLength: () => number;
            insertAt: (i: number, elem: HTMLElement) => void;
            pop: () => HTMLElement;
            push: (elem: HTMLElement) => number;
            removeAt: (i: number) => HTMLElement;
            setAt: (i: number, elem: HTMLElement) => void;
            addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
            bindTo: (key: string, target: google.maps.MVCObject, targetKey?: string | null, noNotify?: boolean) => void;
            get: (key: string) => any;
            notify: (key: string) => void;
            set: (key: string, value: unknown) => void;
            setValues: (values?: object | null) => void;
            unbind: (key: string) => void;
            unbindAll: () => void;
        }[];
        data: {
            add: (feature?: google.maps.Data.Feature | null | google.maps.Data.FeatureOptions) => google.maps.Data.Feature;
            addGeoJson: (geoJson: object, options?: google.maps.Data.GeoJsonOptions | null) => google.maps.Data.Feature[];
            contains: (feature: google.maps.Data.Feature) => boolean;
            forEach: (callback: (a: google.maps.Data.Feature) => void) => void;
            getControlPosition: () => google.maps.ControlPosition;
            getControls: () => string[] | null;
            getDrawingMode: () => string | null;
            getFeatureById: (id: number | string) => google.maps.Data.Feature | undefined;
            getMap: () => google.maps.Map | null;
            getStyle: () => google.maps.Data.StylingFunction | google.maps.Data.StyleOptions | null;
            loadGeoJson: (url: string, options?: google.maps.Data.GeoJsonOptions | null, callback?: ((a: google.maps.Data.Feature[]) => void) | undefined) => void;
            overrideStyle: (feature: google.maps.Data.Feature, style: google.maps.Data.StyleOptions) => void;
            remove: (feature: google.maps.Data.Feature) => void;
            revertStyle: (feature?: google.maps.Data.Feature | null) => void;
            setControlPosition: (controlPosition: google.maps.ControlPosition) => void;
            setControls: (controls: string[] | null) => void;
            setDrawingMode: (drawingMode: string | null) => void;
            setMap: (map: google.maps.Map | null) => void;
            setStyle: (style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions | null) => void;
            toGeoJson: (callback: (a: object) => void) => void;
            addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
            bindTo: (key: string, target: google.maps.MVCObject, targetKey?: string | null, noNotify?: boolean) => void;
            get: (key: string) => any;
            notify: (key: string) => void;
            set: (key: string, value: unknown) => void;
            setValues: (values?: object | null) => void;
            unbind: (key: string) => void;
            unbindAll: () => void;
        };
        fitBounds: (bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding) => void;
        getBounds: () => google.maps.LatLngBounds | undefined;
        getCenter: () => google.maps.LatLng | undefined;
        getClickableIcons: () => boolean | undefined;
        getDatasetFeatureLayer: (datasetId: string) => google.maps.FeatureLayer;
        getDiv: () => HTMLElement;
        getFeatureLayer: (featureType: google.maps.FeatureType) => google.maps.FeatureLayer;
        getHeading: () => number | undefined;
        getHeadingInteractionEnabled: () => boolean | null;
        getMapCapabilities: () => google.maps.MapCapabilities;
        getMapTypeId: () => string | undefined;
        getProjection: () => google.maps.Projection | undefined;
        getRenderingType: () => google.maps.RenderingType;
        getStreetView: () => google.maps.StreetViewPanorama;
        getTilt: () => number | undefined;
        getTiltInteractionEnabled: () => boolean | null;
        getZoom: () => number | undefined;
        mapTypes: {
            set: (id: string, mapType: unknown) => void;
            addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
            bindTo: (key: string, target: google.maps.MVCObject, targetKey?: string | null, noNotify?: boolean) => void;
            get: (key: string) => any;
            notify: (key: string) => void;
            setValues: (values?: object | null) => void;
            unbind: (key: string) => void;
            unbindAll: () => void;
        };
        moveCamera: (cameraOptions: google.maps.CameraOptions) => void;
        overlayMapTypes: {
            clear: () => void;
            forEach: (callback: (a: google.maps.MapType | null, b: number) => void) => void;
            getArray: () => (google.maps.MapType | null)[];
            getAt: (i: number) => google.maps.MapType | null;
            getLength: () => number;
            insertAt: (i: number, elem: google.maps.MapType | null) => void;
            pop: () => google.maps.MapType | null;
            push: (elem: google.maps.MapType | null) => number;
            removeAt: (i: number) => google.maps.MapType | null;
            setAt: (i: number, elem: google.maps.MapType | null) => void;
            addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
            bindTo: (key: string, target: google.maps.MVCObject, targetKey?: string | null, noNotify?: boolean) => void;
            get: (key: string) => any;
            notify: (key: string) => void;
            set: (key: string, value: unknown) => void;
            setValues: (values?: object | null) => void;
            unbind: (key: string) => void;
            unbindAll: () => void;
        };
        panBy: (x: number, y: number) => void;
        panTo: (latLng: google.maps.LatLng | google.maps.LatLngLiteral) => void;
        panToBounds: (latLngBounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding) => void;
        setCenter: (latlng: google.maps.LatLng | google.maps.LatLngLiteral) => void;
        setClickableIcons: (value: boolean) => void;
        setHeading: (heading: number) => void;
        setHeadingInteractionEnabled: (headingInteractionEnabled: boolean) => void;
        setMapTypeId: (mapTypeId: string) => void;
        setOptions: (options: google.maps.MapOptions | null) => void;
        setRenderingType: (renderingType: google.maps.RenderingType) => void;
        setStreetView: (panorama: google.maps.StreetViewPanorama | null) => void;
        setTilt: (tilt: number) => void;
        setTiltInteractionEnabled: (tiltInteractionEnabled: boolean) => void;
        setZoom: (zoom: number) => void;
        addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
        bindTo: (key: string, target: google.maps.MVCObject, targetKey?: string | null, noNotify?: boolean) => void;
        get: (key: string) => any;
        notify: (key: string) => void;
        set: (key: string, value: unknown) => void;
        setValues: (values?: object | null) => void;
        unbind: (key: string) => void;
        unbindAll: () => void;
    } | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:center": (center: google.maps.LatLngLiteral | null) => void;
    "update:zoom": (zoom: number | null) => void;
    ready: () => void;
    click: (ev: google.maps.MapMouseEvent) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<__VLS_PublicProps>>> & {
    onClick?: ((ev: google.maps.MapMouseEvent) => any) | undefined;
    "onUpdate:center"?: ((center: google.maps.LatLngLiteral | null) => any) | undefined;
    onReady?: (() => any) | undefined;
    "onUpdate:zoom"?: ((zoom: number | null) => any) | undefined;
}, {}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
