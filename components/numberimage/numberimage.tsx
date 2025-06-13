'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  useTheme,
  Button,
  CardContent,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ChooseActionModal from '../ChooseActionModal/ChooseActionModal';

const products = [
  {
    id: 1,
    title: 'Muscle Hustle',
    category: 'Adventure Fit',
    price: '₹ 1299',
    slug: 'muscle-hustle',
    path: '/blog/muscle-hustle',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/3cf60248-a2f2-4467-98e4-9dcc76c2b95e.jpg',
  },
  {
    id: 2,
    title: 'Geometric Escape',
    category: 'Minimalist Vibes',
    price: '₹ 1299',
    slug: 'geometric-escape',
    path: '/blog/geometric-escape',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/e1df5ee4-d3b6-4719-a561-4843b9751273.jpg',
  },
  {
    id: 3,
    title: 'Muscle Hustle',
    category: 'Adventure Fit',
    price: '₹ 1299',
    slug: 'muscle-hustle',
    path: '/blog/muscle-hustle',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/f14a631b-4e13-40d6-b061-5d2c7e1b43e0.jpg',
  },
  {
    id: 4,
    title: 'Mountain Sketch',
    category: 'Minimalist Vibes',
    price: '₹ 1299',
    slug: 'mountain-sketch',
    path: '/blog/mountain-sketch',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/63d5ad1f-9475-4a9c-b165-1ff0ead8da6c.jpg',
  },
  {
    id: 5,
    title: 'Muscle Hustle',
    category: 'Adventure Fit',
    price: '₹ 1299',
    slug: 'muscle-hustle',
    path: '/blog/muscle-hustle',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/60eabcd1-4721-46bc-93a2-0543e3a7370c.jpg',
  },
  {
    id: 6,
    title: 'Calorie Burn',
    category: 'T-Shirts',
    price: '₹ 1299',
    slug: 'calorie-burn',
    path: '/blog/calorie-burn',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/c2447542-cc5e-49c2-b1bf-a8157f6fc932.jpg',
  },
  {
    id: 7,
    title: 'Overthinking Mode',
    category: 'T-Shirts',
    price: '₹ 1299',
    slug: 'overthinking-mode',
    path: '/blog/overthinking-mode',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/27cd182e-5721-4250-909d-99ad52ad299a.jpg',
  },
  {
    id: 8,
    title: 'Muscle Hustle',
    category: 'Adventure Fit',
    price: '₹ 999',
    slug: 'muscle-hustle',
    path: '/blog/muscle-hustle',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/c626c3b1-f2e0-4740-8ebb-b7c0934e1822.jpg',
  },
  {
    id: 9,
    title: 'Road Legend',
    category: 'Pants',
    price: '₹ 1699',
    slug: 'road-legend',
    path: '/blog/road-legend',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/17121ad2-3951-451e-a341-b047a69ea58f.jpg',
  },
  {
    id: 10,
    title: 'Road Legend',
    category: 'Joggers',
    price: '₹ 1299',
    slug: 'road-legend',
    path: '/blog/road-legend',
    image:
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/9e6c0d03-8946-4407-97e9-fd96f7470e82.jpg',
  },
];

const ScrollableProductCarousel = () => {
  const containerRef = React.useRef(null);
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();
  const isDarkMode = theme.palette.mode === 'dark';
  const textColor = isDarkMode ? '#fff' : '#000';
  const borderColor = isDarkMode ? '#555' : '#ccc';

  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = 350 + 16; // Card width + spacing approx

  const handleCardClick = (slug:any) => {
    setOpen(true);
    setSlug(slug)
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const scroll = (direction: string) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 350; // Adjust as needed
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Box
      sx={{ bgcolor: isDarkMode ? 'black' : 'white', pt: '15px', pb: '15px' }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pr: '32px', pl: '32px' }}
      >
        <Typography variant="h5" fontWeight="bold">
          Fitness Freak
        </Typography>

        <Button
          size="small"
          onClick={() => router.push('/products')}
          sx={{
            position: 'relative',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '0.95rem',
            px: 3,
            py: 1.2,
            width: '190px',
            borderRadius: 4,
            overflow: 'hidden',
            color: isDarkMode ? '#fff' : '#000',
            border: `2px solid ${isDarkMode ? '#fff' : '#000'}`,
            backgroundColor: isDarkMode ? '#111' : '#fff',
            animation: 'pulseBorder 2s infinite ease-in-out',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-75%',
              width: '250%',
              height: '100%',
              background: `linear-gradient(120deg, transparent, ${
                isDarkMode ? '#d32f2f88' : '#ff525288'
              }, transparent)`,
              animation: 'shimmer 2s infinite',
              zIndex: 0,
            },
            '& > *': {
              position: 'relative',
              zIndex: 1,
            },
            '@keyframes shimmer': {
              '0%': { left: '-75%' },
              '50%': { left: '100%' },
              '100%': { left: '100%' },
            },
            '@keyframes pulseBorder': {
              '0%': {
                boxShadow: `0 0 0px ${isDarkMode ? '#d32f2f55' : '#ff525255'}`,
              },
              '50%': {
                boxShadow: `0 0 12px 4px ${isDarkMode ? '#d32f2f88' : '#ff525288'}`,
              },
              '100%': {
                boxShadow: `0 0 0px ${isDarkMode ? '#d32f2f55' : '#ff525255'}`,
              },
            },
          }}
        >
          Show More
        </Button>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Box
          ref={containerRef}
          display="flex"
          overflow="auto"
          sx={{
            scrollBehavior: 'smooth',
            py: 4,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              sx={(theme) => ({
                position: 'relative',
                minWidth: '400px',
                [theme.breakpoints.down(471)]: {
                  minWidth: '66.666vw',
                },
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                mx: 1,
              })}
              onClick={() => handleCardClick(product.slug)}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              >
                <Typography
                  variant="h1"
                  sx={(theme) => ({
                    fontSize: '160px',
                    fontWeight: 900,
                    color: theme.palette.mode === 'dark' ? '#444' : '#250202',
                    opacity: 0.4,
                    mr: '-25px',
                    zIndex: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    width: '75px',
                    flexShrink: 0,
                    textAlign: 'right',
                  })}
                >
                  {product.id}
                </Typography>

                <Card
                  sx={(theme) => ({
                    borderRadius: 4,
                    boxShadow: 6,
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#000' : '#fff',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    position: 'relative',
                    zIndex: 1,
                    flex: 1,
                  })}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={(theme) => ({
                      objectFit: 'cover',
                      height: '360px',
                      [theme.breakpoints.down('sm')]: {
                        height: '300px',
                      },
                    })}
                  />
                </Card>
              </Box>

              <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
                {product.title}
              </Typography>
            </Box>
          ))}
        </Box>
        {isDesktop && (
          <>
            <IconButton
              onClick={() => scroll('left')}
              size="small"
              sx={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                zIndex: 3,
                bgcolor: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              <ArrowBackIos fontSize="inherit" />
            </IconButton>

            <IconButton
              onClick={() => scroll('right')}
              size="small"
              sx={{
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                zIndex: 3,
                bgcolor: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              <ArrowForwardIos fontSize="inherit" />
            </IconButton>
          </>
        )}
      </Box>

      {/* Pagination Dots */}
      <Box display="flex" justifyContent="center" mt={3} gap={1}>
        {products.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: activeIndex === index ? '#d32f2f' : '#999',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </Box>
      <ChooseActionModal
        open={open}
        onClose={() => setOpen(false)}
        productSlug={slug}
        productId={''}      />
    </Box>
  );
};

export default ScrollableProductCarousel;
