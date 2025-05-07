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
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '../header/header';
import TrendingProducts from '../trendingproducts/trendingproducts';
import { useRouter } from 'next/navigation';
import WelcomePage from '../welcomenote/welcomenote';
import Footer from '../footer/footer';

export default function ProductDetails({ product }: { product: any }) {
    console.log('ProductDetails received product:', product);
    const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out this product: ${product.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this device.');
    }
  };
  
  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  

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
    <><Header /><Box sx={{ backgroundColor: 'black', color: 'white', p: 4, position: 'relative' }}>
        <Box
            sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'inline-flex', // Use inline-flex to prevent full row usage
                gap: 1,
                zIndex: 10, // Optional: Ensure it appears on top
                bgcolor: 'transparent', // Optional: Avoid unexpected background
            }}
            >
            <Tooltip title="Share">
                <IconButton onClick={handleShare} sx={{ color: 'white' }}>
                <ShareIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Copy URL">
                <IconButton onClick={handleCopyURL} sx={{ color: 'white' }}>
                <ContentCopyIcon />
                </IconButton>
            </Tooltip>
            </Box>


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
                      {product.image_urls.map((img:string, idx:number) => (
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
                                    //   backgroundColor: '#222',
                                  }} />
                          </SwiperSlide>
                      ))}
                  </Swiper>
              </Grid>

              {/* Info Section */}
              <Grid item xs={12} md={6}>
                  <Typography variant="h4" fontWeight={600}>{product.title}</Typography>
                  <Typography variant="h6" color="gold">Only For [₹ {product.price}]</Typography>
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
                      <Typography sx={{ color: 'white' }}>Size: {selectedSize}</Typography>
                      <ToggleButtonGroup
                          value={selectedSize}
                          exclusive
                          onChange={(_, val) => val && setSelectedSize(val)}
                          sx={{ mt: 1 }}
                      >
                          {product.sizes.map((size: string) => (
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
                          {product.colors.map((color:string) => (
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
      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
        message="URL copied to clipboard!"
        />
      <TrendingProducts />
      <WelcomePage />
      <Footer /></>
  );
}
