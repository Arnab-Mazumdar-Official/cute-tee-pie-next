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
  LinearProgress
} from '@mui/material';
import { DeleteOutline, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState, useEffect } from 'react';
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
};

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isSmallScreen = useMediaQuery('(max-width:578px)');
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(true);
  const router = useRouter();
  const [noticemodal, setNoticemodal] = useState(false);
  const [loading, setLoading] = useState(false);
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
      // setSnackbar({
      //   open: true,
      //   message: 'Item deleted successfully',
      //   severity: 'error',
      // });
      // Optionally refetch cart items here
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
    source:'cart'
  }));

  console.log("Updated Cart Items with selectedColor and selectedSize:", updatedCartItems);

  if(updatedCartItems.length > 3){
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

    // console.log("Orders--------->>",orders);
    

    const in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
    Cookies.set('user_order_data', JSON.stringify(orders), { expires: in15Minutes });

    router.push('/address');

  } catch (error) {setSnackbar({
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
      // setSnackbar({
      //   open: true,
      //   message: 'Item save_for_letter toggled successfully',
      //   severity: 'success',
      // });

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

  useEffect(() => {
    if (open) {
      const userId = getUserIdFromCookie();
      if (!userId) return;

      fetch(`/api/cart?user_id=${userId}`)
        .then(res => res.json())
        .then(data => setCartItems(data.data || []))
        .catch(console.error);
    }
  }, [open]);

  const activeCartItems = cartItems.filter(item => !item.save_for_letter);
  const savedItems = cartItems.filter(item => item.save_for_letter);

  const totalAmount = activeCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      
      <Box
        width={isSmallScreen ? 300 : 400}
        role="presentation"
        display="flex"
        flexDirection="column"
        height="100%"
      >
        {/* {loading && <LinearProgress />} */}
      {
        activeCartItems.length === 0 && (
          <Box
            sx={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: 2,
              padding: 4,
              textAlign: 'center',
              maxWidth: 500,
              margin: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Your cart is empty!
            </Typography>
            <Typography variant="body1">
              "Style is a way to say who you are without having to speak. Add a t-shirt that speaks for you!"
            </Typography>
          </Box>
        )
      }

        <Box p={isSmallScreen ? 1 : 2} flexGrow={1} overflow="auto">
          {activeCartItems.length > 0 && (
  <>
  
        

    {/* Cart Header with Toggle */}
    <Box
      onClick={() => setCartOpen(!cartOpen)}
      sx={{
        backgroundColor: 'black',
        p: 2,
        borderRadius: 2,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      
      <Typography
        variant="subtitle1"
        sx={{
          color: 'white',
          textAlign: 'center',
          fontFamily: '"Georgia", "Times New Roman", serif',
        }}
      >
        Your Cart Items
      </Typography>
      {cartOpen ? (
        <ExpandLess sx={{ color: 'white' }} />
      ) : (
        <ExpandMore sx={{ color: 'white' }} />
      )}
    </Box>

    {/* Collapsible Cart Items */}
    <Collapse in={cartOpen}>
      <List>
        {activeCartItems.map((item) => (
          <Box
            key={item._id}
            sx={{
              position: 'relative',
              display: 'flex',
              border: '1px solid #00FFFF',
              borderRadius: 2,
              p: isSmallScreen ? 1 : 2,
              mb: 2,
              backgroundColor: '#121212',
              color: 'white',
              alignItems: 'center',
            }}
          >
            {/* Delete Icon */}
            <IconButton
              onClick={() => handleDelete(item._id)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
                border: '2px solid white',
                borderRadius: '50%', 
                padding: '4px'
              }}
            >
              <DeleteOutline />
            </IconButton>

            {/* Image */}
            <Box
              sx={{
                width: isSmallScreen ? 60 : 80,
                height: isSmallScreen ? 60 : 80,
                mr: 2,
                flexShrink: 0,
              }}
            >
              <img
                src={item.thumbnail_url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </Box>

            {/* Info Section */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                fontWeight="bold"
                fontSize={isSmallScreen ? '0.9rem' : '1rem'}
              >
                {item.title}
              </Typography>
              <Typography variant="body2">Size: {item.size}</Typography>
              <Typography variant="body2">Color: {item.color}</Typography>
              <Typography variant="body2">Qty: {item.quantity}</Typography>
              <Typography variant="body2" color="cyan">
                ₹{item.price}
              </Typography>

              <Button
                size="small"
                variant="text"
                onClick={() => toggleSaveForLater(item._id)}
                sx={{ mt: 1, color: 'cyan', border: '1px solid white' }}
              >
                Save As Wishlisted Items
              </Button>
            </Box>
          </Box>
        ))}
      </List>
    </Collapse>
  </>
)}
          {/* </List> */}

          {savedItems.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />

              {/* Wishlist Header with Toggle */}
              <Box
                onClick={() => setWishlistOpen(!wishlistOpen)}
                sx={{
                  backgroundColor: 'black',
                  p: 2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: '"Georgia", "Times New Roman", serif',
                  }}
                >
                  Your Wishlisted Items
                </Typography>
                {wishlistOpen ? (
                  <ExpandLess sx={{ color: 'white' }} />
                ) : (
                  <ExpandMore sx={{ color: 'white' }} />
                )}
              </Box>

              {/* Collapsible Wishlist Items */}
              <Collapse in={wishlistOpen}>
                <List>
                  {savedItems.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        border: '1px solid #00FFFF',
                        borderRadius: 2,
                        p: isSmallScreen ? 1 : 2,
                        mb: 2,
                        backgroundColor: '#121212',
                        color: 'white',
                        alignItems: 'center',
                      }}
                    >
                      {/* Delete Icon */}
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
                        }}
                      >
                        <DeleteOutline />
                      </IconButton>

                      {/* Image */}
                      <Box
                        sx={{
                          width: isSmallScreen ? 60 : 80,
                          height: isSmallScreen ? 60 : 80,
                          mr: 2,
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 8,
                          }}
                        />
                      </Box>

                      {/* Info Section */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          fontWeight="bold"
                          fontSize={isSmallScreen ? '0.9rem' : '1rem'}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body2">Size: {item.size}</Typography>
                        <Typography variant="body2">Color: {item.color}</Typography>
                        <Typography variant="body2">Qty: {item.quantity}</Typography>
                        <Typography variant="body2" color="cyan">
                          ₹{item.price}
                        </Typography>

                        <Button
                          size="small"
                          variant="text"
                          onClick={() => toggleSaveForLater(item._id)}
                          sx={{ mt: 1, color: 'cyan', border: '1px solid white' }}
                        >
                          MOVE IT TO CART
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </List>
              </Collapse>
            </>
          )}
        </Box>

        {/* Total & Checkout */}
        <Box
          p={isSmallScreen ? 1 : 2}
          borderTop="1px solid #ccc"
          sx={{ backgroundColor: '#0a0a0a', color: 'white' }}
        >
          <Typography variant="subtitle1">Total Breakdown</Typography>
          {activeCartItems.map((item) => (
            <Typography key={item.id} variant="body2">
              {item.title} x {item.quantity} = ₹{item.price * item.quantity}
            </Typography>
          ))}
          <Divider sx={{ my: 1, borderColor: 'gray' }} />
          <Typography variant="h6">Total: ₹{totalAmount.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2,mb:2 }}
            onClick={handelCheckOut}
          >
            Proceed to Checkout
          </Button>
          {loading && <LinearProgress />}
          <CartNotice open={noticemodal} onClose={() => setNoticemodal(false)} />
        </Box>
        
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} variant="filled">{snackbar.message}</Alert>
              </Snackbar>
    </Drawer>
  );
}
