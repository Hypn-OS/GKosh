<template>
  <div>
    <v-app-bar app color="white" elevation="3">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="black"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <h2 class="h3">GKosh</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="white">
      <v-list dense class="white">
        <template v-for="(item, i) in items">
          <v-divider v-if="item.divider" :key="i" dark class="my-4"></v-divider>
          <v-list-item v-else :key="i" link :to="item.path">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="black--text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-home-outline", text: "Home", path:'/' },
      { icon: "mdi-format-list-bulleted-square", text: "Categories", path:'categories' },
      { icon: "mdi-face", text: "Profile", path:'profile' },
      { icon: "mdi-information-outline", text: "About", path:'about' },
      { divider: true },
    ],
  }),
};
</script>
