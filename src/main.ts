import App from "./App.vue";
import { createApp } from "vue";

import { useGoogleMapsLoader } from "@/composables/googleMapsLoader";

const { init } = useGoogleMapsLoader();

(async () => {
  await init("");
  createApp(App).mount("#app");
})();
