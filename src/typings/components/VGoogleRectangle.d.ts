import { type PropType } from "vue";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        required: true;
        type: PropType<google.maps.RectangleOptions>;
    };
    modelValue: {
        default: null;
        type: PropType<google.maps.LatLngBoundsLiteral | null>;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "update:model-value")[], "click" | "update:model-value", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        required: true;
        type: PropType<google.maps.RectangleOptions>;
    };
    modelValue: {
        default: null;
        type: PropType<google.maps.LatLngBoundsLiteral | null>;
    };
}>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    "onUpdate:model-value"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: google.maps.LatLngBoundsLiteral | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
