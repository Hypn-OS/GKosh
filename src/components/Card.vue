<template>
  <div>
    <v-card @click="dialog = true;" class="mx-auto border-bottom" flat rounded="0">
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

    <!-- dialog -->
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar light color="white" elevation="1" class="mb-3 rounded-0">
            <v-btn icon light @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Article</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="pa-3">
            <v-container class="pa-0 container">
                <!-- <iframe
                src="http://africau.edu/images/default/sample.pdf" 
                frameborder="0"
                allowfullscreen
                ></iframe> -->

                <iframe
                    v-if="doc.type == 'doc'"
                    :src="`${doc.doc.docUrl}`" 
                    frameborder="0"
                    allowfullscreen
                ></iframe>

                <iframe
                    v-if="doc.type == 'link'"
                    :src="`${doc.link}`" 
                    frameborder="0"
                    allowfullscreen
                    SAMEORIGIN
                ></iframe>

                <!-- <iframe
                    v-if="doc.type == 'video'"
                    :src="`${doc.doc.docUrl}`" 
                    frameborder="0"
                    allowfullscreen
                    SAMEORIGIN
                ></iframe> -->

                <VueCoreVideoPlayer v-if="doc.type == 'video'" :src="`${doc.doc.docUrl}`" ></VueCoreVideoPlayer>

                <video  v-if="doc.type == 'video'" id="player" playsinline controls data-poster="/path/to/poster.jpg">
                  <source :src="`${doc.doc.docUrl}`" type="video/mp4" />
                </video>
                
                <v-row v-if="doc.type == 'photo'">
                    <v-col cols="12">
                        <v-img :src="doc.doc.docUrl"></v-img>
                    </v-col>
                </v-row>
                
                <v-row v-if="doc.type == 'note'">
                    <v-col cols="12">
                        <h2 class="mb-3 text-center">{{doc.title}}</h2>
                        <p class="caption grey--text text-center mb-4">{{ doc.dateStamp | moment("calendar", "July 10 2011")}}</p>
                        <div class="">{{doc.note}}</div>
                    </v-col>
                </v-row>


            </v-container>
          </div>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
import VueCoreVideoPlayer from 'vue-core-video-player';

export default {
  name: "Card",
  props:["doc","img","category","title", "date"],
  data: () => ({
      dialog: false,
  }),
  components: {
    VueCoreVideoPlayer
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }
      
      let date = val.toDate()
      return moment(date).fromNow()
    }
  },
};
</script>


<style scoped>
    iframe{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    video, canvas {
      width: 100%;
      max-height: calc(100% - 8px);
      position: unset;
      top:0;
      left:0;
  }

</style>