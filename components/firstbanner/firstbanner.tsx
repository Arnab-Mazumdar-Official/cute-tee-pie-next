'use client';
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ComingSoonModal from '../commingsoon/commingsoon';
import { motion } from 'framer-motion';
import FeatureCards from "../featureCard/featurecard";
import ScrollingOffers from "../scrollingoffers/scrollingoffers";
import ReferralModal from "../referralsection/referralsection";
import Cookies from 'js-cookie';
import LoginNeeded from '../loginneed/loginneed';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const AnimatedButton = motion(Button);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
  transition: { duration: 0.9, ease: 'easeOut' },
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
};

const imageArray = [
  'banner/b7a48e9e-b490-4df0-bbe2-f8dc08b945c0.jpeg',
  'banner/3e2081eb-bc98-4055-87f4-6b37f1d4473d.jpeg',
  'banner/4d88306b-534a-4a53-bc23-aecc6b700c37.jpeg',
  'referrel_images/f5005dbc-38e0-42b3-a754-f450f49ff8aa.jpeg',
  'referrel_images/f3cd8874-2a18-4327-af78-3460fd4e7610.jpeg',
  'banner/7c575f34-872a-4f3f-8426-ed12ee9107d3.jpeg',
  'banner/926b71d8-90a6-4053-a756-ae3d605337d4.jpeg',
  'banner/fc4f5c43-c633-46a8-aa63-c8d85a852ecd.jpeg',
];

const BannerSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [modalOpen, setModalOpen] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [userId, setUserID] = useState('');
  const [openLogineed, setOpenLogineed] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get('user_login_data');
    if (cookie) {
      try {
        const user = JSON.parse(cookie);
        setReferralCode(user.referralCode);
        setUserID(user._id);
      } catch (error) {
        console.error('Failed to parse user_login_data cookie:', error);
      }
    }
  }, []);

  const handleGenerateReferral = async (referral_payment_method: object) => {
    try {
      const userCookie = Cookies.get('user_login_data');
      const userData = userCookie ? JSON.parse(userCookie) : null;
      const userId = userData?._id;

      if (!userId) return;

      const res = await fetch('/api/generate-referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, referral_payment_method }),
      });

      const data = await res.json();
      if (data.referralCode) {
        setReferralCode(data.referralCode);
        Cookies.set('user_login_data', JSON.stringify({ ...userData, referralCode: data.referralCode }), { expires: 7 });
      }
    } catch (err) {
      console.error('Referral generation failed', err);
    }
  };

  const handleClick = () => {
    const cookie = Cookies.get('user_login_data');
    const user = cookie ? JSON.parse(cookie) : null;
    if (!user?._id) return setOpenLogineed(true);
    setModalOpen(true);
  };

  const isLargeScreen = useMediaQuery('(min-width:900px)');
  const is380 = useMediaQuery('(max-width:380px)');
  const is430 = useMediaQuery('(max-width:430px)');
  const is484 = useMediaQuery('(max-width:484px)');
  const is545 = useMediaQuery('(max-width:545px)');
  const is650 = useMediaQuery('(max-width:650px)');
  const is734 = useMediaQuery('(max-width:734px)');
  const is740 = useMediaQuery('(max-width:740px)');
  const is894 = useMediaQuery('(max-width:894px)');
  const is894to1008 = useMediaQuery('(min-width:894px) and (max-width:1008px)');
  const is1009 = useMediaQuery('(min-width:1009px) and (max-width:1149px)');
  const is1150 = useMediaQuery('(min-width:1150px) and (max-width:1319px)');
  const is1320 = useMediaQuery('(min-width:1320px) and (max-width:1485px)');
  const is1486 = useMediaQuery('(min-width:1486px) and (max-width:1635px)');
  const is1636 = useMediaQuery('(min-width:1636px) and (max-width:1837px)');
  const is1838 = useMediaQuery('(min-width:1838px)');

  let imageHeight = 801;
  if (isLargeScreen) {
    if (is1838) imageHeight = 637;
    else if (is1636) imageHeight = 586;
    else if (is1486) imageHeight = 514;
    else if (is1320) imageHeight = 467;
    else if (is1150) imageHeight = 395;
    else if (is1009) imageHeight = 336;
    else if (is894to1008) imageHeight = 290;
  } else {
    if (is894 && !is740) imageHeight = 772;
    else if (is740 && !is734) imageHeight = 801;
    else if (is734 && !is650) imageHeight = 724;
    else if (is650 && !is545) imageHeight = 587;
    else if (is545 && !is484) imageHeight = 496;
    else if (is484 && !is430) imageHeight = 433;
    else if (is430 && !is380) imageHeight = 381;
    else if (is380) imageHeight = 331;
  }

  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <Box>
        <ScrollingOffers />
        <Box sx={{ backgroundColor, py: 6, px: 3, color: textColor }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {/* Left Image Swiper */}
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                exit="exit"
                viewport={{ once: false, amount: 0.3 }}
                transition={fadeInUp.transition}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ position: 'relative', width: '100%', height: imageHeight, overflow: 'hidden', borderRadius: 2 }}>
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                    slidesPerView={1}
                    style={{ width: '100%', height: '100%' }}
                  >
                    {imageArray.map((src, i) => (
                      <SwiperSlide key={i}>
                        <Box
                          component="img"
                          src={src}
                          alt={`Slide ${i}`}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 2,
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              </motion.div>
            </Grid>

            {/* Center Content */}
            {isLargeScreen && (
              <>
                <Grid item xs={12} md={4} textAlign="center">
                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="whileInView"
                    exit="exit"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={fadeInUp.transition}
                  >
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      Earn More, Shop More
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Referral & Cashback Program
                    </Typography>
                    <Typography variant="body1" mb={2}>
                      Get cashback on every purchase, and earn rewards when your friends shop with your referral code!
                    </Typography>
                    <Typography variant="body2" mb={3}>
                      Every order brings you closer to exclusive benefits. Don’t miss out!
                    </Typography>
                    <AnimatedButton
                      whileTap={{ scale: 0.95 }}
                      variant="outlined"
                      onClick={handleClick}
                      sx={{
                        borderColor: textColor,
                        color: textColor,
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                        "&:hover": {
                          backgroundColor: textColor,
                          color: backgroundColor,
                        },
                      }}
                    >
                      Show Me How
                    </AnimatedButton>
                  </motion.div>
                </Grid>

                {/* Right Image Swiper */}
                <Grid item xs={12} md={4} display="flex" justifyContent="center">
                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="whileInView"
                    exit="exit"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={fadeInUp.transition}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                  >
                    <Box sx={{ position: 'relative', width: '100%', height: imageHeight, overflow: 'hidden', borderRadius: 2 }}>
                      <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop
                        slidesPerView={1}
                        style={{ width: '100%', height: '100%' }}
                      >
                        {imageArray.map((src, i) => (
                          <SwiperSlide key={i}>
                            <Box
                              component="img"
                              src={src}
                              alt={`Slide Right ${i}`}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 2,
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box>
                  </motion.div>
                </Grid>
              </>
            )}
          </Grid>

          {/* Referral section for small screens */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              border: `2px dashed ${isDark ? '#4caf50' : '#2e7d32'}`,
              borderRadius: 3,
              p: 3,
              mx: 2,
              mt: 3,
              backgroundColor: isDark ? '#111' : '#f5f5f5',
              color: isDark ? '#fff' : '#000',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
                backgroundColor: isDark ? '#1a1a1a' : '#e8f5e9',
              },
            }}
            component={motion.div}
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            transition={fadeInUp.transition}
            onClick={handleClick}
          >
            <GroupAddIcon sx={{ fontSize: 40, color: isDark ? '#4caf50' : '#2e7d32', mb: 1 }} />
            <Typography fontWeight="bold" fontSize={{ xs: 14, sm: 16 }}>
              Invite & Earn with Referrals!
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              Get exclusive discounts when your friends shop through your referral.
            </Typography>
            <Button variant="contained" color="success" size="small">
              Show Me How
            </Button>
          </Box>

          {/* Features */}
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            transition={fadeIn.transition}
          >
            <FeatureCards />
          </motion.div>

          {/* Modals */}
          <ReferralModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            referralCode={referralCode}
            onGenerateReferral={handleGenerateReferral}
          />
          <LoginNeeded open={openLogineed} onClose={() => setOpenLogineed(false)} />
        </Box>
      </Box>
    </motion.div>
  );
};

export default BannerSection;
