import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoForm = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label='Todo title' {...register('todoTitle')} />
      <Controller
        name='todoDate'
        control={control}
        defaultValue={new Date()}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            showTimeSelect
            timeFormat='p'
            timeIntervals={15}
            dateFormat='Pp'
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
