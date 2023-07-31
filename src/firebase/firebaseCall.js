import { doc, addDoc, collection, deleteDoc } from '@firebase/firestore';
import { db } from './firebase_setup';

export const handleCreate = (todos) => {
  const ref = collection(db, 'todos');

  try {
    addDoc(ref, todos);
  } catch (err) {
    console.log(err);
  }
};

export const handleDelete = async (id) => {
  const todoDocRef = doc(db, 'todos', id);
  await deleteDoc(todoDocRef);
};
