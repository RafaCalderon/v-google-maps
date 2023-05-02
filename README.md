# v-google-maps

Para comenzar:

`main.ts`

```ts
import App from './App.vue';
import {createApp} from 'vue';

import "v-google-maps/dist/index.css";
import { useGmapLoader, vGoogleMaps } from "v-google-maps";

const {load} = useGmapLoader();

(async () => {
  await load(
    import.meta.env.VITE_API_KEY,
    ["visualization", "geometry"], // Libraries
  );
  app.use(vGoogleMaps);
  createApp(App).mount('#app');
})();
```

`App.vue`

```vue
<template>
  <VGoogleMap
    width="200px"
    height="200px"
    :options="mapOptions"
  >
    <VGoogleMarker :options="markerOptions"/>
  </VGoogleMap>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const markerOptions = computed<google.maps.MarkerOptions>(() => {
  return {
    position: {
      lat: -35.429064,
      lng: -71.656245
    }
  }
});

const mapOptions = computed<google.maps.MapOptions>(() => {
  return {
    zoom: 15,
    center: {
      lat: -35.429064,
      lng: -71.656245
    },
  }
});
</script>
```

Componentes disponibles:

- [VGoogleMap](#v-google-map)
- [VGoogleCircle](#v-google-circle)
- [VGoogleHeatmap](#v-google-heatmap)
- [VGoogleInfoWindow](#v-google-info-window)
- [VGoogleMarker](#v-google-marker)
- [VGooglePolygon](#v-google-polygon)
- [VGooglePolyline](#v-google-polyline)
- [VGoogleRectangle](#v-google-rectangle)

# v-google-map

Propiedades:

| Nombre         | Tipo                                | Requerido |
|----------------|-------------------------------------|-----------|
| `options`      | `google.maps.MapOptions`            | `true`    |
| `center`       | `google.maps.LatLngLiteral \| null` | `false`   |
| `zoom`         | `number \| null`                    | `false`   |
| `width`        | `CSS.Property.Width`                | `true`    |
| `height`       | `CSS.Property.Height`               | `true`    |
| `borderRadius` | `CSS.Property.BorderRadius`         | `false`   |

Eventos:

| Nombre          | Tipo                                |
|-----------------|-------------------------------------|
| `update:center` | `google.maps.LatLngLiteral \| null` |
| `update:zoom`   | `number \| null`                    |

Variables expuestas:

| Nombre | Tipo              |
|--------|-------------------|
| `map`  | `google.maps.Map` |

# v-google-circle

Propiedades:

| Nombre    | Tipo                                | Requerido |
|-----------|-------------------------------------|-----------|
| `options` | `google.maps.CircleOptions`         | `true`    |
| `center`  | `google.maps.LatLngLiteral \| null` | `false`   |
| `radius`  | `number \| null`                    | `false`   |

Eventos:

| Nombre          | Tipo                                |
|-----------------|-------------------------------------|
| `update:center` | `google.maps.LatLngLiteral \| null` |
| `update:radius` | `number \| null`                    |

Variables expuestas:

| Nombre   | Tipo                 |
|----------|----------------------|
| `circle` | `google.maps.Circle` |

# v-google-heatmap

Propiedades:

| Nombre    | Tipo                                            | Requerido |
|-----------|-------------------------------------------------|-----------|
| `options` | `google.maps.visualization.HeatmapLayerOptions` | `true`    |

Variables expuestas:

| Nombre    | Tipo                                     |
|-----------|------------------------------------------|
| `heatmap` | `google.maps.visualization.HeatmapLayer` |

# v-google-info-window

Propiedades:

| Nombre       | Tipo                                    | Requerido |
|--------------|-----------------------------------------|-----------|
| `options`    | `google.maps.InfoWindowOptions \| null` | `true`    |
| `modelValue` | `boolean \| null`                       | `false`   |

Eventos:

| Nombre               | Tipo              |
|----------------------|-------------------|
| `update:model-value` | `boolean \| null` |

Variables expuestas:

| Nombre       | Tipo                     |
|--------------|--------------------------|
| `infoWindow` | `google.maps.InfoWindow` |

# v-google-marker

Propiedades:

| Nombre       | Tipo                                | Requerido |
|--------------|-------------------------------------|-----------|
| `options`    | `google.maps.MarkerOptions`         | `true`    |
| `modelValue` | `google.maps.LatLngLiteral \| null` | `false`   |

Eventos:

| Nombre               | Tipo                                |
|----------------------|-------------------------------------|
| `update:model-value` | `google.maps.LatLngLiteral \| null` |

Variables expuestas:

| Nombre   | Tipo                 |
|----------|----------------------|
| `marker` | `google.maps.Marker` |

# v-google-polygon

Propiedades:

| Nombre       | Tipo                                  | Requerido |
|--------------|---------------------------------------|-----------|
| `options`    | `google.maps.PolygonOptions`          | `true`    |
| `modelValue` | `google.maps.LatLngLiteral[] \| null` | `false`   |

Eventos:

| Nombre               | Tipo                                  |
|----------------------|---------------------------------------|
| `update:model-value` | `google.maps.LatLngLiteral[] \| null` |

Variables expuestas:

| Nombre    | Tipo                  |
|-----------|-----------------------|
| `polygon` | `google.maps.Polygon` |

# v-google-polyline

Propiedades:

| Nombre       | Tipo                                  | Requerido |
|--------------|---------------------------------------|-----------|
| `options`    | `google.maps.PolylineOptions`         | `true`    |
| `modelValue` | `google.maps.LatLngLiteral[] \| null` | `false`   |

Eventos:

| Nombre               | Tipo                                  |
|----------------------|---------------------------------------|
| `update:model-value` | `google.maps.LatLngLiteral[] \| null` |

Variables expuestas:

| Nombre     | Tipo                   |
|------------|------------------------|
| `polyline` | `google.maps.Polyline` |

# v-google-rectangle

Propiedades:

| Nombre       | Tipo                                      | Requerido |
|--------------|-------------------------------------------|-----------|
| `options`    | `google.maps.RectangleOptions`            | `true`    |
| `modelValue` | `google.maps.LatLngBoundsLiteral \| null` | `false`   |

Eventos:

| Nombre               | Tipo                                      |
|----------------------|-------------------------------------------|
| `update:model-value` | `google.maps.LatLngBoundsLiteral \| null` |

Variables expuestas:

| Nombre      | Tipo                    |
|-------------|-------------------------|
| `rectangle` | `google.maps.Rectangle` |
