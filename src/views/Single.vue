<template>
    <v-container class="pa-0 container">
        <!-- <iframe
         src="http://africau.edu/images/default/sample.pdf" 
         frameborder="0"
        allowfullscreen
        ></iframe> -->

        <iframe
            v-if="article.type == 'doc'"
            :src="`https://docs.google.com/gview?url=${article.doc.docUrl}&embedded=true`" 
            frameborder="0"
            allowfullscreen
        ></iframe>
        
        <v-row>
            <v-col cols="12">
                <v-img :src="article.doc.docUrl"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import * as fb from "../firebase";

export default {
  name: "Single",
  props:["article"],

  data: () => ({
    
  }),
  methods: {
    //   getArticle(){
    //       fb.articleCollection.where("title", "==", 'Ayush Bhardwaj')
    //       .get().then(function(doc) {
    //           console.log( doc)
    //         if (doc.exists) {
    //             this.article = doc.data();
    //             console.log("Document data:", doc.data());
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //         }).catch(function(error) {
    //             console.log("Error getting document:", error);
    //         });
    //     }
  },
  created: function () {
    // this.getArticle();
  },
};
</script>

<style scoped>
    iframe{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
</style>