// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJC-LpGjplZROOKeQWzkFukYOFy-yUxiw",
  authDomain: "veggiedays-1b98e.firebaseapp.com",
  databaseURL: "https://veggiedays-1b98e.firebaseio.com",
  projectId: "veggiedays-1b98e",
  storageBucket: "veggiedays-1b98e.appspot.com",
  messagingSenderId: "445329111206"
};
firebase.initializeApp(config);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const Storage = firebase.storage();
