'use client';
import React from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';

const AnnouncementBar = () => {

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#111',
        color: '#fff',
        padding: '8px 0',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ color: '#cfcfcf' }}>
        "We're live! Discover unique, high-quality t-shirts designed to express your vibe – shop now and wear your story."
      </Typography>
    </Box>
  );
};

export default AnnouncementBar;
