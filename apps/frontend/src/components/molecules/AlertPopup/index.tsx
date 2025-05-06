import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector } from '../../../store/hooks/useAppSelector';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch';
import { setError } from '../../../store/slices/userSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
Alert.displayName = 'Alert';

const AlertPopup: React.FC = () => {
  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setError(null));
  };

  return (
    <Snackbar 
      open={error !== null} 
      autoHideDuration={6000} 
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default AlertPopup;