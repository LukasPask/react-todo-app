import { Typography } from '@mui/material';
import TodoForm from '../components/Forms/TodoForm';
import TodoList from '../components/Todos/TodoList';
import './index.scss';

const MainPage = () => {
  return (
    <div>
      <Typography variant='h1' className='mainTitle'>
        What will You do today?
      </Typography>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default MainPage;
