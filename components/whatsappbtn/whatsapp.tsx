'use client';
import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  const phoneNumber = '+918101826739';
  const message = encodeURIComponent("Hi, I'm interested in your products!");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Tooltip title="Chat on WhatsApp">
      <Fab
        color="success"
        aria-label="whatsapp"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1300,
        }}
        onClick={() => window.open(url, '_blank')}
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton;
