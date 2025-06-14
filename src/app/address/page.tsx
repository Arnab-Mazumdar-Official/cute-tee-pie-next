'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Chip ,
  Fade  
} from '@mui/material';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import ResponsiveHeader from '../../../components/header/header';
import AnnouncementBar from '../../../components/anouncement/announcement';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ProductImageSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{
      width: '100%',
      height: '348px',
      borderRadius: 8,
      overflow: 'hidden',
    }}
  >
    <Skeleton
      variant="rectangular"
      width="100%"
      height="100%"
      sx={{
        borderRadius: 2,
        background:
          'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  </motion.div>
);

const FloatingElements = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
    }}
  >
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: '4px',
          height: '4px',
          backgroundColor: isDarkMode ? '#00ffff33' : '#FFD70033',
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </Box>
);

const UrgencyTimer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Box
        sx={{
          background: `linear-gradient(45deg, ${isDarkMode ? '#ff0000' : '#ff4444'}, ${isDarkMode ? '#cc0000' : '#cc2222'})`,
          color: 'white',
          p: 2,
          borderRadius: 2,
          textAlign: 'center',
          mb: 3,
          boxShadow: '0 4px 20px rgba(255, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            width: `${((15 * 60 - timeLeft) / (15 * 60)) * 100}%`,
          }}
          initial={{ width: 0 }}
          animate={{
            width: `${((15 * 60 - timeLeft) / (15 * 60)) * 100}%`,
          }}
          transition={{ duration: 1 }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ position: 'relative', zIndex: 1 }}
        >
          🔥 LIMITED TIME OFFER
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ position: 'relative', zIndex: 1 }}
        >
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </Typography>
        <Typography variant="body2" sx={{ position: 'relative', zIndex: 1 }}>
          Complete your purchase to lock in this price!
        </Typography>
      </Box>
    </motion.div>
  );
};

const AddressFields = ({
  formData,
  setFormData,
}: {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  const fields = [
    { label: 'First Name', key: 'first_name' },
    { label: 'Last Name', key: 'last_name' },
    { label: 'Mobile No.', key: 'phone_number' },
    { label: 'Email', key: 'email' },
    { label: 'Flat/House/Plot No.', key: 'address_first' },
    { label: 'Street/Locality/Landmark', key: 'address_secoend' },
    { label: 'City', key: 'city' },
    { label: 'Pincode', key: 'pincode' },
    { label: 'State', key: 'state' },
    { label: 'Country', key: 'country' },
  ];
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Grid container spacing={1.5}>
      {fields.map(({ label, key }, idx) => (
        <Grid item xs={12} sm={6} key={idx}>
          <TextField
            label={label}
            value={formData[key] || ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [key]: e.target.value }))
            }
            InputLabelProps={{
              style: {
                color: isDarkMode ? 'white' : 'black',
                fontSize: '14px',
              },
            }}
            InputProps={{
              style: {
                color: isDarkMode ? 'white' : 'black',
                fontSize: '14px',
              },
              autoComplete: 'off',
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: isDarkMode ? 'white' : 'black',
                },
                '&:hover fieldset': {
                  borderColor: isDarkMode ? '#00ffff' : 'red',
                },
                '&.Mui-focused fieldset': {
                  borderColor: isDarkMode ? '#00ffff' : 'yellow',
                },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: `0 0 0 1000px ${
                    isDarkMode ? 'black' : 'white'
                  } inset`,
                  WebkitTextFillColor: isDarkMode ? 'white' : 'black',
                },
              },
              mb: 1.5,
            }}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
      ))}
    </Grid>
  );
};

