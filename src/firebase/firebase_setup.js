// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUAPwG3tgXibJydAXLXsW55TcGy83AUBQ',
  authDomain: 'react-todo-1a4c7.firebaseapp.com',
  databaseURL:
    'https://react-todo-1a4c7-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-todo-1a4c7',
  storageBucket: 'react-todo-1a4c7.appspot.com',
  messagingSenderId: '937005148063',
  appId: '1:937005148063:web:c5e598bb7c0f0a1c917faa',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
