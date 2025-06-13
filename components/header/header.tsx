'use client';
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import CartDrawer from '../cart/cart';
import ThemeToggle from '../theamtoggle/theamtoggle';
import ComingSoonModal from '../commingsoon/commingsoon';
import LoginNeeded from '../loginneed/loginneed';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image';
import { Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const MotionButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}) => (
  <motion.button
    whileTap={{ scale: 0.8 }}
    style={{
      background: 'none',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    }}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

export default function ResponsiveHeader() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openLogineed, setOpenLogineed] = useState(false);
  const [openCustomization, setOpenCustomization] = useState(false);
  const [openproducts, setOpenproducts] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  useEffect(() => {
    const cookie = Cookies.get('user_login_data');
    if (cookie) {
      try {
        const user = JSON.parse(cookie);
        setIsLogin(true);
        if (user.role === 'is_admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Failed to parse user_login_data cookie:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const navigate = (path: string) => {
    setDrawerOpen(false);
    router.push(path);
  };

  const openCartSection = () => {
    const cookie = Cookies.get('user_login_data');
    const user = cookie ? JSON.parse(cookie) : null;
    if (!user?._id) {
      setOpenLogineed(true);
      return;
    }
    setOpenCart(true);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#000',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ px: isMobile ? 1 : 3, justifyContent: 'space-between' }}>
          {/* Left Side: Menu + Cart */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Menu Icon */}
            <MotionButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon fontSize="large" />
            </MotionButton>

            <Tooltip title="Home" arrow>
              <MotionButton onClick={() => router.push('/')}>
                <HomeIcon fontSize="large" />
              </MotionButton>
            </Tooltip>
          </Box>

          {/* Center: Logo */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Box
              onClick={() => router.push('/')}
              sx={{ cursor: 'pointer', display: 'inline-block' }}
            >
              <Image
                src="/images/27250cb0-6277-43fb-9fce-ba82a97cc364-removebg-preview-removebg-preview.png"
                alt="PrinteepaL Logo"
                width={50}
                height={20}
                priority
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Cart" arrow>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MotionButton onClick={openCartSection}>
                  <ShoppingBagOutlinedIcon fontSize="large" />
                </MotionButton>
              </motion.div>
            </Tooltip>
            <ThemeToggle />
          </Box>
        </Toolbar>

        {/* Modal Components */}
        <ComingSoonModal open={openModal} onClose={() => setOpenModal(false)} />
        <LoginNeeded
          open={openLogineed}
          onClose={() => setOpenLogineed(false)}
        />
      </AppBar>

      {/* Cart Drawer */}
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <List>
            {!isAdmin && (
              <>
                <ListItem button onClick={() => navigate('/sign-up')}>
                  <ListItemText primary="Sign Up" />
                </ListItem>
                <Divider sx={{ my: 1 }} />

                <ListItem button onClick={() => navigate('/login')}>
                  <ListItemText primary="Log In" />
                </ListItem>
                <Divider sx={{ my: 1 }} />
              </>
            )}

            <ListItem
              button
              onClick={() => setOpenCustomization(!openCustomization)}
            >
              <ListItemText primary="Customisation" />
              {openCustomization ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Divider sx={{ my: 1, mr: 2 }} />
            <Collapse in={openCustomization} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/round-neck-t-shirt')}
                >
                  <ListItemText primary="Round Neck Men" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/female-round-neck-tshirt')}
                >
                  <ListItemText primary="Round Neck Women" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/polo-customised-tshirt')}
                >
                  <ListItemText primary="Work Wear Polo" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/unisex-oversize-tshirt')}
                >
                  <ListItemText primary="Unisex Oversize T-shirt" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/mens_full_sleeve_t_shirt')}
                >
                  <ListItemText primary="Full Sleeve (Men)" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />
              </List>
            </Collapse>

            <ListItem button onClick={() => setOpenproducts(!openproducts)}>
              <ListItemText primary="Our Products" />
              {openproducts ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Divider sx={{ my: 1, mr: 2 }} />
            <Collapse in={openproducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() =>
                    navigate('/products-by-type/Uinsex_Over_Size_T-Shirts')
                  }
                >
                  <ListItemText primary="Uinsex Over Size T-Shirts" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() =>
                    navigate('/products-by-type/Female_Round_Neck_Half_Sleeve')
                  }
                >
                  <ListItemText primary="Female Round Neck Half Sleeve" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/products-by-type/Work_Wear_Polo')}
                >
                  <ListItemText primary="Work Wear Polo" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() =>
                    navigate('/products-by-type/Men_Round_Neck_Half_Sleeve')
                  }
                >
                  <ListItemText primary="Men Round Neck Half Sleeve" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                <ListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() =>
                    navigate(
                      '/products-by-type/Round_Neck_Full_Sleeve_T-Shirts'
                    )
                  }
                >
                  <ListItemText primary="Round Neck Full Sleeve T-Shirts" />
                </ListItem>
                <Divider sx={{ my: 1, ml: 4, mr: 2 }} />
              </List>
            </Collapse>

            <ListItem
              button
              onClick={() => {
                if (isLogin) {
                  navigate('/orders');
                } else {
                  setOpenLogineed(true);
                }
              }}
            >
              <ListItemText primary="Your Orders" />
            </ListItem>
            <Divider sx={{ my: 1 }} />

            <ListItem
              button
              onClick={() => {
                if (isLogin) {
                  navigate('/customised-t-shirt-orders');
                } else {
                  setOpenLogineed(true);
                }
              }}
            >
              <ListItemText primary="Your Customised T-shirt Orders" />
            </ListItem>
            <Divider sx={{ my: 1 }} />

            {isAdmin && (
              <>
                <ListItem button onClick={() => navigate('/admin-dashboard')}>
                  <ListItemText primary="Admin Dashboard" />
                </ListItem>
                <Divider sx={{ my: 1 }} />
              </>
            )}

            {isLogin && (
              <>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Log Out" />
                </ListItem>
                <Divider sx={{ my: 1 }} />
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
