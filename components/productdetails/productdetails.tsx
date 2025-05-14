'use client';
import React, { useState } from 'react';
import {
  Box, Typography, Button, Chip, Grid, ToggleButton, ToggleButtonGroup, IconButton,
  Dialog, DialogTitle, DialogContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Tooltip, Snackbar, Slide,
  LinearProgress
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Header from '../header/header';
import TrendingProducts from '../trendingproducts/trendingproducts';
import WelcomePage from '../welcomenote/welcomenote';
import Footer from '../footer/footer';
import Cookies from 'js-cookie';
import Alert from '@mui/material/Alert'; 
import CartDrawer from '../cart/cart';
import { useTheme } from '@mui/material/styles';
import AnnouncementBar from '../anouncement/announcement';
import LoginNeeded from '../loginneed/loginneed';

const Transition = React.forwardRef(function Transition(
    props: any,
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function ProductDetails({ product }: { product: any }) {
    
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');
  const [loading, setLoading] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openLogineed, setOpenLogineed] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';



  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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

  const buyItNow = async () => {
    const userLoginData = Cookies.get('user_login_data');

    try {
      const parsedUser = userLoginData ? JSON.parse(userLoginData) : null;

      if (!parsedUser || !parsedUser._id) {
        setSnackbarMessage('You need to log in to proceed.');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
        setOpenLogineed(true); // Show modal if not logged in
        return;
      }

      const orders = [{
        ...product,
        selectedColor,
        selectedSize,
        quantity:quantity
      }];

      const in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set('user_order_data', JSON.stringify(orders), { expires: in15Minutes });

      router.push('/address');

    } catch (error) {
      setSnackbarMessage('Error validating user session.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      router.push('/login');
    }
  };
  const addToCart = async () => {
  const userLoginData = Cookies.get('user_login_data');
  const parsedUser = userLoginData ? JSON.parse(userLoginData) : null;

  if (!parsedUser || !parsedUser._id) {
    setSnackbarMessage('You need to log in to proceed.');
    setSnackbarSeverity('warning');
    setSnackbarOpen(true);
    setOpenLogineed(true); // Show modal if not logged in
    return;
  }

  const payload = {
    size: selectedSize,
    color: selectedColor,
    product_id: product._id,
    description: product.description,
    title: product.title,
    price: product.price,
    user_id: parsedUser._id,
    quantity: quantity,
    thumbnail_url:product.thumbnail_url,
    save_for_letter:false
  };
  setLoading(true)
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      setSnackbarMessage('Product added to cart successfully.');
      setSnackbarSeverity('success');
      setOpenCart(true);
    } else {
      setSnackbarMessage(result.message || 'Failed to add to cart.');
      setSnackbarSeverity('error');
    }
  } catch (error) {
    setSnackbarMessage('An error occurred while adding to cart.');
    setSnackbarSeverity('error');
  }
  finally{
    setLoading(false)
  }

  setSnackbarOpen(true);
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
    <>
    {loading && <LinearProgress />}
    <AnnouncementBar/>
      <Header />

      <Box
        sx={{
          backgroundColor: isDarkMode ? 'black' : 'white',
          color: isDarkMode ? 'white' : 'black',
          p: 4,
          position: 'relative',
        }}
      >

        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'inline-flex',
            gap: 1,
            zIndex: 10,
            bgcolor: 'transparent',
          }}
        >
          <Tooltip title="Share">
            <IconButton onClick={handleShare} sx={{ color: isDarkMode ? 'white' : 'black' }}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy URL">
            <IconButton onClick={handleCopyURL} sx={{ color: isDarkMode ? 'white' : 'black' }}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Swiper container */}
                <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
                  {/* Image slider */}
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{
                      clickable: true,
                      el: '.custom-swiper-pagination',
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                    style={{ borderRadius: 10 }}
                  >
                    {product.image_urls.map((img: string, idx: number) => (
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
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Pagination container placed BELOW the image */}
                  <Box
                    className="custom-swiper-pagination"
                    sx={{ textAlign: 'center', mt: 2 }}
                  />
                </Box>

                {/* Custom pagination bullet styles */}
                <style jsx global>{`
                  .custom-swiper-pagination .swiper-pagination-bullet {
                    background-color: #999;
                    opacity: 1;
                    margin: 0 4px;
                  }
                  .custom-swiper-pagination .swiper-pagination-bullet-active {
                    background-color: ${isDarkMode ? 'blue' : 'black'};
                  }
                `}</style>
              </motion.div>
          </Grid>

          {/* Info Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Typography variant="h4" fontWeight={600}>{product.title}</Typography>
              <Typography variant="h6" color="gold">Only For [₹ {product.price}]</Typography>
              <Chip label="Limited: 5 Left" color="warning" size="small" sx={{ mt: 1 }} />

              {/* Promo Box */}
              <Box bgcolor={isDarkMode ? '#fef1e6' : '#fffbe6'} p={2} mt={3} borderRadius={2} color={isDarkMode ? 'black' : 'black'}>
                <Typography fontWeight={600} fontSize="1.25rem" color="primary">
                  Get Ready for Something Big!
                </Typography>
                <Typography fontSize="1rem" color="black">
                  Our exclusive collection is coming soon—be the first to get your hands on the latest trends!
                </Typography>
                <Chip label="VIP Early Access" color="primary" sx={{ mt: 1 }} />
                <Typography fontSize="0.875rem" mt={1} color="warning.main">
                  Don't miss out on limited edition styles—sign up for early notifications.
                </Typography>
              </Box>

              {/* Sizes */}
              <Box mt={3}>
                <Typography sx={{ color: isDarkMode ? 'white' : 'black' }}>Size: {selectedSize}</Typography>
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
                          color: isDarkMode ? 'white' : 'black',
                          borderColor: isDarkMode ? 'white' : 'black',
                          '&.Mui-selected': {
                            backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
                            color: isDarkMode ? 'white' : 'black',
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
                <Typography sx={{ color: isDarkMode ? 'white' : 'black' }}>Color: {selectedColor}</Typography>
                <ToggleButtonGroup
                  value={selectedColor}
                  exclusive
                  onChange={(_, val) => val && setSelectedColor(val)}
                  sx={{ mt: 1 }}
                >
                  {product.colors.map((color: string) => (
                    <ToggleButton
                      key={color}
                      value={color}
                      size="small"
                      sx={{
                        color: isDarkMode ? 'white' : 'black',
                        borderColor:  isDarkMode ? 'white' : 'black',
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
                <Typography sx={{ color: isDarkMode ? 'white' : 'black' }}>Quantity:</Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ color: isDarkMode ? 'white' : 'black' }}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ color: isDarkMode ? 'white' : 'black' }}>{quantity}</Typography>
                  <IconButton onClick={() => setQuantity(quantity + 1)} sx={{ color: isDarkMode ? 'white' : 'black' }}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Buttons */}
              <Box mt={3} display="flex" gap={1}>
                <Button
                  variant="outlined"
                  onClick={() => setOpenSizeChart(true)}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    fontWeight: 600,
                    backgroundColor: '#555',
                    '&:hover': {
                      backgroundColor: '#444',
                    }
                  }}
                >
                  View Size Chart
                </Button>
                <Button variant="outlined" color="primary" onClick={() => router.push('/')}>
                  Go To Dashboard
                </Button>
              </Box>

              {/* Action Buttons with animation */}
              <Box mt={3} display="flex" gap={2}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
                  <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#FFD700',
                        color: '#000',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: '#e6c200',
                        }
                      }}
                      fullWidth
                      onClick={addToCart}
                    >
                    Add to Cart
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
                <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#FF3131',
                      color: '#fff',
                      fontWeight: 600,
                      boxShadow: '0 0 10px rgba(255,49,49,0.5)',
                      '&:hover': {
                        boxShadow: '0 0 20px rgba(255,49,49,0.8)',
                      }
                    }}
                    fullWidth
                    onClick={buyItNow}
                  >
                    Buy it Now
                    </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>

          {/* Size Chart Dialog */}
          <Dialog
            open={openSizeChart}
            onClose={() => setOpenSizeChart(false)}
            maxWidth="sm"
            fullWidth
            TransitionComponent={Transition}
          >
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: isDarkMode ? 'white' : 'black' }}>
              SIZE CHART
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
        <LoginNeeded open={openLogineed} onClose={() => setOpenLogineed(false)} />
      </Box>

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
        message="URL copied to clipboard!"
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert  onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert >
      </Snackbar>
      <TrendingProducts />
      <WelcomePage />
      <Footer />
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}
