import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
require("firebase/database");
import 'firebase/storage';
import EditMeetupDetailsDialog from '../pages/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from '../pages/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from '../pages/Meetup/Edit/EditMeetupTimeDialog.vue'

Vue.use(Vuex);
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)


export const store = new Vuex.Store({
  state: {
    loadedMeetups: [{
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
      id: "",
      title: "",
      date: "",
      location: "",
      description: ""
    }],
    user: null,
    loading: false
  },
  mutations: {
    setLoadedMeetups(state, payloadd) {
      state.loadedMeetups = payloadd;
    },
    createMeetup(state, payloadd) {
      state.loadedMeetups.push(payloadd);
    },
    updateMeetup(state, payloadd) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payloadd.id
      })
      if (payloadd.title) {
        meetup.title = payloadd.title
      }
      if (payloadd.description) {
        meetup.description = payloadd.description
      }
      if (payloadd.date) {
        meetup.date = payloadd.date
      }
    },
    setUser(state, payloadd) {
      state.user = payloadd;
    },
    setLoading(state, payloadd) {
      state.loading = payloadd;
    }
  },
  actions: {
    loadedMeetups({
      commit
    }) {
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            });
          }
          commit("setLoadedMeetups", meetups);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createMeetup({
      commit,
      getters
    }, payloadd) {
      const meetup = {
        title: payloadd.title,
        location: payloadd.location,
        description: payloadd.description,
        date: payloadd.date.toISOString()
      };
      let imageUrl;
      let key;
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = payloadd.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .put(payloadd.image);
        })
        .then(fileData => {
          let fullPath = fileData.metadata.fullPath
          return firebase.storage().ref(fullPath).getDownloadURL()
        })
        .then(fileData => {
          imageUrl = fileData
          return firebase
            .database()
            .ref("meetups")
            .child(key)
            .update({
              imageUrl: imageUrl
            });
        })
        .then(() => {
          commit("createMeetup", {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMeetupData({
      commit
    }, payloadd) {
      const updateObj = {}
      if (payloadd.title) {
        updateObj.title = payloadd.title
      }
      if (payloadd.description) {
        updateObj.description = payloadd.description
      }
      if (payloadd.date) {
        updateObj.date = payloadd.date
      }
      firebase.database().ref('meetups').child(payloadd.id).update(updateObj)
        .then(() => {
          commit('updateMeetup', payloadd)
        }).catch(error => {
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
    },

    signUserIn({
      commit
    }, payloadd) {
      firebase.auth().signInWithEmailAndPassword(payloadd.email, payloadd.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
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
    loading(state) {
      return state.loading;
    },
    user(state) {
      return state.user;
    }
  }
});
