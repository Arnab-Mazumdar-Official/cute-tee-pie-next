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

  // Warm color scheme
  const colors = {
    primary: isDark ? '#ff9a56' : '#ff7043',
    secondary: isDark ? '#ffb74d' : '#ffa726',
    accent: isDark ? '#81c784' : '#66bb6a',
    background: isDark 
      ? 'linear-gradient(135deg, #2c1810 0%, #3e2723 50%, #4e342e 100%)'
      : 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #ffcc02 100%)',
    cardBg: isDark ? 'rgba(46, 24, 16, 0.85)' : 'rgba(255, 255, 255, 0.95)',
    text: isDark ? '#fff8e1' : '#3e2723',
    textSecondary: isDark ? '#ffcc80' : '#8d6e63',
    border: isDark ? '#ff9a56' : '#ff7043',
    glow: isDark 
      ? `0 15px 40px rgba(255, 154, 86, 0.25), 0 0 30px rgba(255, 183, 77, 0.15)`
      : `0 15px 40px rgba(255, 112, 67, 0.3), 0 0 30px rgba(255, 167, 38, 0.2)`,
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
          borderRadius: 6,
          width: '480px',
          minHeight: '600px',
          p: 0,
          boxShadow: colors.glow,
          position: 'relative',
          overflow: 'hidden',
        },
      }}
    >
      {/* Gentle Header Section */}
      <Box
        sx={{
          height: '120px',
          background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'gentleShimmer 4s infinite',
          },
          '@keyframes gentleShimmer': {
            '0%': { left: '-100%' },
            '100%': { left: '100%' },
          },
        }}
      >
        <Typography 
          variant="h3" 
          fontWeight="600"
          sx={{
            color: isDark ? '#2c1810' : '#fff',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 1,
          }}
        >
          🌟 PrinteePaL
        </Typography>
      </Box>

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
          backdropFilter: 'blur(20px)',
          mx: 2,
          my: 2,
          borderRadius: 4,
          border: `1px solid ${isDark ? 'rgba(255, 154, 86, 0.2)' : 'rgba(255, 112, 67, 0.15)'}`,
        }}
      >
        {/* Gentle Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${colors.secondary}, ${colors.accent})`,
            opacity: 0.4,
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
            background: `linear-gradient(45deg, ${colors.accent}, ${colors.primary})`,
            opacity: 0.3,
            animation: 'gentleFloat 8s ease-in-out infinite reverse',
          }}
        />

        <Fade in={showContent} timeout={1000}>
          <Box sx={{ textAlign: 'center', zIndex: 1, mb: 3 }}>
            <Typography 
              variant="h5" 
              fontWeight="600" 
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              🌸 Welcome to Premium
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: colors.textSecondary,
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Discover personalized features designed just for you
            </Typography>
          </Box>
        </Fade>

        <Fade in={showContent} timeout={1400}>
          <Box sx={{ width: '100%', mb: 4, zIndex: 1 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              {[
                { icon: '🛍️', title: 'Smart Shopping', desc: 'Personalized picks' },
                { icon: '📦', title: 'Quick Orders', desc: 'Seamless checkout' },
                { icon: '🎨', title: 'Custom Designs', desc: 'Made for you' },
                { icon: '💝', title: 'Special Offers', desc: 'Exclusive deals' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(255, 154, 86, 0.1), rgba(129, 199, 132, 0.1))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 112, 67, 0.1))',
                    padding: '18px',
                    borderRadius: 3,
                    border: `1px solid ${isDark ? 'rgba(255, 154, 86, 0.2)' : 'rgba(255, 112, 67, 0.2)'}`,
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${isDark ? 'rgba(255, 154, 86, 0.2)' : 'rgba(255, 112, 67, 0.2)'}`,
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
            background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
            color: isDark ? '#2c1810' : '#fff',
            fontWeight: '600',
            mb: 3,
            width: '100%',
            py: 2,
            fontSize: '1.1rem',
            borderRadius: 4,
            transition: 'all 0.3s ease',
            boxShadow: `0 6px 20px ${isDark ? 'rgba(255, 154, 86, 0.3)' : 'rgba(255, 112, 67, 0.3)'}`,
            '&:hover': {
              background: `linear-gradient(45deg, ${colors.secondary}, ${colors.primary})`,
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 25px ${isDark ? 'rgba(255, 154, 86, 0.4)' : 'rgba(255, 112, 67, 0.4)'}`,
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
              backgroundColor: isDark ? 'rgba(255, 154, 86, 0.05)' : 'rgba(255, 255, 255, 0.8)',
            },
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
              '& fieldset': {
                borderColor: isDark ? 'rgba(255, 154, 86, 0.3)' : 'rgba(255, 112, 67, 0.3)',
                borderWidth: 1.5,
              },
              '&:hover fieldset': {
                borderColor: colors.primary,
                boxShadow: `0 0 10px ${isDark ? 'rgba(255, 154, 86, 0.2)' : 'rgba(255, 112, 67, 0.2)'}`,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.primary,
                boxShadow: `0 0 15px ${isDark ? 'rgba(255, 154, 86, 0.3)' : 'rgba(255, 112, 67, 0.3)'}`,
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
                color: isDark ? '#ffcc80' : '#d84315',
                backgroundColor: isDark ? 'rgba(255, 204, 128, 0.1)' : 'rgba(216, 67, 21, 0.1)',
                padding: '12px 20px',
                borderRadius: 4,
                border: `1px solid ${isDark ? 'rgba(255, 204, 128, 0.2)' : 'rgba(216, 67, 21, 0.2)'}`,
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
            borderColor: colors.primary,
            color: colors.primary,
            fontWeight: '600',
            py: 2,
            borderRadius: 4,
            borderWidth: 1.5,
            background: isDark ? 'rgba(255, 154, 86, 0.05)' : 'rgba(255, 112, 67, 0.05)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255, 154, 86, 0.1)' : 'rgba(255, 112, 67, 0.1)',
              borderColor: colors.primary,
              transform: 'translateY(-1px)',
              boxShadow: `0 6px 20px ${isDark ? 'rgba(255, 154, 86, 0.15)' : 'rgba(255, 112, 67, 0.15)'}`,
            },
            '&:disabled': {
              borderColor: isDark ? 'rgba(255, 154, 86, 0.3)' : 'rgba(255, 112, 67, 0.3)',
              color: isDark ? 'rgba(255, 154, 86, 0.7)' : 'rgba(255, 112, 67, 0.7)',
            },
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} sx={{ color: colors.primary }} />
              <Typography variant="button">Setting up your account...</Typography>
            </Box>
          ) : (
            '🌺 Continue with Gmail'
          )}
        </Button>
      </DialogContent>

      {/* Gentle Footer Section */}
      <Box
        sx={{
          height: '80px',
          background: `linear-gradient(45deg, ${colors.secondary}, ${colors.accent})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            color: isDark ? '#2c1810' : '#fff',
            fontWeight: 500,
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          🔒 Secure • 🌟 Trusted • 💝 Always Free
        </Typography>
        
        {/* Gentle footer glow */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
            backgroundSize: '200% 100%',
            animation: 'gentleGlow 6s ease infinite',
            '@keyframes gentleGlow': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            },
          }}
        />
      </Box>
    </Dialog>
  );
};

export default LoginNeeded;