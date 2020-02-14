<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="primary mt-5" v-for="meetup in meetups" :key="meetup.id">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img
                  :src="meetup.imageUrl"
                  height="200"
                  class="ml-5"
                ></v-img>
              </v-flex>
              <v-flex xs2 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="text-white">{{ meetup.title }}</h3>
                    <h6>{{ meetup.date }}</h6>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn :to="/meetup/ + meetup.id">
                    <v-icon left light>mdi-arrow-right-thick</v-icon>View Meetup
                  </v-btn>
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
