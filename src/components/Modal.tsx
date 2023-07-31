import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { ReactNode } from 'react';
interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  content: ReactNode;
  actions: ReactNode;
}

const Modal = ({ isOpen, handleClose, title, content, actions }: IModal) => {
  return (
    <Dialog onClose={() => handleClose} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
