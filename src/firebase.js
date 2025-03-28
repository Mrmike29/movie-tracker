// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZcX8VYM08ww8jDLC7YJcMER0Ri0L5CBs",
  authDomain: "movie-tracker030333.firebaseapp.com",
  projectId: "movie-tracker030333",
  storageBucket: "movie-tracker030333.firebasestorage.app",
  messagingSenderId: "865442648252",
  appId: "1:865442648252:web:43f270d3f6c03a773600b9",
  measurementId: "G-3WDM37Q4XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

