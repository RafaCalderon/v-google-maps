<script setup lang="ts">
// import { ref } from "vue";
//
// import VGoogleMap from "@/components/VGoogleMap.vue";
// import VGoogleMarker from "@/components/VGoogleMarker.vue";
// import VGoogleInfoWindow from "@/components/VGoogleInfoWindow.vue";
//
// function test() {
//   console.log("test");
// }
//
// function updatePosition() {
//   position.value = { lat: -35.42894094270717, lng: -71.65747883096617 };
// }
//
// function updateRadius() {
//   radius.value = 200;
// }
//
// const zoom = ref(17);
// const radius = ref(100);
// const model = ref(true);
// const position = ref({ lat: -35.4293256, lng: -71.6556442 });
// const severalPositions = ref({
//   west: -71.65719988122862,
//   east: -71.65563347116392,
//   south: -35.4293256,
//   north: -35.427358583156646,
// });
//
// function updatePositions() {
//   severalPositions.value = {
//     west: -71.65851831436157,
//     east: -71.65695190429688,
//     south: -35.430594167334306,
//     north: -35.42862718147438,
//   };
// }
</script>

<template>
  <div style="display: grid; width: 600px; height: 600px">
    <!--    <VGoogleMap-->
    <!--      class="map"-->
    <!--      :options="{-->
    <!--        mapId: 'map',-->
    <!--        zoom: 17,-->
    <!--        center: { lat: -35.42894094270717, lng: -71.65747883096617 },-->
    <!--      }"-->
    <!--    >-->
    <!--      <VGoogleMarker v-model="position">-->
    <!--        <VGoogleInfoWindow v-model="model">-->
    <!--          <div>Hola</div>-->
    <!--        </VGoogleInfoWindow>-->
    <!--      </VGoogleMarker>-->
    <!--    </VGoogleMap>-->
  </div>
  <!--  {{ model }}-->
  <!--  <button @click="model = !model">update info window</button>-->
</template>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
