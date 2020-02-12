import * as firebase from "firebase/app";
import "firebase/auth";
import { store } from "../store/index";


const firebaseConfig = {
  apiKey: "AIzaSyD7wd8aqvM56rnUQJFc-KkNwhewB8ZyuRk",
  authDomain: "meetup-project-d2b37.firebaseapp.com",
  databaseURL: "https://meetup-project-d2b37.firebaseio.com",
  projectId: "meetup-project-d2b37",
  storageBucket: "meetup-project-d2b37.appspot.com",
  messagingSenderId: "747873026374",
  appId: "1:747873026374:web:7e200cd31c139f17706547"
};

let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

store.dispatch('loadedMeetups')

export default firebase;