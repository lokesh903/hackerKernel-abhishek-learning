import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPrJ9AKXCeW0ADSeSgrSwHfGa1FSWrSzM",
  authDomain: "whatsapp-a202e.firebaseapp.com",
  projectId: "whatsapp-a202e",
  storageBucket: "whatsapp-a202e.appspot.com",
  messagingSenderId: "780939771725",
  appId: "1:780939771725:web:cd227229badd13d2524104",
  measurementId: "G-661N4438YK"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
