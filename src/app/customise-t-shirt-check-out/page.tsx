'use client';
import React, { useEffect, useState } from 'react';
import {
  Box, Button, Checkbox, Container, FormControlLabel,
  Grid, TextField, Typography, Divider, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import ResponsiveHeader from '../../../components/header/header';
import AnnouncementBar from '../../../components/anouncement/announcement';
import axios from 'axios';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

declare global {
  interface Window {
    Razorpay: any;
  }
}


const AddressFields = ({ formData, setFormData }: { formData: Record<string, string>, setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>> }) => {
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
  const isMobile = useMediaQuery('(max-width:594px)');
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';


  const primaryAccent = isDarkMode ? '#00ffff' : '#FFD700';
  const secondaryAccent = isDarkMode ? '#00ff00' : '#FF0000';
  const bgColor = isDarkMode ? '#111' : '#fff';
  const textColor = isDarkMode ? 'white' : 'black';
  const borderColor = isDarkMode ? '#00ffff' : 'black';

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const verifyReferral = async () => {
        try {
          const res = await axios.post('/api/verify-referral', { code: referralCode });
          console.log("Refferal Verification--------->>",res);
          
          if (res?.data?.is_reffer === true) {
            setReferralVerified(true);
            setReferralError('');
            
            const Payable = subtotal - 30 * (Array.isArray(orderData) ? orderData.length : 0);
            const dis = 30 * (Array.isArray(orderData) ? orderData.length : 0)
            setDiscount(dis);
            setTotalPayable(Payable)
          } else {
            setReferralVerified(false);
            setReferralError("Referral code didn't match.");
            setDiscount(0);
            setTotalPayable(subtotal)
          }
        } catch (error) {
          setReferralError('Something went wrong while verifying referral.');
        }
      };
    
      const handleKeyPress = (e:any) => {
        if (e.key === 'Enter') {
          verifyReferral();
        }
      };

  
  useEffect(() => {
    const cookieData = Cookies.get('user_customise_order_data');
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData)
        setOrderData(JSON.parse(cookieData));
        const subtotal = parsedData?.order_images?.[0]?.price * (parsedData?.order_images?.[0]?.quantity || 1) || 0
        setsubtotal(subtotal)
        setTotalPayable(subtotal)
      } catch (err) {
        console.error('Failed to parse order data', err);
      }
    }

    const userCookie = Cookies.get('user_login_data');
    const userId = userCookie ? JSON.parse(userCookie)._id : null;
    if (!userId) return;

    fetch(`/api/save-address?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        setPreviousAddresses(data?.data || []);
        setLoadingAddresses(false);
        if (!data?.data?.length) setShowForm(true);
      })
      .catch(() => {
        setLoadingAddresses(false);
        setShowForm(true);
      });
  }, []);

  const makePayment = async (amount_paied: number) => {
  const res = await fetch("api/create-payment-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amount_paied }),
  });

  const { order } = await res.json();

  const userCookie = Cookies.get('user_login_data');
  const userId = userCookie ? JSON.parse(userCookie)._id : null;

  if (!userId) {
    setSnackbarMessage('Please Log In First!, And Try Again');
    setSnackbarOpen(true);
    return;
  }

  const options = {
    key: process.env.RAZORPAY_PAYMENT_TOKEN,
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,
    name: "Prin Tee Pal",
    description: "Prin Tee Pal Transaction",
    handler: async (response: any) => {
      try {
        const frontDesign = orderData?.order_images.find(
          (img: any) => img.type === 'front-design'
        );

        const payload = {
          response,
          user_id: userId,
          size: frontDesign?.size || '',
          color: frontDesign?.color || '',
          quantity: frontDesign?.quantity || 1,
          product: orderData?.order_images || [],
          amount: amount_paied,
          ...(reffereldiscount > 0 && { referralCode }),
        };

        console.log("Payload Payment-------->>", payload);

        const verify = await fetch("/api/verify-customise-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await verify.json();
        console.log("data Payment-------->>", data);

        setSnackbarMessage(data.message);
        setSnackbarOpen(true);

        router.push("/");
      } catch (error) {
        console.error("Payment verification error:", error);
        setSnackbarMessage("Something went wrong during payment verification.");
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
    const validateFields = (obj: Record<string, string>) => {
      const requiredKeys = [
        'first_name', 'last_name', 'phone_number', 'email',
        'address_first', 'address_secoend', 'city', 'pincode', 'state', 'country'
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
    const billingError = sameAsShipping ? '' : getErrorMessage(billingData, 'Billing');
    const shippingValid = validateFields(shippingData);
    const billingValid = sameAsShipping || validateFields(billingData);

    if (!shippingValid || !billingValid || shippingError || billingError) {
      const message =
        shippingError || billingError || 'Please complete all required fields before proceeding to payment.';
      setSnackbarMessage(message);
      setSnackbarOpen(true);
      return;
    }

    const userCookie = Cookies.get('user_login_data');
    const userId = userCookie ? JSON.parse(userCookie)._id : null;
    if (!userId) {
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
        return;
      }

      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load.');
        return;
      }

      // makePayment(totalPayable);
      makePayment(1);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while processing your request.');
    }
  };

  // const subtotal = orderData?.order_images?.[0]?.price * (orderData?.order_images?.[0]?.quantity || 1) || 0;
  const shippingCharge = 49;
  const discount = shippingCharge;
  // const totalPayable = subtotal;

  return (
    
    <MotionBox
  sx={{
    bgcolor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.text.primary}`,
    // p: 3,
    borderRadius: 2,
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <AnnouncementBar/>
  <ResponsiveHeader/>
  <Container>
    <Typography variant="h5" color={textColor} gutterBottom>Your Order</Typography>

    <Grid container spacing={2} mb={4}>
        {(orderData?.order_images || [])
            .filter((item: any) => item.type === "front-mockup" || item.type === "back-mockup")
            .map((item: any) => (
            <Grid item xs={12} sm={6} md={isMobile ? 12 : 4} key={item.url?.key || item.type}>
                <Box
                border={`1px solid ${primaryAccent}`}
                borderRadius={2}
                p={2}
                sx={{
                    backgroundColor: bgColor,
                    boxShadow: `0 0 10px ${primaryAccent}55`,
                    height: '100%',
                    color: textColor,
                }}
                >
                <Image
                    src={item.url.url}
                    alt={item.url.key}
                    width={300}
                    height={300}
                    style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                />
                <Typography variant="h6" color={textColor} mt={1}>{item.type}</Typography>
                <Typography variant="body2" color={primaryAccent}>
                    Size: <strong>{item.size}</strong>
                </Typography>
                <Typography variant="body2" color={primaryAccent}>
                    Color: <strong>{item.color}</strong>
                </Typography>
                <Typography variant="body2" color={primaryAccent}>
                    Quantity: <strong>{item?.quantity || 1}</strong>
                </Typography>
                <Typography variant="subtitle1" color={primaryAccent} fontWeight="bold" mt={1}>
                    ₹{item.price}
                </Typography>
                </Box>
            </Grid>
            ))
        }
        </Grid>


    {loadingAddresses ? (
      <CircularProgress color="inherit" />
    ) : (
      previousAddresses.length > 0 && (
        <Box mb={4}>
          <Typography color={textColor} variant="h6" gutterBottom>
            Select a Previous Address:
          </Typography>
          {previousAddresses.map((addr) => (
            <Box
              key={addr._id}
              sx={{
                border: `1px solid ${primaryAccent}`,
                borderRadius: 2,
                p: 2,
                mb: 2,
                color: textColor,
                backgroundColor: bgColor,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAddressId === addr._id}
                    onChange={() => handleSelectAddress(addr, addr._id)}
                    sx={{ color: textColor }}
                  />
                }
                label={
                  <Box>
                    <div>{addr.shipping_data.address_first}</div>
                    <div>{addr.shipping_data.address_secoend}</div>
                    <div>
                      {addr.shipping_data.city}, {addr.shipping_data.state} - {addr.shipping_data.pincode}
                    </div>
                  </Box>
                }
              />
            </Box>
          ))}
        </Box>
      )
    )}

    <Box mb={3}>
      <Button
        variant="outlined"
        onClick={() => setShowForm(true)}
        sx={{ color: primaryAccent, borderColor: primaryAccent }}
      >
        Add a New Address
      </Button>
    </Box>

    {showForm && (
      <>
        <MotionBox
          border={`1px solid ${textColor}`}
          p={3}
          borderRadius={2}
          mb={3}
          sx={{ boxShadow: `0 0 10px ${primaryAccent}55`, backgroundColor: bgColor, color: textColor }}
        >
          <Typography variant="h6" color={textColor} gutterBottom>Shipping Address</Typography>
          <AddressFields formData={shippingData} setFormData={setShippingData} />
        </MotionBox>

        <FormControlLabel
          control={
            <Checkbox
              checked={sameAsShipping}
              onChange={(e) => setSameAsShipping(e.target.checked)}
              sx={{ color: textColor }}
            />
          }
          label={<Typography sx={{ color: textColor }}>Same as Shipping Address</Typography>}
        />

        {!sameAsShipping && (
          <MotionBox
            border={`1px solid ${textColor}`}
            p={3}
            borderRadius={2}
            mb={4}
            sx={{ boxShadow: `0 0 10px ${primaryAccent}55`, backgroundColor: bgColor, color: textColor }}
          >
            <Typography variant="h6" color={textColor} gutterBottom>Billing Address</Typography>
            <AddressFields formData={billingData} setFormData={setBillingData} />
          </MotionBox>
        )}
      </>
    )}

    <Box
      sx={{
        border: `1px solid ${primaryAccent}`,
        borderRadius: 2,
        p: 3,
        backgroundColor: bgColor,
        boxShadow: `0 0 10px ${primaryAccent}55`,
        mb: 4,
        color: textColor,
      }}
    >
      <Typography variant="h6" color={textColor} gutterBottom>Invoice Summary</Typography>
      <Divider sx={{ borderColor: isDarkMode ? 'gray' : 'black', mb: 2 }} />
      <Box display="flex" justifyContent="space-between" mb={1}><span>Subtotal</span><span>₹{subtotal}</span></Box>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <span>Shipping</span>
        <span style={{ textDecoration: 'line-through' }}>₹{shippingCharge}</span>
      </Box>
      <Box display="flex" justifyContent="space-between" color={secondaryAccent} mb={1}>
        <span>Discount</span>
        <span>- ₹{discount}</span>
      </Box>
      <Divider sx={{ borderColor: isDarkMode ? 'gray' : 'black', my: 2 }} />
      <Box display="flex" justifyContent="space-between" color={primaryAccent} fontWeight="bold">
        <span>Total to Pay</span><span>₹{totalPayable}</span>
      </Box>
    </Box>
     <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            mb:2,
            backgroundColor: bgColor,
            color: textColor,
            // border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            p: 2,
          }}
        >
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
            <Button
              fullWidth
              variant="contained"
              onClick={verifyReferral}
              disabled={referralVerified}
              sx={{
                backgroundColor: referralVerified ? secondaryAccent : primaryAccent,
                color: isDarkMode ? 'black' : 'white',
                '&:hover': {
                  backgroundColor: referralVerified ? secondaryAccent : primaryAccent,
                  opacity: 0.85,
                },
              }}
            >
              {referralVerified ? 'Verified' : 'Verify'}
            </Button>
          </Grid>
          {referralError && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ backgroundColor: isDarkMode ? '#330000' : '#ffebee', color: secondaryAccent }}>
                {referralError}
              </Alert>
            </Grid>
          )}
          {!referralVerified && (
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: textColor }}>
                To get ₹30 discount, please verify your referral code before payment.
              </Typography>
            </Grid>
          )}
        </Grid>

    <Box textAlign="center" mt={6}>
      <MotionButton
        variant="contained"
        size="large"
        onClick={handlePayment}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        sx={{
          backgroundColor: primaryAccent,
          color: isDarkMode ? '#000' : '#000',
          border: 'none',
          transition: 'all 0.3s ease',
          px: 6,
          py: 1.5,
          fontWeight: 'bold',
          fontSize: '1.1rem',
          borderRadius: '10px',
          mb:2,
          '&:hover': {
            backgroundColor: isDarkMode ? '#00e6e6' : '#FFC400',
          },
        }}
      >
        Proceed to Payment
      </MotionButton>
    </Box>

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="warning"
        sx={{ width: '100%', backgroundColor: secondaryAccent, color: '#fff' }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </Container>
</MotionBox>

  );
};

export default PaymentPage;