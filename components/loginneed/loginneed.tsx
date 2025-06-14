'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Box,
  Fade,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginNeeded = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Simple black/white color scheme
  const colors = {
    primary: isDark ? '#ffffff' : '#000000',
    background: isDark ? '#000000' : '#ffffff',
    cardBg: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#cccccc' : '#666666',
    border: isDark ? '#ffffff' : '#000000',
    inputBorder: isDark ? '#666666' : '#cccccc',
    hoverBg: isDark ? '#333333' : '#f5f5f5',
    glow: isDark 
      ? `0 15px 40px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.05)`
      : `0 15px 40px rgba(0, 0, 0, 0.1), 0 0 30px rgba(0, 0, 0, 0.05)`,
  };

  useEffect(() => {
    if (open) {
      setShowContent(true);
    }
  }, [open]);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleFakeGoogleLogin = async () => {
    setError('');

    if (!email) {
      setError('✨ Please enter your email to continue your journey');
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      setError('🌟 Gmail works best - try your Gmail address');
      return;
    }

    setLoading(true);

    try {
      const arcjetRes = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const arcjetData = await arcjetRes.json();
      console.log("arcjetData-------------->>",arcjetData);
      
      if (!arcjetData?.valid) {
        setError('🌸 Almost there! Please try with  your valid email address');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/fake-google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("data------->>",data);
      

      if (res.ok && data?.role) {
        Cookies.set('user_login_data', JSON.stringify(data), { expires: 5 });
        onClose();
        window.location.reload();
      } else {
        setError('🌼 Great email! Please try the login button for verification');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('🌺 Connection issue! Please try the login button');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          background: colors.background,
          color: colors.text,
          border: `2px solid ${colors.border}`,
          borderRadius: 2,
          width: '480px',
          minHeight: '600px',
          p: 0,
          boxShadow: colors.glow,
          position: 'relative',
          overflow: 'hidden',
        },
      }}
    >

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          p: 4,
          position: 'relative',
          background: colors.cardBg,
          mx: 2,
          my: 2,
          borderRadius: 4,
          border: `1px solid ${colors.inputBorder}`,
        }}
      >
        {/* Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: colors.inputBorder,
            opacity: 0.3,
            animation: 'gentleFloat 6s ease-in-out infinite',
            '@keyframes gentleFloat': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-10px) rotate(180deg)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            background: colors.inputBorder,
            opacity: 0.2,
            animation: 'gentleFloat 8s ease-in-out infinite reverse',
          }}
        />

        <Fade in={showContent} timeout={1400}>
          <Box sx={{ width: '100%', mb: 4, zIndex: 1 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              {[
                { icon: '🛍️', title: 'Smart Shopping', desc: 'Virtual Trial Room' },
                { icon: '📦', title: 'Quick Orders', desc: 'Seamless checkout' },
                { icon: '🎨', title: 'Custom Designs', desc: 'Made for you' },
                { icon: '💝', title: 'Special Offers', desc: 'Exclusive deals' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    background: colors.background,
                    padding: '18px',
                    borderRadius: 3,
                    border: `1px solid ${colors.inputBorder}`,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      backgroundColor: colors.hoverBg,
                      boxShadow: `0 8px 25px ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 0.5 }}>{item.icon}</Typography>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ color: colors.text, mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>

        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            background: colors.text,
            color: colors.background,
            fontWeight: '600',
            mb: 3,
            width: '100%',
            py: 2,
            fontSize: '1.1rem',
            borderRadius: 4,
            transition: 'all 0.3s ease',
            boxShadow: `0 6px 20px ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
            '&:hover': {
              background: colors.textSecondary,
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 25px ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
            },
          }}
        >
          🌟 Start Your Journey
        </Button>

        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: colors.textSecondary }}>
          Or continue with Gmail for quick access 🌸
        </Typography>

        <TextField
          type="email"
          placeholder="🌼 your.email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          InputProps={{
            style: { 
              color: colors.text,
              backgroundColor: colors.background,
            },
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              '& fieldset': {
                borderColor: colors.inputBorder,
                borderWidth: 1.5,
              },
              '&:hover fieldset': {
                borderColor: colors.border,
                boxShadow: `0 0 10px ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.border,
                boxShadow: `0 0 15px ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: colors.textSecondary,
            },
          }}
        />

        {error && (
          <Fade in={!!error} timeout={400}>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2,
                color: colors.text,
                backgroundColor: colors.hoverBg,
                padding: '12px 20px',
                borderRadius: 4,
                border: `1px solid ${colors.inputBorder}`,
                textAlign: 'center',
                fontWeight: 400,
                width: '100%',
              }}
            >
              {error}
            </Typography>
          </Fade>
        )}

        <Button
          variant="outlined"
          onClick={handleFakeGoogleLogin}
          disabled={loading}
          fullWidth
          sx={{
            borderColor: colors.border,
            color: colors.text,
            fontWeight: '600',
            py: 2,
            borderRadius: 4,
            borderWidth: 1.5,
            background: colors.background,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: colors.hoverBg,
              borderColor: colors.border,
              transform: 'translateY(-1px)',
              boxShadow: `0 6px 20px ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            },
            '&:disabled': {
              borderColor: colors.inputBorder,
              color: colors.textSecondary,
            },
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} sx={{ color: colors.text }} />
              <Typography variant="button">Setting up your account...</Typography>
            </Box>
          ) : (
            '🌺 Continue with Gmail'
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginNeeded;