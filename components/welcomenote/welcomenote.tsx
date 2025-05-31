'use client';
import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function WelcomePage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? '#121212' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          {/* LEFT SIDE - Powerful Branding Text */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 3,
                color: isDarkMode ? '#fff' : '#000',
              }}
            >
              Crafted for Legends. Designed with Soul.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                borderLeft: `4px solid ${isDarkMode ? '#fff' : '#000'}`,
                pl: 2,
              }}
            >
              Welcome to <strong>Prin Tee Pal</strong> – the luxury label redefining streetwear elegance.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Every tee is born through an artisanal process — from ethically sourced premium cotton to hand-drawn prints that speak your personality. Our garments aren’t just worn; they’re felt.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              🌑 <strong>Dark Mode Vibe:</strong> Designed to pop in monochrome, our palette features bold blacks, timeless whites, and deep accent hues for an unforgettable silhouette.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ✨ <strong>Detail Obsessed:</strong> From double-stitched hems to butter-soft finishes, every element is crafted to deliver a tactile experience that oozes luxury and comfort.
            </Typography>
            <Typography variant="body1">
              🎨 <strong>Color Philosophy:</strong> Minimalist yet powerful—perfect blacks, perfect whites, no compromise. Our fabrics hold dye like they hold attention.
            </Typography>
          </Grid>

          {/* RIGHT SIDE - Image */}
          <Grid item xs={12} md={6} sx={{ textAlign: matches ? 'center' : 'right' }}>
            <Box
              sx={{
                border: `4px solid ${isDarkMode ? '#fff' : '#000'}`,
                borderRadius: 3,
                overflow: 'hidden',
                display: 'inline-block',
              }}
            >
              <Image
                src="/images/WhatsApp Image 2025-05-31 at 6.50.57 PM.jpeg"
                alt="Prin Tee Pal Promo"
                width={500}
                height={600}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
