<template>
    <v-container class="pa-0 container">
        <!-- <iframe
         src="https://docs.google.com/gview?url=http://africau.edu/images/default/sample.pdf&embedded=true" 
         frameborder="0"
        allowfullscreen
        ></iframe> -->
        <iframe
         src="http://africau.edu/images/default/sample.pdf" 
         frameborder="0"
        allowfullscreen
        ></iframe>
    </v-container>
</template>

<script>
export default {
  name: "Single",

  data: () => ({
    
  }),
};
</script>

<style scoped>
    iframe{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
</style>