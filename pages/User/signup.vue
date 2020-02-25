<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm5 offset-sm3>
        <v-alert type="error" v-if="error">{{ error.message }}</v-alert>
        <form @submit.prevent="onSignup" class="needs-validation" novalidate>
          <div class="form-group mt-5">
            <label style="color: #1E88E5">Email address</label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter email"
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <label style="color: #1E88E5">Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          <div class="form-group">
            <label style="color: #1E88E5">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              required
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
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

import { store } from "../../store/index";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
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
