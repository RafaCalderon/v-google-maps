import type { PropType, DefineComponent } from "vue";

export type VGooglePolyline = DefineComponent<
  {
    options: {
      required: true;
      type: PropType<google.maps.PolylineOptions>;
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
    "update:model-value": void;
  }
>;
