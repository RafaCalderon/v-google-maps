import { type PropType } from "vue";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "update:center" | "update:radius")[], "click" | "update:center" | "update:radius", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    "onUpdate:center"?: ((...args: any[]) => any) | undefined;
    "onUpdate:radius"?: ((...args: any[]) => any) | undefined;
}>, {
    center: google.maps.LatLngLiteral | null;
    radius: number | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
