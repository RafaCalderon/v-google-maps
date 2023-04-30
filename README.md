# v-google-maps

Componentes disponibles:

- [VGoogleMap](#v-google-map)
- [VGoogleCircle](#v-google-cirlce)
- [VGoogleHeatmap](#v-google-heatmap)
- [VGoogleInfoWindow](#v-google-info-window)
- [VGoogleMarker](#v-google-marker)
- [VGooglePolygon](#v-google-polygon)
- [VGooglePolyline](#v-google-polyline)
- [VGoogleRectangle](#v-google-rectangle)

# v-google-map

Propiedades:

| Nombre    | Tipo                                |
|-----------|-------------------------------------|
| `options` | `google.maps.MapOptions`            |
| `center`  | `google.maps.LatLngLiteral \| null` |
| `zoom`    | `number \| null`                    |

Eventos:

| Nombre          | Tipo                                |
|-----------------|-------------------------------------|
| `update:center` | `google.maps.LatLngLiteral \| null` |
| `update:zoom`   | `number \| null`                    |

Variables expuestas:

| Nombre | Tipo              |
|--------|-------------------|
| `map`  | `google.maps.Map` |
