'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const loginneeded = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: '#000',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          border: '2px solid white',
          borderRadius: 2,
          width: '400px',
          height: '300px',
          p: 2,
        },
      }}
    >
      <DialogContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Hold Up!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You must be logged in to access your <strong>Carts</strong>, <strong>Orders</strong>, and <strong>Shopping</strong>.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Don’t miss out—log in now to unlock full access!
        </Typography>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: '#fff',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#eee',
            },
          }}
        >
          Log In Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default loginneeded;
