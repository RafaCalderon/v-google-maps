import { type Libraries } from "@googlemaps/js-api-loader";
declare function init(apiKey: string, libraries?: Libraries): Promise<void>;
export declare function useGoogleMapsLoader(): {
    maps: import("vue").Ref<{
        BicyclingLayer: typeof google.maps.BicyclingLayer;
        Circle: typeof google.maps.Circle;
        Data: typeof google.maps.Data;
        FeatureType: {
            readonly ADMINISTRATIVE_AREA_LEVEL_1: google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1;
            readonly ADMINISTRATIVE_AREA_LEVEL_2: google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_2;
            readonly COUNTRY: google.maps.FeatureType.COUNTRY;
            readonly DATASET: google.maps.FeatureType.DATASET;
            readonly LOCALITY: google.maps.FeatureType.LOCALITY;
            readonly POSTAL_CODE: google.maps.FeatureType.POSTAL_CODE;
            readonly SCHOOL_DISTRICT: google.maps.FeatureType.SCHOOL_DISTRICT;
        };
        GroundOverlay: typeof google.maps.GroundOverlay;
        ImageMapType: typeof google.maps.ImageMapType;
        InfoWindow: typeof google.maps.InfoWindow;
        KmlLayer: typeof google.maps.KmlLayer;
        KmlLayerStatus: {
            readonly DOCUMENT_NOT_FOUND: google.maps.KmlLayerStatus.DOCUMENT_NOT_FOUND;
            readonly DOCUMENT_TOO_LARGE: google.maps.KmlLayerStatus.DOCUMENT_TOO_LARGE;
            readonly FETCH_ERROR: google.maps.KmlLayerStatus.FETCH_ERROR;
            readonly INVALID_DOCUMENT: google.maps.KmlLayerStatus.INVALID_DOCUMENT;
            readonly INVALID_REQUEST: google.maps.KmlLayerStatus.INVALID_REQUEST;
            readonly LIMITS_EXCEEDED: google.maps.KmlLayerStatus.LIMITS_EXCEEDED;
            readonly OK: google.maps.KmlLayerStatus.OK;
            readonly TIMED_OUT: google.maps.KmlLayerStatus.TIMED_OUT;
            readonly UNKNOWN: google.maps.KmlLayerStatus.UNKNOWN;
        };
        Map: typeof google.maps.Map;
        MapTypeControlStyle: {
            readonly [x: number]: string;
            readonly DEFAULT: google.maps.MapTypeControlStyle.DEFAULT;
            readonly DROPDOWN_MENU: google.maps.MapTypeControlStyle.DROPDOWN_MENU;
            readonly HORIZONTAL_BAR: google.maps.MapTypeControlStyle.HORIZONTAL_BAR;
        };
        MapTypeId: {
            readonly HYBRID: google.maps.MapTypeId.HYBRID;
            readonly ROADMAP: google.maps.MapTypeId.ROADMAP;
            readonly SATELLITE: google.maps.MapTypeId.SATELLITE;
            readonly TERRAIN: google.maps.MapTypeId.TERRAIN;
        };
        MapTypeRegistry: typeof google.maps.MapTypeRegistry;
        MaxZoomService: typeof google.maps.MaxZoomService;
        MaxZoomStatus: {
            readonly ERROR: google.maps.MaxZoomStatus.ERROR;
            readonly OK: google.maps.MaxZoomStatus.OK;
        };
        OverlayView: typeof google.maps.OverlayView;
        Polygon: typeof google.maps.Polygon;
        Polyline: typeof google.maps.Polyline;
        Rectangle: typeof google.maps.Rectangle;
        RenderingType: {
            readonly RASTER: google.maps.RenderingType.RASTER;
            readonly UNINITIALIZED: google.maps.RenderingType.UNINITIALIZED;
            readonly VECTOR: google.maps.RenderingType.VECTOR;
        };
        StrokePosition: {
            readonly [x: number]: string;
            readonly CENTER: google.maps.StrokePosition.CENTER;
            readonly INSIDE: google.maps.StrokePosition.INSIDE;
            readonly OUTSIDE: google.maps.StrokePosition.OUTSIDE;
        };
        StyledMapType: typeof google.maps.StyledMapType;
        TrafficLayer: typeof google.maps.TrafficLayer;
        TransitLayer: typeof google.maps.TransitLayer;
        WebGLOverlayView: typeof google.maps.WebGLOverlayView;
        ZoomChangeEvent: typeof google.maps.ZoomChangeEvent;
    } | null>;
    init: typeof init;
    loader: import("vue").Ref<{
        readonly version: string;
        readonly apiKey: string;
        readonly channel: string;
        readonly client: string;
        readonly id: string;
        readonly libraries: import("@googlemaps/js-api-loader").Library[];
        readonly language: string;
        readonly region: string;
        readonly mapIds: string[];
        readonly nonce: string | null;
        readonly retries: number;
        readonly url: string;
        readonly authReferrerPolicy: "origin";
        readonly options: {
            apiKey: string;
            channel?: string | undefined;
            client?: string | undefined;
            version?: string | undefined;
            id?: string | undefined;
            libraries?: import("@googlemaps/js-api-loader").Library[] | undefined;
            language?: string | undefined;
            region?: string | undefined;
            mapIds?: string[] | undefined;
            url?: string | undefined;
            nonce?: string | undefined;
            retries?: number | undefined;
            authReferrerPolicy?: "origin" | undefined;
        };
        readonly status: import("@googlemaps/js-api-loader").LoaderStatus;
        createUrl: () => string;
        deleteScript: () => void;
        load: () => Promise<typeof google>;
        loadPromise: () => Promise<typeof google>;
        importLibrary: {
            (name: "core"): Promise<google.maps.CoreLibrary>;
            (name: "maps"): Promise<google.maps.MapsLibrary>;
            (name: "places"): Promise<google.maps.PlacesLibrary>;
            (name: "geocoding"): Promise<google.maps.GeocodingLibrary>;
            (name: "routes"): Promise<google.maps.RoutesLibrary>;
            (name: "marker"): Promise<google.maps.MarkerLibrary>;
            (name: "geometry"): Promise<google.maps.GeometryLibrary>;
            (name: "elevation"): Promise<google.maps.ElevationLibrary>;
            (name: "streetView"): Promise<google.maps.StreetViewLibrary>;
            (name: "journeySharing"): Promise<google.maps.JourneySharingLibrary>;
            (name: "drawing"): Promise<google.maps.DrawingLibrary>;
            (name: "visualization"): Promise<google.maps.VisualizationLibrary>;
            (name: import("@googlemaps/js-api-loader").Library): Promise<unknown>;
        };
        loadCallback: (fn: (e: ErrorEvent) => void) => void;
    } | null>;
    markers: import("vue").Ref<{
        AdvancedMarkerClickEvent: typeof google.maps.marker.AdvancedMarkerClickEvent;
        AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
        Animation: {
            readonly [x: number]: string;
            readonly BOUNCE: google.maps.Animation.BOUNCE;
            readonly DROP: google.maps.Animation.DROP;
        };
        CollisionBehavior: {
            readonly OPTIONAL_AND_HIDES_LOWER_PRIORITY: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY;
            readonly REQUIRED: google.maps.CollisionBehavior.REQUIRED;
            readonly REQUIRED_AND_HIDES_OPTIONAL: google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL;
        };
        Marker: typeof google.maps.Marker;
        PinElement: typeof google.maps.marker.PinElement;
    } | null>;
    visualization: import("vue").Ref<{
        HeatmapLayer: typeof google.maps.visualization.HeatmapLayer;
    } | null>;
};
export {};
