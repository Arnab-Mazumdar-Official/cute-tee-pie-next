'use client';
import React, { useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ComingSoonModal from '../commingsoon/commingsoon';

export default function WelcomePage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Prin Tee Pal&mdash;where comfort meets creativity in every stitch.
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
          Welcome to Prin Tee Pal! <StarIcon fontSize="small" sx={{ verticalAlign: 'middle', color: '#FFD700' }} />
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          We&apos;re so excited to have you here! At Prin Tee Pal, we believe that style should be fun, comfortable, and full
          of personality. Our collection of tees is designed with you in mind&mdash;whether you&apos;re looking for a cozy everyday
          piece or a statement shirt to showcase your vibe, we&apos;ve got you covered.
        </Typography>

        <Typography variant="body1" sx={{ mt: 3 }}>
          ✨ <strong>Product Highlight:</strong> Our &quot;Pie of the Day&quot; collection is all about unique designs that stand
          out. From playful graphics to simple, chic statements, each tee is crafted for ultimate comfort and style.
          Made with soft, breathable fabrics, our tees are perfect for all-day wear, no matter what you&apos;re up to.
        </Typography>

        <Typography variant="body1" sx={{ mt: 3 }}>
          💥 <strong>Announcement:</strong> We&apos;re launching our <strong>limited-edition Spring Collection</strong> this
          week&mdash;only 50 tees available, so get yours before they&apos;re gone! You won&apos;t want to miss these exclusive designs.
        </Typography>

        <Typography variant="body1" sx={{ mt: 3 }}>
          Thank you for choosing Prin Tee Pal. We can&apos;t wait for you to rock our designs and feel the love in every
          stitch!
        </Typography>

        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: '#fff',
            color: '#000',
            transition: 'transform 0.1s ease, background-color 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              transform: 'scale(1.05)',
              boxShadow: '0 6px 20px rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Start Shopping
        </Button>
        <ComingSoonModal open={open} onClose={handleClose} />
      </Container>
    </Box>
  );
}
