import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import React from 'react';

const TextField: React.FC<TextFieldProps> = (props) => {
  return <MuiTextField margin="normal" fullWidth {...props} />;
};

export default TextField;