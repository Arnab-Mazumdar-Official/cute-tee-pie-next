'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const AddressFields = ({ labelPrefix }: { labelPrefix: string }) => {
  const fieldProps = {
    InputLabelProps: { style: { color: 'white' } },
    InputProps: {
      style: { color: 'white' },
      autoComplete: 'off',
    },
    sx: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: '#00ffff', // Neon glow on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: '#00ffff',
        },
        '& input:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px black inset',
          WebkitTextFillColor: 'white',
        },
      },
      mb: 2,
    },
    fullWidth: true,
    variant: 'outlined' as const,
  };

  const fields = [
    'First Name',
    'Last Name',
    'Mobile No.',
    'Email',
    'Flat/House/Plot No.',
    'Street/Locality/Landmark',
    'City',
    'Pincode',
    'State',
    'Country',
  ];

  return (
    <Grid container spacing={2}>
      {fields.map((label, idx) => (
        <Grid item xs={12} sm={6} key={idx}>
          <TextField
            label={`${labelPrefix} ${label}`}
            autoComplete="off"
            {...fieldProps}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const PaymentPage: React.FC = () => {
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    const options = {
      key: process.env.RAZORPAY_PAYMENT_TOKEN,
      amount: 100,
      currency: 'INR',
      name: 'Prin Tee Pal',
      description: 'Test Transaction',
      handler: function (response: any) {
        alert('Payment Successful! ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#ffffff',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <MotionBox
      sx={{ backgroundColor: '#000', minHeight: '100vh', py: 4 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <Typography variant="h4" color="white" gutterBottom>
            Address Details
          </Typography>
        </motion.div>

        {/* Shipping Address */}
        <MotionBox
          border="1px solid white"
          p={3}
          borderRadius={2}
          mb={4}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          sx={{
            boxShadow: '0 0 10px #00ffff55',
          }}
        >
          <Typography variant="h6" color="white" gutterBottom>
            Shipping Address
          </Typography>
          <AddressFields labelPrefix="Shipping" />
        </MotionBox>

        {/* Same as shipping checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={sameAsShipping}
              onChange={(e) => setSameAsShipping(e.target.checked)}
              sx={{ color: 'white' }}
            />
          }
          label={
            <Typography sx={{ color: 'white' }}>
              Same as Shipping Address
            </Typography>
          }
        />
        <Typography variant="body2" color="white" mb={3}>
          If any issue then contact via WhatsApp
        </Typography>

        {/* Billing Address */}
        {!sameAsShipping && (
          <MotionBox
            border="1px solid white"
            p={3}
            borderRadius={2}
            mb={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              boxShadow: '0 0 10px #00ffff55',
            }}
          >
            <Typography variant="h6" color="white" gutterBottom>
              Billing Address
            </Typography>
            <AddressFields labelPrefix="Billing" />
          </MotionBox>
        )}

        {/* Pay Now */}
        <Box textAlign="center" mt={6}>
          <MotionButton
            variant="outlined"
            size="large"
            onClick={handlePayment}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 15px #00ffff',
              backgroundColor: '#111',
            }}
            whileTap={{ scale: 0.98 }}
            sx={{
              color: 'white',
              borderColor: 'white',
              transition: 'all 0.3s ease',
            }}
          >
            Pay Now
          </MotionButton>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default PaymentPage;
