// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXrp7PrC_JQlZhLRsbRk1p1F6zJj-cP9w",
    authDomain: "book-my-resource-6d610.firebaseapp.com",
    projectId: "book-my-resource-6d610",
    storageBucket: "book-my-resource-6d610.appspot.com",
    messagingSenderId: "576589961871",
    appId: "1:576589961871:web:5edaba82962246b9baeefa",
    measurementId: "G-RPSLE6MZVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)

export const doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
