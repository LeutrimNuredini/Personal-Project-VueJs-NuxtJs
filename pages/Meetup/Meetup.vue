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
                  height="130px"
                  class="ml-5"
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="text-white">{{ meetup.title }}</h3>
                    <h6>{{ meetup.date }}</h6>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="/meetup/ + meetup.id">
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
export default {
  data() {
    return {
      meetups: [
        {
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
          id: "afajfjadfaadfa323",
          title: "Meetup in New York",
          date: "2018-09-17"
        },
        {
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg",
          id: "aadsfhbkhlk1241",
          title: "Meetup in Paris",
          date: "2018-09-16"
        }
      ]
    };
  }
};
</script>
