<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Header from './components/Header'

export default {
  name: 'App',

  components: {
    HelloWorld,
    Header
  },

  data: () => ({
    
  }),
};
</script>
