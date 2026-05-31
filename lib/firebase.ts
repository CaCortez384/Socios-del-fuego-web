// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0r1-i6ixsMM5CKNZePP3_5tdWvIN08mA",
  authDomain: "socios-del-fuego.firebaseapp.com",
  projectId: "socios-del-fuego",
  storageBucket: "socios-del-fuego.firebasestorage.app",
  messagingSenderId: "944971952910",
  appId: "1:944971952910:web:037d5af070c86168595d5f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { app };
