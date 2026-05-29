import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"

import { getFirestore } from "firebase/firestore"

const firebaseConfig = {

  apiKey: "AIzaSyBMrwt7e1Kvy8_4fVnkN9Z0nAjWvLLiMj8",

  authDomain: "qurylys-market.firebaseapp.com",

  projectId: "qurylys-market",

  storageBucket: "qurylys-market.firebasestorage.app",

  messagingSenderId: "417713003994",

  appId: "1:417713003994:web:2671ad39b863313b9b34e3",

  measurementId: "G-E2SX23R5FK",

}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)