<template>
  <v-container>
    <v-layout row wrap class="mt-5">
      sdf
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title text-center">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../store/index";

export default {
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
  font-size: 2em;
  padding: 20px;
  position: relative;
  top: 378px;
}
</style>
