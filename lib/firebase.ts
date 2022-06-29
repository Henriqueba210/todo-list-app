// Import the functions you need from the SDKs you need
import exp from "constants";
import {
  initializeApp,
  getApps,
  FirebaseApp,
  FirebaseOptions,
  getApp,
} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAghT8c1YlevQdd9kFDOqKaMk9pahLrxQ8",
  authDomain: "next-todo-list-app.firebaseapp.com",
  projectId: "next-todo-list-app",
  storageBucket: "next-todo-list-app.appspot.com",
  messagingSenderId: "326668828825",
  appId: "1:326668828825:web:008d754e6cbd3f15357808",
  measurementId: "G-95XDYRCGJC",
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

// Initialize Firebase
const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
