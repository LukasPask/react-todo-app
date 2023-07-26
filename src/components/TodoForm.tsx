import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoForm = () => {
  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = (data: object) => {
    reset();
    const newTodoBody = {
      ...data,
      isCompleted: false,
      id: uuidv4(),
    };
    const todosFromLocalStorage =
      JSON.parse(localStorage.getItem('todos')!) ?? [];
    localStorage.setItem(
      'todos',
      JSON.stringify([...todosFromLocalStorage, newTodoBody])
    );
    toast.success('Todo added successfully', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField required label='Todo title' {...register('todoTitle')} />
      <Controller
        name='todoDate'
        control={control}
        defaultValue={new Date()}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            showTimeSelect
            timeFormat='p'
            timeIntervals={15}
            dateFormat='yyyy-MM-dd h:mm aa'
            selected={value}
            onChange={(date) => onChange(date)}
            dropdownMode='select'
          />
        )}
      />
      <Button type='submit' variant='contained'>
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;
