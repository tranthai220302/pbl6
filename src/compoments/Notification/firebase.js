
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyAA1EmaByTnhBOrFK6F1iEAszNmL9ZGnA0",
    authDomain: "notification-6c24f.firebaseapp.com",
    projectId: "notification-6c24f",
    storageBucket: "notification-6c24f.appspot.com",
    messagingSenderId: "668588298171",
    appId: "1:668588298171:web:77f3a99b4243d385fd3e9e"
  };
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);