import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { displayNotification } from '../helpers/Notification';
import { handleCreate } from '../firebase/firebaseCall';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

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
    <form
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '2rem auto',
        maxWidth: '38.3125rem',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        sx={{ backgroundColor: 'white' }}
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
                sx={{ backgroundColor: 'white' }}
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
