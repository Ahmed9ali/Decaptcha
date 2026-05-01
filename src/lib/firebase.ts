/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Corrected the API Key typo
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBH7yGCStUQHZiqJQFC7Rx7B97RHxq5heo", 
  
  // Added the missing 'h' in captchacashhd
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "captchacashhd.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://captchacashhd-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "captchacashhd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "captchacashhd.firebasestorage.app",
  
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "210283712329",
  
  // Corrected the App ID typo
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:210283712329:web:5e5df3430508dd77f3d498"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
