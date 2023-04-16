// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ63xmULJb3C1wtT-UKZsjU33BQRdRKZ4",
  authDomain: "react-curso-e653d.firebaseapp.com",
  projectId: "react-curso-e653d",
  storageBucket: "react-curso-e653d.appspot.com",
  messagingSenderId: "85087262944",
  appId: "1:85087262944:web:960b326dba0cabe3759885"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);