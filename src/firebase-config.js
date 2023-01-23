import {initializeApp } from 'firebase/app'
// initialize firebase

import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAe7IFhbdssQuk19d0w8efDDqbuN30vOTk",
    authDomain: "todoer-tjsm.firebaseapp.com",
    projectId: "todoer-tjsm",
    storageBucket: "todoer-tjsm.appspot.com",
    messagingSenderId: "745140377276",
    appId: "1:745140377276:web:84c3bb1399bd6bb41fa2b9"
 }; 




export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);