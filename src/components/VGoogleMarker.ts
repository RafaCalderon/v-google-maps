// Vue
import {
  ref,
  watch,
  inject,
  provide,
  markRaw,
  computed,
  defineComponent,
  onBeforeUnmount,
  type Ref,
  type PropType,
} from "vue";

// Composables
import {useGmapLoader} from "@/composables/gmapLoader";

// Utils
import equal from "fast-deep-equal";

export default defineComponent({
  name: "VGoogleMarker",
  props: {
    options: {
      required: true,
      type: Object as PropType<google.maps.MarkerOptions>,
    },
    modelValue: {
      default: null,
      type: Object as PropType<google.maps.LatLngLiteral | null>,
    },
  },
  emits: [
    "click",
    "update:model-value",
  ],
  setup(props, {emit, expose, slots}) {
    // Composables

    const {gmapApi} = useGmapLoader();

    // Injects

    const map = inject<Ref<google.maps.Map | null>>("google-map");

    // Data

    const marker = ref<google.maps.Marker | null>(null);
    let clickListener: google.maps.MapsEventListener | null = null;
    let mouseUpListener: google.maps.MapsEventListener | null = null;

    if (map?.value && gmapApi.value) {
      const options: google.maps.MarkerOptions = {
        ...props.options,
      };
      if (props.modelValue) {
        options.position = {
          ...props.modelValue,
        };
      }
      marker.value = markRaw(new gmapApi.value.maps.Marker({
        map: map.value,
        ...options,
      }));
      addListeners();
    }

    // Computed

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: google.maps.LatLngLiteral | null) {
        emit("update:model-value", value);
      },
    });

    // Methods

    function addListeners() {
      if (!marker.value) return;
      clickListener = marker.value.addListener("click", onClick);
      mouseUpListener = marker.value.addListener("mouseup", () => {
        model.value = marker.value?.getPosition()?.toJSON() ?? null;
      });
    }

    function removeListeners() {
      if (clickListener) {
        clickListener.remove();
      }
      if (mouseUpListener) {
        mouseUpListener.remove();
      }
    }

    // Emits

    function onClick(ev: google.maps.MapMouseEvent) {
      emit("click", ev);
    }

    // Watchs

    watch(() => props.options, (newValue: google.maps.MarkerOptions, oldValue: google.maps.MarkerOptions) => {
      if (!marker.value || equal(newValue, oldValue)) return;
      marker.value.setOptions(props.options);
    }, {
      deep: true,
    });

    watch(model, (newValue: google.maps.LatLngLiteral | null, oldValue: google.maps.LatLngLiteral | null) => {
      if (equal(newValue, oldValue) || !marker.value) return;
      marker.value.setPosition(newValue);
    });

    // Exposes

    expose({
      marker,
    });

    // Provide

    provide("marker", marker);

    // BeforeUnmount

    onBeforeUnmount(() => {
      removeListeners();
      if (!marker.value) return;
      marker.value.setMap(null);
      marker.value = null;
    });

    return () => slots.default?.();
  },
});
