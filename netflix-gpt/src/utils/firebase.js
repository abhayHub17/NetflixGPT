// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdb4prCUvDhcY0kjQN_iNwL-e8q9KR_z0",
  authDomain: "netflixgpt-d4569.firebaseapp.com",
  projectId: "netflixgpt-d4569",
  storageBucket: "netflixgpt-d4569.firebasestorage.app",
  messagingSenderId: "195960311576",
  appId: "1:195960311576:web:3ae47ebe54b7b37b04986d",
  measurementId: "G-1LJVX3PMGT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
