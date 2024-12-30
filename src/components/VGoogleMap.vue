<template>
  <div
    ref="mapRef"
    :class="props.class"
  />
  <slot v-if="mounted" />
</template>

<script setup lang="ts">
// Vue
import {
  ref,
  watch,
  provide,
  markRaw,
  nextTick,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";

// Deep equal
import equal from "fast-deep-equal";

// Composables
import { useGoogleMapsLoader } from "@/composables/googleMapsLoader";

// Symbols
import { mapSymbol } from "@/shared/symbols";

// Definitions

interface Props {
  class?: string;
  zoom?: number | null;
  options: google.maps.MapOptions;
  center?: google.maps.LatLngLiteral | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "ready"): void;
  (event: "update:zoom", value: number | null): void;
  (event: "click", ev: google.maps.MapMouseEvent): void;
  (event: "update:center", value: google.maps.LatLngLiteral | null): void;
}>();

// Composables

const { maps } = useGoogleMapsLoader();

// Data

const mounted = ref(false);
const vm = getCurrentInstance();
const internalZoom = ref(props.zoom);
const interalCenter = ref(props.center);
const map = ref<google.maps.Map | null>(null);
const mapRef = ref<HTMLDivElement | null>(null);
let clickListener: google.maps.MapsEventListener | null = null;
let dragEndListener: google.maps.MapsEventListener | null = null;
let zoomChangedListener: google.maps.MapsEventListener | null = null;

// Mounted

onMounted(async () => {
  if (!maps.value || !mapRef.value) return;
  map.value = markRaw(
    new maps.value.Map(mapRef.value, {
      ...props.options,
      zoom: props.zoom ?? props.options?.zoom,
      center: props.center ?? props.options?.center,
    }),
  );
  mounted.value = true;
  await nextTick();
  addListeners();
  emit("ready");
});

// Methods

function addListeners() {
  removeListeners();
  if (!map.value) return;
  const props = vm?.vnode?.props;
  if (props?.["onClick"]) {
    clickListener = map.value.addListener("click", (ev: google.maps.MapMouseEvent) => {
      emit("click", ev);
    });
  }
  if (props?.["onUpdate:center"]) {
    dragEndListener = map.value.addListener("dragend", () => {
      const center = map.value?.getCenter()?.toJSON();
      if (!center) return;
      interalCenter.value = { ...center };
      emit("update:center", interalCenter.value);
    });
  }
  if (props?.["onUpdate:zoom"]) {
    zoomChangedListener = map.value.addListener("zoom_changed", () => {
      internalZoom.value = map.value?.getZoom() ?? 0;
      emit("update:zoom", internalZoom.value);
    });
  }
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
  () => props.center,
  (value) => {
    if (!map.value || !value || equal(value, interalCenter.value)) return;
    map.value.setCenter({ ...value });
  },
);

watch(
  () => props.zoom,
  (value) => {
    if (!map.value || !value || equal(value, internalZoom.value)) return;
    map.value.setZoom(value);
  },
);

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
