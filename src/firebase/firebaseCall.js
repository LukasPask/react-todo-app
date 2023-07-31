import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  setDoc,
} from '@firebase/firestore';
import { db } from './firebase_setup';

export const handleCreate = (todos) => {
  const ref = collection(db, 'todos');

  addDoc(ref, todos);
};

export const handleDelete = async (id) => {
  const todoDocRef = doc(db, 'todos', id);
  await deleteDoc(todoDocRef);
};

export const handleUpdateToDone = async (id) => {
  const todoDocRef = doc(db, 'todos', id);
  const isTargetTodoCompleted = (await getDoc(todoDocRef)).data().isCompleted;
  if (isTargetTodoCompleted) {
    setDoc(todoDocRef, { isCompleted: false }, { merge: true });
  }
  if (!isTargetTodoCompleted) {
    setDoc(todoDocRef, { isCompleted: true }, { merge: true });
  }
};
