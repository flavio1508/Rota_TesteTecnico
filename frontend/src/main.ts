import { createApp, h, provide } from 'vue';
import App from './App.vue';

import router from './router';

import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './apollo/client';

import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);

app.use(VueGoogleMaps, {
  load: {
    key: 'SUA_GOOGLE_MAPS_KEY',
  },
});

app.mount('#app');