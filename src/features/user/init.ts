import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBo2qI8BxR8Nd8NEXYe34-zVwZtsmR8VEk",
    authDomain: "tickets-96e9d.firebaseapp.com",
    projectId: "tickets-96e9d",
    storageBucket: "tickets-96e9d.appspot.com",
    messagingSenderId: "713325504899",
    appId: "1:713325504899:web:b0dc60eceab1ddffe7eeb6",
    measurementId: "G-Y7KDJME5QX"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const collectionName = "collection-1";