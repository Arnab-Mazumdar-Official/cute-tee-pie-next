'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ResponsiveHeader from '../../../components/header/header'; // Adjust path if needed
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AnnouncementBar from '../../../components/anouncement/announcement';

  type FormFields = {
  name: string;
  email: string;
  password: string;
  phone: string;
  // address: string;
  // city: string;
  // state: string;
  // zip: string;
};
export default function SignupPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const router = useRouter();

  const [form, setForm] = useState<FormFields>({
  name: '',
  email: '',
  password: '',
  phone: '',
  // address: '',
  // city: '',
  // state: '',
  // zip: '',
});



  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSignup = async () => {
    let valid = true;
    const newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
      valid = false;
    }

    // if (!form.address.trim()) {
    //   newErrors.address = 'Address is required';
    //   valid = false;
    // }

    // if (!form.city.trim()) {
    //   newErrors.city = 'City is required';
    //   valid = false;
    // }

    // if (!form.state.trim()) {
    //   newErrors.state = 'State is required';
    //   valid = false;
    // }

    // if (!form.zip.trim() || !/^\d{6}$/.test(form.zip)) {
    //   newErrors.zip = 'Zip must be 6 digits';
    //   valid = false;
    // }

    setErrors(newErrors);
    if (!valid) return;

    setLoading(true);
    try {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: 'is_customer' }),
      });

      const data = await response.json();

      if (data.success) {
        setSnackbarMessage('Signup successful!');
        setSnackbarOpen(true);
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setSnackbarMessage(data.message || 'Signup failed');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred during signup');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const fieldProps = {
    variant: 'filled' as const,
    fullWidth: true,
    margin: 'normal' as const,
    InputProps: {
      style: {
        backgroundColor: isDarkMode ? '#1C1C1C' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
      },
      sx: {
        '& input:-webkit-autofill': {
          WebkitBoxShadow: `0 0 0 1000px ${isDarkMode ? '#1C1C1C' : '#fff'} inset !important`,
          WebkitTextFillColor: `${isDarkMode ? '#fff' : '#000'} !important`,
          transition: 'background-color 5000s ease-in-out 0s',
        },
      },
    },
    InputLabelProps: {
      style: { color: isDarkMode ? '#ccc' : '#000' },
    },
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
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        py: 4,
      }}
    >

      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 4,
          width: '100%',
          maxWidth: 600,
          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#fdfdfd',
          borderRadius: 2,
          backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
          color: isDarkMode ? '#fff' : '#000',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create Your Account
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          {[
  { name: 'name', label: 'Full Name' },
  { name: 'email', label: 'Email Address' },
  { name: 'password', label: 'Password' },
  { name: 'phone', label: 'Phone Number' },
  // { name: 'address', label: 'Address' },
  // { name: 'city', label: 'City' },
  // { name: 'state', label: 'State' },
  // { name: 'zip', label: 'Zip Code' },
].map(({ name, label }) => {
  return name === 'password' ? (
    <TextField
      key={name}
      {...fieldProps}
      type={showPassword ? 'text' : 'password'}
      label={label}
      name={name}
      value={form[name as keyof FormFields]} // Use type assertion here
      onChange={handleChange}
      error={!!errors[name]}
      helperText={errors[name]}
      InputProps={{
        ...fieldProps.InputProps,
        endAdornment: (
          <Button
            onClick={() => setShowPassword((prev) => !prev)}
            size="small"
            sx={{
              minWidth: 'auto',
              px: 1,
              color: isDarkMode ? '#fff' : '#000',
              textTransform: 'none',
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </Button>
        ),
      }}
    />
  ) : (
    <TextField
      key={name}
      {...fieldProps}
      type={name === 'email' ? 'email' : name === 'zip' || name === 'phone' ? 'tel' : 'text'}
      label={label}
      name={name}
      value={form[name as keyof FormFields]} // Use type assertion here
      onChange={handleChange}
      error={!!errors[name]}
      helperText={errors[name]}
    />
  );
})}

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: isDarkMode ? 'white' : 'yellow',
              color: 'black',
            //   '&:hover': {
            //     backgroundColor: isDarkMode ? '#FFD700' : '#222',
            //   },
            }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>

          {loading && <LinearProgress sx={{ mt: 2 }} />}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
  <Typography
    variant="body2"
    sx={{
      lineHeight: 3.43,
      color: theme.palette.mode === 'dark' ? 'white' : 'black',
    }}
  >
    Already a user?{' '}
    <Link
      href="/login"
      underline="hover"
      sx={{
        color: theme.palette.mode === 'dark' ? '#FFD700' : '#D32F2F', // Yellow in dark, red in light
        fontWeight: 500,
      }}
    >
      Log in
    </Link>
  </Typography>

  <Button
    variant="outlined"
    sx={{
      mt: 2,
      borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
      color: theme.palette.mode === 'dark' ? 'white' : 'black',
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark' ? '#333' : '#f0f0f0',
      },
    }}
    onClick={() => router.push('/')}
  >
    Go to User Dashboard
  </Button>
</Box>
      </Paper>

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
