'use client';
import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import ComingSoonModal from '../commingsoon/commingsoon';
import { motion } from 'framer-motion';

const AnimatedButton = motion(Button);

const BannerSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    console.log("Shop Now clicked!");
    setModalOpen(true);
  };
  return (
    <Box sx={{ backgroundColor: "#000", py: 6, px: 3 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left Image */}
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Box
            component="img"
            src="//cuteteepie.myshopify.com/cdn/shop/files/WaD2Z_ZlTr2kSiFPMhDFaw.webp?v=1745130964&width=3840"
            alt="T-shirt left"
            sx={{
              width: { xs: 550, sm: 700, md: 550 },  // Adjusts the image width based on screen size
              height: { xs: 600, sm: 700, md: 550 },
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>

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
          {/* <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: "white",
              color: "white",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            Shop Now
          </Button> */}
          <AnimatedButton
            // onClick={() => console.log("clicked")}
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

      <ComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Grid>

        {/* Right Image */}
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Box
            component="img"
            src="//cuteteepie.myshopify.com/cdn/shop/files/h_u0trkkRhyuYa06ouhurg.jpg?v=1745140671&width=3840"
            alt="T-shirt right"
            sx={{
              width: { xs: 550, sm: 700, md: 550 },  // Adjusts the image width based on screen size
              height: { xs: 600, sm: 700, md: 550 },
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BannerSection;
