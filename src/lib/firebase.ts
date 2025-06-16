import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAljKjNfalEpp8UlqPYmvRx87tTRueCvOE",
  authDomain: "pinbox-25f6d.firebaseapp.com",
  projectId: "pinbox-25f6d",
  storageBucket: "pinbox-25f6d.firebasestorage.app",
  messagingSenderId: "950933468062",
  appId: "1:950933468062:web:66e2aa04bfe50cec7bdc8f"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };