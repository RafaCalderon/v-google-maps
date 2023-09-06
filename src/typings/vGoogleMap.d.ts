import type { Property } from "csstype";
import type { PropType, DefineComponent } from "vue";

export type VGoogleMap = DefineComponent<
  {
    width: {
      required: true;
      type: PropType<Property.Width>;
    };
    height: {
      required: true;
      type: PropType<Property.Height>;
    };
    borderRadius: {
      default: "initial";
      type: PropType<Property.BorderRadius>;
    };
    options: {
      required: true;
      type: PropType<google.maps.MapOptions>;
    };
    center: {
      default: null;
      type: PropType<google.maps.LatLngLiteral | null>;
    };
    zoom: {
      default: null;
      type: PropType<number | null>;
    };
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    ready: void;
    click: void;
    "update:zoom": void;
    "update:center": void;
  }
>;
