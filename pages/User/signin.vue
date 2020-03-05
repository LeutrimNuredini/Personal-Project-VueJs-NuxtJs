<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm5 offset-sm3>
        <v-alert type="error" v-if="error">{{ error.message }}</v-alert>
        <form @submit.prevent="login" class="needs-validation" novalidate>
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
          <button sm5 type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
        </form>
        <v-layout row wrap class="mt-5">
          <p style="color: #424242" class="ml-3 mt-5">Dont't have an account?</p>
          <router-link
            to="/User/signup"
            tag="span"
            style="cursor: pointer"
            class="mt-3 btn btn-link"
          >
            <h5>Sign up</h5>
          </router-link>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
(function() {
  "use strict";
  window.addEventListener(
    "load",
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          "submit",
          function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      emailRegex: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$",
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
      if (this.email == "") {
        return "email is required";
      } else {
        return "";
      }
      if (this.email !== this.emailRegex) {
        return "email is invalid";
      } else {
        return "";
      }
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
