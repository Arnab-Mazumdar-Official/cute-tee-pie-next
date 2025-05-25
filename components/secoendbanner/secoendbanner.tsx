'use client'
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import ComingSoonModal from '../commingsoon/commingsoon';
import { useRouter } from 'next/navigation';


const tshirtOptions = [
  {
    title: 'Naruto Design',
    image: "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/32c78a35-164f-4482-a51e-b5194035eb08.jpg",
    path: '/blog/naruto',
    color: '#FF6347',
  },
  {
    title: 'Elevate Hustle',
    image: "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/c65f08eb-e912-4781-bf7f-83bc28992fa7.jpg",
    path: '/blog/elevate-hustle',
    color: '#FF6347',
  },
  {
    title: 'Calorie Burn',
    image: "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/c2447542-cc5e-49c2-b1bf-a8157f6fc932.jpg",
    path: '/blog/calorie-burn',
    color: '#FF6347',
  },
  {
    title: 'Venom Unleashed',
    image: "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/b3f7ffdc-1ad1-474b-b842-239ab712711f.jpg",
    path: '/blog/venom-unleashed',
    color: '#FF6347',
  },
  {
    title: 'Kind A Savage',
    image: "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/481ec431-0b37-4c41-8514-692fa7da8209.jpg",
    path: '/blog/kinda-savage',
    color: '#FF6347',
  },
];

const MovableSectionWithBackgrounds = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const bgColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const borderColor = textColor;

  return (
    <Box>
      {/* Top Still Background */}
      <Box
        sx={{
          height: '25vh',
          backgroundImage: 'url(//cuteteepie.myshopify.com/cdn/shop/files/n_zWTHLRShW7z6jwCzt6Ag.jpg?v=1745137077&width=3840)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Middle Scrollable Foreground Section */}
      <Box
      sx={{
        py: 6,
        px: 2,
        backgroundColor: bgColor,
        color: textColor,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Our Best Selling T-Shirt
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          mt: 4,
        }}
      >
        {tshirtOptions.map((item) => (
          <Box
            key={item.path}
            onClick={() => router.push(item.path)}
            sx={{
              cursor: 'pointer',
              width: {
                xs: '45%',
                sm: 200,
                md: 250,
                lg: 250,
              },
              maxWidth: 300,
            }}
          >
            <Box
              sx={{
                height: {
                  xs: 200,
                  sm: 200,
                  md: 250,
                  lg: 300,
                },
                width: '100%',
                borderRadius: 4,
                border: `2px solid ${borderColor}`,
                backgroundColor: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {item.image ? (
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Typography variant="body2" sx={{ p: 2 }}>
                  No Image
                </Typography>
              )}
            </Box>

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mt: 1, color: textColor }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>


      {/* Bottom Still Background */}
      <Box
        sx={{
          height: '25vh',
          backgroundImage: 'url(//cuteteepie.myshopify.com/cdn/shop/files/h_u0trkkRhyuYa06ouhurg.jpg?v=1745140671&width=3840)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </Box>
  );
};

export default MovableSectionWithBackgrounds;
