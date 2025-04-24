import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
} from '@mui/material';

const ComingSoonModal = ({
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
      maxWidth="sm" // Increased width
      PaperProps={{
        sx: {
          backgroundColor: '#000', // Deep black background
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          border: '2px solid white', // White border
          borderRadius: 2,
          width: '400px',
          height: '250px', // Increased height
        },
      }}
    >
      <DialogContent
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '2rem', // Larger text
          }}
        >
          COMING SOON
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonModal;
