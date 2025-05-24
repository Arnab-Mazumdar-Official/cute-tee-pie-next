'use client';
import { Box, Typography, useTheme } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiamondIcon from "@mui/icons-material/Diamond";
import BrushIcon from "@mui/icons-material/Brush";
import PublicIcon from "@mui/icons-material/Public";
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const FeatureCards = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const features = [
    {
      icon: <DiamondIcon sx={{ fontSize: { xs: 28, sm: 34, md: 40 }, color: isDark ? 'yellow' : 'blue' }} />,
      text: "Premium Quality",
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: { xs: 28, sm: 34, md: 40 }, color: 'red' }} />,
      text: "Free Delivery in 15 Days",
    },
    {
      icon: <BrushIcon sx={{ fontSize: { xs: 28, sm: 34, md: 40 }, color: isDark ? 'blue' : 'yellow' }} />,
      text: "Design Your Own T-shirt",
    },
    {
      icon: <PublicIcon sx={{ fontSize: { xs: 28, sm: 34, md: 40 }, color: isDark ? 'blue' : 'yellow' }} />,
      text: "Made In India",
    },
  ];

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      sx={{
        my: 4,
        px: 2,
        gap: 2,
      }}
    >
      {features.map((item, index) => (
        <MotionBox
          key={index}
          sx={{
            flex: {
              xs: '1 1 calc(50% - 16px)', // 2 per row on small screens
              md: '1 1 calc(25% - 16px)'  // 4 per row on medium (≥900px) and up
            },
            border: `1px solid ${isDark ? '#fff' : '#000'}`,
            borderRadius: 3,
            p: 2,
            textAlign: "center",
            backgroundColor: isDark ? '#000' : '#fff',
            color: isDark ? '#fff' : '#000',
            boxSizing: 'border-box',
          }}
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}
          transition={fadeInUp.transition}
        >
          <Box mb={1}>{item.icon}</Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            fontSize={{ xs: 12, sm: 14, md: 16 }}
          >
            {item.text}
          </Typography>
        </MotionBox>
      ))}
    </Box>
  );
};

export default FeatureCards;
