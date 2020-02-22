<template>
  <v-dialog  width="450px" persistent v-model="registerDialog">
    <template v-slot:activator="{ on }">
      <v-btn
        primary
        accent
        slot="activator"
        v-on="on"
        color="#0D8547"
      >{{ userIsRegistered ? 'Unregister' : 'Register' }}</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
            <v-card-title v-else>Register for Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darken-1" @click="registerDialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { store } from "../../../store/index";

export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    userIsRegistered() {
     
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        store.dispatch("unregisterUserFromMeetup", this.meetupId);
      } else {
        store.dispatch("registerUserForMeetup", this.meetupId);
      }
    }
  }
};
</script>