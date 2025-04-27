'use client';
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Link, Paper, LinearProgress, Snackbar } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Visibility, VisibilityOff } from '@mui/icons-material';


// Define the structure of the IP info
interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
  postal: string;
  timezone: string;
  loc: string;
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null); 
  const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);


  // Fetch IP info from user's system
  useEffect(() => {
    console.log("Use State Starting");
    
    const fetchIpInfo = async () => {
      try {
        const response = await axios.get(`https://ipapi.co/json/`);
        console.log("Ip Address",response);
        
        setIpInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch IP info:', error);
        setIpInfo(null);
      }
    };
    
    fetchIpInfo();
  }, []);

  const handleLogin = async () => {
    console.log("Just Clicked");
    
    setLoading(true);
    console.log("Just Clicked 1");
    Cookies.remove('user_login_data');
    console.log("Just Clicked 2");
  
    setEmailError(false);
    // setPasswordError(false);
  
    if (!email || !password) {
      if (!email) setEmailError(true);
      // if (!password) setPasswordError(true);
      setLoading(false);
      return;
    }
    console.log("Just Clicked 3");
  
    if (!ipInfo) {
      setLoading(false);
      setSnackbarMessage('Unable to get IP information.');
      setSnackbarOpen(true);
      return;
    }
  
    const payload = {
      email,
      password,
      ipInfo: {
        ip: ipInfo.ip,
        city: ipInfo.city,
        region: ipInfo.region,
        country: ipInfo.country,
        org: ipInfo.org,
        postal: ipInfo.postal,
        timezone: ipInfo.timezone,
        loc: ipInfo.loc,
      },
    };
  
    try {
      console.log("Attempting login...");
  
      const response = await axios.post('/api/login', payload);
      console.log("Login Response:", response);
  
      if (response.data.success) {
        Cookies.set('user_login_data', JSON.stringify(response.data.data), { expires: 7 });
        setSnackbarMessage('Login successful!');
        window.location.href = "/";
      } else {
        setSnackbarMessage(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbarMessage(
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
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
          maxWidth: 600, // initial width of 600px
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
              style: { backgroundColor: email ? '#1C1C1C' : '#1C1C1C', color: '#fff' },
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

        {/* New user? Create Account */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="white" sx={{lineHeight: 3.43}}>
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
