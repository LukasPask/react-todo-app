import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
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
  const [todos, setTodos] = useState<any>([]);

  const getTodos = async (customQuery: any) => {
    const todosRef = collection(db, 'todos');
    const defaultCollectionQuery = query(
      todosRef,
      orderBy('doneByDate', 'asc')
    );
    const collectionQuery = customQuery ?? defaultCollectionQuery;
    onSnapshot(collectionQuery, (querySnapshot: any) => {
      const todosArray = querySnapshot.docs.map((item: any) => ({
        id: item.id,
        ...item.data(),
      }));
      setTodos(todosArray);
    });
  };

  const getFilteredTodos = async (argument: string) => {
    if (argument === 'completed') {
      const todosRef = collection(db, 'todos');
      const collectionQueryForCompletedTodos = query(
        todosRef,
        orderBy('doneByDate', 'asc'),
        orderBy('isCompleted'),
        where('isCompleted', '==', true)
      );
      getTodos(collectionQueryForCompletedTodos);
    }
    if (argument === 'notCompleted') {
      const todosRef = collection(db, 'todos');
      const collectionQueryForNotCompletedTodos = query(
        todosRef,
        orderBy('doneByDate', 'asc'),
        orderBy('isCompleted'),
        where('isCompleted', '==', false)
      );
      getTodos(collectionQueryForNotCompletedTodos);
    }
  };

  useEffect(() => {
    getTodos(null);
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
        <Button onClick={() => getTodos(null)} variant='contained'>
          All
        </Button>
        <Button
          onClick={() => getFilteredTodos('completed')}
          variant='contained'
        >
          Completed
        </Button>
        <Button
          onClick={() => getFilteredTodos('notCompleted')}
          variant='contained'
        >
          Not completed
        </Button>
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
