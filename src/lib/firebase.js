import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvWzEUvesSUqMnuR2bA78LXn8bfuOyhOg",
  authDomain: "chat-app-e90d6.firebaseapp.com",
  projectId: "chat-app-e90d6",
  storageBucket: "chat-app-e90d6.appspot.com",
  messagingSenderId: "373729287390",
  appId: "1:373729287390:web:5db0cf281598249b09f64f",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
