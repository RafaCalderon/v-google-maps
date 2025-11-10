interface Props {
  class?: string;
  zoom?: number | null;
  options: google.maps.MapOptions;
  center?: google.maps.LatLngLiteral | null;
}
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<
  Props,
  {
    map: import("vue").Ref<
      {
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
        }[];
        data: {
          add: (
            feature?: google.maps.Data.Feature | null | google.maps.Data.FeatureOptions,
          ) => google.maps.Data.Feature;
          addGeoJson: (
            geoJson: object,
            options?: google.maps.Data.GeoJsonOptions | null,
          ) => google.maps.Data.Feature[];
          contains: (feature: google.maps.Data.Feature) => boolean;
          forEach: (callback: (a: google.maps.Data.Feature) => void) => void;
          getControlPosition: () => google.maps.ControlPosition;
          getControls: () => string[] | null;
          getDrawingMode: () => string | null;
          getFeatureById: (id: number | string) => google.maps.Data.Feature | undefined;
          getMap: () => google.maps.Map | null;
          getStyle: () => google.maps.Data.StylingFunction | google.maps.Data.StyleOptions | null;
          loadGeoJson: (
            url: string,
            options?: google.maps.Data.GeoJsonOptions | null,
            callback?: ((a: google.maps.Data.Feature[]) => void) | undefined,
          ) => void;
          overrideStyle: (
            feature: google.maps.Data.Feature,
            style: google.maps.Data.StyleOptions,
          ) => void;
          remove: (feature: google.maps.Data.Feature) => void;
          revertStyle: (feature?: google.maps.Data.Feature | null) => void;
          setControlPosition: (controlPosition: google.maps.ControlPosition) => void;
          setControls: (controls: string[] | null) => void;
          setDrawingMode: (drawingMode: string | null) => void;
          setMap: (map: google.maps.Map | null) => void;
          setStyle: (
            style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions | null,
          ) => void;
          toGeoJson: (callback: (a: object) => void) => void;
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
        };
        fitBounds: (
          bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
          padding?: number | google.maps.Padding,
        ) => void;
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
          set: (id: string, mapType: any) => void;
          addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
          bindTo: (
            key: string,
            target: google.maps.MVCObject,
            targetKey?: string | null,
            noNotify?: boolean,
          ) => void;
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
        };
        panBy: (x: number, y: number) => void;
        panTo: (latLng: google.maps.LatLng | google.maps.LatLngLiteral) => void;
        panToBounds: (
          latLngBounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
          padding?: number | google.maps.Padding,
        ) => void;
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
      | google.maps.Map
      | {
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
          }[];
          data: {
            add: (
              feature?: google.maps.Data.Feature | null | google.maps.Data.FeatureOptions,
            ) => google.maps.Data.Feature;
            addGeoJson: (
              geoJson: object,
              options?: google.maps.Data.GeoJsonOptions | null,
            ) => google.maps.Data.Feature[];
            contains: (feature: google.maps.Data.Feature) => boolean;
            forEach: (callback: (a: google.maps.Data.Feature) => void) => void;
            getControlPosition: () => google.maps.ControlPosition;
            getControls: () => string[] | null;
            getDrawingMode: () => string | null;
            getFeatureById: (id: number | string) => google.maps.Data.Feature | undefined;
            getMap: () => google.maps.Map | null;
            getStyle: () => google.maps.Data.StylingFunction | google.maps.Data.StyleOptions | null;
            loadGeoJson: (
              url: string,
              options?: google.maps.Data.GeoJsonOptions | null,
              callback?: ((a: google.maps.Data.Feature[]) => void) | undefined,
            ) => void;
            overrideStyle: (
              feature: google.maps.Data.Feature,
              style: google.maps.Data.StyleOptions,
            ) => void;
            remove: (feature: google.maps.Data.Feature) => void;
            revertStyle: (feature?: google.maps.Data.Feature | null) => void;
            setControlPosition: (controlPosition: google.maps.ControlPosition) => void;
            setControls: (controls: string[] | null) => void;
            setDrawingMode: (drawingMode: string | null) => void;
            setMap: (map: google.maps.Map | null) => void;
            setStyle: (
              style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions | null,
            ) => void;
            toGeoJson: (callback: (a: object) => void) => void;
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
          };
          fitBounds: (
            bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
            padding?: number | google.maps.Padding,
          ) => void;
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
            set: (id: string, mapType: any) => void;
            addListener: (eventName: string, handler: Function) => google.maps.MapsEventListener;
            bindTo: (
              key: string,
              target: google.maps.MVCObject,
              targetKey?: string | null,
              noNotify?: boolean,
            ) => void;
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
          };
          panBy: (x: number, y: number) => void;
          panTo: (latLng: google.maps.LatLng | google.maps.LatLngLiteral) => void;
          panToBounds: (
            latLngBounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
            padding?: number | google.maps.Padding,
          ) => void;
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
  {} & {
    click: (ev: google.maps.MapMouseEvent) => any;
    "update:center": (value: google.maps.LatLngLiteral | null) => any;
    ready: () => any;
    "update:zoom": (value: number | null) => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<Props> &
    Readonly<{
      onClick?: ((ev: google.maps.MapMouseEvent) => any) | undefined;
      "onUpdate:center"?: ((value: google.maps.LatLngLiteral | null) => any) | undefined;
      onReady?: (() => any) | undefined;
      "onUpdate:zoom"?: ((value: number | null) => any) | undefined;
    }>,
  {},
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
