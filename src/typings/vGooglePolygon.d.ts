import type { PropType, DefineComponent } from "vue";

export type VGooglePolygon = DefineComponent<
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
  {},
  {},
  {},
  {},
  {},
  {},
  {
    click: void;
    mouseout: void;
    mouseover: void;
    "update:model-value": void;
  }
>;
