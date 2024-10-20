import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore"; // Use initializeFirestore for settings
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzwAeifp0fgsEPsWbOjWytSpcJijYIspU",
  authDomain: "e-cell-rgpv-treasure-hunt.firebaseapp.com",
  projectId: "e-cell-rgpv-treasure-hunt",
  storageBucket: "e-cell-rgpv-treasure-hunt.appspot.com",
  messagingSenderId: "614688970988",
  appId: "1:614688970988:web:0151ef76d1ef4f0609adc9",
  measurementId: "G-S0ZJR6F6ZE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom settings
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Initialize other services
export const auth = getAuth(app);
export const storage = getStorage(app);
export { db };
