<template>
  <div
    v-if="hasSlotContent"
    class="v-google-info-window__container"
  >
    <div ref="infoWindowRef">
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
  useSlots,
  onMounted,
  onBeforeUnmount,
  type PropType,
} from "vue";

// Composables
import { useGmapLoader } from "@/composables/gmapLoader";

// Utils
import equal from "fast-deep-equal";
import { mapSymbol, markerSymbol } from "@/shared/symbols";

// Definiciones

const props = defineProps({
  options: {
    default: null,
    type: Object as PropType<google.maps.InfoWindowOptions | null>,
  },
  modelValue: {
    type: Boolean,
    default: null,
  },
});

const emits = defineEmits(["click", "update:model-value"]);

// Composables

const slots = useSlots();
const { gmapApi } = useGmapLoader();

// Injects

const map = inject(mapSymbol, ref(null));
const marker = inject(markerSymbol, ref(null));

// Mounted

onMounted(() => {
  if (gmapApi.value) {
    infoWindow.value = markRaw(
      new gmapApi.value.maps.InfoWindow({
        ...props.options,
        content: hasSlotContent.value ? infoWindowRef.value : props.options?.content,
      }),
    );
    addListeners();
    if (model.value) toggle();
  }
});

// Data

const opened = ref(false);
const infoWindowRef = ref<HTMLElement>();
const infoWindow = ref<google.maps.InfoWindow | null>(null);
let closeClickListener: google.maps.MapsEventListener | null = null;
let markerClickListener: google.maps.MapsEventListener | null = null;

// Computed

const hasSlotContent = computed(() => slots.default?.().some((vnode) => vnode.type !== Comment));

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean | null) {
    emits("update:model-value", value);
  },
});

// Methods

function addListeners() {
  if (!marker.value || !infoWindow.value) return;
  markerClickListener = marker.value.addListener("click", toggle);
  closeClickListener = infoWindow.value.addListener("closeclick", toggle);
}

function removeListeners() {
  if (markerClickListener) {
    markerClickListener.remove();
  }
  if (closeClickListener) {
    closeClickListener.remove();
  }
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

<style scoped>
.v-google-info-window__container {
  display: none;
}
</style>
