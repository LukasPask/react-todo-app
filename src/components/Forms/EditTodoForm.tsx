import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { displayNotification } from '../../helpers/Notification';
import { handleUpdate } from '../../firebase/todoApi';
import { Box } from '@mui/system';
interface ITodo {
  todoTitle: string;
  doneByDate: string;
  isTodoCompleted: boolean;
  id: string;
  handleClose: () => void;
}

const EditTodoForm = ({
  todoTitle,
  doneByDate,
  isTodoCompleted,
  id,
  handleClose,
}: ITodo) => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: object) => {
    handleClose();
    handleUpdate(id, data);
    displayNotification('success', 'Todo edited');
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '42rem',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={{ display: 'flex', margin: '2rem auto' }}>
        <TextField
          sx={{ backgroundColor: 'white', width: '23rem' }}
          required
          defaultValue={todoTitle}
          label='Todo title'
          {...register('todoTitle')}
        />
        <Controller
          name='doneByDate'
          control={control}
          defaultValue={doneByDate}
          render={({ field: { onChange, value } }) => (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ backgroundColor: 'white', maxWidth: '10rem' }}
                  label='Done by date'
                  format='YYYY-MM-DD'
                  value={dayjs(value)}
                  onChange={(newDate: any) => onChange(newDate.$d)}
                />
              </LocalizationProvider>
            </>
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isTodoCompleted}
              {...register('isCompleted')}
            />
          }
          label='Completed'
          labelPlacement='top'
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignSelf: 'flex-end',
        }}
      >
        <Button onClick={handleClose}>Close</Button>
        <Button type='submit' sx={{ marginLeft: '1rem' }} variant='contained'>
          Update
        </Button>
      </Box>
    </form>
  );
};

export default EditTodoForm;
