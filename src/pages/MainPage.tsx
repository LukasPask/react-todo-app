import React from 'react';
import { Typography } from '@mui/material';
import TodoForm from '../components/TodoForm';

const MainPage = () => {
  return (
    <div>
      <Typography
        variant='h1'
        style={{
          fontFamily: 'Satoshi Variable',
          fontSize: '4rem',
          textAlign: 'center',
          marginTop: '1rem',
          fontWeight: '600',
        }}
      >
        What will You do today?
      </Typography>
      <TodoForm />
    </div>
  );
};

export default MainPage;
