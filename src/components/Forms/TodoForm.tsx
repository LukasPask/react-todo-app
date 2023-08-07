import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { displayNotification } from '../../helpers/Notification';

import { handleCreate } from '../../firebase/todoApi';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

import './index.scss';

const TodoForm = () => {
  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = (data: object) => {
    reset();
    const newTodoBody = {
      ...data,
      isCompleted: false,
    };
    handleCreate(newTodoBody);
    displayNotification('success', 'New todo added');
  };

  return (
    <form className='newTodoForm' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className='newTodoForm-text'
        required
        label='Todo title'
        {...register('todoTitle')}
      />
      <Controller
        name='doneByDate'
        control={control}
        defaultValue={new Date()}
        render={({ field: { onChange, value } }) => (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                minDate={dayjs(new Date())}
                className='newTodoForm-datepicker'
                label='Done by date'
                format='YYYY-MM-DD'
                value={dayjs(value)}
                onChange={(newDate: any) => onChange(newDate.$d)}
              />
            </LocalizationProvider>
          </>
        )}
      />
      <Button type='submit' variant='contained'>
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;
