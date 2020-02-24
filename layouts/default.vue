<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app class="blue">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up" />
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h3 class="mt-3">Event</h3>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only mr-5">
        <v-btn text to="/Meetup/Meetup">
          <v-icon class="mr-1">mdi-view-list</v-icon>View Events
        </v-btn>
        <v-btn text to="/Meetup/CreateMetups">
          <v-icon class="mr-1">mdi-plus</v-icon>Create Event
        </v-btn>
        <div class="text-center" v-if="loggedIn">
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on" class="mt-3">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>

            <v-list class="white" width="235px">
              <v-btn text color="black" width="235px">{{}}</v-btn>
              <v-btn text @click="logout" color="black" width="235px">
                <v-icon>mdi-logout</v-icon>Log out
              </v-btn>
            </v-list>
          </v-menu>
        </div>
        <div v-if="loggedIn"></div>
        <v-btn text to="/User/signin" v-else>
          <v-icon>mdi-lock-open-variant</v-icon>Sign in
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer class="primary" height="140">
      <h3 style="position: absolute; top: 25%" class="ml-5">Event</h3>
      <h5 style="position: absolute; left: 42%; top: 60%">&copy; 2020 Event All Rights Reserved</h5>
      <div>
        <h3 style="position: absolute; left: 83%; top: 25%">Connect With Us</h3>
        <a href="https://www.instagram.com/leutrimnnuredini/">
          <v-icon style="position: absolute; left: 84%; top: 53%">mdi-instagram</v-icon>
        </a>
        <a href="https://www.facebook.com/leutrimnuredinii">
          <v-icon style="position: absolute; left: 87%; top: 53%">mdi-facebook</v-icon>
        </a>
        <a href="https://www.facebook.com/leutrimnuredinii">
          <v-icon style="position: absolute; left: 90%; top: 53%">mdi-twitter</v-icon>
        </a>
        <a href="https://www.linkedin.com/in/leutrim-nuredini-410216199/">
          <v-icon style="position: absolute; left: 93%; top: 53%">mdi-linkedin</v-icon>
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
