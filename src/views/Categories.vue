<template>
  <div class="home">
    <template v-for="category in categories" >
      <Card img="none" :title="category.name" :date="category.createdOn" v-bind:key="category.createdOn"/>
    </template>

    <template v-if="categories == ''">
      <v-skeleton-loader
        v-for="index in 6"
        :key="index"
        class="" tile 
        type="list-item-avatar-two-line"
        style="border-bottom:1px solid #ccc"
      ></v-skeleton-loader>
    </template>

    <v-btn class="add-btn" fab dark color="primary" @click.stop="dialog = true">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <!-- Dialogue -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="category_name" label="Category Name*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveCategory()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as fb from '../firebase'

import Card from "@/components/Card.vue"



export default {
  name: "Categories",
  components: {
    Card,
  },
  data() {
    return {
      categories:[],
      dialog: false,
      category_name: ""
    };
  },
  methods:{
    async saveCategory(){
      await fb.categoryCollection.add({
        createdOn: new Date().toString(),
        name: this.category_name
      })
      this.dialog = false;
      this.category_name="";
      this.fetchCategories();
    },
    async fetchCategories(){
      this.categories = []
      await fb.categoryCollection.get().then(docs =>{
          docs.forEach(doc => {
            this.categories.push(doc.data())
          })
      });
      console.log(this.categories)
    }
  },
  created: function () {
    this.fetchCategories();
  }
};
</script>

<style scoped>
.add-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
