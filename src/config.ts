import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "tickets-96e9d",
  storageBucket: "tickets-96e9d.appspot.com",
  messagingSenderId: "713325504899",
  appId: process.env.REACT_APP_ID,
  measurementId: "G-Y7KDJME5QX",
};

export const ticketsCollection = "collection-1";
export const countersCollection = "counters";
export const docsCounterDocId = "counter-1";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);