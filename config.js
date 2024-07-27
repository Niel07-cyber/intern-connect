import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXGZ76S3tDXdKB38LiDqApZnF0zSZVwuw",
  authDomain: "internconnect-c39a4.firebaseapp.com",
  projectId: "internconnect-c39a4",
  storageBucket: "internconnect-c39a4.appspot.com",
  messagingSenderId: "854765235240",
  appId: "1:854765235240:web:bda8ce3a7bd908507ad91d",
  measurementId: "G-TSP9JY3KQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Auth: ", auth);
console.log("DB: ", db);

export { auth, db };
