import * as firebase from 'firebase'
let database
export const init = () => {
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyB0g6P9u0M3k-gO5E3oxjjHlnqRIwK85Nw",
    authDomain: "groupr-9399b.firebaseapp.com",
    databaseURL: "https://groupr-9399b.firebaseio.com",
    projectId: "groupr-9399b",
    storageBucket: "groupr-9399b.appspot.com",
    messagingSenderId: "580456477433"
  };
  firebase.initializeApp(config);
  database = firebase.database()
}
