'use client';
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, useTheme, Grid, Paper, Avatar, useMediaQuery,
  LinearProgress,
  Button,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import AnnouncementBar from '../../../components/anouncement/announcement';
import Header from '../../../components/header/header';
import { useRouter } from 'next/navigation';

const OrderStep = [
  'On Hold',
  'Received',
  'To Be Printed',
  'Printed',
  'Manifested',
  'Picked Up',
  'Delivered'
];

const stops = [...OrderStep];

const getStopColors = (isDarkMode: boolean): { [key: string]: string } => ({
  'On Hold': isDarkMode ? 'white' : 'black',
  'Received': isDarkMode ? 'white' : 'black',
  'To Be Printed': isDarkMode ? 'white' : 'black',
  'Printed': isDarkMode ? 'white' : 'black',
  'Manifested': isDarkMode ? 'white' : 'black',
  'Picked Up': isDarkMode ? 'white' : 'black',
  'Delivered': isDarkMode ? 'white' : 'black',
});

function OrderProgress({ currentStop }: { currentStop: string }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isSmallScreen = useMediaQuery('(max-width:880px)');

  const stopColors = getStopColors(isDarkMode);

  const currentIndex = stops.findIndex(
    (s) => s.toLowerCase() === currentStop.toLowerCase()
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: isSmallScreen ? 'flex-start' : 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        mt: 2,
        gap: 2,
      }}
    >
      {stops.map((stop, index) => {
        const isCurrent = index === currentIndex;
        const isPassed = index <= currentIndex;
        const dotColor = stopColors[stop];
        const size = isCurrent ? 40 : 24;

        return (
          <Box
            key={stop}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              flex: '1 1 auto',
              minWidth: isSmallScreen ? '100%' : 'auto'
            }}
          >
            <Box
              sx={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: dotColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 1,
                position: 'relative',
              }}
            >
              {isCurrent && (
                <DirectionsCarIcon sx={{ fontSize: 24, color: isDarkMode ? 'black' : 'white' }} />
              )}
            </Box>
            <Typography variant="caption" sx={{ maxWidth: 80 }}>{stop}</Typography>
            {index !== stops.length - 1 && (
              <Box
                sx={{
                  height: isSmallScreen ? 2 : 4,
                  width: isSmallScreen ? '100%' : 40,
                  backgroundColor: isPassed ? dotColor : (isDarkMode ? '#555' : '#ccc'),
                  mt: isSmallScreen ? 1 : 0,
                  ml: isSmallScreen ? 0 : 1,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

const UserOrderPage = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const userData = Cookies.get('user_login_data');
      if (userData) {
        const userId = JSON.parse(userData)._id;
        const res = await axios.get(`/api/get-user-order`, {
          params: { userId },
        });
        if (res.data.success) {
          setLoading(false);
          setOrders(res.data.data.orders);
        }
        else{
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, []);

  const handleProductClick = async (product_id: String) => {
    try {
      setLoading(true)
      const response = await fetch('/api/fetch-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id }),
      });

      if (!response.ok) {
        
        setLoading(false)
        throw new Error('Failed to fetch product')
      }
      
      setLoading(false)
      const data = await response.json();
      console.log("Fetching Slug data",data);
      
      if (data.data.slug) {
        // window.location.href = `/blog/${data.data.slug}`;
      const route = `/blog/${data.data.slug}`;
      router.push(route);
      } else {
        console.error('Slug not found in response');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return (
    <Box sx={{
      bgcolor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      minHeight: '100vh',
    }}>
      <AnnouncementBar />
      <Header />
      {loading && <LinearProgress sx={{mt:2}} />}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography
            variant="h4"
            gutterBottom
            sx={{ color: 'primary.main', textAlign: 'center', width: '100%' }}
            >
            My Orders
        </Typography>

        {orders.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <Typography variant="h5" color="warning.main" gutterBottom>
              No orders found.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              "The best way to make a statement is to wear one. Add a bold tee to your wardrobe today."
            </Typography>
          </Box>
        ) : (
          orders.map((order, idx) => {
            const stepIndex = OrderStep.findIndex(
              step => step.toLowerCase() === order.desposition.toLowerCase()
            );

            return (
              <Paper key={idx} elevation={3} sx={{
                p: 3,
                my: 3,
                border: `1px solid ${isDarkMode ? '#fff' : '#000'}`,
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box display="flex" gap={2} alignItems="center">
                      <Avatar
                        variant="rounded"
                        src={order.product_details[0]?.thumbnail_url}
                        sx={{ width: 120, height: 120 }}
                      />
                      <Box>
                        <Typography variant="h6" color="info.main">{order.product_name}</Typography>
                        <Typography>Size: <strong>{order.size}</strong></Typography>
                        <Typography>Color: <strong>{order.color}</strong></Typography>
                        <Typography>Status: <strong>{order.desposition}</strong></Typography>
                        <Typography>
                          Delivery Date:{' '}
                          {order.delivery_date ? order.delivery_date : (
                            <span style={{ color: 'orange' }}>
                              Update soon, product is in factory for making
                            </span>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Button
                            size="small"
                            variant="text"
                            onClick={() => handleProductClick(order.product_id)}
                            sx={{ color: isDarkMode ? 'cyan':'black', border:  isDarkMode ? '1px solid white' : '3px solid Yellow', minWidth: 'auto', px: 1, py: 0.5, fontSize: '0.75rem' }}
                          >
                            View Product
                          </Button>
                        </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <OrderProgress currentStop={order.desposition} />
                  </Grid>
                </Grid>
              </Paper>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default UserOrderPage;