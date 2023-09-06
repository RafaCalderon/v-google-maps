import type { PropType, DefineComponent } from "vue";

export type VGoogleInfoWindow = DefineComponent<
  {
    options: {
      default: null;
      type: PropType<google.maps.InfoWindowOptions | null>;
    };
    modelValue: {
      default: null;
      type: BooleanConstructor;
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
