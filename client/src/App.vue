<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import routes from './router';

export default {
  name: 'App',

    // Configura el enrutador de la aplicación con las rutas importadas
  router: routes,

  data: () => ({
    //
  }),
};
</script>
