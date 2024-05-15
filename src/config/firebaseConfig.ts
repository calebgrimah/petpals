import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from "firebase/firestore";
import {
  getAuth
} from "firebase/auth";


//temporary impl, use environment values for production deployments.
const firebaseConfig = {
  apiKey: "AIzaSyBK4wAb5A7u87O0jGfLyVncGKtJZKIzzU8",
  authDomain: "petpals-database.firebaseapp.com",
  projectId: "petpals-database",
  storageBucket: "petpals-database.appspot.com",
  messagingSenderId: "726898989",
  appId: "1:726898989:web:47aa962965032a7f8cdba4",
  measurementId: "G-ZK2ZR0J0C9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseStorage = getStorage(app,);
export const firebaseDb = getFirestore(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
