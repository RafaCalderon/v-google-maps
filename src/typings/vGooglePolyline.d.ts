import type { ComponentPublicInstance } from "vue";

export type VGooglePolyline = ComponentPublicInstance<{
  options: google.maps.PolylineOptions;
}>;

// export type VGooglePolyline = DefineComponent<
//   {
//     options: {
//       required: true;
//       type: PropType<google.maps.PolylineOptions>;
//     };
//     modelValue: {
//       default: null;
//       type: PropType<google.maps.LatLngLiteral[] | null>;
//     };
//   },
//   object,
//   object,
//   object,
//   object,
//   object,
//   object,
//   {
//     click: google.maps.MapMouseEvent;
//     "update:model-value": google.maps.LatLngLiteral[] | null;
//   }
// >;
