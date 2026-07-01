import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
import Routes from '../pages/Routes.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/routes', component: Routes },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});