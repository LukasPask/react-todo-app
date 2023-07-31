import { IconButton, ListItem, ListItemText } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { handleDelete } from '../firebase/firebaseCall';

interface ITodo {
  todoTitle: string;
  doneByDate: { seconds: number; miliseconds: number };
  isTodoCompleted: boolean;
  id: string;
}

const Todo = ({ todoTitle, doneByDate, isTodoCompleted, id }: ITodo) => {
  const getDateWithoutOffset = (seconds: number) => {
    var newDate = new Date();
    newDate.setTime(seconds * 1000);
    const dateOffset = newDate.getTimezoneOffset();
    if (dateOffset < 0) {
      newDate.setHours(12, 0, 0);
    }
    const dateWithoutTime = newDate.toISOString().split('T')[0];
    return dateWithoutTime;
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge='end' aria-label='delete'>
          <AiOutlineDelete
            onClick={(e) => {
              handleDelete(id);
            }}
          />
        </IconButton>
      }
      sx={{
        background: 'white',
        maxWidth: '38.3125rem',
        borderRadius: '0.5rem',
        marginBottom: '0.5rem',
      }}
    >
      <ListItemText
        primary={todoTitle}
        secondary={getDateWithoutOffset(doneByDate.seconds)}
      />
    </ListItem>
  );
};

export default Todo;
