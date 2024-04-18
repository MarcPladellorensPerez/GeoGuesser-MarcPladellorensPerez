// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX-15jeInrdyyeu0au4RFlEVGcbtUbr0A",
  authDomain: "geoguesser-marcp.firebaseapp.com",
  projectId: "geoguesser-marcp",
  storageBucket: "geoguesser-marcp.appspot.com",
  messagingSenderId: "517771862513",
  appId: "1:517771862513:web:ecf5e6321ed32567cda450",
  measurementId: "G-6TV622CNK2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Utiliza getFirestore en lugar de getAnalytics

export { db };