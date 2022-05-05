// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFS1lce1OtoFq3qPwujfIwo-bSj_mtLNM",
  authDomain: "deliverpoll.firebaseapp.com",
  projectId: "deliverpoll",
  storageBucket: "deliverpoll.appspot.com",
  messagingSenderId: "567704089912",
  appId: "1:567704089912:web:2a57da6e20247f80d8bdcd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
