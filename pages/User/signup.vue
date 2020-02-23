<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm5 offset-sm3>
        <v-alert type="error" v-if="error">{{ error.message }}</v-alert>
        <form @submit.prevent="onSignup">
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
          <div class="form-group">
            <label style="color: #1E88E5">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              v-model="confirmPassword"
            />
          </div>
          <button sm5 type="submit" class="btn btn-primary btn-lg btn-block">
            Sign Up
          </button>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../../store/index";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      emailRegex: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$",
      password: "",
      confirmPassword: "",
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
    onSignup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.$router.push("/");
        })
        .catch(error => (this.error = error));
    }
  }
};
</script>
