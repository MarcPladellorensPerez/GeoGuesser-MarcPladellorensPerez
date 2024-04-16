// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFL2aqLV_Mwm_OFotvkCGpz7CVjJNZ20Q",
  authDomain: "geoguessr-77356.firebaseapp.com",
  databaseURL: "https://geoguessr-77356-default-rtdb.firebaseio.com",
  projectId: "geoguessr-77356",
  storageBucket: "geoguessr-77356.appspot.com",
  messagingSenderId: "1079462837049",
  appId: "1:1079462837049:web:f630d1430445466eba46e8",
  measurementId: "G-0L4P9P98TZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Utiliza getFirestore en lugar de getAnalytics

export { db };