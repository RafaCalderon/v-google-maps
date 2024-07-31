import { type PropType } from "vue";
declare const _default: import("vue").DefineComponent<
  {
    options: {
      required: true;
      type: PropType<google.maps.PolygonOptions>;
    };
    modelValue: {
      default: null;
      type: PropType<google.maps.LatLngLiteral[] | null>;
    };
  },
  () =>
    | import("vue").VNode<
        import("vue").RendererNode,
        import("vue").RendererElement,
        {
          [key: string]: any;
        }
      >[]
    | undefined,
  unknown,
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  ("click" | "mouseover" | "mouseout" | "update:model-value")[],
  "click" | "mouseover" | "mouseout" | "update:model-value",
  import("vue").PublicProps,
  Readonly<
    import("vue").ExtractPropTypes<{
      options: {
        required: true;
        type: PropType<google.maps.PolygonOptions>;
      };
      modelValue: {
        default: null;
        type: PropType<google.maps.LatLngLiteral[] | null>;
      };
    }>
  > & {
    onClick?: ((...args: any[]) => any) | undefined;
    onMouseout?: ((...args: any[]) => any) | undefined;
    onMouseover?: ((...args: any[]) => any) | undefined;
    "onUpdate:model-value"?: ((...args: any[]) => any) | undefined;
  },
  {
    modelValue: google.maps.LatLngLiteral[] | null;
  },
  {}
>;
export default _default;
