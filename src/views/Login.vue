<template>
  <v-container class>
    <v-row>
      <v-col cols="12">
        <v-img max-width="60%" class="mx-auto mb-4" src="../assets/logo.png" alt />

        <div class="px-2 mb-4">
          <p class="mb-2">Login to your account</p>
          <v-col cols="12 pa-0">
            <v-text-field dense v-model.trim="loginForm.email" type="email" label="Email" outlined></v-text-field>
            <v-text-field dense v-model.trim="loginForm.password" type="password" label="Password" outlined></v-text-field>
            <v-btn @click="login()" block color="primary">Login</v-btn>
          </v-col>
        </div>
        <div class="text-center pt-3">
            <p class="mb-3">Or sign in with:</p>
            <div class="d-flex align-items-center justify-center mb-5">
                <v-btn color="white" elevation="2" class="mr-2">
                    <v-icon dark>mdi-facebook</v-icon>
                </v-btn>
                <v-btn color="white" elevation="2" class="mr-2">
                    <v-icon dark>mdi-twitter</v-icon>
                </v-btn>
                <v-btn color="white" elevation="2">
                    <v-icon dark>mdi-linkedin</v-icon>
                </v-btn>
            </div>
            <p class="mb-3">Don't have an account?<br><v-btn text small to="signup" color="primary">Sign Up</v-btn></p>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
        login() {
            this.$store.dispatch('login', {
            email: this.loginForm.email,
            password: this.loginForm.password
            })
        }
    }
};
</script>
