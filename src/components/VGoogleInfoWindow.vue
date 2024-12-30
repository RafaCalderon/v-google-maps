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
  markRaw,
  computed,
  nextTick,
  useSlots,
  onMounted,
  onBeforeUnmount,
} from "vue";

// Deep equal
import equal from "fast-deep-equal";

// Composables
import { useGoogleMapsLoader } from "@/composables/googleMapsLoader";

// Symbols
import { mapSymbol, markerSymbol } from "@/shared/symbols";

// Definitions

interface Props {
  options?: google.maps.InfoWindowOptions | null;
}

const props = withDefaults(defineProps<Props>(), {
  options: null,
});

const model = defineModel<boolean>({
  default: false,
  required: false,
});

// Composables

const slots = useSlots();
const { maps } = useGoogleMapsLoader();

// Injects

const map = inject(mapSymbol, ref(null));
const marker = inject(markerSymbol, ref(null));

// Data

const opened = ref(false);
const contentRef = ref<HTMLElement>();
const infoWindow = ref<google.maps.InfoWindow | null>(null);
let closeClickListener: google.maps.MapsEventListener | null = null;
let markerClickListener: google.maps.MapsEventListener | null = null;

// Mounted

onMounted(async () => {
  if (maps.value) {
    infoWindow.value = markRaw(
      new maps.value.InfoWindow({
        ...props.options,
        content:
          defaultSlot.value && !slotIsComment.value ? contentRef.value : props.options?.content,
      }),
    );
    await nextTick();
    addListeners();
    if (model.value) toggle();
  }
});

// Computed

const defaultSlot = computed(() => {
  return slots.default?.({})?.[0] ?? null;
});

const slotIsComment = computed(() => {
  return defaultSlot.value?.type === Comment;
});

// Methods

function addListeners() {
  if (!marker.value || !infoWindow.value) return;
  markerClickListener = marker.value.addListener("click", toggle);
  closeClickListener = infoWindow.value.addListener("closeclick", toggle);
}

function removeListeners() {
  markerClickListener?.remove();
  closeClickListener?.remove();
}

function toggle() {
  if (!infoWindow.value || !map.value) return;
  opened.value = !opened.value;
  if (opened.value) {
    infoWindow.value.open({
      map: map.value,
      anchor: marker.value,
    });
  } else {
    infoWindow.value.close();
  }
  model.value = opened.value;
}

// Watchs

watch(
  () => props.options,
  (
    newValue: google.maps.InfoWindowOptions | null,
    oldValue: google.maps.InfoWindowOptions | null,
  ) => {
    if (!infoWindow.value || equal(newValue, oldValue)) return;
    infoWindow.value.setOptions(props.options);
  },
  {
    deep: true,
  },
);

watch(model, (newValue: boolean | null) => {
  if (newValue === null || newValue === opened.value) return;
  toggle();
});

// Exposes

defineExpose({
  infoWindow,
});

// BeforeUnmount

onBeforeUnmount(() => {
  removeListeners();
  if (!infoWindow.value) return;
  infoWindow.value.close();
  infoWindow.value = null;
});
</script>
