import { Avatar as MuiAvatar, AvatarProps } from '@mui/material';
import React from 'react';

const Avatar: React.FC<AvatarProps> = (props) => {
  return <MuiAvatar {...props} />;
};

export default Avatar;