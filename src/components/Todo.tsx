import { Button, IconButton, ListItem, ListItemText } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { handleDelete, handleUpdateToDone } from '../firebase/firebaseCall';
import { useState } from 'react';
import Modal from './Modal';

interface ITodo {
  todoTitle: string;
  doneByDate: { seconds: number; miliseconds: number };
  isTodoCompleted: boolean;
  id: string;
}

const Todo = ({ todoTitle, doneByDate, isTodoCompleted, id }: ITodo) => {
  const [editModal, setEditModal] = useState<boolean>(false);
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

  const isTodoLate = (todoDate: string) => {
    const today = new Date().getTime() / 1000;
    const todayWithoutOffset = getDateWithoutOffset(today);
    return todayWithoutOffset > todoDate;
  };

  const toggleEditModal = () => {
    setEditModal((prevState) => !prevState);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton
              onClick={() => toggleEditModal()}
              sx={{ marginRight: '8px' }}
              edge='end'
              aria-label='edit'
            >
              <AiOutlineEdit />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDelete(id);
              }}
              edge='end'
              aria-label='delete'
            >
              <AiOutlineDelete />
            </IconButton>
          </>
        }
        sx={{
          background: 'white',
          border: isTodoLate(getDateWithoutOffset(doneByDate.seconds))
            ? '1px solid red'
            : 'none',
          opacity: isTodoCompleted ? '0.3' : '1',
          maxWidth: '38.3125rem',
          borderRadius: '0.5rem',
          marginBottom: '0.5rem',
        }}
      >
        <ListItemText
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={() => handleUpdateToDone(id)}
          primary={todoTitle}
          secondary={getDateWithoutOffset(doneByDate.seconds)}
        />
      </ListItem>
      <Modal
        isOpen={editModal}
        handleClose={toggleEditModal}
        title='Edit Todo'
        content={<>Do you want to edit this todo?</>}
        actions={
          <>
            <Button onClick={toggleEditModal}>Cancel</Button>
            <Button>Save</Button>
          </>
        }
      />
    </>
  );
};

export default Todo;
