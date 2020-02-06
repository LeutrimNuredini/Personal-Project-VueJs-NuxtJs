import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyD7wd8aqvM56rnUQJFc-KkNwhewB8ZyuRk',
  authDomain: 'meetup-project.firebaseapp.com',
  databaseURL: 'https://meetup-project.firebaseio.com',
  projectId: 'meetup-project-d2b37',
}

const app = firebase.initializeApp(firebaseConfig)

export const db = app.database()
