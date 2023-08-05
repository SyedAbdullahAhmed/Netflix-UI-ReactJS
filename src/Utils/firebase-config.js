import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCO8Vt92vLjeBWv9H5WDVZnaAb_Hhm1rCM",
  authDomain: "react-netflix-clone-f7ddf.firebaseapp.com",
  projectId: "react-netflix-clone-f7ddf",
  storageBucket: "react-netflix-clone-f7ddf.appspot.com",
  messagingSenderId: "170273194693",
  appId: "1:170273194693:web:62a478397717f6fb7866ac",
  measurementId: "G-6CQ95YXSSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);