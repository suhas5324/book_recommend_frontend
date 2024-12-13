// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfwwOwZ3lPTo9TbpeMvJPH1aibkXl_-Fc",
  authDomain: "book-recommend-e312d.firebaseapp.com",
  projectId: "book-recommend-e312d",
  storageBucket: "book-recommend-e312d.firebaseapp.com",  
  messagingSenderId: "951624626268",
  appId: "1:951624626268:web:dbb77efb75990e72b03699",
  measurementId: "G-YC52T2401T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);  
export default app;