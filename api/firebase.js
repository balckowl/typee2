import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB8YvjHmK3Kmqf4cYTNxcoTJRUSpEZuBTo",
    authDomain: "typee2.firebaseapp.com",
    projectId: "typee2",
    storageBucket: "typee2.appspot.com",
    messagingSenderId: "743880465094",
    appId: "1:743880465094:web:9b05b9e28224e2757e55c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider }