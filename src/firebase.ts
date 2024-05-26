// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxnJdLMYrESRBNPBm7-UFsE9NCCJtzH9U",
  authDomain: "ecobazar-c9bab.firebaseapp.com",
  projectId: "ecobazar-c9bab",
  storageBucket: "ecobazar-c9bab.appspot.com",
  messagingSenderId: "55441272467",
  appId: "1:55441272467:web:25a56c5729d97e5ce5a766",
  databaseURL:
    "https://ecobazar-c9bab-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
