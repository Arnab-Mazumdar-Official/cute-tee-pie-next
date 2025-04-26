'use client';
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
  Snackbar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import motion
import { AccountCircle } from "@mui/icons-material";
import Cookies from "js-cookie";
import ComingSoonModal from '../commingsoon/commingsoon';

const MotionButtonNew = motion(Button); 
const MotionButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.8 }}
    style={{
      background: "none",
      border: "none",
      color: "inherit",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
    }}
    onClick={onClick}
  >
    {children}
  </motion.button>
);


export default function ResponsiveHeader() {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openModal, setOpenModal] = useState(false); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleLoginClick = () => {
    setLoading(true);
    router.push("/login");
  };
  const  handelComingsoon = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const cookieData = Cookies.get('user_login_data');
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        console.log("Cookie Data:",parsedData);
        

        if (parsedData?.role === 'is_admin') {
          console.log("Set to admin");
          
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error parsing cookie data:", error);
      }
    }
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000", boxShadow: "none" }}>
      <Toolbar sx={{ px: isMobile ? 1 : 3, justifyContent: "space-between" }}>
        
        {/* Left: Hamburger Menu */}
        <MotionButton onClick={() => handelComingsoon()}>
          <MenuIcon />
        </MotionButton>

        {/* Center: Logo */}
        {!isAdmin &&(<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="https://cuteteepie.myshopify.com/cdn/shop/files/3F7FMK1hTpy-0nMPCtuwLQ-removebg-preview.png?v=1745130189&width=600"
            alt="Cute Tee Pie"
            style={{
              height: isMobile ? "80px" : "100px",
              maxWidth: "160px",
              objectFit: "contain",
            }}
          />
        </Box>)}

        {isAdmin && (
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
                <MotionButtonNew
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handelComingsoon()}
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "9999px",
                    padding: "10px 24px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "black",
                      boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  Go To Admin Dashboard
                </MotionButtonNew>
              </Box>
            )}

        {/* Right: Search, Cart, and Login Icons */}
        
          <Box sx={{ display: "flex", gap: isMobile ? 0 : 1 }}>
            
            {/* Search Icon */}
            <Tooltip
              title="Search"
              arrow
              placement="bottom"
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#fff",
                    color: "#000",
                    fontSize: "0.85rem",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    boxShadow: 2,
                  },
                },
                arrow: {
                  sx: {
                    color: "#fff",
                  },
                },
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <MotionButton onClick={() => handelComingsoon()}>
                  <SearchIcon fontSize="large" />
                </MotionButton>
              </motion.div>
            </Tooltip>

            {/* Cart Icon */}
            <Tooltip
              title="Cart"
              arrow
              placement="bottom"
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#fff",
                    color: "#000",
                    fontSize: "0.85rem",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    boxShadow: 2,
                  },
                },
                arrow: {
                  sx: {
                    color: "#fff",
                  },
                },
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <MotionButton onClick={() => handelComingsoon()}>
                  <ShoppingBagOutlinedIcon fontSize="large" />
                </MotionButton>
              </motion.div>
            </Tooltip>

            {/* Log In Icon */}
            <Tooltip
              title="Log In"
              arrow
              placement="bottom"
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#fff",
                    color: "#000",
                    fontSize: "0.85rem",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    boxShadow: 2,
                  },
                },
                arrow: {
                  sx: {
                    color: "#fff",
                  },
                },
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <MotionButton onClick={() => handleLoginClick()}>
                  <AccountCircle fontSize="large" />
                </MotionButton>
              </motion.div>
            </Tooltip>
          </Box>
          <ComingSoonModal
                  open={openModal}
                  onClose={handleCloseModal}
                />
      </Toolbar>
    </AppBar>
    
  );
}
