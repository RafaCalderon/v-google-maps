import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { type HeatmapLayerProps } from "@deck.gl/aggregation-layers";
declare const __VLS_export: <T>(
  __VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"],
  __VLS_ctx?: __VLS_PrettifyLocal<
    Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">
  >,
  __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"],
  __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<{
      options: HeatmapLayerProps<T>;
    }> &
      import("vue").PublicProps;
    expose: (
      exposed: import("vue").ShallowUnwrapRef<{
        overlay: import("vue").Ref<
          {
            setMap: (map: google.maps.Map | null) => void;
            setProps: (
              props: Partial<import("@deck.gl/google-maps").GoogleMapsOverlayProps>,
            ) => void;
            pickObject: (params: any) => {
              color: Uint8Array | null;
              layer: import("@deck.gl/core").Layer | null;
              sourceLayer?: import("@deck.gl/core").Layer | null;
              viewport?: import("@deck.gl/core").Viewport;
              index: number;
              picked: boolean;
              object?: any;
              x: number;
              y: number;
              pixel?: [number, number];
              coordinate?: number[];
              devicePixel?: [number, number];
              pixelRatio: number;
            } | null;
            pickMultipleObjects: (params: any) =>
              | {
                  color: Uint8Array | null;
                  layer: import("@deck.gl/core").Layer | null;
                  sourceLayer?: import("@deck.gl/core").Layer | null;
                  viewport?: import("@deck.gl/core").Viewport;
                  index: number;
                  picked: boolean;
                  object?: any;
                  x: number;
                  y: number;
                  pixel?: [number, number];
                  coordinate?: number[];
                  devicePixel?: [number, number];
                  pixelRatio: number;
                }[]
              | null;
            pickObjects: (params: any) =>
              | {
                  color: Uint8Array | null;
                  layer: import("@deck.gl/core").Layer | null;
                  sourceLayer?: import("@deck.gl/core").Layer | null;
                  viewport?: import("@deck.gl/core").Viewport;
                  index: number;
                  picked: boolean;
                  object?: any;
                  x: number;
                  y: number;
                  pixel?: [number, number];
                  coordinate?: number[];
                  devicePixel?: [number, number];
                  pixelRatio: number;
                }[]
              | null;
            finalize: () => void;
            _createOverlay: (map: google.maps.Map) => void;
            _onAdd: () => void;
            _onContextRestored: ({ gl }: { gl: any }) => void;
            _onContextLost: () => void;
            _onRemove: () => void;
            _onDrawRaster: () => void;
            _onDrawVectorInterleaved: ({ gl, transformer }: { gl: any; transformer: any }) => void;
            _onDrawVectorOverlay: ({ transformer }: { transformer: any }) => void;
          } | null,
          | GoogleMapsOverlay
          | {
              setMap: (map: google.maps.Map | null) => void;
              setProps: (
                props: Partial<import("@deck.gl/google-maps").GoogleMapsOverlayProps>,
              ) => void;
              pickObject: (params: any) => {
                color: Uint8Array | null;
                layer: import("@deck.gl/core").Layer | null;
                sourceLayer?: import("@deck.gl/core").Layer | null;
                viewport?: import("@deck.gl/core").Viewport;
                index: number;
                picked: boolean;
                object?: any;
                x: number;
                y: number;
                pixel?: [number, number];
                coordinate?: number[];
                devicePixel?: [number, number];
                pixelRatio: number;
              } | null;
              pickMultipleObjects: (params: any) =>
                | {
                    color: Uint8Array | null;
                    layer: import("@deck.gl/core").Layer | null;
                    sourceLayer?: import("@deck.gl/core").Layer | null;
                    viewport?: import("@deck.gl/core").Viewport;
                    index: number;
                    picked: boolean;
                    object?: any;
                    x: number;
                    y: number;
                    pixel?: [number, number];
                    coordinate?: number[];
                    devicePixel?: [number, number];
                    pixelRatio: number;
                  }[]
                | null;
              pickObjects: (params: any) =>
                | {
                    color: Uint8Array | null;
                    layer: import("@deck.gl/core").Layer | null;
                    sourceLayer?: import("@deck.gl/core").Layer | null;
                    viewport?: import("@deck.gl/core").Viewport;
                    index: number;
                    picked: boolean;
                    object?: any;
                    x: number;
                    y: number;
                    pixel?: [number, number];
                    coordinate?: number[];
                    devicePixel?: [number, number];
                    pixelRatio: number;
                  }[]
                | null;
              finalize: () => void;
              _createOverlay: (map: google.maps.Map) => void;
              _onAdd: () => void;
              _onContextRestored: ({ gl }: { gl: any }) => void;
              _onContextLost: () => void;
              _onRemove: () => void;
              _onDrawRaster: () => void;
              _onDrawVectorInterleaved: ({
                gl,
                transformer,
              }: {
                gl: any;
                transformer: any;
              }) => void;
              _onDrawVectorOverlay: ({ transformer }: { transformer: any }) => void;
            }
          | null
        >;
      }>,
    ) => void;
    attrs: any;
    slots: {
      default?: (props: {}) => any;
    };
    emit: {};
  }>,
) => import("vue").VNode & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = {
  [K in keyof T as K]: T[K];
} & {};
