<template>
  <div class="container">
    <h1>RouterMini</h1>

    <input
      v-model="origin"
      placeholder="Origem"
    />

    <input
      v-model="destination"
      placeholder="Destino"
    />

    <button @click="calculate">
      Calcular rota
    </button>

    <button
      @click="showVehicleModal = true"
      :disabled="!route"
    >
      Salvar
    </button>

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

    <!-- MODAL -->
    <div
      v-if="showVehicleModal"
      class="modal-overlay"
    >
      <div class="modal">

        <h2>Dados do veículo</h2>

        <input
          v-model="plate"
          placeholder="Placa"
        />

        <input
          v-model="brand"
          placeholder="Marca"
        />

        <input
          v-model="model"
          placeholder="Modelo"
        />

        <div class="buttons">

          <button @click="showVehicleModal = false">
            Cancelar
          </button>

          <button @click="saveRoute">
            Confirmar
          </button>

        </div>

      </div>
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

const showVehicleModal = ref(false);

const plate = ref('');
const brand = ref('');
const model = ref('');

const { mutate: calculateMutation } =
  useMutation(CALCULATE_ROUTE);

const { mutate: saveMutation } =
  useMutation(SAVE_ROUTE);

async function calculate() {

  const result = await calculateMutation({

    input: {

      origin: origin.value,

      destination: destination.value,

    },

  });

  route.value =
    result?.data?.calculateRoute;

}

async function saveRoute() {

  await saveMutation({

    input: {

      origin: origin.value,

      destination: destination.value,

      distance: route.value.distance,

      duration: route.value.duration,

      encodedPolyline:
        route.value.encodedPolyline,

      path: route.value.coordinates.map(
        (c: any) =>
          `${c.longitude} ${c.latitude}`,
      ),

      plate: plate.value,

      brand: brand.value,

      model: model.value,

    },

  });

  alert('Rota salva com sucesso!');

  showVehicleModal.value = false;

}

const mapOrigin = computed(() => ({
  lat: route.value?.coordinates?.[0]?.latitude ?? 0,
  lng: route.value?.coordinates?.[0]?.longitude ?? 0,
}));

const mapDestination = computed(() => {

  const coordinates =
    route.value?.coordinates ?? [];

  if (!coordinates.length) {

    return {
      lat: 0,
      lng: 0,
    };

  }

  const last =
    coordinates[coordinates.length - 1];

  return {

    lat: last.latitude,

    lng: last.longitude,

  };

});

const mapCoordinates = computed(() =>
  (route.value?.coordinates ?? []).map(
    (coordinate: any) => ({
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    }),
  ),
);
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 12px;
  font-size: 16px;
}

button {
  padding: 12px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 420px;
  background: white;
  border-radius: 10px;
  padding: 25px;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>