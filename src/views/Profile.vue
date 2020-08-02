<template>
  <v-container class="grey lighten-5" style="height:100%;">
    <v-row class="text-center">
      <v-col cols="12">
       <v-img max-width="150px" class="mx-auto mb-3 rounded-circle elevation-4" src="../assets/avatar.png" alt="" />
       <h2>{{ $store.state.userProfile.name }}</h2>
       <p class="text--disabled"><i>Invention is the most important product of man’s creative brain. The ultimate purpose is the complete mastery of mind over the material world, the harnessing of human nature to human needs.</i></p>
       <div class="d-row">
           <v-btn color="grey lighten-5" elevation="0">
                <v-icon dark>mdi-facebook</v-icon>
            </v-btn>
            <v-btn color="grey lighten-5" elevation="0">
                <v-icon dark>mdi-twitter</v-icon>
            </v-btn>
            <v-btn color="grey lighten-5" elevation="0">
                <v-icon dark>mdi-linkedin</v-icon>
            </v-btn>
       </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Profile',

    data: () => ({
      
    }),
  }
</script>
