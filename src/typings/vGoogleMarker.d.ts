import type { PropType, DefineComponent } from "vue";

export type vGoogleMarker = DefineComponent<
  {
    options: {
      required: true;
      type: PropType<google.maps.MarkerOptions>;
    };
    modelValue: {
      default: null;
      type: PropType<google.maps.LatLngLiteral | null>;
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
