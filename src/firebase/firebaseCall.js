import { addDoc, collection } from '@firebase/firestore';
import { firestore } from './firebase_setup';

const firebaseSubmit = (todos) => {
  const ref = collection(firestore, 'todos'); // Firebase creates this automatically

  let data = {
    todos: todos,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export default firebaseSubmit;
