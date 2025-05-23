'use client';
import React, { useState } from "react";
import { Box, Typography, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import ComingSoonModal from '../commingsoon/commingsoon';
import { motion } from 'framer-motion';

const AnimatedButton = motion(Button);

const BannerSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:900px)');
  const is894 = useMediaQuery('(max-width:894px)');
  const is740 = useMediaQuery('(max-width:740px)');
  const is734 = useMediaQuery('(max-width:734px)');
  const is650 = useMediaQuery('(max-width:650px)');
  const is545 = useMediaQuery('(max-width:545px)');
  const is484 = useMediaQuery('(max-width:484px)');
  const is430 = useMediaQuery('(max-width:430px)');
  const is380 = useMediaQuery('(max-width:380px)');
  const is639 = useMediaQuery('(max-width:639px)');

  // Determine height based on viewport width
  let imageHeight = 801;
  let knowMoreButtom = 34;
  let paddingButtomKnow = 1;
  if (is894 && !is740) imageHeight = 772;
  else if (is740 && !is734) imageHeight = 801;
  else if (is734 && !is650) imageHeight = 724;
  else if (is650 && !is545) imageHeight = 587,knowMoreButtom = 22;
  else if (is545 && !is484) imageHeight = 496,knowMoreButtom = 22;
  else if (is484 && !is430) imageHeight = 433,knowMoreButtom = 22;
  else if (is430 && !is380) imageHeight = 381,knowMoreButtom = 15,paddingButtomKnow = .5;
  else if (is380) imageHeight = 331,knowMoreButtom = 6, paddingButtomKnow = .4;

  const handleClick = () => {
    console.log("Button clicked!");
    setModalOpen(true);
  };

  return (
    <Box sx={{ backgroundColor: "#000", py: 6, px: 3 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left Image */}
        <Grid 
  item 
  xs={12} 
  md={4} 
  display="flex" 
  justifyContent="center" 
  sx={{ position: 'relative' }}
>
  <Box
    component="img"
    src="referrel_images/f5005dbc-38e0-42b3-a754-f450f49ff8aa.jpeg"
    alt="T-shirt left"
    sx={{
      width: 801,
      height: imageHeight,
      objectFit: "cover",
      borderRadius: 2,
    }}
  />

  {/* Show button only on small screens */}
  {!isLargeScreen && (
    <AnimatedButton
      whileTap={{ scale: 0.95 }}
      variant="contained"
      onClick={handleClick}
      sx={{
        position: 'absolute',
        bottom: knowMoreButtom,
        backgroundColor: "#fff",
        color: "#000",
        fontWeight: 'bold',
        px: 4,
        py: 1.5,
        pb: paddingButtomKnow,
        width: 300,
        "&:hover": {
          backgroundColor: "#ddd",
        },
      }}
    >
      Know More
    </AnimatedButton>
  )}
</Grid>


        {/* Center Text and Right Image only on large screens */}
        {isLargeScreen && (
          <>
            {/* Center Text */}
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h4" color="white" fontWeight="bold" gutterBottom>
                New Bold and<br />Charismatic
              </Typography>
              <Typography variant="h5" color="white" gutterBottom>
                T-Shirt Collection
              </Typography>
              <Typography variant="body1" color="white" mb={3}>
                Express your energy - Shop now
              </Typography>
              <AnimatedButton
                whileTap={{ scale: 0.95 }}
                variant="outlined"
                color="inherit"
                onClick={handleClick}
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#000",
                  },
                }}
              >
                Shop Now
              </AnimatedButton>
            </Grid>

            {/* Right Image */}
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <Box
                component="img"
                src="referrel_images/f3cd8874-2a18-4327-af78-3460fd4e7610.jpeg"
                alt="T-shirt right"
                sx={{
                  width: 843,
                  height: 778,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Modal */}
      <ComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
};

export default BannerSection;
