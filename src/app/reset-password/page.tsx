'use client';

import React, { useEffect, useState } from 'react';
import {
  Box, Button, LinearProgress, Paper, Snackbar, TextField, Typography, useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ResponsiveHeader from '../../../components/header/header';
import AnnouncementBar from '../../../components/anouncement/announcement';

export default function ResetPasswordPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get('token');
    setToken(tokenFromURL);
  }, []);

  const handleResetRequest = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrors({ email: 'Valid email is required' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/send-reset-password-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setSnackbarMessage('Reset link sent to your email');
      } else {
        setSnackbarMessage(data.message || 'Failed to send reset email');
      }
    } catch (err) {
      setSnackbarMessage('An error occurred while sending reset email');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handlePasswordReset = async () => {
    const newErrors: any = {};
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (data.success) {
        setSnackbarMessage('Password reset successful. Redirecting to login...');
        setTimeout(() => router.push('/'), 2000);
      } else {
        setSnackbarMessage(data.message || 'Password reset failed');
      }
    } catch (err) {
      setSnackbarMessage('An error occurred during password reset');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: isDarkMode ? '#0A0A0A' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
      <AnnouncementBar />
      <ResponsiveHeader />
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 500,
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#fdfdfd',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            {token ? 'Reset Your Password' : 'Forgot Your Password?'}
          </Typography>

          {!token ? (
            <>
              <TextField
                label="Email Address"
                variant="filled"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({});
                }}
                error={!!errors.email}
                helperText={errors.email}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleResetRequest}
                sx={{ mt: 2, backgroundColor: isDarkMode ? 'white' : 'yellow', color: 'black' }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                variant="filled"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <Button onClick={() => setShowPassword((prev) => !prev)} size="small" sx={{ color: isDarkMode ? '#fff' : '#000' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                variant="filled"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handlePasswordReset}
                sx={{ mt: 2, backgroundColor: isDarkMode ? 'white' : 'yellow', color: 'black' }}
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </>
          )}

          {loading && <LinearProgress sx={{ mt: 2 }} />}

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: isDarkMode ? 'white' : 'black',
                color: isDarkMode ? 'white' : 'black',
                '&:hover': { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' },
              }}
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Box>

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
