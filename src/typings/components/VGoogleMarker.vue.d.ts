import { type Ref } from "vue";
interface Props {
    options?: google.maps.marker.AdvancedMarkerElementOptions;
    modelValue?: google.maps.LatLngLiteral | google.maps.LatLng | null;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {
        contentRef: HTMLDivElement;
    };
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<Props, {
    marker: Ref<google.maps.marker.AdvancedMarkerElement | null, google.maps.marker.AdvancedMarkerElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (event: google.maps.MapMouseEvent) => any;
    "update:model-value": (value: google.maps.LatLngLiteral | google.maps.LatLng | null) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((event: google.maps.MapMouseEvent) => any) | undefined;
    "onUpdate:model-value"?: ((value: google.maps.LatLngLiteral | google.maps.LatLng | null) => any) | undefined;
}>, {
    options: google.maps.marker.AdvancedMarkerElementOptions;
    modelValue: google.maps.LatLngLiteral | google.maps.LatLng | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {
    contentRef: HTMLDivElement;
}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
