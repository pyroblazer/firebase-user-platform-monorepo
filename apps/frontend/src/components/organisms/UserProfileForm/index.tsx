import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import TextField from '@/components/atoms/TextField';
import Button from '@/components/atoms/Button';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { fetchUserData, updateUserData } from '@/store/slices/userSlice';
import { useAuth } from '@/store/hooks/useAuth';
import { UserData } from '@packages/shared';

const UserProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);
  const { logout } = useAuth();

  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      dispatch(fetchUserData(storedUserId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setUserData({
        name: data.name || '',
        city: data.city || '',
        country: data.country || '',
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = () => {
    if (userId) {
      dispatch(updateUserData({ userId, data: userData }));
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            <b>Your User Data</b>
          </Typography>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={userData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              value={userData.city}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              autoComplete="country"
              value={userData.country}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleUpdateUser}
              sx={{ mb: 1 }}
            >
              Update Data
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="error"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfileForm;
