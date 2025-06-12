'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SwiperCore from 'swiper';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grow,
  useTheme,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ComingSoonModal from '../commingsoon/commingsoon';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/navigation';

type TShirtItem = {
  title: string;
  image: string;
};

const fetchCollections = async (): Promise<TShirtItem[]> => {
  const res = await axios.get('/api/user-collections-list');
  console.log('API response:', res.data);
  return res.data.data.category || [];
};

const TShirtGrid = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const isDark = theme.palette.mode === 'dark';
  const bgColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const borderColor = textColor;
  const isDarkMode = theme.palette.mode === 'dark';

  const { data, isLoading } = useQuery({
    queryKey: ['tshirt-collections'],
    queryFn: fetchCollections,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });

  const items = Array.isArray(data) ? data : [];

  // const handleCardClick = () => setOpenModal(true);
  const handleCardClick = () => {
    router.push(`/collection`);
  };
  const handleClick = (slug: string) => {
    router.push(`/products-under/${slug}`);
  };
  const handleCloseModal = () => setOpenModal(false);

  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  // Determine number of boxes to render
  let boxCount = 2;
  if (isXl) boxCount = 9;
  else if (isLg) boxCount = 8;
  else if (isMd) boxCount = 7;
  else if (isSm) boxCount = 5;

  if (isLoading) {
    return (
      <Box sx={{ py: 6, px: 2, backgroundColor: isDark ? 'black' : 'white' }}>
        {/* Header row with title and button skeleton */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1,
            mb: 4,
          }}
        >
          <Skeleton
            variant="text"
            width={141}
            height={32}
            sx={{ bgcolor: isDark ? '#333' : undefined }}
          />
          <Skeleton
            variant="rectangular"
            width={109}
            height={36}
            sx={{
              borderRadius: 2,
              bgcolor: isDark ? '#333' : undefined,
            }}
          />
        </Box>

        {/* Horizontal scroll skeleton cards */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari, Opera
            },
          }}
        >
          {[...Array(boxCount)].map((_, idx) => (
            <Box
              key={idx}
              sx={{
                width: 200,
                flexShrink: 0,
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton
                variant="text"
                width="80%"
                height={24}
                sx={{ mt: 1, mx: 'auto' }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: bgColor, py: 6, px: 2 }}>
      {/* Heading and CTA */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ color: textColor }}>
          Explore Our Collections
        </Typography>
        <Button
          size="small"
          onClick={handleCardClick}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '0.85rem',
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            px: 2,
            py: 0.5,
            width: '180px',
            '&:hover': {
              backgroundColor: isDarkMode ? '#222' : '#eee',
              color: '#d32f2f',
              borderColor: '#d32f2f',
            },
          }}
        >
          Show More
        </Button>
      </Box>

      {/* Swiper Section */}
      <Box sx={{ px: { xs: 1, sm: 2 } }}>
        {' '}
        {/* Add horizontal padding to the swiper container */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          spaceBetween={24}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            0: { slidesPerView: 2 },
            600: { slidesPerView: 3 },
            900: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          }}
          style={{ paddingRight: '5px' }} // this ensures the last card isn’t clipped
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                onClick={() => handleClick(item._id)}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: 300,
                  mx: 'auto',
                }}
              >
                <Box
                  sx={{
                    height: {
                      xs: 200,
                      sm: 200,
                      md: 250,
                      lg: 300,
                    },
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `2px solid ${borderColor}`,
                    backgroundColor: [
                      '#FFD700',
                      '#FF6347',
                      '#1E90FF',
                      '#FFA500',
                      '#32CD32',
                    ][index % 5],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    mt: 1,
                    color: textColor,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <ComingSoonModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default TShirtGrid;
