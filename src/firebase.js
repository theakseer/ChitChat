// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "akseerjs.firebaseapp.com",
    databaseURL: "https://akseerjs.firebaseio.com",
    projectId: "akseerjs",
    storageBucket: "akseerjs.appspot.com",
    messagingSenderId: "198290575938",
    appId: "1:198290575938:web:8df50575cb141a3c5453db"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth= getAuth(app);
export const db = getFirestore(app);



