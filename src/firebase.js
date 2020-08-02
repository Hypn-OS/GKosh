import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyDD4waRhXJuvqpvkigCb04m21411rGlMb0",
    authDomain: "gkosh-5a6ec.firebaseapp.com",
    databaseURL: "https://gkosh-5a6ec.firebaseio.com",
    projectId: "gkosh-5a6ec",
    storageBucket: "gkosh-5a6ec.appspot.com",
    messagingSenderId: "924930626483",
    appId: "1:924930626483:web:579d191a83f71f5cecf1c6"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

const usersCollection = db.collection('users')
const categoryCollection = db.collection('categories')
const articleCollection = db.collection('articles')
// export utils/refs
export {
  db,
  auth,
  usersCollection,
  categoryCollection,
  articleCollection,
  storage
}