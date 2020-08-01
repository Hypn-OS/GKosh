<template>
  <v-card to="single" class="mx-auto border-bottom" flat rounded="0">
    <v-list-item>
      <v-list-item-avatar tile size="40">
          <img
                :src="require(`../assets/icons/${img}`)"
              >
      </v-list-item-avatar>

      <v-list-item-content>
          <div class="d-flex justify-space-between">
            <v-chip x-small class="d-inline-block" color="purple lighten-5" text-color="purple lighten-1" style="flex:unset;">
                <div class="caption">{{ category }}</div>
            </v-chip>
            <div class="date caption text--disabled">{{date}}</div>
          </div>
        <v-list-item-title class="h3 body-2 mb-1">{{ title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props:["img","category","title", "date"],
  data: () => ({
    
  }),
};
</script>