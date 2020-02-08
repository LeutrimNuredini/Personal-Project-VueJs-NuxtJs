import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD7wd8aqvM56rnUQJFc-KkNwhewB8ZyuRk",
    authDomain: "meetup-project-d2b37.firebaseapp.com",
    databaseURL: "https://meetup-project-d2b37.firebaseio.com",
    projectId: "meetup-project-d2b37",
    storageBucket: "meetup-project-d2b37.appspot.com",
    messagingSenderId: "747873026374",
    appId: "1:747873026374:web:7e200cd31c139f17706547"
  };

  const app = firebase.initializeApp(firebaseConfig)

  export const db = app.database()


