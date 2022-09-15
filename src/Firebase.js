// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getStorage } from 'firebase/storage'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDjvCBXm_mC6eQRkfyfyyr3Mi_qH7LoKL8",
  authDomain: "productadmin-439f4.firebaseapp.com",
  projectId: "productadmin-439f4",
  storageBucket: "productadmin-439f4.appspot.com",
  messagingSenderId: "145943372604",
  appId: "1:145943372604:web:a9f7bf8d072af2ae103439",
  measurementId: "G-MBP3ZFDKZW"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
export { db }
export const storage = getStorage(firebaseApp)