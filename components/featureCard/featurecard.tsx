'use client';
import { Box, Typography, useTheme, Button } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiamondIcon from "@mui/icons-material/Diamond";
import BrushIcon from "@mui/icons-material/Brush";
import PublicIcon from "@mui/icons-material/Public";
import { motion } from 'framer-motion';
import { useState } from 'react';
import ReferralModal from "../referralsection/referralsection";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const handleGenerateReferral = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferralCode(code);
  };

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
    <>
      {/* Feature cards for md and up */}
      <Box
        display={{ xs: 'none', md: 'flex' }}
        flexWrap="wrap"
        justifyContent="center"
        sx={{ my: 4, px: 2, gap: 2 }}
      >
        {features.map((item, index) => (
          <MotionBox
            key={index}
            sx={{
              flex: '1 1 calc(25% - 16px)',
              border: `1px solid ${isDark ? '#fff' : '#000'}`,
              borderRadius: 3,
              p: 2,
              textAlign: "center",
              backgroundColor: isDark ? '#000' : '#fff',
              color: isDark ? '#fff' : '#000',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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

      <ReferralModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        referralCode={referralCode}
        onGenerateReferral={handleGenerateReferral}
      />
    </>
  );
};

export default FeatureCards;
