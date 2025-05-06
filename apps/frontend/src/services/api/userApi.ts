import { API_BASE_URL } from '../../constants/config';
import { AuthResponse, UserData } from '../../types/user';
import { firebaseSignIn, firebaseSignOut } from '../auth/firebase';

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential = await firebaseSignIn(email, password);
    const user = userCredential.user;

    if (!user) {
      throw new Error('Login failed');
    }

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/user/fetch-id-by-email/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('User not found in Firestore');
    }

    const { userId } = await response.json();
    return { token, userId };
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error('An unknown error occurred during login');
  }
};

export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  await firebaseSignOut();
};

export const fetchUserData = async (userId: string, token: string): Promise<UserData> => {
  const response = await fetch(`${API_BASE_URL}/user/fetch-user-data/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return await response.json();
};

export const updateUserData = async (userId: string, data: UserData, token: string): Promise<UserData> => {
    console.log(userId, data);
   const response = await fetch(`${API_BASE_URL}/user/update-user-data`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, data }),
  });

  if (!response.ok) {
    throw new Error('Failed to update user data');
  }

  return await response.json();
};