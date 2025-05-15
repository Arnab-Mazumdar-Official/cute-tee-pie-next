'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
} from '@mui/material';

const cartNotice = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
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
          height: '270px',
        },
      }}
    >
      <DialogContent
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
        }}
      >
        <Box sx={{ color: 'white' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Notice
          </Typography>
          <Typography variant="body1">
            You can only purchase up to <strong>3 different products</strong> at a time.
          </Typography>
          <Typography variant="body2" mt={2}>
            Please add the remaining items to your <strong>wishlist</strong> to check out later.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default cartNotice;