const PaymentPage: React.FC = () => {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [shippingData, setShippingData] = useState<Record<string, string>>({});
  const [billingData, setBillingData] = useState<Record<string, string>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previousAddresses, setPreviousAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [referralVerified, setReferralVerified] = useState(false);
  const [referralError, setReferralError] = useState('');
  const [reffereldiscount, setDiscount] = useState(0);
  const [subtotal, setsubtotal] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [processingPayment, setProcessingPayment] = useState(false);
  const isMobile = useMediaQuery('(max-width:594px)');
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const primaryAccent = isDarkMode ? '#00ffff' : '#FFD700';
  const secondaryAccent = isDarkMode ? '#00ff00' : '#FF0000';
  const bgColor = isDarkMode ? '#111' : '#fff';
  const textColor = isDarkMode ? 'white' : 'black';
  const borderColor = isDarkMode ? '#00ffff' : 'black';

  const shippingCharge = 85;
  const discount = shippingCharge;
  // const totalPayable = subtotal;

  const handleImageError = (itemId: string) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const cookieData = Cookies.get('user_order_data');
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        setOrderData(JSON.parse(cookieData));
        const subtotal = parsedData.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setsubtotal(subtotal);
        setTotalPayable(subtotal);
      } catch (err) {
        console.error('Failed to parse order data', err);
      }
    }

    const userCookie = Cookies.get('user_login_data');
    const userId = userCookie ? JSON.parse(userCookie)._id : null;
    if (!userId) return;

    fetch(`/api/save-address?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPreviousAddresses(data?.data || []);
        setLoadingAddresses(false);
        if (!data?.data?.length) setShowForm(true);
      })
      .catch(() => {
        setLoadingAddresses(false);
        setShowForm(true);
      });
  }, []);

  const verifyReferral = async () => {
    try {
      const userCookie = Cookies.get('user_login_data');
      const userId = userCookie ? JSON.parse(userCookie)._id : null;
      const res = await axios.post('/api/verify-referral', {
        code: referralCode,
        user_id: userId,
      });
      console.log('Refferal Verification--------->>', res);

      if (res?.data?.is_reffer === true) {
        setReferralVerified(true);
        setReferralError('');

        const dis = Array.isArray(orderData)
          ? orderData.reduce((sum, item) => sum + 30 * item.quantity, 0)
          : 0;
        const Payable = subtotal - dis;
        setDiscount(dis);
        setTotalPayable(Payable);
      } else {
        setReferralVerified(false);
        setReferralError("Referral code didn't match.");
        setDiscount(0);
        setTotalPayable(subtotal);
      }
    } catch (error) {
      setReferralError('Something went wrong while verifying referral.');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      verifyReferral();
    }
  };

  const makePayment = async (amount_paied: number) => {
    setProcessingPayment(true);
    const res = await fetch('api/create-payment-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount_paied }),
    });

    const { order } = await res.json();
    const userCookie = Cookies.get('user_login_data');
    const userId = userCookie ? JSON.parse(userCookie)._id : null;
    if (!userId) {
      setProcessingPayment(false);
      setSnackbarMessage('Please Log In First!, And Try Again');
      setSnackbarOpen(true);
      return;
    }

    const options = {
      key: process.env.RAZORPAY_PAYMENT_TOKEN,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: 'Prin Tee Pal',
      description: 'Prin Tee Pal Transaction',
      handler: async (response: any) => {
        const productDetails = orderData.map((item: any) => ({
          product_id: item.source === 'cart' ? item.product_id : item._id,
          size: item.selectedSize,
          color: item.selectedColor,
          quantity: item.quantity,
        }));

        const payload = {
          response,
          user_id: userId,
          products: productDetails,
          amount: amount_paied,
          ...(reffereldiscount > 0 && { referralCode }),
        };
        console.log('Payload Payment-------->>', payload);

        try {
          const verify = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          const data = await verify.json();
          console.log('data Payment-------->>', data);
          setSnackbarMessage(data.message);
          setSnackbarOpen(true);
          const cookieData = Cookies.get('user_order_data');

          if (cookieData) {
            try {
              const orderData = JSON.parse(cookieData);

              for (const item of orderData) {
                if (item.source === 'cart') {
                  const res = await fetch('/api/cart', {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: item._id }),
                  });

                  if (!res.ok) {
                    console.error(`Failed to delete item with _id ${item._id}`);
                  }
                }
              }
            } catch (err) {
              setProcessingPayment(false);
              console.error('Failed to parse order data', err);
            }
          }
          setProcessingPayment(false);
          router.push('/');
        } catch (error) {
          setProcessingPayment(false);
          console.error('Payment verification error:', error);
          setSnackbarMessage(
            'Something went wrong during payment verification.'
          );
          setSnackbarOpen(true);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSelectAddress = (address: any, id: string) => {
    setSelectedAddressId(id);
    setShippingData(address.shipping_data);
    setBillingData(address.billinging_data);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const getErrorMessage = (data: Record<string, string>, label: string) => {
    if (!/^[0-9]{10}$/.test(data.phone_number)) {
      return `${label} phone number must be exactly 10 digits.`;
    }
    if (!/^[0-9]{6}$/.test(data.pincode)) {
      return `${label} pincode must be exactly 6 digits.`;
    }
    return '';
  };

  const handlePayment = async () => {
    setProcessingPayment(true);
    const validateFields = (obj: Record<string, string>) => {
      const requiredKeys = [
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'address_first',
        'address_secoend',
        'city',
        'pincode',
        'state',
        'country',
      ];
      if (Object.keys(obj).length !== 10) return false;
      for (const key of requiredKeys) {
        if (!obj[key] || obj[key].trim() === '') return false;
      }
      if (!/^[0-9]{10}$/.test(obj.phone_number)) return false;
      if (!/^[0-9]{6}$/.test(obj.pincode)) return false;
      return true;
    };

    const shippingError = getErrorMessage(shippingData, 'Shipping');
    const billingError = sameAsShipping
      ? ''
      : getErrorMessage(billingData, 'Billing');
    const shippingValid = validateFields(shippingData);
    const billingValid = sameAsShipping || validateFields(billingData);

    if (!shippingValid || !billingValid || shippingError || billingError) {
      setProcessingPayment(false);
      const message =
        shippingError ||
        billingError ||
        'Please complete all required fields before proceeding to payment.';
      setSnackbarMessage(message);
      setSnackbarOpen(true);
      return;
    }

    const userCookie = Cookies.get('user_login_data');
    const userId = userCookie ? JSON.parse(userCookie)._id : null;
    if (!userId) {
      setProcessingPayment(false);
      setSnackbarMessage('You are not logged in.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch('/api/save-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping_data: shippingData,
          billinging_data: sameAsShipping ? shippingData : billingData,
          user_id: userId,
          selected: true,
        }),
      });

      const result = await response.json();
      if (!response.ok || result?.success === false) {
        setSnackbarMessage(result?.message || 'Failed to save address.');
        setSnackbarOpen(true);
        setProcessingPayment(false);
        return;
      }

      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load.');
        setProcessingPayment(false);
        return;
      }

      // makePayment(totalPayable);
      makePayment(1);
    } catch (err) {
      setProcessingPayment(false);
      console.error(err);
      alert('Something went wrong while processing your request.');
    }
  };

  return (
    <MotionBox
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FloatingElements isDarkMode={isDarkMode} />
      <AnnouncementBar />
      <ResponsiveHeader />

      <Container sx={{ pb: 4 }}>
        <UrgencyTimer isDarkMode={isDarkMode} />

        <MotionTypography
          variant="h4"
          color={textColor}
          gutterBottom
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${primaryAccent}, ${secondaryAccent})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4,
          }}
        >
          🛒 Complete Your Order
        </MotionTypography>

        <Grid container spacing={3} mb={4}>
          <AnimatePresence>
            {orderData.map((item, index) => (
              <Grid item xs={12} sm={6} md={isMobile ? 12 : 4} key={item._id}>
                <MotionCard
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 10px 30px ${primaryAccent}44`,
                    transition: { duration: 0.2 },
                  }}
                  sx={{
                    border: `2px solid ${primaryAccent}`,
                    borderRadius: 3,
                    backgroundColor: bgColor,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${primaryAccent}22, transparent)`,
                      animation: 'shine 3s infinite',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ position: 'relative', mb: 2 }}>
                      {imageErrors[item._id] ? (
                        <Box
                          sx={{
                            width: '100%',
                            height: '348px',
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${primaryAccent}22, ${secondaryAccent}22)`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `2px dashed ${primaryAccent}`,
                          }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          >
                            <Typography
                              variant="h1"
                              sx={{ color: primaryAccent, mb: 1 }}
                            >
                              🎨
                            </Typography>
                          </motion.div>
                          <Typography
                            variant="h6"
                            color={primaryAccent}
                            fontWeight="bold"
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={textColor}
                            textAlign="center"
                          >
                            Amazing design preview coming soon!
                          </Typography>
                        </Box>
                      ) : (
                        <Image
                          src={item.thumbnail_url}
                          alt={item.title}
                          width={300}
                          height={300}
                          style={{
                            width: '100%',
                            height: '348px',
                            borderRadius: 8,
                            objectFit: 'cover',
                          }}
                          onError={() => handleImageError(item._id)}
                        />
                      )}

                      <Chip
                        label={`${item.quantity}x`}
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          backgroundColor: secondaryAccent,
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      color={textColor}
                      fontWeight="bold"
                      mb={1}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color={isDarkMode ? '#ccc' : 'gray'}
                      mb={2}
                    >
                      {item.description.slice(0, 80)}...
                    </Typography>

                    <Box
                      sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}
                    >
                      <Chip
                        label={`Size: ${item.selectedSize}`}
                        size="small"
                        sx={{
                          backgroundColor: `${primaryAccent}22`,
                          color: primaryAccent,
                        }}
                      />
                      <Chip
                        label={`Color: ${item.selectedColor}`}
                        size="small"
                        sx={{
                          backgroundColor: `${secondaryAccent}22`,
                          color: secondaryAccent,
                        }}
                      />
                    </Box>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Typography
                        variant="h5"
                        color={primaryAccent}
                        fontWeight="bold"
                        sx={{
                          textAlign: 'center',
                          p: 1,
                          border: `2px solid ${primaryAccent}`,
                          borderRadius: 2,
                          background: `${primaryAccent}11`,
                        }}
                      >
                        ₹{item.price}
                      </Typography>
                    </motion.div>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {loadingAddresses ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            >
              <CircularProgress
                sx={{ color: primaryAccent }}
                size={60}
                thickness={4}
              />
            </motion.div>
          </Box>
        ) : (
          previousAddresses.length > 0 && (
            <Fade in={true}>
              <Box mb={4}>
                <MotionTypography
                  color={textColor}
                  variant="h6"
                  gutterBottom
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  📍 Select a Previous Address:
                </MotionTypography>
                <AnimatePresence>
                  {previousAddresses.map((addr, index) => (
                    <motion.div
                      key={addr._id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Box
                        sx={{
                          border: `2px solid ${selectedAddressId === addr._id ? primaryAccent : borderColor}`,
                          borderRadius: 2,
                          p: 3,
                          mb: 2,
                          color: textColor,
                          backgroundColor:
                            selectedAddressId === addr._id
                              ? `${primaryAccent}11`
                              : bgColor,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateX(10px)',
                            boxShadow: `0 8px 25px ${primaryAccent}33`,
                          },
                          '&::before':
                            selectedAddressId === addr._id
                              ? {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  height: '3px',
                                  background: `linear-gradient(90deg, ${primaryAccent}, ${secondaryAccent})`,
                                }
                              : {},
                        }}
                        onClick={() => handleSelectAddress(addr, addr._id)}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedAddressId === addr._id}
                              onChange={() =>
                                handleSelectAddress(addr, addr._id)
                              }
                              sx={{
                                color: primaryAccent,
                                '&.Mui-checked': {
                                  color: primaryAccent,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography
                                fontWeight="bold"
                                sx={{ color: textColor }}
                              >
                                {addr.shipping_data.address_first}
                              </Typography>
                              <Typography sx={{ color: textColor }}>
                                {addr.shipping_data.address_secoend}
                              </Typography>
                              <Typography sx={{ color: textColor }}>
                                {addr.shipping_data.city},{' '}
                                {addr.shipping_data.state} -{' '}
                                {addr.shipping_data.pincode}
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Box>
            </Fade>
          )
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Box mb={3}>
            <MotionButton
              variant="outlined"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                color: primaryAccent,
                borderColor: primaryAccent,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: `${primaryAccent}22`,
                  boxShadow: `0 5px 15px ${primaryAccent}44`,
                },
              }}
            >
              ➕ Add a New Address
            </MotionButton>
          </Box>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <MotionBox
              border={`2px solid ${primaryAccent}`}
              p={3}
              borderRadius={2}
              mb={3}
              sx={{
                boxShadow: `0 10px 30px ${primaryAccent}33`,
                backgroundColor: bgColor,
                color: textColor,
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Typography variant="h6" color={textColor} gutterBottom>
                🏠 Shipping Address
              </Typography>
              <AddressFields
                formData={shippingData}
                setFormData={setShippingData}
              />
            </MotionBox>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                    sx={{
                      color: primaryAccent,
                      '&.Mui-checked': {
                        color: primaryAccent,
                      },
                      mb: 2,
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: textColor, mb: 2 }}>
                    💳 Billing Address Same as Shipping Address
                  </Typography>
                }
              />
            </motion.div>

            {!sameAsShipping && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
              >
                <MotionBox
                  border={`2px solid ${secondaryAccent}`}
                  p={3}
                  borderRadius={2}
                  mb={4}
                  sx={{
                    boxShadow: `0 10px 30px ${secondaryAccent}33`,
                    backgroundColor: bgColor,
                    color: textColor,
                  }}
                >
                  <Typography variant="h6" color={textColor} gutterBottom>
                    💳 Billing Address
                  </Typography>
                  <AddressFields
                    formData={billingData}
                    setFormData={setBillingData}
                  />
                </MotionBox>
              </motion.div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              mb: 3,
              backgroundColor: bgColor,
              color: textColor,
              border: `2px solid ${primaryAccent}`,
              borderRadius: '12px',
              p: 3,
              boxShadow: `0 8px 25px ${primaryAccent}22`,
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h6" color={primaryAccent} gutterBottom>
                🎁 Have a Referral Code?
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Enter Referral Code (Optional)"
                variant="outlined"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.trim())}
                onKeyPress={handleKeyPress}
                disabled={referralVerified}
                sx={{
                  input: { color: textColor },
                  label: { color: textColor },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: borderColor,
                    },
                    '&:hover fieldset': {
                      borderColor: primaryAccent,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: primaryAccent,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <MotionButton
                fullWidth
                variant="contained"
                onClick={verifyReferral}
                disabled={referralVerified}
                whileHover={{ scale: referralVerified ? 1 : 1.05 }}
                whileTap={{ scale: referralVerified ? 1 : 0.95 }}
                sx={{
                  backgroundColor: referralVerified
                    ? secondaryAccent
                    : primaryAccent,
                  color: isDarkMode ? 'black' : 'white',
                  '&:hover': {
                    backgroundColor: referralVerified
                      ? secondaryAccent
                      : primaryAccent,
                    opacity: 0.85,
                  },
                }}
              >
                {referralVerified ? '✅ Verified' : 'Verify'}
              </MotionButton>
            </Grid>
            {referralError && (
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    severity="error"
                    sx={{
                      backgroundColor: isDarkMode ? '#330000' : '#ffebee',
                      color: secondaryAccent,
                    }}
                  >
                    {referralError}
                  </Alert>
                </motion.div>
              </Grid>
            )}
            {!referralVerified && (
              <Grid item xs={12}>
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: primaryAccent, fontWeight: 'bold' }}
                  >
                    💰 Get ₹30 discount - Verify your referral code before
                    payment!
                  </Typography>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Box
            sx={{
              border: `3px solid ${primaryAccent}`,
              borderRadius: 3,
              p: 4,
              backgroundColor: bgColor,
              boxShadow: `0 15px 40px ${primaryAccent}33`,
              mb: 4,
              color: textColor,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${primaryAccent}, ${secondaryAccent}, ${primaryAccent})`,
                animation: 'gradient-shift 2s ease-in-out infinite',
              },
            }}
          >
            <Typography
              variant="h5"
              color={primaryAccent}
              fontWeight="bold"
              gutterBottom
            >
              📋 Invoice Summary
            </Typography>
            <Divider
              sx={{ borderColor: primaryAccent, mb: 3, borderWidth: 1 }}
            />

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body1" color={textColor}>
                  Subtotal
                </Typography>
                <Typography variant="body1" color={textColor} fontWeight="bold">
                  ₹{subtotal}
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body1" color={textColor}>
                  Shipping
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: 'line-through', color: 'gray' }}
                >
                  ₹{shippingCharge}
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                color={secondaryAccent}
                mb={2}
              >
                <Typography variant="body1">🎉 Discount</Typography>
                <Typography variant="body1" fontWeight="bold">
                  - ₹{discount}
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                color={secondaryAccent}
                mb={2}
              >
                <Typography variant="body1">🎁 Referral Discount</Typography>
                <Typography variant="body1" fontWeight="bold">
                  - ₹{reffereldiscount}
                </Typography>
              </Box>
            </motion.div>

            <Divider
              sx={{ borderColor: primaryAccent, my: 3, borderWidth: 1 }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: `${primaryAccent}15`,
                  p: 2,
                  borderRadius: 2,
                  border: `2px solid ${primaryAccent}`,
                }}
              >
                <Typography
                  variant="h6"
                  color={primaryAccent}
                  fontWeight="bold"
                >
                  💳 Total to Pay
                </Typography>
                <Typography
                  variant="h5"
                  color={primaryAccent}
                  fontWeight="bold"
                >
                  ₹{totalPayable}
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Box textAlign="center" mt={6}>
            <MotionButton
              variant="contained"
              size="large"
              onClick={handlePayment}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 15px 35px ${primaryAccent}55`,
              }}
              whileTap={{ scale: 0.98 }}
              sx={{
                backgroundColor: primaryAccent,
                color: isDarkMode ? '#000' : '#000',
                border: 'none',
                transition: 'all 0.3s ease',
                px: 8,
                py: 2,
                fontWeight: 'bold',
                fontSize: '1.2rem',
                borderRadius: '15px',
                mb: 2,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: isDarkMode ? '#00e6e6' : '#FFC400',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                  animation: 'shimmer 2s infinite',
                },
              }}
            >
              🚀 Proceed to Payment
            </MotionButton>

            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Typography variant="body2" sx={{ color: primaryAccent, mt: 1 }}>
                ⚡ Secure checkout in less than 30 seconds!
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="warning"
            sx={{
              width: '100%',
              backgroundColor: secondaryAccent,
              color: '#fff',
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <style jsx global>{`
          @keyframes shine {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }

          @keyframes shimmer {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }

          @keyframes gradient-shift {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `}</style>
      </Container>
    </MotionBox>
  );
};

export default PaymentPage;
