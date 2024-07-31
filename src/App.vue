<script setup lang="ts">
import { ref } from "vue";

import VGoogleMap from "@/components/VGoogleMap.vue";
import VGoogleMarker from "@/components/VGoogleMarker.vue";

const showing = ref(false);
</script>

<template>
  <div style="display: grid; width: 600px; height: 600px">
    <button @click="showing = !showing">{{ showing }}</button>
    <VGoogleMap
      class="map"
      :options="{
        zoom: 17,
        mapId: 'map',
        center: { lat: -35.4293256, lng: -71.6556442 },
      }"
    >
      <VGoogleMarker
        v-if="showing"
        :options="{

          position: { lat: -35.4293256, lng: -71.6556442 },
        }"
      >
        <p>Zoom in</p>
      </VGoogleMarker>
    </VGoogleMap>
  </div>
</template>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
