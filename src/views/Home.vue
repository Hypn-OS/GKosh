<template>
  <div class="home">
    <!-- <v-btn large block color="primary" @click="getBlob">Submit</v-btn> -->
    <template v-if="articles == ''">
      <v-skeleton-loader
        v-for="index in 6"
        :key="index"
        class="" tile 
        type="list-item-avatar-two-line"
        style="border-bottom:1px solid #ccc"
      ></v-skeleton-loader>
    </template>

    <Card v-for="article in articles" v-bind:key="article.dateStamp"
      :doc="article"
      :img="setImg(article)"
      :title="article.title"
      :date="article.dateStamp"
      :category="article.category"
    />
    <!-- <Card
      img="jpg.svg"
      title="Your Immune System and the Coronavirus"
      date="11/12/2020"
      category="Health"
    />
    <Card img="pdf.svg" title="Unlock 3.0 in Bengaluru" date="11/12/2020" category="News" />
    <Card
      img="doc.svg"
      title="Virtual feeding: Posting food photos"
      date="11/12/2020"
      category="Food"
    />
    <Card
      img="png.svg"
      title="Multiprocessing for Data Scientists"
      date="11/12/2020"
      category="Tech"
    />
    <Card
      img="jpg.svg"
      title="Your Immune System and the Coronavirus"
      date="11/12/2020"
      category="Health"
    />
    <Card img="pdf.svg" title="Unlock 3.0 in Bengaluru" date="11/12/2020" category="News" />
    <Card
      img="doc.svg"
      title="Virtual feeding: Posting food photos"
      date="11/12/2020"
      category="Food"
    />
    <Card
      img="png.svg"
      title="Multiprocessing for Data Scientists"
      date="11/12/2020"
      category="Tech"
    />
    <Card
      img="jpg.svg"
      title="Your Immune System and the Coronavirus"
      date="11/12/2020"
      category="Health"
    />
    <Card img="pdf.svg" title="Unlock 3.0 in Bengaluru" date="11/12/2020" category="News" />
    <Card
      img="doc.svg"
      title="Virtual feeding: Posting food photos"
      date="11/12/2020"
      category="Food"
    /> -->

    <v-btn class="add-btn" fab dark color="primary" @click.stop="sheet = true">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>Add</v-subheader>
        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          @click="dialog = true; formArticle.type=tile.type"
        >
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <img :src="require(`../assets/icons/${tile.img}`)" :alt="tile.title" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>

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
          <div v-if="loading" class="text-center my-5">
            <v-progress-circular
              size="70"
              width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-form v-if="!loading" ref="form" v-model="valid">
            <v-text-field
              outlined
              v-model="formArticle.title"
              :rules="[v => !!v || 'Title is required']"
              label="Title"
              required
            ></v-text-field>

            <v-text-field
              v-if="formArticle.type == 'link'"
              outlined
              v-model="formArticle.link"
              :rules="[v => !!v || 'Link is required']"
              label="Link"
              required
            ></v-text-field>

            <v-textarea
              v-if="formArticle.type == 'note'"
              rows="6"
              outlined
              v-model="formArticle.note"
              :rules="[v => !!v || 'Note is required']"
              label="Note"
              required
            ></v-textarea>

            <v-select
              outlined
              v-model="formArticle.category"
              :items="categories"
              :rules="[v => !!v || 'Category is required']"
              label="Category"
              required
            ></v-select>

            <v-file-input
              v-if="formArticle.type == 'photo' || formArticle.type == 'doc'"
              outlined
              prepend-icon="mdi-image"
              multiple
              :rules="[v => !!v || 'Link is required']"
              :label="`Select ${formArticle.type}`"
              required
              @change="onFilePicked"
            ></v-file-input>

            <img
              class="mx-auto"
              v-if="doc.type == 'image/png' | 'image/jpg' | 'image/jpeg'"
              :src="doc.docUrl"
              style="max-width:60%"
            />

            <Video v-if="formArticle.type == 'video'" />

            <v-btn large block color="primary" @click="saveArticle">Submit</v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as fb from "../firebase";
import Card from "@/components/Card.vue";
import Video from "../components/Video"

