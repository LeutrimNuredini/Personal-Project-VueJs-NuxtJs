import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
        id: "afajfjadfaadfa323",
        title: "Meetup in New York",
        date: new Date(),
        location: 'New York',
        description: 'New  York New York'
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg",
        id: "aadsfhbkhlk1241",
        title: "Meetup in Paris",
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris'
      }
    ],
    user: {
      id: "ajaldsfsd12",
      registeredMeetups: ["aadsfhbkhlk1241"]
    }
  },
  mutations: {
    createMeetup(state, payloadd) {
      state.loadedMeetups.push(payloadd)
    }
  },
  actions: {
    createMeetup({
      commit
    }, payloadd) {
      const meetup = {
        title: payloadd.title,
        location: payloadd.location,
        imageUrl: payloadd.imageUrl,
        description: payloadd.description,
        date: payloadd.date,
        id: 'fdsfsdfsdf12'
      }
      commit('createMeetup', meetup)
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups: state => {
      return state.loadedMeetups;
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    }
  }
});
