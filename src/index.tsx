import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom"; 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

import App from './App';
import { store } from './app/store';


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

const auth = getAuth(app);
const db = getFirestore(app);

export const FireContext = React.createContext({ auth, db });


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <FireContext.Provider value={{ auth, db }}>
        <App />
      </FireContext.Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);