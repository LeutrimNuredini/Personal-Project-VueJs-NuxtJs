<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" style="top: 70px; position: relative">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <nav class="navbar fixed-top shadow bg-white rounded" style="background-color:#2196f3!important">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up" />
      <router-link to="/" tag="span" style="cursor: pointer">
        <h4 class="mt-3 ml-5">Event</h4>
      </router-link>
      <div class="hidden-xs-only float-left">
        <router-link to="/Meetup/Meetup" tag="span" style="cursor: pointer" class="mr-5">
          <v-icon class="mr-1">mdi-view-list</v-icon>View Events
        </router-link>
        <router-link to="/Meetup/CreateMetups" tag="span" style="cursor: pointer" class="mr-5">
          <v-icon class="mr-1">mdi-plus</v-icon>Create Event
        </router-link>
        <v-menu open-on-hover offset-y v-if="loggedIn">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" class="mr-5">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list class="white" width="235px">
            <v-btn text @click="logout" color="black" width="235px">
              <v-icon>mdi-logout</v-icon>Log out
            </v-btn>
          </v-list>
        </v-menu>
        <router-link tag="span" style="cursor: pointer" to="/User/signin" class="mr-5" v-else>
          <v-icon class="mr-1">mdi-lock-open-variant</v-icon>Sign in
        </router-link>
      </div>
    </nav>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer class="primary" height="100" style="top: 100px; position: relative">
      <h5 style="position: absolute; top: 40%" class="ml-5">&copy; 2020 Event All Rights Reserved</h5>
      <div>
        <a href="https://www.instagram.com/leutrimnnuredini/">
          <v-icon style="position: absolute; left: 84%; top: 40%">mdi-instagram</v-icon>
        </a>
        <a href="https://www.facebook.com/leutrimnuredinii">
          <v-icon style="position: absolute; left: 87%; top: 40%">mdi-facebook</v-icon>
        </a>
        <a href="https://www.facebook.com/leutrimnuredinii">
          <v-icon style="position: absolute; left: 90%; top: 40%">mdi-twitter</v-icon>
        </a>
        <a href="https://www.linkedin.com/in/leutrim-nuredini-410216199/">
          <v-icon style="position: absolute; left: 93%; top: 40%">mdi-linkedin</v-icon>
        </a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { store } from "../store/index";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  mounted() {
    this.setupFirebase();
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      loggedIn: false,
      items: [
        {
          icon: "mdi-view-list",
          title: "View Event",
          to: "/Meetup/Meetup"
        },
        {
          icon: "mdi-plus",
          title: "Create Event",
          to: "/Meetup/CreateMetups"
        },
        {
          icon: "mdi-face",
          title: "Sign up",
          to: "/User/signup"
        },
        {
          icon: "mdi-lock-open-variant",
          title: "Sign in",
          to: "/User/signin"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
    };
  },

  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/User/signin");
        });
    }
  }
};
</script>
