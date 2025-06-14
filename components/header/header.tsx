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
import { motion, AnimatePresence } from 'framer-motion';
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
    whileHover={{ 
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.85 }}
    animate={{
      y: [0, -2, 0],
    }}
    transition={{
      y: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
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

// Animated Logo Component
const AnimatedLogo = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    onClick={onClick}
    style={{ cursor: 'pointer', display: 'inline-block' }}
    whileHover={{ 
      scale: 1.05,
      filter: 'brightness(1.2)',
    }}
    animate={{
      rotate: [0, 1, -1, 0],
      scale: [1, 1.02, 1],
    }}
    transition={{
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      },
      scale: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    <Image
      src="/images/27250cb0-6277-43fb-9fce-ba82a97cc364-removebg-preview-removebg-preview.png"
      alt="PrinteepaL Logo"
      width={50}
      height={20}
      priority
    />
  </motion.div>
);

// Animated Cart Icon with Pulse Effect
const AnimatedCartIcon = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    whileHover={{ 
      scale: 1.15,
      rotate: [0, -10, 10, 0]
    }}
    whileTap={{ scale: 0.9 }}
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      scale: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    <MotionButton onClick={onClick}>
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(255, 255, 255, 0.4)",
            "0 0 0 8px rgba(255, 255, 255, 0)",
            "0 0 0 0 rgba(255, 255, 255, 0)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
        style={{
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ShoppingBagOutlinedIcon fontSize="large" />
      </motion.div>
    </MotionButton>
  </motion.div>
);

// Animated List Item Component
const AnimatedListItem = ({ 
  children, 
  onClick, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    whileHover={{ 
      x: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: { duration: 0.2 }
    }}
  >
    <ListItem button onClick={onClick}>
      {children}
    </ListItem>
  </motion.div>
);

// Background Gradient Animation
const AnimatedBackground = () => (
  <motion.div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
      zIndex: -1,
    }}
    animate={{
      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }}
  />
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatedBackground />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Toolbar sx={{ px: isMobile ? 1 : 3, justifyContent: 'space-between' }}>
            {/* Left Side: Menu + Cart */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Menu Icon */}
              <motion.div
                animate={{
                  rotateY: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <MotionButton onClick={() => setDrawerOpen(true)}>
                  <MenuIcon fontSize="large" />
                </MotionButton>
              </motion.div>

              <Tooltip title="Home" arrow>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MotionButton onClick={() => router.push('/')}>
                    <HomeIcon fontSize="large" />
                  </MotionButton>
                </motion.div>
              </Tooltip>
            </Box>

            {/* Center: Logo */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <AnimatedLogo onClick={() => router.push('/')} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Cart" arrow>
                <AnimatedCartIcon onClick={openCartSection} />
              </Tooltip>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <ThemeToggle />
              </motion.div>
            </Box>
          </Toolbar>
        </motion.div>

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
            position: 'relative',
            overflow: 'hidden',
          },
        }}
      >
        {/* Animated background for drawer */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)'
              : 'linear-gradient(45deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.02) 100%)',
            zIndex: -1,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <Box sx={{ p: 2 }}>
          <List>
            {!isAdmin && (
              <>
                <AnimatedListItem delay={0.1} onClick={() => navigate('/sign-up')}>
                  <ListItemText primary="Sign Up" />
                </AnimatedListItem>
                <Divider sx={{ my: 1 }} />

                <AnimatedListItem delay={0.2} onClick={() => navigate('/login')}>
                  <ListItemText primary="Log In" />
                </AnimatedListItem>
                <Divider sx={{ my: 1 }} />
              </>
            )}

            <AnimatedListItem 
              delay={0.3}
              onClick={() => setOpenCustomization(!openCustomization)}
            >
              <ListItemText primary="Customisation" />
              <motion.div
                animate={{ rotate: openCustomization ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openCustomization ? <ExpandLess /> : <ExpandMore />}
              </motion.div>
            </AnimatedListItem>

            <Divider sx={{ my: 1, mr: 2 }} />
            <AnimatePresence>
              <Collapse in={openCustomization} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <AnimatedListItem
                    delay={0.1}
                    onClick={() => navigate('/round-neck-t-shirt')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Round Neck Men" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                  <AnimatedListItem
                    delay={0.2}
                    onClick={() => navigate('/female-round-neck-tshirt')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Round Neck Women" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                  <AnimatedListItem
                    delay={0.3}
                    onClick={() => navigate('/polo-customised-tshirt')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Work Wear Polo" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                  <AnimatedListItem
                    delay={0.4}
                    onClick={() => navigate('/unisex-oversize-tshirt')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Unisex Oversize T-shirt" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                  <AnimatedListItem
                    delay={0.5}
                    onClick={() => navigate('/mens_full_sleeve_t_shirt')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Full Sleeve (Men)" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />
                </List>
              </Collapse>
            </AnimatePresence>

            <AnimatedListItem 
              delay={0.4}
              onClick={() => setOpenproducts(!openproducts)}
            >
              <ListItemText primary="Our Products" />
              <motion.div
                animate={{ rotate: openproducts ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openproducts ? <ExpandLess /> : <ExpandMore />}
              </motion.div>
            </AnimatedListItem>

            <Divider sx={{ my: 1, mr: 2 }} />
            <AnimatePresence>
              <Collapse in={openproducts} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <AnimatedListItem
                    delay={0.1}
                    onClick={() => navigate('/products-by-type/Uinsex_Over_Size_T-Shirts')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Uinsex Over Size T-Shirts" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                  <AnimatedListItem
                    delay={0.2}
                    onClick={() => navigate('/products-by-type/Female_Round_Neck_Half_Sleeve')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Female Round Neck Half Sleeve" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                  <AnimatedListItem
                    delay={0.3}
                    onClick={() => navigate('/products-by-type/Work_Ware_Polo')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Work Wear Polo" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                  <AnimatedListItem
                    delay={0.4}
                    onClick={() => navigate('/products-by-type/Men_Round_Neck_Half_Sleeve')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Men Round Neck Half Sleeve" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />

                  <AnimatedListItem
                    delay={0.5}
                    onClick={() => navigate('/products-by-type/Round_Neck_Full_Sleeve_T-Shirts')}
                  >
                    <Box sx={{ pl: 4 }}>
                      <ListItemText primary="Round Neck Full Sleeve T-Shirts" />
                    </Box>
                  </AnimatedListItem>
                  <Divider sx={{ my: 1, ml: 4, mr: 2 }} />
                </List>
              </Collapse>
            </AnimatePresence>

            <AnimatedListItem
              delay={0.5}
              onClick={() => {
                if (isLogin) {
                  navigate('/orders');
                } else {
                  setOpenLogineed(true);
                }
              }}
            >
              <ListItemText primary="Your Orders" />
            </AnimatedListItem>
            <Divider sx={{ my: 1 }} />

            <AnimatedListItem
              delay={0.6}
              onClick={() => {
                if (isLogin) {
                  navigate('/customised-t-shirt-orders');
                } else {
                  setOpenLogineed(true);
                }
              }}
            >
              <ListItemText primary="Your Customised T-shirt Orders" />
            </AnimatedListItem>
            <Divider sx={{ my: 1 }} />

            {isAdmin && (
              <>
                <AnimatedListItem delay={0.7} onClick={() => navigate('/admin-dashboard')}>
                  <ListItemText primary="Admin Dashboard" />
                </AnimatedListItem>
                <Divider sx={{ my: 1 }} />
              </>
            )}

            {isLogin && (
              <>
                <AnimatedListItem delay={0.8} onClick={handleLogout}>
                  <ListItemText primary="Log Out" />
                </AnimatedListItem>
                <Divider sx={{ my: 1 }} />
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}