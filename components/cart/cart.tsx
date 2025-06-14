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
  Slide
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

// Animated Loading Skeleton Component
const AnimatedSkeleton = () => {
  return (
    <Box sx={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
      {[1, 2, 3].map((index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 2s ease-in-out infinite',
            border: '1px solid #00FFFF',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
              animation: 'shimmer 1.5s infinite',
            }
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
                background: 'linear-gradient(45deg, #333, #555, #333)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 1.5s ease-in-out infinite'
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1, bgcolor: '#444' }} />
              <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1, bgcolor: '#444' }} />
              <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1, bgcolor: '#444' }} />
              <Skeleton variant="text" width="30%" height={20} sx={{ bgcolor: '#444' }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Empty Cart Animation Component
const EmptyCartAnimation = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const router = useRouter();
  const icons = [ShoppingCartOutlined, FavoriteOutlined, LocalFireDepartment, TrendingUp];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = icons[currentIcon];

  return (
    <Fade in timeout={1000}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientMove 3s ease infinite',
          borderRadius: 3,
          padding: 4,
          textAlign: 'center',
          maxWidth: 500,
          margin: 2,
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 3,
            padding: '2px',
            background: 'linear-gradient(45deg, #00FFFF, #FF00FF, #FFFF00, #00FFFF)',
            backgroundSize: '400% 400%',
            animation: 'borderGradient 2s linear infinite',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            zIndex: -1,
          }
        }}
      >
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: 4,
              height: 4,
              backgroundColor: '#00FFFF',
              borderRadius: '50%',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 10px #00FFFF'
            }}
          />
        ))}

        <Zoom in timeout={800}>
          <Box sx={{ mb: 3, position: 'relative' }}>
            <CurrentIcon
              sx={{
                fontSize: 80,
                color: '#00FFFF',
                animation: 'iconPulse 2s ease-in-out infinite',
                filter: 'drop-shadow(0 0 20px #00FFFF)',
                transition: 'all 0.5s ease'
              }}
            />
            <Star
              sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                fontSize: 20,
                color: '#FFD700',
                animation: 'twinkle 1s ease-in-out infinite'
              }}
            />
          </Box>
        </Zoom>

        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00FFFF, #FF00FF)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'textGlow 2s ease-in-out infinite',
            mb: 2
          }}
        >
          Your Cart Awaits Magic! ✨
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#ccc',
            mb: 3,
            animation: 'fadeInUp 1s ease-out 0.5s both'
          }}
        >
          "Style is a way to say who you are without having to speak. Add a t-shirt that speaks for you!"
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<Rocket sx={{ animation: 'rocket 1s ease-in-out infinite' }} />}
          sx={{
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 2s ease infinite',
            color: 'white',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '1.1rem',
            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px) scale(1.05)',
              boxShadow: '0 12px 40px rgba(255, 107, 107, 0.4)',
              animation: 'gradientShift 1s ease infinite, pulse 0.5s ease infinite'
            }
          }}
          onClick={() => router.push('/products')}
        >
          Start Shopping Now!
        </Button>
      </Box>
    </Fade>
  );
};

