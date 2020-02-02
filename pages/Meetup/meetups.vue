<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="primary">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg"
                  height="130px"
                  class="ml-5"
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="text-white">My Meetup</h3>
                    <h6>17th July 2020</h6>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat to="/Meetup/Meetup">
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
