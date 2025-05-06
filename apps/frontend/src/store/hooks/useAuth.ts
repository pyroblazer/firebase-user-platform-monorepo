import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getFirebaseAuth, 
  firebaseSignUp,
  firebaseSignIn, 
  firebaseSignOut 
} from '../../services/auth/firebase';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setLoading, setError } from '../../store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const auth = getFirebaseAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token && !!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await firebaseSignUp(email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.uid);
      
      setIsAuthenticated(true);
      dispatch(setLoading(false));
      router.push('/main');
      return user;
    } catch (error: any) {
      handleAuthError(error, 'sign up');
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await firebaseSignIn(email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.uid);
      
      setIsAuthenticated(true);
      dispatch(setLoading(false));
      router.push('/main');
      return user;
    } catch (error: any) {
      handleAuthError(error, 'login');
      throw error;
    }
  };

  const logout = async () => {
    dispatch(setLoading(true));
    try {
      await firebaseSignOut();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
      dispatch(setLoading(false));
      router.push('/');
    } catch (error: any) {
      dispatch(setError(error.message || 'Logout failed'));
      dispatch(setLoading(false));
      throw error;
    }
  };

  const handleAuthError = (error: any, action: string) => {
    let errorMessage = `${action} failed`;
    
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Account disabled';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
    }
    
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
  };

  return { 
    isAuthenticated, 
    signUp, 
    login, 
    logout 
  };
};