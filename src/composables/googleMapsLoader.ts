// Vue
import { ref } from "vue";

// Google Maps
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

// Data

const core = ref<google.maps.CoreLibrary | null>(null);
const maps = ref<google.maps.MapsLibrary | null>(null);
const markers = ref<google.maps.MarkerLibrary | null>(null);
const visualization = ref<google.maps.VisualizationLibrary | null>(null);

// Methods

async function init(apiKey: string, libraries: string[] = []) {
  setOptions({
    key: apiKey,
    libraries,
  });
  core.value = await importLibrary("core");
  maps.value = await importLibrary("maps");
  markers.value = await importLibrary("marker");
  visualization.value = await importLibrary("visualization");
}

export function useGoogleMapsLoader() {
  return {
    maps,
    init,
    core,
    markers,
    visualization,
  };
}
