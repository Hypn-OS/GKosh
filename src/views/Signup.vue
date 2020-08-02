<template>
  <v-container class>
    <v-row>
      <v-col cols="12">
        <v-img max-width="60%" class="mx-auto mb-4" src="../assets/logo.png" alt />

        <div class="px-2 mb-4">
          <p class="mb-2">Create your account</p>
          <v-col cols="12 pa-0">
            <v-text-field v-model.trim="signupForm.name" type="text" dense label="Name" outlined></v-text-field>
            <v-text-field v-model.trim="signupForm.email" type="email" dense label="Email" outlined></v-text-field>
            <v-text-field v-model.trim="signupForm.password" type="password" dense label="Password" outlined></v-text-field>
            <v-btn @click="signup()" block color="primary">Sign Up</v-btn>
          </v-col>
        </div>
        <div class="text-center pt-3">
            <p class="mb-3">Or sign up with:</p>
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
            <p class="mb-3">Already have an account?<br><v-btn text small to="login" color="primary">Log In</v-btn></p>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      signupForm: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
      signup() {
        this.$store.dispatch('signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name
        })
      }
    }
};
</script>
