// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth , getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC-EickVY9htkNatAMikYNV5wJ59o2KWMA",
  authDomain: "mypedigre-b3a37.firebaseapp.com",
  projectId: "mypedigre-b3a37",
  storageBucket: "mypedigre-b3a37.firebasestorage.app",
  messagingSenderId: "22484854534",
  appId: "1:22484854534:web:83cc84c845278c8232e087",
  measurementId: "G-F4M6ZB8CSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)

});
export const db = getFirestore(app);

export default app;
