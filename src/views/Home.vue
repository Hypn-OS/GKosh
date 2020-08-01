<template>
  <div class="home">
    <Card img="png.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" date="11/12/2020" category="Tech" />
    <v-divider></v-divider>
    <Card img="jpg.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />
    <v-divider></v-divider>
    <Card img="pdf.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />
    <v-divider></v-divider>
    <Card img="doc.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />
    <v-divider></v-divider>
    <Card img="txt.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />
    <v-divider></v-divider>
    <Card img="png.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />
    <v-divider></v-divider>
    <Card img="txt.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />
    <v-divider></v-divider>
    <Card img="png.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />
    <v-divider></v-divider>
    <Card img="doc.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />
    <v-divider></v-divider>
    <Card img="pdf.svg" title="Lorem Ipsum doler imit kdjfdl xcjck" />

    <v-btn class="add-btn" fab dark color="primary" @click.stop="sheet = true">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>



    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>Add </v-subheader>
        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="require(`../assets/icons/${tile.img}`)"
                :alt="tile.title"
              >
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>


  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      sheet: false,
      tiles: [
        { img: 'link.svg', title: 'Link' },
        { img: 'txt.svg', title: 'Note' },
        { img: 'jpg.svg', title: 'Photo' },
        { img: 'paperclip.svg', title: 'Document' },
      ],
    }
  },
}
</script>

<style scoped>
.add-btn{
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
