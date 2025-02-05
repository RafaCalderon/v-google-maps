// Vue
import {
  ref,
  inject,
  provide,
  markRaw,
  defineComponent,
  onBeforeUnmount,
  type Ref,
  type PropType,
} from "vue";

// Utils
import { mapSymbol, markerClustererSymbol } from "@/shared/symbols";
import { MarkerClusterer, type MarkerClustererOptions } from "@googlemaps/markerclusterer";

export default defineComponent({
  name: "VGoogleMarkerClusterer",
  props: {
    options: {
      default: null,
      type: Object as PropType<MarkerClustererOptions | null>,
    },
  },
  setup(props, { slots }) {
    // Injects

    const map = inject(mapSymbol, ref(null));

    // Data

    const markerClusterer = ref<MarkerClusterer | null>(null);

    if (map.value) {
      markerClusterer.value = markRaw(
        new MarkerClusterer({
          ...props.options,
          map: map.value,
        }),
      );
    }

    // Provides

    provide(markerClustererSymbol, markerClusterer as Ref<MarkerClusterer | null>);

    // BeforeUnmount

    onBeforeUnmount(() => {
      if (!markerClusterer.value) return;
      markerClusterer.value.setMap(null);
      markerClusterer.value.clearMarkers();
      markerClusterer.value = null;
    });

    return () => slots.default?.();
  },
});
