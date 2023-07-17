import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCPAvioUhaByhjFUo_iX0MkDKPEj5DBRlE",
  authDomain: "chromascape.firebaseapp.com",
  projectId: "chromascape",
  storageBucket: "chromascape.appspot.com",
  messagingSenderId: "174426700982",
  appId: "1:174426700982:web:0cd3a1300ce1b78b787a17",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

