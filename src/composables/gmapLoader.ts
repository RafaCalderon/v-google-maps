import {type Libraries, Loader} from "@googlemaps/js-api-loader";
import {ref} from "vue";

const gmapApi = ref<typeof google | null>(null);

async function load(apiKey: string, libraries: Libraries = []) {
  if (gmapApi.value) return;
  const loader = new Loader({
    apiKey,
    libraries,
  });
  gmapApi.value = await loader.load();
}

export function useGmapLoader() {
  return {
    gmapApi,
    load,
  };
}
