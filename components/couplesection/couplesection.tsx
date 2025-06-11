'use client';

import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { keyframes } from '@emotion/react';

const CoupleGoalsSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';

  const handleClick = () => {
    router.push('/products-under/6828a99a106dd4e914540633');
  };

  const glow = keyframes`
    0% { box-shadow: 0 0 5px ${isDarkMode ? '#fff' : '#000'}; }
    50% { box-shadow: 0 0 20px ${isDarkMode ? '#fff' : '#000'}; }
    100% { box-shadow: 0 0 5px ${isDarkMode ? '#fff' : '#000'}; }
  `;

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        py: 10,
        px: 2,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 4,
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Couple Goals by PrinteepaL
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mb: 6,
          fontSize: { xs: '1rem', sm: '1.1rem' },
          maxWidth: 700,
          mx: 'auto',
          opacity: 0.8,
        }}
      >
        Style that syncs. Unisex T-Shirts designed for you and your partner. Because twinning is winning.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: 1000,
          mx: 'auto',
          mb: 6,
        }}
      >
        <Box
          component="img"
          src="/types/aMEdnVjhTNun-mHUYCq_eA.webp"
          alt="Male wearing PrinteepaL T-shirt"
          sx={{
            width: { xs: '100%', sm: '45%' },
            maxHeight: 500,
            objectFit: 'cover',
            borderRadius: 4,
            border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
          }}
        />
        <Box
          component="img"
          src="/types/nAT40UyFQVGkc7JUUCtIpQ.webp"
          alt="Female wearing PrinteepaL T-shirt"
          sx={{
            width: { xs: '100%', sm: '45%' },
            maxHeight: 500,
            objectFit: 'cover',
            borderRadius: 4,
            border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
          }}
        />
      </Box>

      {/* Animated Button */}
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: isDarkMode ? '#fff' : '#000',
          color: isDarkMode ? '#fff' : '#000',
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 'bold',
          letterSpacing: 1,
          borderRadius: '999px',
          animation: `${glow} 2s infinite`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: isDarkMode ? '#fff' : '#000',
            color: isDarkMode ? '#000' : '#fff',
          },
        }}
      >
        Shop the Couple Look
      </Button>
    </Box>
  );
};

export default CoupleGoalsSection;
