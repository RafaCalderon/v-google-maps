import { type PropType } from "vue";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        required: true;
        type: PropType<google.maps.PolylineOptions>;
    };
    modelValue: {
        default: null;
        type: PropType<google.maps.LatLngLiteral[] | null>;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "update:model-value" | "contextmenu")[], "click" | "update:model-value" | "contextmenu", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        required: true;
        type: PropType<google.maps.PolylineOptions>;
    };
    modelValue: {
        default: null;
        type: PropType<google.maps.LatLngLiteral[] | null>;
    };
}>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onContextmenu?: ((...args: any[]) => any) | undefined;
    "onUpdate:model-value"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: google.maps.LatLngLiteral[] | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
