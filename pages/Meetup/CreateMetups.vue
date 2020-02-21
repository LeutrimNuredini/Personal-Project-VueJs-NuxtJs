<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-icon
          style="position: relative; left: -60px; top:50px; font-size: 40px; color:#757575"
        >mdi-signature-text</v-icon>
        <h1 style="color: #42A5F5">Basic Info</h1>
        <p
          style="color: #212121"
        >Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
      </v-flex>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                solo
                name="title"
                label="Event Title"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary mt-4" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="200" class="mt-4" />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                solo
                name="description"
                label="Description"
                id="Description"
                v-model="description"
                class="mt-5"
                required
              ></v-textarea>
              <hr />
            </v-flex>
          </v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-icon
              style="position: relative; left: -60px; top:50px; font-size: 40px; color:#757575"
            >mdi-map-marker</v-icon>
            <h1 style="color: #42A5F5">Location</h1>
            <p
              style="color: #212121"
            >Help people in the area discover your event and let attendees know where to show up.</p>
          </v-flex>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                solo
                name="Location"
                label="Location"
                id="location"
                v-model="location"
                required
              ></v-text-field>
              <hr />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-icon
                style="position: relative; left: -60px; top:50px; font-size: 40px; color:#757575"
              >mdi-calendar-clock</v-icon>
              <h1 style="color: #42A5F5">Date and time</h1>
              <p
                style="color: #212121"
              >Tell event-goers when your event starts and ends so they can make plans to attend.</p>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date" class="mt-5"></v-date-picker>
              <v-time-picker v-model="time" class="float-right mt-5"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="mt-5" type="submit" color="#00C853">Create Meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../../store/index";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: "",
      time: "",
      image: null
    };
  },

  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },

    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours);
        date.setMinutes(this.time.getMinutes);
      }
      return date;
    }
  },

  mounted() {
    this.setupFirebase();
  },

  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loggedIn = true;
        } else {
          this.$router.push("/User/signin");
        }
      });
    },
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      };
      store.dispatch("createMeetup", meetupData);
      this.$router.push("/");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
