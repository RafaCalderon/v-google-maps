<template>
  <slot />
</template>

<script lang="ts" setup generic="T">
// Vue
import { ref, watch, inject, markRaw, onMounted, onBeforeUnmount, defineExpose } from "vue";

// Deep equal
import equal from "fast-deep-equal";

// Symbols
import { mapSymbol } from "@/shared/symbols";

// Deck
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { HeatmapLayer, type HeatmapLayerProps } from "@deck.gl/aggregation-layers";

// Definitions

type Props = {
  options: HeatmapLayerProps<T>;
};

const props = defineProps<Props>();

// Injects

const map = inject(mapSymbol, ref(null));

// Data

const overlay = ref<GoogleMapsOverlay | null>(null);

// Mounted

onMounted(() => {
  if (map.value) {
    const heatmap = new HeatmapLayer<T, never>(props.options as never);
    overlay.value = markRaw(
      new GoogleMapsOverlay({
        layers: [heatmap],
      }),
    );
    overlay.value.setMap(map.value);
  }
});

// Watchs

watch(
  () => props.options,
  (newValue, oldValue) => {
    if (!overlay.value || equal(newValue, oldValue)) return;
    const heatmap = new HeatmapLayer<T, never>(props.options as never);
    overlay.value.setProps({
      layers: [heatmap],
    });
  },
  {
    deep: true,
  },
);

// Exposes

defineExpose({
  overlay,
});

// Unmounted

onBeforeUnmount(() => {
  if (!overlay.value) return;
  overlay.value.setMap(null);
  overlay.value = null;
});
</script>
