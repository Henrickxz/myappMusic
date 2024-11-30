import {initializeApp} from "firebase/app";
import{getFirestore}from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig ={
    apiKey: "AIzaSyCsW75fGXrAvc_buuF2KcbIm7aIXOPRvQk",
  authDomain: "myappmusic-a4458.firebaseapp.com",
  projectId: "myappmusic-a4458",
  storageBucket: "myappmusic-a4458.firebasestorage.app",
  messagingSenderId: "770389700240",
  appId: "1:770389700240:web:7efd978251a7fe7d3b7215"
}

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app); 
export { signInWithEmailAndPassword, onAuthStateChanged };