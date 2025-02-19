import { type Libraries, Loader } from "@googlemaps/js-api-loader";
declare function init(apiKey: string, libraries?: Libraries): Promise<void>;
export declare function useGoogleMapsLoader(): {
  maps: import("vue").Ref<
    {
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
    } | null,
    | google.maps.MapsLibrary
    | {
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
      }
    | null
  >;
  init: typeof init;
  core: import("vue").Ref<
    {
      ColorScheme: {
        readonly DARK: google.maps.ColorScheme.DARK;
        readonly FOLLOW_SYSTEM: google.maps.ColorScheme.FOLLOW_SYSTEM;
        readonly LIGHT: google.maps.ColorScheme.LIGHT;
      };
      ControlPosition: {
        readonly [x: number]: string;
        readonly BLOCK_END_INLINE_CENTER: google.maps.ControlPosition.BLOCK_END_INLINE_CENTER;
        readonly BLOCK_END_INLINE_END: google.maps.ControlPosition.BLOCK_END_INLINE_END;
        readonly BLOCK_END_INLINE_START: google.maps.ControlPosition.BLOCK_END_INLINE_START;
        readonly BLOCK_START_INLINE_CENTER: google.maps.ControlPosition.BLOCK_START_INLINE_CENTER;
        readonly BLOCK_START_INLINE_END: google.maps.ControlPosition.BLOCK_START_INLINE_END;
        readonly BLOCK_START_INLINE_START: google.maps.ControlPosition.BLOCK_START_INLINE_START;
        readonly BOTTOM_CENTER: google.maps.ControlPosition.BOTTOM_CENTER;
        readonly BOTTOM_LEFT: google.maps.ControlPosition.BOTTOM_LEFT;
        readonly BOTTOM_RIGHT: google.maps.ControlPosition.BOTTOM_RIGHT;
        readonly INLINE_END_BLOCK_CENTER: google.maps.ControlPosition.INLINE_END_BLOCK_CENTER;
        readonly INLINE_END_BLOCK_END: google.maps.ControlPosition.INLINE_END_BLOCK_END;
        readonly INLINE_END_BLOCK_START: google.maps.ControlPosition.INLINE_END_BLOCK_START;
        readonly INLINE_START_BLOCK_CENTER: google.maps.ControlPosition.INLINE_START_BLOCK_CENTER;
        readonly INLINE_START_BLOCK_END: google.maps.ControlPosition.INLINE_START_BLOCK_END;
        readonly INLINE_START_BLOCK_START: google.maps.ControlPosition.INLINE_START_BLOCK_START;
        readonly LEFT_BOTTOM: google.maps.ControlPosition.LEFT_BOTTOM;
        readonly LEFT_CENTER: google.maps.ControlPosition.LEFT_CENTER;
        readonly LEFT_TOP: google.maps.ControlPosition.LEFT_TOP;
        readonly RIGHT_BOTTOM: google.maps.ControlPosition.RIGHT_BOTTOM;
        readonly RIGHT_CENTER: google.maps.ControlPosition.RIGHT_CENTER;
        readonly RIGHT_TOP: google.maps.ControlPosition.RIGHT_TOP;
        readonly TOP_CENTER: google.maps.ControlPosition.TOP_CENTER;
        readonly TOP_LEFT: google.maps.ControlPosition.TOP_LEFT;
        readonly TOP_RIGHT: google.maps.ControlPosition.TOP_RIGHT;
      };
      event: typeof google.maps.event;
      LatLng: typeof google.maps.LatLng;
      LatLngAltitude: typeof google.maps.LatLngAltitude;
      LatLngBounds: typeof google.maps.LatLngBounds;
      MapsNetworkError: typeof google.maps.MapsNetworkError;
      MapsNetworkErrorEndpoint: {
        readonly DIRECTIONS_ROUTE: google.maps.MapsNetworkErrorEndpoint.DIRECTIONS_ROUTE;
        readonly DISTANCE_MATRIX: google.maps.MapsNetworkErrorEndpoint.DISTANCE_MATRIX;
        readonly ELEVATION_ALONG_PATH: google.maps.MapsNetworkErrorEndpoint.ELEVATION_ALONG_PATH;
        readonly ELEVATION_LOCATIONS: google.maps.MapsNetworkErrorEndpoint.ELEVATION_LOCATIONS;
        readonly FLEET_ENGINE_GET_DELIVERY_VEHICLE: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_GET_DELIVERY_VEHICLE;
        readonly FLEET_ENGINE_GET_TRIP: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_GET_TRIP;
        readonly FLEET_ENGINE_GET_VEHICLE: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_GET_VEHICLE;
        readonly FLEET_ENGINE_LIST_DELIVERY_VEHICLES: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_LIST_DELIVERY_VEHICLES;
        readonly FLEET_ENGINE_LIST_TASKS: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_LIST_TASKS;
        readonly FLEET_ENGINE_LIST_VEHICLES: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_LIST_VEHICLES;
        readonly FLEET_ENGINE_SEARCH_TASKS: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_SEARCH_TASKS;
        readonly GEOCODER_GEOCODE: google.maps.MapsNetworkErrorEndpoint.GEOCODER_GEOCODE;
        readonly MAPS_MAX_ZOOM: google.maps.MapsNetworkErrorEndpoint.MAPS_MAX_ZOOM;
        readonly PLACES_AUTOCOMPLETE: google.maps.MapsNetworkErrorEndpoint.PLACES_AUTOCOMPLETE;
        readonly PLACES_DETAILS: google.maps.MapsNetworkErrorEndpoint.PLACES_DETAILS;
        readonly PLACES_FIND_PLACE_FROM_PHONE_NUMBER: google.maps.MapsNetworkErrorEndpoint.PLACES_FIND_PLACE_FROM_PHONE_NUMBER;
        readonly PLACES_FIND_PLACE_FROM_QUERY: google.maps.MapsNetworkErrorEndpoint.PLACES_FIND_PLACE_FROM_QUERY;
        readonly PLACES_GATEWAY: google.maps.MapsNetworkErrorEndpoint.PLACES_GATEWAY;
        readonly PLACES_GET_PLACE: google.maps.MapsNetworkErrorEndpoint.PLACES_GET_PLACE;
        readonly PLACES_LOCAL_CONTEXT_SEARCH: google.maps.MapsNetworkErrorEndpoint.PLACES_LOCAL_CONTEXT_SEARCH;
        readonly PLACES_NEARBY_SEARCH: google.maps.MapsNetworkErrorEndpoint.PLACES_NEARBY_SEARCH;
        readonly PLACES_SEARCH_TEXT: google.maps.MapsNetworkErrorEndpoint.PLACES_SEARCH_TEXT;
        readonly STREETVIEW_GET_PANORAMA: google.maps.MapsNetworkErrorEndpoint.STREETVIEW_GET_PANORAMA;
      };
      MapsRequestError: typeof google.maps.MapsRequestError;
      MapsServerError: typeof google.maps.MapsServerError;
      MVCArray: typeof google.maps.MVCArray;
      MVCObject: typeof google.maps.MVCObject;
      Point: typeof google.maps.Point;
      Settings: typeof google.maps.Settings;
      Size: typeof google.maps.Size;
      SymbolPath: {
        readonly [x: number]: string;
        readonly BACKWARD_CLOSED_ARROW: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW;
        readonly BACKWARD_OPEN_ARROW: google.maps.SymbolPath.BACKWARD_OPEN_ARROW;
        readonly CIRCLE: google.maps.SymbolPath.CIRCLE;
        readonly FORWARD_CLOSED_ARROW: google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
        readonly FORWARD_OPEN_ARROW: google.maps.SymbolPath.FORWARD_OPEN_ARROW;
      };
      UnitSystem: {
        readonly [x: number]: string;
        readonly IMPERIAL: google.maps.UnitSystem.IMPERIAL;
        readonly METRIC: google.maps.UnitSystem.METRIC;
      };
    } | null,
    | google.maps.CoreLibrary
    | {
        ColorScheme: {
          readonly DARK: google.maps.ColorScheme.DARK;
          readonly FOLLOW_SYSTEM: google.maps.ColorScheme.FOLLOW_SYSTEM;
          readonly LIGHT: google.maps.ColorScheme.LIGHT;
        };
        ControlPosition: {
          readonly [x: number]: string;
          readonly BLOCK_END_INLINE_CENTER: google.maps.ControlPosition.BLOCK_END_INLINE_CENTER;
          readonly BLOCK_END_INLINE_END: google.maps.ControlPosition.BLOCK_END_INLINE_END;
          readonly BLOCK_END_INLINE_START: google.maps.ControlPosition.BLOCK_END_INLINE_START;
          readonly BLOCK_START_INLINE_CENTER: google.maps.ControlPosition.BLOCK_START_INLINE_CENTER;
          readonly BLOCK_START_INLINE_END: google.maps.ControlPosition.BLOCK_START_INLINE_END;
          readonly BLOCK_START_INLINE_START: google.maps.ControlPosition.BLOCK_START_INLINE_START;
          readonly BOTTOM_CENTER: google.maps.ControlPosition.BOTTOM_CENTER;
          readonly BOTTOM_LEFT: google.maps.ControlPosition.BOTTOM_LEFT;
          readonly BOTTOM_RIGHT: google.maps.ControlPosition.BOTTOM_RIGHT;
          readonly INLINE_END_BLOCK_CENTER: google.maps.ControlPosition.INLINE_END_BLOCK_CENTER;
          readonly INLINE_END_BLOCK_END: google.maps.ControlPosition.INLINE_END_BLOCK_END;
          readonly INLINE_END_BLOCK_START: google.maps.ControlPosition.INLINE_END_BLOCK_START;
          readonly INLINE_START_BLOCK_CENTER: google.maps.ControlPosition.INLINE_START_BLOCK_CENTER;
          readonly INLINE_START_BLOCK_END: google.maps.ControlPosition.INLINE_START_BLOCK_END;
          readonly INLINE_START_BLOCK_START: google.maps.ControlPosition.INLINE_START_BLOCK_START;
          readonly LEFT_BOTTOM: google.maps.ControlPosition.LEFT_BOTTOM;
          readonly LEFT_CENTER: google.maps.ControlPosition.LEFT_CENTER;
          readonly LEFT_TOP: google.maps.ControlPosition.LEFT_TOP;
          readonly RIGHT_BOTTOM: google.maps.ControlPosition.RIGHT_BOTTOM;
          readonly RIGHT_CENTER: google.maps.ControlPosition.RIGHT_CENTER;
          readonly RIGHT_TOP: google.maps.ControlPosition.RIGHT_TOP;
          readonly TOP_CENTER: google.maps.ControlPosition.TOP_CENTER;
          readonly TOP_LEFT: google.maps.ControlPosition.TOP_LEFT;
          readonly TOP_RIGHT: google.maps.ControlPosition.TOP_RIGHT;
        };
        event: typeof google.maps.event;
        LatLng: typeof google.maps.LatLng;
        LatLngAltitude: typeof google.maps.LatLngAltitude;
        LatLngBounds: typeof google.maps.LatLngBounds;
        MapsNetworkError: typeof google.maps.MapsNetworkError;
        MapsNetworkErrorEndpoint: {
          readonly DIRECTIONS_ROUTE: google.maps.MapsNetworkErrorEndpoint.DIRECTIONS_ROUTE;
          readonly DISTANCE_MATRIX: google.maps.MapsNetworkErrorEndpoint.DISTANCE_MATRIX;
          readonly ELEVATION_ALONG_PATH: google.maps.MapsNetworkErrorEndpoint.ELEVATION_ALONG_PATH;
          readonly ELEVATION_LOCATIONS: google.maps.MapsNetworkErrorEndpoint.ELEVATION_LOCATIONS;
          readonly FLEET_ENGINE_GET_DELIVERY_VEHICLE: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_GET_DELIVERY_VEHICLE;
          readonly FLEET_ENGINE_GET_TRIP: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_GET_TRIP;
          readonly FLEET_ENGINE_GET_VEHICLE: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_GET_VEHICLE;
          readonly FLEET_ENGINE_LIST_DELIVERY_VEHICLES: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_LIST_DELIVERY_VEHICLES;
          readonly FLEET_ENGINE_LIST_TASKS: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_LIST_TASKS;
          readonly FLEET_ENGINE_LIST_VEHICLES: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_LIST_VEHICLES;
          readonly FLEET_ENGINE_SEARCH_TASKS: google.maps.MapsNetworkErrorEndpoint.FLEET_ENGINE_SEARCH_TASKS;
          readonly GEOCODER_GEOCODE: google.maps.MapsNetworkErrorEndpoint.GEOCODER_GEOCODE;
          readonly MAPS_MAX_ZOOM: google.maps.MapsNetworkErrorEndpoint.MAPS_MAX_ZOOM;
          readonly PLACES_AUTOCOMPLETE: google.maps.MapsNetworkErrorEndpoint.PLACES_AUTOCOMPLETE;
          readonly PLACES_DETAILS: google.maps.MapsNetworkErrorEndpoint.PLACES_DETAILS;
          readonly PLACES_FIND_PLACE_FROM_PHONE_NUMBER: google.maps.MapsNetworkErrorEndpoint.PLACES_FIND_PLACE_FROM_PHONE_NUMBER;
          readonly PLACES_FIND_PLACE_FROM_QUERY: google.maps.MapsNetworkErrorEndpoint.PLACES_FIND_PLACE_FROM_QUERY;
          readonly PLACES_GATEWAY: google.maps.MapsNetworkErrorEndpoint.PLACES_GATEWAY;
          readonly PLACES_GET_PLACE: google.maps.MapsNetworkErrorEndpoint.PLACES_GET_PLACE;
          readonly PLACES_LOCAL_CONTEXT_SEARCH: google.maps.MapsNetworkErrorEndpoint.PLACES_LOCAL_CONTEXT_SEARCH;
          readonly PLACES_NEARBY_SEARCH: google.maps.MapsNetworkErrorEndpoint.PLACES_NEARBY_SEARCH;
          readonly PLACES_SEARCH_TEXT: google.maps.MapsNetworkErrorEndpoint.PLACES_SEARCH_TEXT;
          readonly STREETVIEW_GET_PANORAMA: google.maps.MapsNetworkErrorEndpoint.STREETVIEW_GET_PANORAMA;
        };
        MapsRequestError: typeof google.maps.MapsRequestError;
        MapsServerError: typeof google.maps.MapsServerError;
        MVCArray: typeof google.maps.MVCArray;
        MVCObject: typeof google.maps.MVCObject;
        Point: typeof google.maps.Point;
        Settings: typeof google.maps.Settings;
        Size: typeof google.maps.Size;
        SymbolPath: {
          readonly [x: number]: string;
          readonly BACKWARD_CLOSED_ARROW: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW;
          readonly BACKWARD_OPEN_ARROW: google.maps.SymbolPath.BACKWARD_OPEN_ARROW;
          readonly CIRCLE: google.maps.SymbolPath.CIRCLE;
          readonly FORWARD_CLOSED_ARROW: google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
          readonly FORWARD_OPEN_ARROW: google.maps.SymbolPath.FORWARD_OPEN_ARROW;
        };
        UnitSystem: {
          readonly [x: number]: string;
          readonly IMPERIAL: google.maps.UnitSystem.IMPERIAL;
          readonly METRIC: google.maps.UnitSystem.METRIC;
        };
      }
    | null
  >;
  loader: import("vue").Ref<
    {
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
      readonly options: import("@googlemaps/js-api-loader").LoaderOptions;
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
    } | null,
    | Loader
    | {
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
        readonly options: import("@googlemaps/js-api-loader").LoaderOptions;
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
      }
    | null
  >;
  markers: import("vue").Ref<
    {
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
    } | null,
    | google.maps.MarkerLibrary
    | {
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
      }
    | null
  >;
  visualization: import("vue").Ref<
    {
      HeatmapLayer: typeof google.maps.visualization.HeatmapLayer;
    } | null,
    | google.maps.VisualizationLibrary
    | {
        HeatmapLayer: typeof google.maps.visualization.HeatmapLayer;
      }
    | null
  >;
};
export {};
