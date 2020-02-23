<template>
  <v-container>
    <v-layout row wrap class="mt-5 mb-5">
      <v-flex>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          class="mb-5"
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <h1 class="display-3 ml-5" style="position: relative; top: 160px">
              Made for those who do
            </h1>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="container ml-5">
      <h1 style="color: black" class="ml-3 mt-5">Popular Online</h1>
      <h1 style="color: #1976D2" class="ml-2 mt-5">Events</h1>
    </v-layout>
    <v-layout row wrap class="ml-5">
      <v-card
        width="400"
        class="mt-5 mb-5 white ml-5"
        v-for="meetup in meetups"
        :key="meetup.id"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          :src="meetup.imageUrl"
          @click="onLoadMeetup(meetup.id)"
        ></v-img>

        <v-card-subtitle class="pb-0" style="color: #FB8C00">{{
          meetup.date
        }}</v-card-subtitle>

        <v-card-text class="text--primary mt-2">
          <div style="color: #03A9F4" class="description">
            {{ meetup.description }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :to="/meetup/ + meetup.id" color="primary" text>Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
    <div class="text-center" v-if="meetups.length > 3">
      <v-btn
        color="primary"
        width="250"
        class="mt-5 mb-5"
        to="/Meetup/Meetup"
        outlined
        large
        >See more</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import { store } from "../store/index";

export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  },

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
.description {
  font-size: 22px;
}
</style>
