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

  components: {
  },

  router: routes,

  data: () => ({
    //
  }),
};
</script>