// Item Animation Wrapper
const AnimatedCartItem = ({ children, index, isWishlist = false }) => {
  return (
    <Slide direction="left" in timeout={300 + index * 100}>
      <Zoom in timeout={500 + index * 50}>
        <Box
          sx={{
            animation: `slideInBounce 0.6s ease-out ${index * 0.1}s both`,
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease'
            }
          }}
        >
          {children}
        </Box>
      </Zoom>
    </Slide>
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
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  // Enhanced CSS animations
  const animationStyles = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes borderGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes iconPulse {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px #00FFFF); }
      50% { transform: scale(1.1); filter: drop-shadow(0 0 30px #00FFFF); }
    }
    
    @keyframes twinkle {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }
    
    @keyframes textGlow {
      0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }
      50% { text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.3); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes rocket {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes slideInBounce {
      0% { transform: translateX(100px) scale(0.8); opacity: 0; }
      60% { transform: translateX(-10px) scale(1.05); opacity: 0.8; }
      100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(255, 107, 107, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
    }
  `;

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

      // Simulate realistic loading time for better UX
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
      }, 1500);
    }
  }, [open]);

  const activeCartItems = cartItems.filter(item => !item.save_for_letter);
  const savedItems = cartItems.filter(item => item.save_for_letter);
  const totalAmount = activeCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <style>{animationStyles}</style>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          width={isSmallScreen ? 300 : 400}
          role="presentation"
          display="flex"
          flexDirection="column"
          height="100%"
          sx={{
            background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated Background Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)',
              animation: 'gradientMove 4s ease-in-out infinite',
              zIndex: 0
            }}
          />

          <Box p={isSmallScreen ? 1 : 2} flexGrow={1} overflow="auto" sx={{ position: 'relative', zIndex: 1 }}>
            {initialLoad ? (
              <AnimatedSkeleton />
            ) : activeCartItems.length === 0 ? (
              <EmptyCartAnimation />
            ) : (
              <>
                {/* Enhanced Cart Header */}
                <Box
                  onClick={() => setCartOpen(!cartOpen)}
                  sx={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 3s ease infinite',
                    p: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    border: '1px solid #00FFFF',
                    boxShadow: '0 4px 20px rgba(0, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 25px rgba(0, 255, 255, 0.3)',
                    }
                  }}
                >
                  <FlashOn sx={{ color: '#FFD700', animation: 'twinkle 1s ease-in-out infinite' }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: '"Georgia", "Times New Roman", serif',
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                    }}
                  >
                    Your Cart Items ({activeCartItems.length})
                  </Typography>
                  {cartOpen ? (
                    <ExpandLess sx={{ color: 'white', animation: 'iconPulse 2s ease-in-out infinite' }} />
                  ) : (
                    <ExpandMore sx={{ color: 'white', animation: 'iconPulse 2s ease-in-out infinite' }} />
                  )}
                </Box>

                {/* Enhanced Cart Items */}
                <Collapse in={cartOpen}>
                  <List>
                    {activeCartItems.map((item, index) => (
                      <AnimatedCartItem key={item._id} index={index}>
                        <Box
                          sx={{
                            position: 'relative',
                            display: 'flex',
                            border: '1px solid #00FFFF',
                            borderRadius: 2,
                            p: isSmallScreen ? 1 : 2,
                            mb: 2,
                            background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 50%, #121212 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 4s ease infinite',
                            color: 'white',
                            alignItems: 'center',
                            boxShadow: '0 4px 15px rgba(0, 255, 255, 0.1)',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)',
                              animation: 'shimmer 3s infinite',
                            }
                          }}
                        >
                          <IconButton
                            onClick={() => handleDelete(item._id)}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              color: 'white',
                              border: '2px solid white',
                              borderRadius: '50%',
                              padding: '4px',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.1) rotate(90deg)',
                                borderColor: '#FF6B6B',
                                color: '#FF6B6B',
                                boxShadow: '0 0 15px rgba(255, 107, 107, 0.5)'
                              }
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
                              border: '2px solid #00FFFF',
                              boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                              }
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
                              sx={{
                                background: 'linear-gradient(45deg, #00FFFF, #FF00FF)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'textGlow 2s ease-in-out infinite'
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#ccc' }}>Size: {item.size}</Typography>
                            <Typography variant="body2" sx={{ color: '#ccc' }}>Color: {item.color}</Typography>
                            <Typography variant="body2" sx={{ color: '#ccc' }}>Qty: {item.quantity}</Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'cyan',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                              }}
                            >
                              ₹{item.price}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Button
                                size="small"
                                variant="text"
                                onClick={() => handleProductClick(item.product_id)}
                                sx={{
                                  color: 'cyan',
                                  border: '1px solid white',
                                  minWidth: 'auto',
                                  px: 1,
                                  py: 0.5,
                                  fontSize: '0.75rem',
                                  borderRadius: 2,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                    borderColor: 'cyan',
                                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                                  }
                                }}
                              >
                                View Product
                              </Button>

                              <Button
                                size="small"
                                variant="text"
                                onClick={() => toggleSaveForLater(item._id)}
                                sx={{
                                  color: 'cyan',
                                  border: '1px solid white',
                                  minWidth: 'auto',
                                  px: 1,
                                  py: 0.5,
                                  fontSize: '0.75rem',
                                  borderRadius: 2,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                    borderColor: '#FF00FF',
                                    color: '#FF00FF',
                                    boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)'
                                  }
                                }}
                              >
                                Save As Wishlist
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </AnimatedCartItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}

            {/* Enhanced Wishlist Section */}
            {savedItems.length > 0 && (
              <>
                <Divider sx={{ my: 3, borderColor: '#333' }} />
                <Box
                  onClick={() => setWishlistOpen(!wishlistOpen)}
                  sx={{
                    background: 'linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 3s ease infinite',
                    p: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    border: '1px solid #FF00FF',
                    boxShadow: '0 4px 20px rgba(255, 0, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 25px rgba(255, 0, 255, 0.3)',
                    }
                  }}
                >
                  <FavoriteOutlined sx={{ color: '#FFD700', animation: 'iconPulse 2s ease-in-out infinite' }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: '"Georgia", "Times New Roman", serif',
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(255, 0, 255, 0.5)'
                    }}
                  >
                    Your Wishlisted Items ({savedItems.length})
                  </Typography>
                  {wishlistOpen ? (
                    <ExpandLess sx={{ color: 'white', animation: 'iconPulse 2s ease-in-out infinite' }} />
                  ) : (
                    <ExpandMore sx={{ color: 'white', animation: 'iconPulse 2s ease-in-out infinite' }} />
                  )}
                </Box>

                <Collapse in={wishlistOpen}>
                  <List>
                    {savedItems.map((item, index) => (
                      <AnimatedCartItem key={item._id} index={index} isWishlist={true}>
                        <Box
                          sx={{
                            position: 'relative',
                            display: 'flex',
                            border: '1px solid #FF00FF',
                            borderRadius: 2,
                            p: isSmallScreen ? 1 : 2,
                            mb: 2,
                            background: 'linear-gradient(135deg, #1a0033 0%, #2d1a4d 50%, #1a0033 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 4s ease infinite',
                            color: 'white',
                            alignItems: 'center',
                            boxShadow: '0 4px 15px rgba(255, 0, 255, 0.1)',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.1), transparent)',
                              animation: 'shimmer 3s infinite',
                            }
                          }}
                        >
                          <IconButton
                            onClick={() => handleDelete(item._id)}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              color: 'white',
                              border: '2px solid white',
                              borderRadius: '50%',
                              padding: '4px',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.1) rotate(90deg)',
                                borderColor: '#FF6B6B',
                                color: '#FF6B6B',
                                boxShadow: '0 0 15px rgba(255, 107, 107, 0.5)'
                              }
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
                              border: '2px solid #FF00FF',
                              boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)'
                              }
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
                              sx={{
                                background: 'linear-gradient(45deg, #FF00FF, #FFD700)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'textGlow 2s ease-in-out infinite'
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#ccc' }}>Size: {item.size}</Typography>
                            <Typography variant="body2" sx={{ color: '#ccc' }}>Color: {item.color}</Typography>
                            <Typography variant="body2" sx={{ color: '#ccc' }}>Qty: {item.quantity}</Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#FF00FF',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                textShadow: '0 0 10px rgba(255, 0, 255, 0.5)'
                              }}
                            >
                              ₹{item.price}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Button
                                size="small"
                                variant="text"
                                onClick={() => handleProductClick(item.product_id)}
                                sx={{
                                  color: '#FF00FF',
                                  border: '1px solid white',
                                  minWidth: 'auto',
                                  px: 1,
                                  py: 0.5,
                                  fontSize: '0.75rem',
                                  borderRadius: 2,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                    borderColor: '#FF00FF',
                                    boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)'
                                  }
                                }}
                              >
                                View Product
                              </Button>

                              <Button
                                size="small"
                                variant="text"
                                onClick={() => toggleSaveForLater(item._id)}
                                sx={{
                                  color: '#FF00FF',
                                  border: '1px solid white',
                                  minWidth: 'auto',
                                  px: 1,
                                  py: 0.5,
                                  fontSize: '0.75rem',
                                  borderRadius: 2,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                    borderColor: '#00FFFF',
                                    color: '#00FFFF',
                                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                                  }
                                }}
                              >
                                Move to Cart
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </AnimatedCartItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Box>

          {/* Enhanced Total & Checkout Section */}
          {activeCartItems.length > 0 && (
            <Box
              p={isSmallScreen ? 1 : 2}
              borderTop="1px solid #333"
              sx={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite',
                color: 'white',
                position: 'relative',
                zIndex: 1,
                borderRadius: '20px 20px 0 0',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)'
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #00FFFF, #FF00FF)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  animation: 'textGlow 2s ease-in-out infinite'
                }}
              >
                💰 Total Breakdown
              </Typography>

              <Box sx={{ maxHeight: 100, overflow: 'auto', mb: 2 }}>
                {activeCartItems.map((item, index) => (
                  <Fade in timeout={300 + index * 100} key={item.id}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 0.5,
                        p: 1,
                        borderRadius: 1,
                        background: 'rgba(0, 255, 255, 0.1)',
                        border: '1px solid rgba(0, 255, 255, 0.2)',
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <span>{item.title} x {item.quantity}</span>
                      <span style={{ fontWeight: 'bold', color: '#00FFFF' }}>₹{item.price * item.quantity}</span>
                    </Typography>
                  </Fade>
                ))}
              </Box>

              <Divider sx={{ my: 2, borderColor: 'rgba(0, 255, 255, 0.3)' }} />

              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  mb: 3,
                  background: 'linear-gradient(45deg, #FFD700, #FF6B6B)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  animation: 'textGlow 2s ease-in-out infinite',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                }}
              >
                🎯 Total: ₹{totalAmount.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={handelCheckOut}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)',
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 2s ease infinite',
                  color: 'white',
                  fontWeight: 'bold',
                  py: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 15px 40px rgba(255, 107, 107, 0.6)',
                    animation: 'gradientShift 1s ease infinite, pulse 0.5s ease infinite'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    animation: 'shimmer 2s infinite',
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
                      background: 'linear-gradient(45deg, #00FFFF, #FF00FF)',
                      animation: 'gradientShift 1s ease infinite'
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
              background: snackbar.severity === 'error' 
                ? 'linear-gradient(45deg, #FF6B6B, #FF8E8E)'
                : 'linear-gradient(45deg, #4ECDC4, #44A08D)',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Drawer>
    </>
  );
}