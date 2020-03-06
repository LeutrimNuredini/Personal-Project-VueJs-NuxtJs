<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card class="white mt-5">
          <v-card-title>
            <h3 style="color: #1E88E5">{{meetup.title}}</h3>
            <template v-if="true">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>
          <v-card-text>
            <h4 style="color: #FB8C00">At {{meetup.date}} - In {{meetup.location}}</h4>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup"></app-edit-meetup-time-dialog>
            </div>
            <div style="font-size: 20px; color: #1E88E5" class="mt-2">{{ meetup.description }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../../store/index";
export default {
  props: ['id'],
  computed: {
    meetup() {
      return store.getters.loadedMeetup(this.id);
    },
  }
};
</script>