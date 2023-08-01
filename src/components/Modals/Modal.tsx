import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { ReactNode } from 'react';
interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  content: ReactNode;
}

const Modal = ({ isOpen, handleClose, title, content }: IModal) => {
  return (
    <Dialog onClose={() => handleClose} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default Modal;
