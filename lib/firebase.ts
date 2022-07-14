// Import the functions you need from the SDKs you need
import exp from "constants";
import {
  initializeApp,
  getApps,
  FirebaseApp,
  FirebaseOptions,
  getApp,
} from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  collection,
  DocumentSnapshot,
  getDocs,
  getFirestore,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
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
export const fromMilis = Timestamp.fromMillis;
export const serverTimestamp = Timestamp.now;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username: string) {
  const usersRef = collection(firestore, "users");
  const queryDoc = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = (await getDocs(queryDoc)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export function getCurrentUser(auth: Auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}