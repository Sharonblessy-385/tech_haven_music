// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdc8N-7ILHsFXiQgaRlL3xqstcW9u7-ys",
  authDomain: "tech-haven-music-382-8acdd.firebaseapp.com",
  projectId: "tech-haven-music-382-8acdd",
  storageBucket: "tech-haven-music-382-8acdd.firebasestorage.app",
  messagingSenderId: "619368935422",
  appId: "1:619368935422:web:61f87ec39452b9c8a45aaf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp);
export let __DB = getFirestore(firebaseApp);