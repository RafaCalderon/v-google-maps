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
  getCurrentInstance,
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
  modelValue?: google.maps.LatLngLiteral | google.maps.LatLng | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: undefined,
});

const emit = defineEmits<{
  (e: "click", event: google.maps.MapMouseEvent): void;
  (e: "update:model-value", value: google.maps.LatLngLiteral | google.maps.LatLng | null): void;
}>();

// Composables

const slots = useSlots();
const { markers } = useGoogleMapsLoader();

// Injects

const map = inject(mapSymbol, ref(null));
const markerClusterer = inject(markerClustererSymbol, ref(null));

// Data

const vm = getCurrentInstance();
const contentRef = ref<HTMLElement>();
const internalModelValue = ref(props.modelValue);
let clickListener: google.maps.MapsEventListener | null = null;
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
        position: props.modelValue ?? props.options?.position,
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
  return slots.default?.({})?.[0] ?? null;
});

const slotIsComment = computed(() => {
  return defaultSlot.value?.type === Comment;
});

const slotIsInfoWindow = computed(() => {
  return defaultSlot.value?.type === VGoogleInfoWindow;
});

// Methods

function addListeners() {
  removeListeners();
  if (!marker.value) return;
  const vmProps = vm?.vnode?.props;
  if (vmProps?.["onUpdate:modelValue"]) {
    dragendListener = marker.value.addListener("dragend", (event: google.maps.MapMouseEvent) => {
      const center = event.latLng?.toJSON();
      if (!center) return;
      internalModelValue.value = { ...center };
      emit("update:model-value", internalModelValue.value);
    });
  }
  if (vmProps?.onClick) {
    clickListener = marker.value.addListener("click", (event: google.maps.MapMouseEvent) => {
      emit("click", event);
    });
  }
}

function removeListeners() {
  clickListener?.remove();
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

watch(
  () => props.modelValue,
  (value) => {
    if (!marker.value || equal(value, internalModelValue.value)) return;
    marker.value.position = value;
  },
);

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
