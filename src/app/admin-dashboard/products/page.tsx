import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Stack } from '@mui/material';

const products = [
  {
    title: "Casuals with chaos.",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/xG6sLdpQfCH3Z6Nc4V74g.jpg?v=1745137793"
  },
  {
    title: "Bong Roots",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/3_Front_bce8e706-fa0c-446a-9599-747034d96a64.png?v=1745137690"
  },
  {
    title: "Breezy Formals",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/MlbMBFTOQw6bLSoPyO9o7A.jpg?v=1745137533"
  },
  {
    title: "Cosmic Vibes",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/WhatsApp_Image_2025-04-20_at_2.55.25_PM.jpg?v=1745141253"
  },
  {
    title: "Oops I Did Nothing",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/aawIiUoTQJeQxJ17Mez6qA.jpg?v=1745138386"
  },
  {
    title: "Thoda Pagal, Thoda Pro",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/eyST3-ZUSgSog3J-OmixXA.jpg?v=1745138517"
  }
];

export default function ProductGrid() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
         {/* Header and Add Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Our Products
        </Typography>
        <Button variant="contained" color="secondary">
          Add Product
        </Button>
      </Stack>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card 
              sx={{ 
                height: 400,   // Fixed height
                width: '100%', // Full width of the grid item
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                borderRadius: 3, 
                boxShadow: 3 
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ 
                  height: 300,     // Fixed image height
                  objectFit: 'cover'
                }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    textAlign: 'center', 
                    fontWeight: 600,
                    fontSize: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {product.title}
                </Typography>
              </CardContent>
              <Box textAlign="center" pb={2}>
                <Button variant="contained" color="primary">
                  View
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
