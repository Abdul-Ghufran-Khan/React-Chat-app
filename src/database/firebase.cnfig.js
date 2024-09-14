import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAml-8-OJek0JNHTZHcDBEoxOghdh1WYtQ",
    authDomain: "react-chatapp-1835e.firebaseapp.com",
    projectId: "react-chatapp-1835e",
    storageBucket: "react-chatapp-1835e.appspot.com",
    messagingSenderId: "438900519353",
    appId: "1:438900519353:web:2b63424917b2b7c4910668"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

