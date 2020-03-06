<template>
  <v-container>
    <v-layout row style="top: 80px; position: relative">
      <v-flex xs12 sm6 offset-sm3>
        <v-icon
          style="position: relative; left: -60px; top:47px; font-size: 40px; color:#757575"
          >mdi-signature-text</v-icon
        >
        <h2 style="color: #42A5F5">Basic Info</h2>
        <p style="color: #212121">
          Name your event and tell event-goers why they should come. Add details
          that highlight what makes it unique.
        </p>
      </v-flex>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  v-model="title"
                />
              </div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary mt-4" @click="onPickFile">
                <v-icon class="mr-2">mdi-folder-image</v-icon>Upload Image
              </v-btn>
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
              <div class="form-group">
                <textarea
                  type="text"
                  class="form-control mt-5"
                  placeholder="Description"
                  v-model="description"
                  rows="5"
                ></textarea>
              </div>
              <hr />
            </v-flex>
          </v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-icon
              style="position: relative; left: -60px; top:47px; font-size: 40px; color:#757575"
              >mdi-map-marker</v-icon
            >
            <h2 style="color: #42A5F5">Location</h2>
            <p style="color: #212121">
              Help people in the area discover your event and let attendees know
              where to show up.
            </p>
          </v-flex>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location"
                  v-model="location"
                />
              </div>
              <hr />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-icon
                style="position: relative; left: -60px; top:47px; font-size: 40px; color:#757575"
                >mdi-calendar-clock</v-icon
              >
              <h2 style="color: #42A5F5">Date and time</h2>
              <p style="color: #212121">
                Tell event-goers when your event starts and ends so they can
                make plans to attend.
              </p>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker
                v-model="date"
                class="mt-5"
                color="blue lighten-1" header-color="primary" body-color="white"
              ></v-date-picker>
              <v-time-picker
                v-model="time"
                class="float-right mt-5"
                color="white" header-color="primary" body-color="white" style="background-color: white"
              ></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <button class="mt-5 btn btn-success" type="submit">
                Create Meetup
              </button>
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
