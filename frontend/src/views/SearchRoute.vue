<template>

<div>

<h2>

Buscar viagens

</h2>

<input
v-model="plate"
placeholder="Digite a placa"
/>

<button
@click="search"
>

Buscar

</button>

<div
v-for="route in routes"
:key="route.id"
>

<h3>

{{route.origin}}

→

{{route.destination}}

</h3>

<p>

{{route.vehicle.plate}}

</p>

<p>

{{route.vehicle.brand}}

{{route.vehicle.model}}

</p>

</div>

</div>

</template>

<script setup lang="ts">

import { ref } from 'vue';

import { useLazyQuery } from '@vue/apollo-composable';

import { FIND_BY_PLATE } from '../graphql/route';

const plate = ref('');

const routes = ref([]);

const { load } = useLazyQuery(
FIND_BY_PLATE
);

const search = async()=>{

const result =
await load({

plate:plate.value

});

routes.value =
result.data.findRoutesByPlate;

};

</script>