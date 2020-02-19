<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card class="blue mt-5">
          <v-card-title>
            <h3>{{meetup.title}}</h3>
            <template v-if="true">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>
          <v-card-text>
            <h4>At {{meetup.date}} - In {{meetup.location}}</h4>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup"></app-edit-meetup-time-dialog>
            </div>
            <div style="font-size: 20px">{{ meetup.description }}</div>
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