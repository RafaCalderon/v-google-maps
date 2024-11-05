import { type PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    options: {
        required: true;
        type: PropType<google.maps.CircleOptions>;
    };
    center: {
        default: null;
        type: PropType<google.maps.LatLngLiteral | null>;
    };
    radius: {
        default: null;
        type: PropType<number | null>;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "update:center" | "update:radius")[], "click" | "update:center" | "update:radius", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        required: true;
        type: PropType<google.maps.CircleOptions>;
    };
    center: {
        default: null;
        type: PropType<google.maps.LatLngLiteral | null>;
    };
    radius: {
        default: null;
        type: PropType<number | null>;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    "onUpdate:center"?: ((...args: any[]) => any) | undefined;
    "onUpdate:radius"?: ((...args: any[]) => any) | undefined;
}, {
    center: google.maps.LatLngLiteral | null;
    radius: number | null;
}, {}>;
export default _default;
