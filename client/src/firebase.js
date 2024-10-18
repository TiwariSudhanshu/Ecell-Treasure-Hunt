// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBXUlebWPIXR5NcAN1vh7R0v-jr6dp9bhI",
  authDomain: "treasure-hunt-e95c3.firebaseapp.com",
  projectId: "treasure-hunt-e95c3",
  storageBucket: "treasure-hunt-e95c3.appspot.com",
  messagingSenderId: "658453495846",
  appId: "1:658453495846:web:64c72301bc80a6b6d526e7",
  measurementId: "G-B0HT1J0Z7E",
  databaseURL: "https://treasure-hunt-e95c3-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };
