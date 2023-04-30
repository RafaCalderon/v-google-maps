<template>
  <div>
    <div
      class="v-google-map__container"
      ref="mapRef"
    ></div>
    <slot
      v-if="mounted"
    />
  </div>
</template>

<script setup lang="ts">
// Vue
import {
  ref,
  watch,
  provide,
  nextTick,
  markRaw,
  computed,
  onMounted,
  onBeforeUnmount,
  type PropType,
} from "vue";

// Utils
import equal from "fast-deep-equal";

// Composables
import {useGmapLoader} from "@/composables/gmapLoader";

// Definiciones

const props = defineProps({
  options: {
    required: true,
    type: Object as PropType<google.maps.MapOptions>,
  },
  center: {
    default: null,
    type: Object as PropType<google.maps.LatLngLiteral | null>,
  },
  zoom: {
    default: null,
    type: Number as PropType<number | null>,
  },
});

const emits = defineEmits([
  "ready",
  "click",
  "update:zoom",
  "update:center",
]);

// Composables

const {gmapApi} = useGmapLoader();

// Data

const mounted = ref(false);
const map = ref<google.maps.Map | null>(null);
const mapRef = ref<HTMLDivElement | null>(null);
let clickListener: google.maps.MapsEventListener | null = null;
let dragEndListener: google.maps.MapsEventListener | null = null;
let zoomChangedListener: google.maps.MapsEventListener | null = null;

// Provides

provide("google-map", map);

// Computed

const centerValue = computed({
  get() {
    return props.center;
  },
  set(value: google.maps.LatLngLiteral | null) {
    emits("update:center", value);
  },
});

const zoomValue = computed({
  get() {
    return props.zoom;
  },
  set(value: number | null) {
    emits("update:zoom", value);
  },
});

// Mounted

onMounted(async () => {
  if (!mapRef.value || !gmapApi.value) return;
  const options: google.maps.MapOptions = {
    ...props.options,
  };
  if (centerValue.value) {
    options.center = {
      ...centerValue.value,
    };
  }
  if (zoomValue.value) {
    options.zoom = zoomValue.value;
  }
  map.value = markRaw(new gmapApi.value.maps.Map(mapRef.value, {
    ...options,
  }));
  mounted.value = true;
  await nextTick();
  addListeners();
  emits("ready");
});


// Methods

function addListeners() {
  if (!map.value) return;
  clickListener = map.value.addListener("click", onClick);
  dragEndListener = map.value.addListener("dragend", () => {
    centerValue.value = map.value?.getCenter()?.toJSON() ?? null;
  });
  zoomChangedListener = map.value.addListener("zoom_changed", () => {
    zoomValue.value = map.value?.getZoom() ?? 0;
  });
}

function removeListeners() {
  if (clickListener) {
    clickListener.remove();
  }
  if (dragEndListener) {
    dragEndListener.remove();
  }
  if (zoomChangedListener) {
    zoomChangedListener.remove();
  }
}

// Emits

function onClick(ev: google.maps.MapMouseEvent) {
  emits("click", ev);
}

// Watchs

watch(() => props.options, (newValue: google.maps.MapOptions, oldValue: google.maps.MapOptions) => {
  if (!map.value || equal(newValue, oldValue)) return;
  map.value.setOptions(props.options);
}, {
  deep: true,
});

watch(centerValue, (newValue: google.maps.LatLngLiteral | null, oldValue: google.maps.LatLngLiteral | null) => {
  if (equal(newValue, oldValue) || !map.value || !newValue) return;
  map.value.setCenter({
    ...newValue,
  });
});

watch(zoomValue, (newValue: number | null, oldValue: number | null) => {
  if (equal(newValue, oldValue) || !map.value || !newValue) return;
  map.value.setZoom(newValue);
});

// BeforeUnmounted

onBeforeUnmount(() => {
  removeListeners();
  map.value = null;
});
</script>

<style scoped>
.v-google-map__container {
  width: 100%;
  height: 18.75rem;
}
</style>
