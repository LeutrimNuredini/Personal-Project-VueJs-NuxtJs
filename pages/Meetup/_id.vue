<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <h6 class="primary--text" style="font-size: 25px">{{meetup.title}}</h6>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>
          <v-card-text>
            <div class="info--text">At {{meetup.date}} - In {{meetup.location}}</div>
            <div style="font-size: 20px">{{ meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../../store/index";
export default {
  props: ["id"],
  computed: {
    meetup() {
      return store.getters.loadedMeetup(this.id);
    }
  }
};
</script>