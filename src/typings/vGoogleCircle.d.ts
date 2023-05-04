import type {PropType} from "vue";

export default DefineComponent<{
  options: {
    required: true;
    type: PropType<google.maps.MarkerOptions>
  };
  center: {
    default: null;
    type: PropType<google.maps.LatLngLiteral | null>;
  };
  radius: {
    default: null;
    type: PropType<number | null>;
  }
}, {}, {}, {}, {}, {}, {}, {
  "click": void;
  "update:center": void;
  "update:radius": void;
}>;
