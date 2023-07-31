import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/firebase_setup';
import { Box, Button, List } from '@mui/material';
interface ITodo {
  todoTitle: string;
  doneByDate: { seconds: number; miliseconds: number };
  isCompleted: boolean;
  id: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const getTodos = async () => {
    const todosRef = collection(db, 'todos');
    const collectionQuery = query(todosRef, orderBy('doneByDate', 'asc'));
    onSnapshot(collectionQuery, (querySnapshot) => {
      const todosArray = querySnapshot.docs.map((item: any) => ({
        id: item.id,
        ...item.data(),
      }));
      setTodos(todosArray);
    });
  };

  const filterTodos = async () => {
    const todosRef = collection(db, 'todos');
    const q = query(todosRef, where('isCompleted', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '25rem',
        }}
      >
        <Button variant='contained'>All</Button>
        <Button onClick={() => filterTodos()} variant='contained'>
          Completed
        </Button>
        <Button variant='contained'>Not completed</Button>
      </div>
      <List
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '50vw',
        }}
      >
        {todos.map(({ todoTitle, doneByDate, isCompleted, id }: ITodo) => (
          <Todo
            key={id}
            id={id}
            todoTitle={todoTitle}
            doneByDate={doneByDate}
            isTodoCompleted={isCompleted}
          />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
