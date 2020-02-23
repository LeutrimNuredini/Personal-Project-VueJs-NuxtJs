<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm5 offset-sm3>
        <v-alert type="error" v-if="error">{{ error.message }}</v-alert>
        <form @submit.prevent="login">
          <div class="form-group mt-5">
            <label style="color: #1E88E5">Email address</label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label style="color: #1E88E5">Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <button sm5 type="submit" class="btn btn-primary btn-lg btn-block">
            Sign In
          </button>
        </form>
        <h3 class="text-center mt-5" style="color: #616161">
          Or
        </h3>
        <v-btn
          type="submit"
          to="/User/signup"
          color="#00C853"
          class="col-12 mt-2"
        >
          Create Account
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rules: [
        value => !!value || "Email is Required.",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      ]
    };
  },

  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    }
  },

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.$router.push("/");
        })
        .catch(error => (this.error = error));
    }
  }
};
</script>
