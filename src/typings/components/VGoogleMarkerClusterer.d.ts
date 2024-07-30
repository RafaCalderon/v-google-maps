import { type PropType } from "vue";
import { type MarkerClustererOptions } from "@googlemaps/markerclusterer";
declare const _default: import("vue").DefineComponent<{
    options: {
        default: null;
        type: PropType<MarkerClustererOptions | null>;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        default: null;
        type: PropType<MarkerClustererOptions | null>;
    };
}>>, {
    options: MarkerClustererOptions | null;
}, {}>;
export default _default;
