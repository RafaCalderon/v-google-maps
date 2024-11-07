<template>
  <div
    v-if="defaultSlot && !slotIsComment"
    style="display: none"
  >
    <div ref="contentRef">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Vue
import {
  ref,
  watch,
  inject,
  provide,
  markRaw,
  nextTick,
  computed,
  useSlots,
  onMounted,
  onBeforeUnmount,
  type Ref,
} from "vue";

// Deep equal
import equal from "fast-deep-equal";

// Composables
import { useGoogleMapsLoader } from "@/composables/googleMapsLoader";

// Symbols
import { mapSymbol, markerSymbol, markerClustererSymbol } from "@/shared/symbols";

// Components
import VGoogleInfoWindow from "@/components/VGoogleInfoWindow.vue";

// Definitions

interface Props {
  options?: google.maps.marker.AdvancedMarkerElementOptions;
}

const props = withDefaults(defineProps<Props>(), {
  options: undefined,
});

const model = defineModel<google.maps.LatLngLiteral | google.maps.LatLng | null>({
  default: null,
  required: false,
});

// Composables

const slots = useSlots();
const { markers } = useGoogleMapsLoader();

// Injects

const map = inject(mapSymbol, ref(null));
const markerClusterer = inject(markerClustererSymbol, ref(null));

// Data

const contentRef = ref<HTMLElement>();
let dragendListener: google.maps.MapsEventListener | null = null;
const marker = ref<google.maps.marker.AdvancedMarkerElement | null>(
  null,
) as Ref<google.maps.marker.AdvancedMarkerElement | null>;

// Mounted

onMounted(async () => {
  if (markers.value) {
    marker.value = markRaw(
      new markers.value.AdvancedMarkerElement({
        ...props.options,
        position: model.value ?? props.options?.position,
        map: markerClusterer.value === null ? map.value : null,
        content:
          defaultSlot.value && !slotIsComment.value && !slotIsInfoWindow.value
            ? contentRef.value
            : props.options?.content,
      }),
    );
    await nextTick();
    if (markerClusterer.value) {
      markerClusterer.value.addMarker(marker.value);
    }
    addListeners();
  }
});

// Computed

const defaultSlot = computed(() => {
  return slots.default?.()?.[0] ?? null;
});

const slotIsComment = computed(() => {
  return defaultSlot.value?.type === Comment;
});

const slotIsInfoWindow = computed(() => {
  return defaultSlot.value?.type === VGoogleInfoWindow;
});

// Methods

function addListeners() {
  if (!marker.value) return;
  dragendListener = marker.value.addListener("dragend", (event: google.maps.MapMouseEvent) => {
    model.value = event.latLng?.toJSON() ?? null;
  });
}

function removeListeners() {
  dragendListener?.remove();
}

// Watchs

watch(
  () => props.options,
  (newValue, oldValue) => {
    if (!marker.value || equal(newValue, oldValue)) return;
    if (newValue?.title) marker.value.title = newValue.title;
    if (newValue?.zIndex) marker.value.zIndex = newValue.zIndex;
    if (newValue?.content) marker.value.content = newValue.content;
    if (newValue?.position) marker.value.position = newValue.position;
    if (newValue?.gmpDraggable) marker.value.gmpDraggable = newValue.gmpDraggable;
  },
  {
    deep: true,
  },
);

watch(model, (newValue, oldValue) => {
  if (!marker.value || equal(newValue, oldValue)) return;
  marker.value.position = newValue;
});

// Exposes

defineExpose({
  marker,
});

// Provide

provide(markerSymbol, marker);

// BeforeUnmount

onBeforeUnmount(() => {
  removeListeners();
  if (!marker.value) return;
  if (markerClusterer.value) {
    markerClusterer.value.removeMarker(marker.value);
  }
  marker.value.map = null;
  marker.value = null;
});
</script>
