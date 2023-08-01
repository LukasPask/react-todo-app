import { Typography } from '@mui/material';
import TodoForm from '../components/Forms/TodoForm';
import TodoList from '../components/Todos/TodoList';

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
      <TodoList />
    </div>
  );
};

export default MainPage;
