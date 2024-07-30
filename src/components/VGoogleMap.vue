<template>
  <div
    ref="mapRef"
    :class="props.class"
  />
  <slot v-if="mounted" />
</template>

<script setup lang="ts">
// Vue
import { ref, watch, provide, markRaw, nextTick, onMounted, onBeforeUnmount, type Ref } from "vue";

// Deep equal
import equal from "fast-deep-equal";

// Composables
import { useGoogleMapsLoader } from "@/composables/googleMapsLoader";

// Symbols
import { mapSymbol } from "@/shared/symbols";

// Definitions

interface Props {
  class?: string;
  options: google.maps.MapOptions;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "ready"): void;
  (event: "click", ev: google.maps.MapMouseEvent): void;
}>();

const zoom = defineModel<number | null>("zoom", {
  default: null,
});

const center = defineModel<google.maps.LatLngLiteral | null>("center", {
  default: null,
});

// Composables

const { maps } = useGoogleMapsLoader();

// Data

const mounted = ref(false);
const map = ref<google.maps.Map | null>(null);
let clickListener: google.maps.MapsEventListener | null = null;
let dragEndListener: google.maps.MapsEventListener | null = null;
let zoomChangedListener: google.maps.MapsEventListener | null = null;
const mapRef = ref<HTMLDivElement | null>(null) as Ref<HTMLDivElement | null>;

// Mounted

onMounted(async () => {
  if (!maps.value || !mapRef.value) return;
  map.value = markRaw(
    new maps.value.Map(mapRef.value, {
      ...props.options,
      zoom: zoom.value ?? props.options?.zoom,
      center: center.value ?? props.options?.center,
    }),
  );
  mounted.value = true;
  await nextTick();
  addListeners();
  emit("ready");
});

// Methods

function addListeners() {
  if (!map.value) return;
  clickListener = map.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
    emit("click", ev);
  });
  dragEndListener = map.value.addListener("dragend", () => {
    center.value = map.value?.getCenter()?.toJSON() ?? null;
  });
  zoomChangedListener = map.value.addListener("zoom_changed", () => {
    zoom.value = map.value?.getZoom() ?? 0;
  });
}

function removeListeners() {
  clickListener?.remove();
  dragEndListener?.remove();
  zoomChangedListener?.remove();
}

// Watchs

watch(
  () => props.options,
  (newValue: google.maps.MapOptions, oldValue: google.maps.MapOptions) => {
    if (!map.value || equal(newValue, oldValue)) return;
    map.value.setOptions(props.options);
  },
  {
    deep: true,
  },
);

watch(
  center,
  (newValue: google.maps.LatLngLiteral | null, oldValue: google.maps.LatLngLiteral | null) => {
    if (equal(newValue, oldValue) || !map.value || !newValue) return;
    map.value.setCenter({
      ...newValue,
    });
  },
);

watch(zoom, (newValue: number | null, oldValue: number | null) => {
  if (equal(newValue, oldValue) || !map.value || !newValue) return;
  map.value.setZoom(newValue);
});

// Expose

defineExpose({
  map,
});

// Provides

provide(mapSymbol, map);

// BeforeUnmounted

onBeforeUnmount(() => {
  removeListeners();
  map.value = null;
});
</script>
