import {createApp} from 'vue';
import App from './App.vue';

import './assets/main.css';
import {useGmapLoader} from "@/composables/gmapLoader";

const {load} = useGmapLoader();

(async () => {
  await load("");
  createApp(App).mount('#app');
})();