export default {
  name: "Home",
  components: {
    Card,Video,
  },
  data() {
    return {
      loading:false,
      articles: [],
      formArticle: {
        title: "",
        category: "",
        type: "",
        link: "",
        note: "",
      },
      doc: {
        docName:"",
        docData: "",
        docUrl: "",
        type: "",
      },
      categories: [],
      valid: true,
      sheet: false,
      dialog: false,
      tiles: [
        { img: "link.svg", title: "Link", type: "link" },
        { img: "txt.svg", title: "Note", type: "note" },
        { img: "jpg.svg", title: "Photo", type: "photo" },
        { img: "paperclip.svg", title: "Document", type: "doc" },
        { img: "paperclip.svg", title: "Video", type: "video" },
      ],
    };
  },
  methods: {
    onFilePicked(event) {
      var files = event;
      var filename = files[0].name;

      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }

      var fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.doc.docUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.doc.docData = files[0];
      this.doc.type = files[0].type;
      this.doc.docName = files[0].name;
    },
    async saveArticle() {
      await this.getBlob()
      this.loading = true
      var articleObj = {
        title: this.formArticle.title,
        category: this.formArticle.category,
        type: this.formArticle.type,
        link: this.formArticle.link,
        note: this.formArticle.note,
        doc: {
          docName:this.doc.docName,
          docUrl: this.doc.docUrl,
          type: this.doc.type,
        },
        dateStamp: new Date().toString(),
      };

      
      if (this.doc.docData != '') {
        fb.storage
          .ref().child("docs/" + this.doc.docName)
          .put(this.doc.docData)
          .then(()=> {
            return fb.storage
              .ref().child("docs/" + this.doc.docName)
              .getDownloadURL();
          })
          .then((url) => {
            articleObj.doc.docUrl = url;
            return fb.articleCollection.add(articleObj);
          })
          .then( (data) => {
            this.loading = false
            this.sheet = false
            this.dialog = false
            this.resetArticleObject()
            this.fetchArticles()
            
            
          })
          .catch( (error) => {
            this.loading = false;
            console.log(error);
          });
      } else{
          
          fb.articleCollection.add(articleObj)
          .then( (data) => {
            this.loading = false
            this.sheet = false
            this.dialog = false
            this.resetArticleObject()
            this.fetchArticles()
            
            
          })
          .catch( (error) => {
            this.loading = false;
            console.log(error);
          });
      }
    },
    async fetchArticles() {
      this.articles = [];
      await fb.articleCollection.get().then((docs) => {
        docs.forEach((doc) => {
          this.articles.push(doc.data());
        });
      });
      
    },
    async fetchCategories(){
      this.categories = []
      await fb.categoryCollection.get().then(docs =>{
          docs.forEach(doc => {
            this.categories.push(doc.data().name)
          })
      });
      
    },
    resetArticleObject(){
      this.formArticle.title = '';
      this.formArticle.category = '';
      this.formArticle.type = '';
      this.formArticle.link = '';
      this.formArticle.note = '';
      this.doc.docName = '';
      this.doc.docData = '';
      this.doc.docUrl = '';
      this.doc.type = '';
    },
    setImg(article){
      
      if(article.type == 'photo'){
        if (article.doc.type == 'image/png') {
          return 'png.svg'
        }else if(article.doc.type == 'image/jpg'){
          return 'jpg.svg'
        }else if(article.doc.type == 'image/jpeg'){
          return 'jpg.svg'
        }
      }else if (article.type == 'link') {
        return 'link.svg'
      }else if (article.type == 'note') {
        return 'txt.svg'
      }else if (article.type == 'doc') {
        if (article.doc.type == 'application/pdf') {
          return 'pdf.svg'
        }else if(article.doc.type == 'application/msword'){
          return 'doc.svg'
        }else if(article.doc.type == 'application/vnd.openxmlformats-officedocument.wordprocessing'){
          return 'doc.svg'
        }
      }else if (article.type == 'video') {
        return 'paperclip.svg'
      }

      return 'png.svg'
    },
    async checkDuplicate(){
      let query = ''
      if (this.formArticle.type == 'link') {
        query = await fb.articleCollection.where("link", "==", this.formArticle.link)
      }else if(this.doc.docData != ''){
        query = await fb.articleCollection.where("doc.docName", "==", this.doc.docName)
      }

      query
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              
              return 'exists'
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    },
    async getBlob(){
      if (document.querySelector('.download_links a')) {
        var fileName = document.querySelector('.download_links a').getAttribute('download')
        var blobUrl = document.querySelector('.download_links a').href
        let blob = await fetch(blobUrl).then(r => r.blob());
        console.log(blob)
        this.doc.docData = blob
        this.doc.type = 'video/mp4'
        this.doc.docName= fileName
        // return blob
      }
    }
  },
  created: function () {
    this.fetchArticles();
    this.fetchCategories();
  },
};
</script>

<style scoped>
.add-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
