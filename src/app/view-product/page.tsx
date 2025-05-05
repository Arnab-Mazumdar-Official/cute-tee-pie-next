'use client';
import React, { useState } from 'react';
import {
  Box, Typography, Button, Chip, Grid, ToggleButton, ToggleButtonGroup, IconButton,
  Dialog, DialogTitle, DialogContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '../../../components/header/header';
import TrendingProducts from '../../../components/trendingproducts/trendingproducts';
import { useRouter } from 'next/navigation';
import WelcomePage from '../../../components/welcomenote/welcomenote';
import Footer from '../../../components/footer/footer';

const product = {
  title: "Test new 12",
  description: "test",
  price: 422,
  sizes: ["M", "L"],
  colors: ["Green", "Black", "White"],
  thumbnail_url: "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/3804d9a3-e8dd-418c-bad3-909c90b3c057.jpeg",
  image_urls: [
    "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/80f8b8b7-3af6-481b-87c9-1e4d7d6fde72.jpeg",
    "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/3804d9a3-e8dd-418c-bad3-909c90b3c057.jpeg",
    "https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/fdeb3f1b-dd37-4836-976b-4724bf1a7006.jpeg"
  ],
  active: true,
};

export default function ProductDetails() {
    const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [openSizeChart, setOpenSizeChart] = useState(false);

  const sizeChart = [
    { size: 'EXTRA SMALL', chest: 36, length: 24.5, sleeve: 6.5 },
    { size: 'SMALL', chest: 38, length: 26, sleeve: 7 },
    { size: 'MEDIUM', chest: 40, length: 27, sleeve: 7.5 },
    { size: 'LARGE', chest: 42, length: 28, sleeve: 8 },
    { size: 'XTRA LARGE', chest: 44, length: 29, sleeve: 8.5 },
    { size: '2X LARGE', chest: 46, length: 30, sleeve: 9 },
    { size: '3X LARGE', chest: 48, length: 31, sleeve: 9.5 },
    { size: '4X LARGE', chest: 50, length: 32, sleeve: 10 },
    { size: '5X LARGE', chest: 52, length: 33, sleeve: 10 }
  ];

  return (
    <><Header /><Box sx={{ backgroundColor: 'black', color: 'white', p: 4 }}>
          <Grid container spacing={4}>
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                  <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop
                      style={{ borderRadius: 10 }}
                  >
                      {product.image_urls.map((img, idx) => (
                          <SwiperSlide key={idx}>
                              <Box
                                  component="img"
                                  src={img}
                                  alt={`slide-${idx}`}
                                  sx={{
                                      width: '100%',
                                      height: 450,
                                      objectFit: 'contain',
                                      borderRadius: 2,
                                      backgroundColor: '#222',
                                  }} />
                          </SwiperSlide>
                      ))}
                  </Swiper>
              </Grid>

              {/* Info Section */}
              <Grid item xs={12} md={6}>
                  <Typography variant="h4" fontWeight={600}>{product.title}</Typography>
                  <Typography variant="h6" color="gold">₹ {product.price}</Typography>
                  <Chip label="Limited: 5 Left" color="warning" size="small" sx={{ mt: 1 }} />

                  {/* Promo Box */}
                  <Box bgcolor="#fef1e6" p={2} mt={3} borderRadius={2} color="black">
                    <Typography fontWeight={600} fontSize="1.25rem" color="primary">
                        Get Ready for Something Big!
                    </Typography>
                    <Typography fontSize="1rem" color="textSecondary">
                        Our exclusive collection is coming soon—be the first to get your hands on the latest trends!
                    </Typography>
                    <Chip label="VIP Early Access" color="primary" sx={{ mt: 1 }} />
                    <Typography fontSize="0.875rem" mt={1} color="warning.main">
                        Don't miss out on limited edition styles—sign up for early notifications.
                    </Typography>
                    </Box>


                  {/* Sizes */}
                  <Box mt={3}>
                      <Typography sx={{ color: 'white' }}>Size:</Typography>
                      <ToggleButtonGroup
                          value={selectedSize}
                          exclusive
                          onChange={(_, val) => val && setSelectedSize(val)}
                          sx={{ mt: 1 }}
                      >
                          {product.sizes.map(size => (
                              <ToggleButton
                                  key={size}
                                  value={size}
                                  size="small"
                                  sx={{
                                      color: 'white',
                                      borderColor: 'white',
                                      '&.Mui-selected': {
                                          backgroundColor: '#555',
                                          color: '#fff'
                                      }
                                  }}
                              >
                                  {size}
                              </ToggleButton>
                          ))}
                      </ToggleButtonGroup>
                  </Box>

                  {/* Colors */}
                  <Box mt={3}>
                      <Typography sx={{ color: 'white' }}>Color: {selectedColor}</Typography>
                      <ToggleButtonGroup
                          value={selectedColor}
                          exclusive
                          onChange={(_, val) => val && setSelectedColor(val)}
                          sx={{ mt: 1 }}
                      >
                          {product.colors.map(color => (
                              <ToggleButton
                                  key={color}
                                  value={color}
                                  size="small"
                                  sx={{
                                      color: 'white',
                                      borderColor: 'white',
                                      '&.Mui-selected': {
                                          backgroundColor: '#555',
                                          color: '#fff'
                                      }
                                  }}
                              >
                                  {color}
                              </ToggleButton>
                          ))}
                      </ToggleButtonGroup>
                  </Box>

                  {/* Quantity */}
                  <Box mt={3}>
                      <Typography sx={{ color: 'white' }}>Quantity:</Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ color: 'white' }}>
                              <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ color: 'white' }}>{quantity}</Typography>
                          <IconButton onClick={() => setQuantity(quantity + 1)} sx={{ color: 'white' }}>
                              <AddIcon />
                          </IconButton>
                      </Box>
                  </Box>
                  <Box mt={3} display="flex" gap={1}> {/* Using a smaller gap */}
                    <Button
                        variant="outlined"
                        onClick={() => setOpenSizeChart(true)} // Open the size chart dialog
                        sx={{
                        color: 'white',
                        borderColor: 'white',
                        fontWeight: 600,
                        backgroundColor: '#555', // Adding background color for visibility
                        '&:hover': {
                            backgroundColor: '#444', // Darker on hover
                        }
                        }}
                    >
                        View Size Chart
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => router.push('/')}>
                        Go To Dashboard
                    </Button>
                    </Box>


                  {/* Action Buttons */}
                  <Box mt={3} display="flex" gap={2}>
                      <Button
                          variant="contained"
                          sx={{ bgcolor: '#FFD700', color: '#000', flex: 1, fontWeight: 600 }}
                      >
                          Add to Cart
                      </Button>
                      <Button
                          variant="contained"
                          sx={{ bgcolor: '#FF3131', color: '#fff', flex: 1, fontWeight: 600 }}
                      >
                          Buy it Now
                      </Button>
                  </Box>
              </Grid>

              {/* Size Chart Dialog */}
              <Dialog open={openSizeChart} onClose={() => setOpenSizeChart(false)} maxWidth="sm" fullWidth>
                  <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      ROUND NECK MEN
                  </DialogTitle>
                  <DialogContent>
                      <TableContainer component={Paper}>
                          <Table>
                              <TableHead>
                                  <TableRow>
                                      <TableCell><strong>SIZE</strong></TableCell>
                                      <TableCell align="right"><strong>CHEST</strong></TableCell>
                                      <TableCell align="right"><strong>LENGTH</strong></TableCell>
                                      <TableCell align="right"><strong>SLEEVE</strong></TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {sizeChart.map((row, index) => (
                                      <TableRow key={index}>
                                          <TableCell>{row.size}</TableCell>
                                          <TableCell align="right">{row.chest}</TableCell>
                                          <TableCell align="right">{row.length}</TableCell>
                                          <TableCell align="right">{row.sleeve}</TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </TableContainer>
                  </DialogContent>
              </Dialog>
          </Grid>
      </Box>
      <TrendingProducts />
      <WelcomePage />
      <Footer /></>
  );
}
