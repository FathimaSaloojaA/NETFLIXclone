// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyD_270-UFd04ao4SRr68u6bjnEGn_leHC8",
  authDomain: "netflixclone-f6278.firebaseapp.com",
  projectId: "netflixclone-f6278",
  storageBucket: "netflixclone-f6278.firebasestorage.app",
  messagingSenderId: "686542198059",
  appId: "1:686542198059:web:618135a7ea69f3d534216e",
  measurementId: "G-QL311CW23J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
