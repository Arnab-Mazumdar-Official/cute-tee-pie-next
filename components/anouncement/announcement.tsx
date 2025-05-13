'use client';
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const AnnouncementBar = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
         backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fcb900',
        color: theme.palette.mode === 'dark' ? '#000' : '#fff',
        padding: '8px 0',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000', }}>
        &quot;We&apos;re live! Discover unique, high-quality t-shirts designed to express your vibe – shop now and wear your story.&quot;
      </Typography>
    </Box>
  );
};

export default AnnouncementBar;
