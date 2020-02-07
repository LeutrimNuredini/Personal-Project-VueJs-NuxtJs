import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'messaging-sender-id',
  appId: 'app-id'
}

const app = firebase.initializeApp(firebaseConfig)

export const db = app.database()