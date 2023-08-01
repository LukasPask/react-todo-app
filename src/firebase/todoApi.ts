import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  updateDoc,
} from '@firebase/firestore';
import { db } from './firebase_setup';

export const handleCreate = (newTodo: {}) => {
  const ref = collection(db, 'todos');

  addDoc(ref, newTodo);
};

export const handleDelete = async (id: string) => {
  const todoDocRef = doc(db, 'todos', id);
  await deleteDoc(todoDocRef);
};

export const handleUpdateToDone = async (id: string) => {
  const todoDocRef = doc(db, 'todos', id);
  const isTargetTodoCompleted = (await getDoc(todoDocRef)).data()?.isCompleted;
  if (isTargetTodoCompleted) {
    updateDoc(todoDocRef, { isCompleted: false });
  }
  if (!isTargetTodoCompleted) {
    updateDoc(todoDocRef, { isCompleted: true });
  }
};

export const handleUpdate = async (id: string, data: {}) => {
  const todoDocRef = doc(db, 'todos', id);
  await updateDoc(todoDocRef, { ...data });
};
