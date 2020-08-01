import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
            primary: '#6200ee',
            secondary: colors.grey.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
          },
          dark: {
            primary: colors.blue.lighten3,
          },
      },
    },
  })
  
  export default vuetify

// $color-primary: #1580bc;
// $color-secondary: #6b4bc4;
// $color-accent: #202124;
// $color-light: #f8f8f8;

// $blue:    #1580bc;
// $blue-light:    #e9e9ee;
// $indigo:  #2f61d5;
// $indigo-light:  #eaeffa;
// $purple:  #6b4bc4;
// $purple-light:  #f1ebfd;
// $red:     #ff7052;
// $red-light:     #fff0ed;
// $orange:  #fd7e14;
// $orange-light:  #fff0ed;
// $yellow:  #ffc800;
// $yellow-light:  #fff9e5;
// $green:   #2dc76d;
// $green-light:   #e9f9f0;
// $teal:    #3fb6dc;
// $teal-light:    #ebf7fb;
// $gray-600: #868697;
// $gray-600-light: #f1f1f4;
