<template>
  <v-card :to="{ name: 'Single', query: { title: title }}" class="mx-auto border-bottom" flat rounded="0">
    <v-list-item>
      <v-list-item-avatar v-if="img != 'none'" tile size="40">
          <img :src="require(`../assets/icons/${img}`)" >
      </v-list-item-avatar>

      <v-list-item-avatar v-if="img == 'none'" tile size="40" color="indigo lighten-5">
        <span class="indigo--text text--lighten-2 headline">{{ title.charAt(0) }}</span>
      </v-list-item-avatar>

      <v-list-item-content>
          <div class="d-flex justify-space-between">
            <v-chip v-if="category" x-small class="d-inline-block" color="grey lighten-4" text-color="grey" style="flex:unset;">
                <div class="caption">{{ category }}</div>
            </v-chip>
            <div class="date caption text--disabled">{{ date | moment("calendar", "July 10 2011")}}</div>
          </div>
        <v-list-item-title class="h3 body-2 mb-1">{{ title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props:["img","category","title", "date"],
  data: () => ({
    
  }),
  filters: {
    formatDate(val) {
      if (!val) { return '-' }
      
      let date = val.toDate()
      return moment(date).fromNow()
    }
  },
};
</script>