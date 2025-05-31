'use client';
import React from 'react';
import { Box, Typography, useTheme, keyframes } from '@mui/material';

// Keyframes for scrolling animation
const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const AnnouncementBar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fcb900',
        color: theme.palette.mode === 'dark' ? '#000' : '#fff',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        px: 2,
      }}
    >
      {/* Static text for >=985px */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '100%',
        }}
      >
        <Typography
          variant="body2"
          textAlign="center"
          fontWeight={500}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        >
          {"We're live! Discover unique, high-quality t-shirts designed to express your vibe – shop now and wear your story."}
        </Typography>
      </Box>

      {/* Scrolling text for <985px */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          whiteSpace: 'nowrap',
          animation: `${scroll} 15s linear infinite`,
        }}
      >
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        >
          {"We're live! Discover unique, high-quality t-shirts designed to express your vibe – shop now and wear your story."}
        </Typography>
      </Box>
    </Box>
  );
};

export default AnnouncementBar;
