<template>
  <v-container>
    <v-layout row wrap class="mt-5 mb-5">
      <v-flex>
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover class="mb-5">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)"
          >
            <h1 class="title text-center">{{ meetup.title }}</h1>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="ml-1">
      <h1 style="color: black">Popular Online</h1>
      <h1 style="color: #1976D2" class="ml-2">Events</h1>
    </v-layout>
    <v-layout row wrap>
      <v-card max-width="350" class="mt-5 white ml-5" v-for="meetup in meetups" :key="meetup.id">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="meetup.imageUrl"
          @click="onLoadMeetup(meetup.id)"
        ></v-img>

        <v-card-subtitle class="pb-0" style="color: #FB8C00">{{ meetup.date }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div style="color: black">{{ meetup.description }}</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :to="/meetup/ + meetup.id" color="primary" text>Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../store/index";

export default {
  middleware: "authenticated",
  computed: {
    meetups() {
      return store.state.loadedMeetups;
    }
  },

  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetup/" + id);
    }
  }
};
</script>

<style scoped>
.title {
  color: white;
  font-size: 65px;
  position: relative;
  top: 175px;
}
</style>
