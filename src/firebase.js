import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBgXKjSSIVAdu8uaNmt9y5q1af7_X7cmRE",
  authDomain: "videocall-da0a9.firebaseapp.com",
  projectId: "videocall-da0a9",
  storageBucket: "videocall-da0a9.appspot.com",
  messagingSenderId: "628536250665",
  appId: "1:628536250665:web:fe6802da3d6594cd6ce738",
  measurementId: "G-M8V4K89R1K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
