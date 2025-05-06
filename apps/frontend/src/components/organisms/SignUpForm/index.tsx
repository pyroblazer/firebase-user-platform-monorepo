import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Avatar, 
  Typography,
  Paper,
  useTheme,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
  Link
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';
import { useAuth } from '../../../store/hooks/useAuth';
import { useRouter } from 'next/navigation';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const theme = useTheme();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await signUp(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Sign up failed. Please try again.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: theme.spacing(3), md: theme.spacing(6) },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: theme.shape.borderRadius * 2,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Avatar sx={{ 
            mb: theme.spacing(3),
            bgcolor: 'primary.main',
            width: theme.spacing(8),
            height: theme.spacing(8),
            '& svg': {
              fontSize: theme.spacing(4)
            }
          }}>
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography component="h1" variant="h4" fontWeight="bold" mb={1}>
            Create Account
          </Typography>
          
          <Typography variant="body1" color="text.secondary" mb={4}>
            Join us to get started
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            width="100%"
          >
            <Stack spacing={3}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: theme.shape.borderRadius * 2
                  }
                }}
              />
              
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: theme.shape.borderRadius * 2
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText="Password must be at least 6 characters"
              />

              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: theme.shape.borderRadius * 2
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  py: theme.spacing(1.5),
                  borderRadius: theme.shape.borderRadius * 2,
                  fontWeight: 'bold',
                  fontSize: theme.typography.body1.fontSize,
                  textTransform: 'none',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[6]
                  },
                  transition: theme.transitions.create(['transform', 'box-shadow'])
                }}
              >
                Sign Up
              </Button>
            </Stack>
            <Box textAlign="center" mt={4}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link href="/" color="primary.light" fontWeight="bold">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUpForm;