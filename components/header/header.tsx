'use client';
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function ResponsiveHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // screen < 600px

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000", boxShadow: "none" }}>
      <Toolbar sx={{ px: isMobile ? 1 : 3, justifyContent: "space-between" }}>
        {/* Left: Hamburger Menu */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        {/* Center: Logo */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="https://cuteteepie.myshopify.com/cdn/shop/files/3F7FMK1hTpy-0nMPCtuwLQ-removebg-preview.png?v=1745130189&width=600"
            alt="Cute Tee Pie"
            style={{
              height: isMobile ? "40px" : "100px",
              maxWidth: "160px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right: Search & Cart Icons */}
        <Box sx={{ display: "flex", gap: isMobile ? 0 : 1 }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <ShoppingBagOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
