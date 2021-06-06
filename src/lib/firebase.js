import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

import { seedDatabase } from '../seed'

const config = {
    apiKey: "AIzaSyCMwpNLS5nHsT37ZzBKsqfY6j0akT4TH4Y",
    authDomain: "teachagram-5cc25.firebaseapp.com",
    projectId: "teachagram-5cc25",
    storageBucket: "teachagram-5cc25.appspot.com",
    messagingSenderId: "98505055008",
    appId: "1:98505055008:web:b6ce764d40c81b8fc55545"
}

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const firebaseStorage = Firebase.storage();

// Create initial User Database
// seedDatabase(firebase);

export { firebase, FieldValue, firebaseStorage };