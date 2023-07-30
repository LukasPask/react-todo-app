import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase/firebase_setup';
interface ITodo {
  todoTitle: string;
  doneByDate: string;
  isCompleted: boolean;
  id: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const getTodos = () => {
    const collectionQuery = query(collection(firestore, 'todos'));
    onSnapshot(collectionQuery, (querySnapshot) => {
      const todosArray = querySnapshot.docs.map(
        (item: any) => item.data().todos
      );
      setTodos(todosArray);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <>
      <div></div>
      {todos.map(({ todoTitle, doneByDate, isCompleted, id }: ITodo) => (
        <Todo
          key={id}
          todoTitle={todoTitle}
          doneByDate={doneByDate}
          isTodoCompleted={isCompleted}
        />
      ))}
    </>
  );
};

export default TodoList;
