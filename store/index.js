import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
require('firebase/database');
// import {fireDb} from '~/plugins/firebase.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
        id: "afajfjadfaadfa323",
        title: "Meetup in New York",
        date: new Date(),
        location: "New York",
        description: "New  York New York"
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg",
        id: "aadsfhbkhlk1241",
        title: "Meetup in Paris",
        date: new Date(),
        location: "Paris",
        description: "It's Paris"
      }
    ],
    user: null,
    loading: false
  },
  mutations: {
    setLoadedMeetups(state, payloadd){
       state.loadedMeetups = payloadd
    },
    createMeetup(state, payloadd) {
      state.loadedMeetups.push(payloadd);
    },
    setUser(state, payloadd) {
      state.user = payloadd;
    },
    setLoading(state, payloadd){
      state.loading = payloadd
    }
  },
  actions: {
    loadedMeetups({commit}) {
      commit('setLoading', true)
       firebase.database().ref('meetups').once('value')
       .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
       }).catch(
         (error) => {
             console.log(error)
             commit('setLoading', true)
         }
       )
    },
    createMeetup({
      commit
    }, payloadd) {
      const meetup = {
        title: payloadd.title,
        location: payloadd.location,
        imageUrl: payloadd.imageUrl,
        description: payloadd.description,
        date: payloadd.date
      }
      firebase.database().ref('meetups').push(meetup).then((data) => {
        const key = data.key
        commit('createMeetup', {
          ...meetup,
          id: key
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    signUserUp({
      commit
    }, payloadd) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payloadd.email, payloadd.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          console.log(error);
        });
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
    },
    loading (state) {
      return state.loading
    },
    user(state) {
      return state.user
    }
  }
});
