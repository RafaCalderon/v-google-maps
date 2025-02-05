import { type PropType } from "vue";
import { type MarkerClustererOptions } from "@googlemaps/markerclusterer";
declare const _default: import("vue").DefineComponent<
  import("vue").ExtractPropTypes<{
    options: {
      default: null;
      type: PropType<MarkerClustererOptions | null>;
    };
  }>,
  () =>
    | import("vue").VNode<
        import("vue").RendererNode,
        import("vue").RendererElement,
        {
          [key: string]: any;
        }
      >[]
    | undefined,
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  string,
  import("vue").PublicProps,
  Readonly<
    import("vue").ExtractPropTypes<{
      options: {
        default: null;
        type: PropType<MarkerClustererOptions | null>;
      };
    }>
  > &
    Readonly<{}>,
  {
    options: MarkerClustererOptions | null;
  },
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  true,
  {},
  any
>;
export default _default;
