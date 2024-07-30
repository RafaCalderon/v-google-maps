import type { PropType, DefineComponent } from "vue";

export type vGoogleCircle = DefineComponent<
  {
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
  },
  object,
  object,
  object,
  object,
  object,
  object,
  {
    "update:radius": number | null;
    click: google.maps.MapMouseEvent;
    "update:center": google.maps.LatLngLiteral | null;
  }
>;
