<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar class="dark">
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">My Meetup</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <div v-if="loggedIn">
            <v-btn text to="/Meetup/Meetup" v-if="loggedIn">View Meetups</v-btn>
            <v-btn text v-if="loggedIn">Organize Meetup</v-btn>
            <v-btn text v-if="loggedIn">Profile</v-btn>
          </div>
          <div v-else>
            <v-btn text to="/User/signup">Sign up</v-btn>
            <v-btn text to="/User/signin">Sign in</v-btn>
          </div>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer style="height: 150px">
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { store } from "../store/index";
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      loggedIn: false,
      items:[
        {
          icon: "mdi-account-supervisor-outline",
          title: "View Meetups",
          to: "/Meetup/Meetup"
        },
        {
          icon: "mdi-map-marker",
          title: "Organize Meetup",
          to: "/Meetup/CreateMetups"
        },
        {
          icon: "mdi-account ",
          title: "Profile",
          to: "/User/profile"
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
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
     }
    }
}
</script>
