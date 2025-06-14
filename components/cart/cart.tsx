'use client';

import {
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
  List,
  IconButton,
  useMediaQuery,
  Alert,
  Snackbar,
  Collapse,
  LinearProgress,
  Skeleton,
  Card,
  CardContent,
  Fade,
  Zoom,
  Slide,
  useTheme
} from '@mui/material';
import { 
  DeleteOutline, 
  ExpandLess, 
  ExpandMore, 
  ShoppingCartOutlined,
  FavoriteOutlined,
  LocalFireDepartment,
  TrendingUp,
  FlashOn,
  Star,
  Rocket
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import CartNotice from '../cartnotice/cartnotice';

type CartItem = {
  _id: string;
  id: string;
  title: string;
  description: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  thumbnail_url: string;
  save_for_letter: boolean;
  product_id: string;
};

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

// Simple Loading Skeleton Component
const LoadingSkeleton = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <Box>
      {[1, 2, 3].map((index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            backgroundColor: isDarkMode ? '#000' : '#fff',
            border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={80}
              sx={{
                borderRadius: 2,
                mr: 2,
                bgcolor: isDarkMode ? '#333' : '#f0f0f0'
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1, bgcolor: isDarkMode ? '#333' : '#f0f0f0' }} />
              <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1, bgcolor: isDarkMode ? '#333' : '#f0f0f0' }} />
              <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1, bgcolor: isDarkMode ? '#333' : '#f0f0f0' }} />
              <Skeleton variant="text" width="30%" height={20} sx={{ bgcolor: isDarkMode ? '#333' : '#f0f0f0' }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Empty Cart Component with Icon Changes Only
const EmptyCartDisplay = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const icons = [ShoppingCartOutlined, FavoriteOutlined, LocalFireDepartment, TrendingUp];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = icons[currentIcon];

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
        border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
        borderRadius: 3,
        padding: 4,
        textAlign: 'center',
        maxWidth: 500,
        margin: 2,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <CurrentIcon
          sx={{
            fontSize: 80,
            color: isDarkMode ? '#fff' : '#000',
          }}
        />
      </Box>

      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: isDarkMode ? '#fff' : '#000',
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Your Cart Awaits Magic! ✨
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: isDarkMode ? '#fff' : '#000',
          mb: 3,
        }}
      >
        "Style is a way to say who you are without having to speak. Add a t-shirt that speaks for you!"
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<Rocket />}
        sx={{
          backgroundColor: isDarkMode ? '#fff' : '#000',
          color: isDarkMode ? '#000' : '#fff',
          fontWeight: 'bold',
          px: 4,
          py: 1.5,
          borderRadius: 3,
          textTransform: 'none',
          fontSize: '1.1rem',
          '&:hover': {
            backgroundColor: isDarkMode ? '#f0f0f0' : '#333',
          }
        }}
        onClick={() => router.push('/products')}
      >
        Start Shopping Now!
      </Button>
    </Box>
  );
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isSmallScreen = useMediaQuery('(max-width:578px)');
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(true);
  const router = useRouter();
  const [noticemodal, setNoticemodal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const getUserIdFromCookie = (): string | null => {
    try {
      const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, curr) => {
        const [key, value] = curr.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});

      if (cookies.user_login_data) {
        const userData = JSON.parse(cookies.user_login_data);
        return userData._id || null;
      }
    } catch (error) {
      console.error('Failed to parse user_login_data cookie:', error);
    }
    return null;
  };

  const handleDelete = async (_id: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }),
      });

      const result = await res.json();

      if (result.success) {
        const userId = getUserIdFromCookie();
        if (!userId) return;

        const cartRes = await fetch(`/api/cart?user_id=${userId}`);
        const cartData = await cartRes.json();
        setCartItems(cartData.data || []);
        setLoading(false);
      } else {
        setLoading(false);
        setSnackbar({
          open: true,
          message: 'Failed to delete item',
          severity: 'error',
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        severity: 'error',
      });
    }
  };

  const handelCheckOut = async () => {
    const updatedCartItems = activeCartItems.map(item => ({
      ...item,
      selectedColor: item.color,
      selectedSize: item.size,
      source: 'cart'
    }));

    console.log("Updated Cart Items with selectedColor and selectedSize:", updatedCartItems);

    if (updatedCartItems.length > 3) {
      setNoticemodal(true);
      return;
    }
    const userLoginData = Cookies.get('user_login_data');

    try {
      const parsedUser = userLoginData ? JSON.parse(userLoginData) : null;

      if (!parsedUser || !parsedUser._id) {
        setSnackbar({
          open: true,
          message: 'You need to log in to proceed.',
          severity: 'error',
        });
        router.push('/login');
        return;
      }

      const orders = updatedCartItems;
      const in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set('user_order_data', JSON.stringify(orders), { expires: in15Minutes });

      router.push('/address');

    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error validating user session.',
        severity: 'error',
      });
      router.push('/login');
    }
  }

  const toggleSaveForLater = async (_id: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/toggle-save-for-later', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }),
      });

      const result = await response.json();

      if (result.success) {
        setLoading(false)
        const userId = getUserIdFromCookie();
        if (!userId) return;

        const cartRes = await fetch(`/api/cart?user_id=${userId}`);
        const cartData = await cartRes.json();
        setCartItems(cartData.data || []);
      } else {
        setLoading(false)
        setSnackbar({
          open: true,
          message: 'Failed to toggle save_for_letter',
          severity: 'error',
        });
      }
    } catch (error) {
      setLoading(false)
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        severity: 'error',
      });
    }
  };

  const handleProductClick = async (product_id: String) => {
    try {
      setLoading(true)
      const response = await fetch('/api/fetch-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id }),
      });

      if (!response.ok) {
        setLoading(false)
        throw new Error('Failed to fetch product')
      }

      setLoading(false)
      const data = await response.json();
      console.log("Fetching Slug data", data);

      if (data.data.slug) {
        const route = `/blog/${data.data.slug}`;
        router.push(route);
      } else {
        console.error('Slug not found in response');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    if (open) {
      const userId = getUserIdFromCookie();
      if (!userId) return;

      setLoading(true);
      setInitialLoad(true);

      setTimeout(() => {
        fetch(`/api/cart?user_id=${userId}`)
          .then(res => res.json())
          .then(data => {
            setCartItems(data.data || []);
            setInitialLoad(false);
          })
          .catch(console.error)
          .finally(() => {
            setLoading(false);
          });
      }, 1000);
    }
  }, [open]);

  const activeCartItems = cartItems.filter(item => !item.save_for_letter);
  const savedItems = cartItems.filter(item => item.save_for_letter);
  const totalAmount = activeCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          width={isSmallScreen ? 300 : 400}
          role="presentation"
          display="flex"
          flexDirection="column"
          height="100%"
          sx={{
            backgroundColor: isDarkMode ? '#000' : '#fff',
          }}
        >
          <Box p={isSmallScreen ? 1 : 2} flexGrow={1} overflow="auto">
            {initialLoad ? (
              <LoadingSkeleton />
            ) : activeCartItems.length === 0 ? (
              <EmptyCartDisplay />
            ) : (
              <>
                {/* Cart Header */}
                <Box
                  onClick={() => setCartOpen(!cartOpen)}
                  sx={{
                    backgroundColor: isDarkMode ? '#000' : '#fff',
                    border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
                    p: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <FlashOn sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: isDarkMode ? '#fff' : '#000',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    Your Cart Items ({activeCartItems.length})
                  </Typography>
                  {cartOpen ? (
                    <ExpandLess sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                  ) : (
                    <ExpandMore sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                  )}
                </Box>

                {/* Cart Items */}
                <Collapse in={cartOpen}>
                  <List>
                    {activeCartItems.map((item, index) => (
                      <Box
                        key={item._id}
                        sx={{
                          display: 'flex',
                          border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
                          borderRadius: 2,
                          p: isSmallScreen ? 1 : 2,
                          mb: 2,
                          backgroundColor: isDarkMode ? '#000' : '#fff',
                          color: isDarkMode ? '#fff' : '#000',
                          alignItems: 'center',
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          onClick={() => handleDelete(item._id)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: isDarkMode ? '#fff' : '#000',
                            border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
                            borderRadius: '50%',
                            padding: '4px',
                          }}
                        >
                          <DeleteOutline />
                        </IconButton>

                        <Box
                          sx={{
                            width: isSmallScreen ? 60 : 80,
                            height: isSmallScreen ? 60 : 80,
                            mr: 2,
                            flexShrink: 0,
                            borderRadius: 2,
                            overflow: 'hidden',
                            border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
                          }}
                        >
                          <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            fontWeight="bold"
                            fontSize={isSmallScreen ? '0.9rem' : '1rem'}
                            sx={{ color: isDarkMode ? '#fff' : '#000' }}
                          >
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: isDarkMode ? '#fff' : '#000' }}>Size: {item.size}</Typography>
                          <Typography variant="body2" sx={{ color: isDarkMode ? '#fff' : '#000' }}>Color: {item.color}</Typography>
                          <Typography variant="body2" sx={{ color: isDarkMode ? '#fff' : '#000' }}>Qty: {item.quantity}</Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDarkMode ? '#fff' : '#000',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                            }}
                          >
                            ₹{item.price}
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleProductClick(item.product_id)}
                              sx={{
                                color: isDarkMode ? '#fff' : '#000',
                                borderColor: isDarkMode ? '#fff' : '#000',
                                minWidth: 'auto',
                                px: 1,
                                py: 0.5,
                                fontSize: '0.75rem',
                                borderRadius: 2,
                              }}
                            >
                              View Product
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => toggleSaveForLater(item._id)}
                              sx={{
                                color: isDarkMode ? '#fff' : '#000',
                                borderColor: isDarkMode ? '#fff' : '#000',
                                minWidth: 'auto',
                                px: 1,
                                py: 0.5,
                                fontSize: '0.75rem',
                                borderRadius: 2,
                              }}
                            >
                              Save As Wishlist
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </List>
                </Collapse>
              </>
            )}

            {/* Wishlist Section */}
            {savedItems.length > 0 && (
              <>
                <Divider sx={{ my: 3, borderColor: isDarkMode ? '#fff' : '#000' }} />
                <Box
                  onClick={() => setWishlistOpen(!wishlistOpen)}
                  sx={{
                    backgroundColor: isDarkMode ? '#000' : '#fff',
                    border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
                    p: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <FavoriteOutlined sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: isDarkMode ? '#fff' : '#000',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    Your Wishlisted Items ({savedItems.length})
                  </Typography>
                  {wishlistOpen ? (
                    <ExpandLess sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                  ) : (
                    <ExpandMore sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                  )}
                </Box>

                <Collapse in={wishlistOpen}>
                  <List>
                    {savedItems.map((item, index) => (
                      <Box
                        key={item._id}
                        sx={{
                          display: 'flex',
                          border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
                          borderRadius: 2,
                          p: isSmallScreen ? 1 : 2,
                          mb: 2,
                          backgroundColor: isDarkMode ? '#000' : '#fff',
                          color: isDarkMode ? '#fff' : '#000',
                          alignItems: 'center',
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          onClick={() => handleDelete(item._id)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: isDarkMode ? '#fff' : '#000',
                            border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
                            borderRadius: '50%',
                            padding: '4px',
                          }}
                        >
                          <DeleteOutline />
                        </IconButton>

                        <Box
                          sx={{
                            width: isSmallScreen ? 60 : 80,
                            height: isSmallScreen ? 60 : 80,
                            mr: 2,
                            flexShrink: 0,
                            borderRadius: 2,
                            overflow: 'hidden',
                            border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
                          }}
                        >
                          <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            fontWeight="bold"
                            fontSize={isSmallScreen ? '0.9rem' : '1rem'}
                            sx={{ color: isDarkMode ? '#fff' : '#000' }}
                          >
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: isDarkMode ? '#fff' : '#000' }}>Size: {item.size}</Typography>
                          <Typography variant="body2" sx={{ color: isDarkMode ? '#fff' : '#000' }}>Color: {item.color}</Typography>
                          <Typography variant="body2" sx={{ color: isDarkMode ? '#fff' : '#000' }}>Qty: {item.quantity}</Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDarkMode ? '#fff' : '#000',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                            }}
                          >
                            ₹{item.price}
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleProductClick(item.product_id)}
                              sx={{
                                color: isDarkMode ? '#fff' : '#000',
                                borderColor: isDarkMode ? '#fff' : '#000',
                                minWidth: 'auto',
                                px: 1,
                                py: 0.5,
                                fontSize: '0.75rem',
                                borderRadius: 2,
                              }}
                            >
                              View Product
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => toggleSaveForLater(item._id)}
                              sx={{
                                color: isDarkMode ? '#fff' : '#000',
                                borderColor: isDarkMode ? '#fff' : '#000',
                                minWidth: 'auto',
                                px: 1,
                                py: 0.5,
                                fontSize: '0.75rem',
                                borderRadius: 2,
                              }}
                            >
                              Move to Cart
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Box>

          {/* Total & Checkout Section */}
          {activeCartItems.length > 0 && (
            <Box
              p={isSmallScreen ? 1 : 2}
              borderTop={`1px solid ${isDarkMode ? '#fff' : '#000'}`}
              sx={{
                backgroundColor: isDarkMode ? '#000' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  textAlign: 'center',
                  color: isDarkMode ? '#fff' : '#000',
                  fontWeight: 'bold',
                }}
              >
                💰 Total Breakdown
              </Typography>

              <Box sx={{ maxHeight: 100, overflow: 'auto', mb: 2 }}>
                {activeCartItems.map((item, index) => (
                  <Typography
                    key={item.id}
                    variant="body2"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5,
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: isDarkMode ? '#000' : '#fff',
                      border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
                      color: isDarkMode ? '#fff' : '#000',
                    }}
                  >
                    <span>{item.title} x {item.quantity}</span>
                    <span style={{ fontWeight: 'bold' }}>₹{item.price * item.quantity}</span>
                  </Typography>
                ))}
              </Box>

              <Divider sx={{ my: 2, borderColor: isDarkMode ? '#fff' : '#000' }} />

              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  mb: 3,
                  color: isDarkMode ? '#fff' : '#000',
                  fontWeight: 'bold',
                }}
              >
                🎯 Total: ₹{totalAmount.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={handelCheckOut}
                sx={{
                  backgroundColor: isDarkMode ? '#fff' : '#000',
                  color: isDarkMode ? '#000' : '#fff',
                  fontWeight: 'bold',
                  py: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#f0f0f0' : '#333',
                  }
                }}
              >
                🚀 Proceed to Checkout
              </Button>

              {loading && (
                <LinearProgress
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1200,
                    height: 4,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: isDarkMode ? '#fff' : '#000',
                    }
                  }}
                />
              )}

              <CartNotice open={noticemodal} onClose={() => setNoticemodal(false)} />
            </Box>
          )}
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{
              width: '100%',
              backgroundColor: snackbar.severity === 'error' 
                ? (isDarkMode ? '#000' : '#fff')
                : (isDarkMode ? '#000' : '#fff'),
              color: isDarkMode ? '#fff' : '#000',
              border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
              fontWeight: 'bold',
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Drawer>
    </>
  );
}