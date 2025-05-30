import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUM1JjeKJhHY6PbU898FWTcnusbjVIzNM",
  authDomain: "otmqc-hub.firebaseapp.com",
  projectId: "otmqc-hub",
  storageBucket: "otmqc-hub.firebasestorage.app",
  messagingSenderId: "1049045457405",
  appId: "1:1049045457405:web:aae3c7e6d408aac945e194",
  measurementId: "G-HS19V82PYP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };