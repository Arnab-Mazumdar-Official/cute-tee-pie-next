'use client';
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ComingSoonModal from '../commingsoon/commingsoon';
import { AnimatePresence, motion } from 'framer-motion';
import FeatureCards from "../featureCard/featurecard";
import ScrollingOffers from "../scrollingoffers/scrollingoffers";
import ReferralModal from "../referralsection/referralsection";
import Cookies from 'js-cookie';
import LoginNeeded from '../loginneed/loginneed';
import GroupAddIcon from "@mui/icons-material/GroupAdd";

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

const BannerSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [userId, setUserID] = useState('');
  const [openLogineed, setOpenLogineed] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const imageArray = [
  'referrel_images/f5005dbc-38e0-42b3-a754-f450f49ff8aa.jpeg',
  'referrel_images/f3cd8874-2a18-4327-af78-3460fd4e7610.jpeg',
  'customise image/-q74ZP7iRHiWD2s9nio2cg.jpeg'
];
const [leftImageIndex, setLeftImageIndex] = useState(0);
const [rightImageIndex, setRightImageIndex] = useState(1); // start with a different one

  useEffect(() => {
     const cookie = Cookies.get('user_login_data');
      if (cookie) {
        try {
          const user = JSON.parse(cookie);
          setReferralCode(user.referralCode)
          setUserID(user._id)
        } catch (error) {
          console.error('Failed to parse user_login_data cookie:', error);
        }
      }
    const interval = setInterval(() => {
      setLeftImageIndex((prevLeft) => {
        let nextLeft = (prevLeft + 1) % imageArray.length;

        if (nextLeft === rightImageIndex) {
          nextLeft = (nextLeft + 1) % imageArray.length;
        }
        return nextLeft;
      });

      setRightImageIndex((prevRight) => {
        let nextRight = (prevRight + 1) % imageArray.length;

        if (nextRight === leftImageIndex) {
          nextRight = (nextRight + 1) % imageArray.length;
        }
        return nextRight;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [leftImageIndex, rightImageIndex]);


  const handleGenerateReferral = async (referral_payment_method: object) => {
  try {
    const userCookie = Cookies.get('user_login_data');
    if (!userCookie) {
      console.error('User cookie not found');
      return;
    }

    const userData = JSON.parse(userCookie);
    const userId = userData?._id;

    if (!userId) {
      console.error('User ID not found in cookie');
      return;
    }

    const response = await fetch('/api/generate-referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, referral_payment_method }),
    });

    const data = await response.json();

    if (data.referralCode) {
      // Update frontend state
      setReferralCode(data.referralCode);

      // Update cookie with referral code
      const updatedUserData = { ...userData, referralCode: data.referralCode };
      Cookies.set('user_login_data', JSON.stringify(updatedUserData), { expires: 7 });
    } else {
      console.error('Referral code not returned in response');
    }
  } catch (err) {
    console.error('Referral generation failed', err);
  }
};


  const isLargeScreen = useMediaQuery('(min-width:900px)');
  const is894 = useMediaQuery('(max-width:894px)');
  const is740 = useMediaQuery('(max-width:740px)');
  const is734 = useMediaQuery('(max-width:734px)');
  const is650 = useMediaQuery('(max-width:650px)');
  const is545 = useMediaQuery('(max-width:545px)');
  const is484 = useMediaQuery('(max-width:484px)');
  const is430 = useMediaQuery('(max-width:430px)');
  const is380 = useMediaQuery('(max-width:380px)');

  // Viewport ranges for >900px
  const is1838 = useMediaQuery('(min-width:1838px)');
  const is1636 = useMediaQuery('(min-width:1636px) and (max-width:1837px)');
  const is1486 = useMediaQuery('(min-width:1486px) and (max-width:1635px)');
  const is1320 = useMediaQuery('(min-width:1320px) and (max-width:1485px)');
  const is1150 = useMediaQuery('(min-width:1150px) and (max-width:1319px)');
  const is1009 = useMediaQuery('(min-width:1009px) and (max-width:1149px)');
  const is894to1008 = useMediaQuery('(min-width:894px) and (max-width:1008px)');

  // Dynamic image height and button padding
  let imageHeight = 801;
  let knowMoreButtom = 34;
  let paddingButtomKnow = 1;

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
    else if (is650 && !is545) (imageHeight = 587), (knowMoreButtom = 22);
    else if (is545 && !is484) (imageHeight = 496), (knowMoreButtom = 22);
    else if (is484 && !is430) (imageHeight = 433), (knowMoreButtom = 22);
    else if (is430 && !is380) (imageHeight = 381), (knowMoreButtom = 15), (paddingButtomKnow = 0.5);
    else if (is380) (imageHeight = 331), (knowMoreButtom = 6), (paddingButtomKnow = 0.4);
  }
  

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.8, ease: 'easeInOut' },
};



  const handleClick = () => {
    const cookie = Cookies.get('user_login_data');
    const user = cookie ? JSON.parse(cookie) : null;
    if (!user?._id) {
      setOpenLogineed(true);
      return;
    }
    setModalOpen(true);
  };

  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Box>
        <ScrollingOffers />
        <Box sx={{ backgroundColor, py: 6, px: 3, color: textColor }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {/* Left Image */}
            <Grid item xs={12} md={4} display="flex" justifyContent="center" sx={{ position: 'relative' }}>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                exit="exit"
                viewport={{ once: false, amount: 0.3 }}
                transition={fadeInUp.transition}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <Box  sx={{
                  position: 'relative',
                  width: '100%',
                  height: imageHeight,
                  overflow: 'hidden', // <-- ensures sliding stays inside
                }}>
  
                <motion.img
                      key={imageArray[leftImageIndex]} // or rightImageIndex
                      src={imageArray[leftImageIndex]}
                      alt="T-shirt image"
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={slideVariants.transition}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 8,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />

                  </Box>

              </motion.div>
            </Grid>

            {/* Text and Right Image (only for large screen) */}
            {isLargeScreen && (
              <>
                {/* Center Text */}
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

                {/* Right Image */}
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
                    <Box  sx={{
                  position: 'relative',
                  width: '100%',
                  height: imageHeight,
                  overflow: 'hidden', // <-- ensures sliding stays inside
                }}>
  
                <motion.img
                      key={imageArray[rightImageIndex]} // or rightImageIndex
                      src={imageArray[rightImageIndex]}
                      alt="T-shirt image"
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={slideVariants.transition}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 8,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />

                  </Box>


                  </motion.div>
                </Grid>
              </>
            )}
          </Grid>

          {/* Referral section only for xs & sm */}
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
              mt:3,
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
          >
            <GroupAddIcon sx={{ fontSize: 40, color: isDark ? '#4caf50' : '#2e7d32', mb: 1 }} />
            <Typography fontWeight="bold" fontSize={{ xs: 14, sm: 16 }}>
              Invite & Earn with Referrals!
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              Get exclusive discounts when your friends shop through your referral.
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => {
                handleClick();
              }}
            >
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

          {/* Modal */}
          {/* <ComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} /> */}
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
