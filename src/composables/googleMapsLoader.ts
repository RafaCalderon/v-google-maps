// Vue
import { ref } from "vue";

// Google Maps
import { type Libraries, Loader } from "@googlemaps/js-api-loader";

// Data

const loader = ref<Loader | null>(null);
const core = ref<google.maps.CoreLibrary | null>(null);
const maps = ref<google.maps.MapsLibrary | null>(null);
const markers = ref<google.maps.MarkerLibrary | null>(null);
const visualization = ref<google.maps.VisualizationLibrary | null>(null);

// Methods

async function init(apiKey: string, libraries: Libraries = []) {
  if (loader.value) return;
  loader.value = new Loader({
    apiKey,
    libraries,
  });
  core.value = await loader.value.importLibrary("core");
  maps.value = await loader.value.importLibrary("maps");
  markers.value = await loader.value.importLibrary("marker");
  visualization.value = await loader.value.importLibrary("visualization");
}

export function useGoogleMapsLoader() {
  return {
    maps,
    init,
    core,
    loader,
    markers,
    visualization,
  };
}
