import React from 'react';

interface ITodo {
  todoTitle: string;
  doneByDate: string;
  isTodoCompleted: boolean;
}

const Todo = ({ todoTitle, doneByDate, isTodoCompleted }: ITodo) => {
  return <div>{todoTitle}</div>;
};

export default Todo;
