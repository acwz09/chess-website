// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAnyBGYwsSZka5bVa4QmVl7AUIbKcMXOvI",
  authDomain: "ichess-cfb5b.firebaseapp.com",
  projectId: "ichess-cfb5b",
  storageBucket: "ichess-cfb5b.firebasestorage.app",
  messagingSenderId: "596678676157",
  appId: "1:596678676157:web:eae32743a255a360d431d4",
  measurementId: "G-JPPPX22D2L"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }