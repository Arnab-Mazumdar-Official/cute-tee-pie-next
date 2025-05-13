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
  Link,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ResponsiveHeader from '../../../components/header/header';
import AnnouncementBar from '../../../components/anouncement/announcement';

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    setEmailError(false);
    setPasswordError(false);
    setLoading(true);

    try {
      const ipInfoRes = await fetch(`https://ipinfo.io?token=${process.env.IP_INFO_TOKEN}`);
      const ipInfo = await ipInfoRes.json();

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ipInfo,
        }),
      });

      const data = await response.json();

      if (data?.success === true) {
        Cookies.set('user_login_data', JSON.stringify(data.data), { expires: 5 });
        setTimeout(() => {
          router.back();
        }, 1500);
      } else {
        setSnackbarMessage(data.message || 'Login failed');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred during login');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#0A0A0A' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    >
      <AnnouncementBar/>
      <ResponsiveHeader />
    
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#0A0A0A' : '#fff',
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
          opacity: 0.5,
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
          opacity: 0.5,
        }}
      />

      {/* Login Card */}
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 600,
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
          border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
          color: isDarkMode ? '#fff' : '#000',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          zIndex: 2,
          '@media (max-width: 603px)': {
            maxWidth: 350,
          },
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
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
              style: {
                backgroundColor: isDarkMode ? '#1C1C1C' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
              },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? '#ccc' : '#000' },
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
            error={passwordError}
            helperText={passwordError ? "*Password is required" : ""}
            InputProps={{
              style: {
                backgroundColor: isDarkMode ? '#1C1C1C' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
              },
              endAdornment: (
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    minWidth: 'auto',
                    color: isDarkMode ? 'white' : 'black',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? '#ccc' : '#000' },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: isDarkMode ? 'white' : 'yellow',
              color: isDarkMode ? 'black' : 'black',
              '&:hover': {
                backgroundColor: isDarkMode ? '#e0e0e0' : '#ffeb3b',
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
          <Typography variant="body2" sx={{ color: isDarkMode ? '#fff' : '#000', lineHeight: 3.43 }}>
            New user?{' '}
            <Link href="/sign-up" underline="hover" sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>
              Create Account
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: isDarkMode ? '#fff' : '#000' }}>
            Forget Password?{' '}
            <Link href="/register" underline="hover" sx={{color: theme.palette.mode === 'dark' ? 'white' : 'black', }}>
              Click Here
            </Link>
          </Typography>

          <Button
            variant="outlined"
            sx={{
              mt: 3,
              color: isDarkMode ? 'white' : 'black',
              borderColor: isDarkMode ? 'white' : 'black',
              '&:hover': {
                borderColor: isDarkMode ? '#ddd' : 'red',
                color: isDarkMode ? '#ddd' : 'red',
              },
            }}
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
    </Box>
  );
}
