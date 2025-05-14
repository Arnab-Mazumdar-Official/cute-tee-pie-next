'use client';
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
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
import Image from 'next/image';


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
  const [openCart, setOpenCart] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openLogineed, setOpenLogineed] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  useEffect(() => {
    const cookie = Cookies.get('user_login_data');
    if (cookie) {
      try {
        const user = JSON.parse(cookie);
        if (user.role === 'is_admin') setIsAdmin(true);
      } catch {}
    }
  }, []);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const navigate = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  const openCartSection = () => {
    const cookie = Cookies.get('user_login_data');
    const user = cookie ? JSON.parse(cookie) : null;
     if (!user?._id) {
    setOpenLogineed(true); // Show modal if not logged in
    return;
    }
    setOpenCart(true);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          // backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fcb900',
          backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#000',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ px: isMobile ? 1 : 3, justifyContent: 'space-between' }}>
          {/* Left Side: Menu + Cart */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Menu Dropdown */}
            <MotionButton onClick={handleMenuOpen}>
              <MenuIcon fontSize="large" />
            </MotionButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  border: `1px solid ${theme.palette.mode === 'dark' ? '#444' : '#ddd'}`,
                },
              }}
            >
              <MenuItem onClick={() => navigate('/sign-up')}>Sign Up</MenuItem>
              <MenuItem onClick={() => navigate('/login')}>Log In</MenuItem>
              {isAdmin && (
                <MenuItem onClick={() => navigate('/admin-dashboard')}>Admin Dashboard</MenuItem>
              )}
            </Menu>

            {/* Cart Button */}
            <Tooltip title="Cart" arrow>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <MotionButton onClick={openCartSection}>
                  <ShoppingBagOutlinedIcon fontSize="large" />
                </MotionButton>
              </motion.div>
            </Tooltip>
          </Box>

          {/* Center: Logo */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Box
              onClick={() => router.push('/')}
              sx={{ cursor: 'pointer', display: 'inline-block' }}
            >
              <Image
                src="/images/27250cb0-6277-43fb-9fce-ba82a97cc364-removebg-preview-removebg-preview.png" // Replace with your actual logo path
                alt="PrinteepaL Logo"
                width={50}
                height={20}
                priority
              />
            </Box>
          </Box>

          {/* Right Side: Theme Toggle */}
          <Box>
            <ThemeToggle />
          </Box>
        </Toolbar>
        <ComingSoonModal open={openModal} onClose={() => setOpenModal(false)} />
        <LoginNeeded open={openLogineed} onClose={() => setOpenLogineed(false)} />
      </AppBar>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />

    </>
  );
}
