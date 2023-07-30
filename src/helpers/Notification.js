import { toast } from 'react-toastify';

export const displayNotification = (toastType, toastMessage) => {
  return toast[toastType](toastMessage, {
    position: 'bottom-left',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
  });
};
