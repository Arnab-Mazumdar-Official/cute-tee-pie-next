'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = () => {
    if (!email) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setSnackbarMessage('Logged in successfully!');
      setSnackbarOpen(true);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Circles */}
      <Box
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
          top: 50,
          left: 50,
          zIndex: 1,
          opacity: 0.7,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
          bottom: 50,
          right: 50,
          zIndex: 1,
          opacity: 0.7,
        }}
      />

      {/* Login Card */}
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 600,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          zIndex: 2,
          '@media (max-width: 603px)': {
            maxWidth: 350,
          },
        }}
      >
        <Typography variant="h5" align="center" gutterBottom color="white">
          Login Here
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email or Phone"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "*Email is required" : ""}
            InputProps={{
              style: { backgroundColor: '#1C1C1C', color: '#fff' },
              sx: {
                '& input:-webkit-autofill': {
                  boxShadow: '0 0 0 1000px #1C1C1C inset',
                  WebkitTextFillColor: '#fff',
                },
              },
            }}
            InputLabelProps={{
              style: { color: '#ccc' },
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { backgroundColor: '#1C1C1C', color: '#fff' },
              endAdornment: (
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    minWidth: 'auto',
                    color: 'white',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
              sx: {
                '& input:-webkit-autofill': {
                  boxShadow: '0 0 0 1000px #1C1C1C inset',
                  WebkitTextFillColor: '#fff',
                },
              },
            }}
            InputLabelProps={{
              style: { color: '#ccc' },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </Button>

          {loading && <LinearProgress sx={{ mt: 2 }} />}
        </Box>

        {/* Links and Button */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="white" sx={{ lineHeight: 3.43 }}>
            New user?{' '}
            <Link href="/register" underline="hover" color="primary">
              Create Account
            </Link>
          </Typography>
          <Typography variant="body2" color="white">
            Forget Password?{' '}
            <Link href="/register" underline="hover" color="primary">
              Click Here
            </Link>
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => router.push('/')}
          >
            Go To User Dashboard
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for success/failure message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}
