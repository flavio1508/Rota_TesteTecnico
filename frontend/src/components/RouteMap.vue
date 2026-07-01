<template>
  <GMapMap
    :center="center"
    :zoom="12"
    style="width: 100%; height: 500px"
  >
    <GMapMarker :position="origin" />
    <GMapMarker :position="destination" />

    <GMapPolyline
      :path="coordinates"
      :options="{
        strokeColor: '#2563eb',
        strokeWeight: 5,
      }"
    />
  </GMapMap>
</template>

<script setup lang="ts">
defineProps<{
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  coordinates: { lat: number; lng: number }[];
}>();

const center = { lat: -20.4697, lng: -54.6201 }; // Campo Grande padrão
</script>