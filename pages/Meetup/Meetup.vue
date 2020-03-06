<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs9>
        <v-card class="white mt-5" v-for="meetup in meetups" :key="meetup.id" style="top: 90px; position: relative">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img :src="meetup.imageUrl" height="150" class="ml-5"></v-img>
              </v-flex>
              <v-flex xs2 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 style="color: #03A9F4">{{ meetup.title }}</h3>
                    <h6 style="color: #FB8C00">{{ meetup.date }}</h6>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <router-link :to="/meetup/ + meetup.id" tag="span" style="cursor: pointer">
                  <v-btn class="info">
                    <v-icon left lights>mdi-arrow-right-thick</v-icon>View
                    Meetup
                  </v-btn>
                  </router-link>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../../store/index";

export default {
  computed: {
    meetups() {
      return store.getters.loadedMeetups;
    }
  }
};
</script>
