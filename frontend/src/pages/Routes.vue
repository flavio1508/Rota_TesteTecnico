<template>
  <div>
    <h1>Rotas salvas</h1>

    <ul>
      <li v-for="r in routes" :key="r.id">
        {{ r.origin }} → {{ r.destination }}
        ({{ r.distance }} km)
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_ROUTES } from '../graphql/route';

const routes = ref<any[]>([]);

const { result } = useQuery(GET_ROUTES);

onMounted(() => {
  if (result.value) {
    routes.value = result.value.routes;
  }
});
</script>