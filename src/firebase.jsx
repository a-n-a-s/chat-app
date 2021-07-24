import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase.initializeApp({
  apiKey: "AIzaSyDjJefvDMgxg2lwVlsqndYyZvt6ynD9k5Y",
  authDomain: "whatschat-5419f.firebaseapp.com",
  projectId: "whatschat-5419f",
  storageBucket: "whatschat-5419f.appspot.com",
  messagingSenderId: "798663763295",
  appId: "1:798663763295:web:e7774d5011ea5dfb4b82ea",
  measurementId: "G-5EXNENQSK8",
}).auth();
