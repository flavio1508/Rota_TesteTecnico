<template>
  <div class="container">
    <h1>RouterMini</h1>

    <input v-model="origin" placeholder="Origem" />
    <input v-model="destination" placeholder="Destino" />

    <button @click="calculate">Calcular rota</button>
    <button @click="save">Salvar rota</button>

    <div v-if="route">
      <h3>Resumo</h3>
      <p>Distância: {{ route.distance }} km</p>
      <p>Duração: {{ route.duration }} min</p>

      <RouteMap
        :origin="mapOrigin"
        :destination="mapDestination"
        :coordinates="mapCoordinates"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMutation } from '@vue/apollo-composable';

import RouteMap from '../components/RouteMap.vue';

import {
  CALCULATE_ROUTE,
  SAVE_ROUTE,
} from '../graphql/route';

const origin = ref('');
const destination = ref('');
const route = ref<any>(null);

const { mutate: calc } = useMutation(CALCULATE_ROUTE);
const { mutate: save } = useMutation(SAVE_ROUTE);

async function calculate() {
  const res = await calc({
    input: {
      origin: origin.value,
      destination: destination.value,
    },
  });

  route.value = res?.data?.calculateRoute;
}

async function saveRoute() {
  await save({
    input: {
      origin: origin.value,
      destination: destination.value,
    },
  });

  alert('Rota salva com sucesso!');
}

function save() {
  saveRoute();
}

const mapOrigin = computed(() => ({
  lat: route.value?.coordinates?.[0]?.latitude || 0,
  lng: route.value?.coordinates?.[0]?.longitude || 0,
}));

const mapDestination = computed(() => {
  const coords = route.value?.coordinates || [];
  return {
    lat: coords[coords.length - 1]?.latitude || 0,
    lng: coords[coords.length - 1]?.longitude || 0,
  };
});

const mapCoordinates = computed(() =>
  (route.value?.coordinates || []).map((c: any) => ({
    lat: c.latitude,
    lng: c.longitude,
  })),
);
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 10px;
}
button {
  padding: 10px;
  cursor: pointer;
}
</style>