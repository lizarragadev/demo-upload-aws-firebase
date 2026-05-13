import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfno_DdBb9cnQHHMgLlbksDJ7BSy0g3fs",
  authDomain: "firestore-date-demo.firebaseapp.com",
  projectId: "firestore-date-demo",
  storageBucket: "firestore-date-demo.firebasestorage.app",
  messagingSenderId: "155258822606",
  appId: "1:155258822606:web:7778e46da8ae2636e2959f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);