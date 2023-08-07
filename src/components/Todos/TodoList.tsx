import { useEffect, useState } from 'react';

import Todo from './Todo';
import { Box, Button, List } from '@mui/material';

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase_setup';

import './index.scss';

interface ITodo {
  todoTitle: string;
  doneByDate: { seconds: number; miliseconds: number };
  isCompleted: boolean;
  id: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<any>([]);
  const [filterIsActive, setFilterIsActive] = useState('all');

  useEffect(() => {
    const todosRef = collection(db, 'todos');
    const defaultCollectionQuery = query(
      todosRef,
      orderBy('isCompleted'),
      orderBy('doneByDate', 'asc')
    );
    const collectionQuery = defaultCollectionQuery;
    const unsubscribe = onSnapshot(collectionQuery, (querySnapshot: any) => {
      const todosArray = querySnapshot.docs.map((item: any) => ({
        id: item.id,
        ...item.data(),
      }));
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);

  const getFilteredTodos = async (queryFilters: any) => {
    const querySnapshot = await getDocs(queryFilters);
    const todosArray = querySnapshot.docs.map((item: any) => ({
      id: item.id,
      ...item.data(),
    }));
    setTodos(todosArray);
  };

  const filterTodos = async (argument: string) => {
    setFilterIsActive(argument);

    if (argument === 'completed') {
      const todosRef = collection(db, 'todos');
      const collectionQueryForCompletedTodos = query(
        todosRef,
        orderBy('doneByDate', 'asc'),
        orderBy('isCompleted'),
        where('isCompleted', '==', true)
      );
      getFilteredTodos(collectionQueryForCompletedTodos);
    }
    if (argument === 'notCompleted') {
      const todosRef = collection(db, 'todos');
      const collectionQueryForNotCompletedTodos = query(
        todosRef,
        orderBy('doneByDate', 'asc'),
        orderBy('isCompleted'),
        where('isCompleted', '==', false)
      );
      getFilteredTodos(collectionQueryForNotCompletedTodos);
    }
  };

  const getTodos = async () => {
    setFilterIsActive('all');
    const todosRef = collection(db, 'todos');
    const todosQuery = query(
      todosRef,
      orderBy('isCompleted'),
      orderBy('doneByDate', 'asc')
    );
    const querySnapshot = await getDocs(todosQuery);
    const todosArray = querySnapshot.docs.map((item: any) => ({
      id: item.id,
      ...item.data(),
    }));
    setTodos(todosArray);
  };

  return (
    <Box className='main'>
      <div className='main-filters'>
        <Button
          onClick={() => getTodos()}
          variant={filterIsActive === 'all' ? 'contained' : 'outlined'}
        >
          All
        </Button>
        <Button
          onClick={() => filterTodos('completed')}
          variant={filterIsActive === 'completed' ? 'contained' : 'outlined'}
        >
          Completed
        </Button>
        <Button
          onClick={() => filterTodos('notCompleted')}
          variant={filterIsActive === 'notCompleted' ? 'contained' : 'outlined'}
        >
          Not completed
        </Button>
      </div>
      <List className='main-list'>
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
