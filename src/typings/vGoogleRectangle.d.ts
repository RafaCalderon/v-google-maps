import type { PropType, DefineComponent } from "vue";

export type VGoogleRectangle = DefineComponent<
  {
    options: {
      required: true;
      type: PropType<google.maps.RectangleOptions>;
    };
    modelValue: {
      default: null;
      type: PropType<google.maps.LatLngBoundsLiteral | null>;
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
    "update:model-value": void;
  }
>;
