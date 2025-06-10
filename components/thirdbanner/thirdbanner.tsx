import React, { useRef } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useRouter } from 'next/navigation';

const items = [
  { slug: 'option-aoption-b', title: 'Option A/Option B', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/0cdfd891-4de2-4480-a13a-f6570a00709f.jpg' },
  { slug: 'cute-little-psycho', title: 'Cute Little Psycho', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/fdcf68a1-f08d-485a-bac7-edc169c4afe2.jpg' },
  { slug: 'mood-not-in-the-mood', title: 'Mood : Not in the mood', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/a0b09db8-2bd9-42da-b4eb-5922212573e8.jpg' },
  { slug: 'deadly-caring-20', title: 'Deadly Caring 2.0', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/b36d14d8-74e2-4e76-9da4-7f6b4f10bde2.jpg' },
  { slug: 'im-possible', title: 'I\'M POSSIBLE', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/c425c4cd-9f02-4809-a3e3-6e0fd8a8ccd7.webp' },
  { slug: 'warning', title: 'Warning', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/e96489cf-5be2-4cb3-a00b-ddf2a24054ce.jpg' },
  { slug: 'the-lone-tree', title: 'The Lone Tree', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/9475b4b5-1b21-4f38-b4fa-15ccb9923a93.jpg' },
  { slug: 'overthinking-mode', title: 'Overthinking Mode', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/4e7dc632-4b71-4f0a-95ba-771a3d2e85ac.jpg' },
  { slug: 'eyes-on-the-wild', title: 'Eyes on the Wild', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/010c8009-fd23-4b80-8f7a-4d83d638d11e.jpg' },
  { slug: 'the-lone-tree', title: 'The Lone Tree', image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/f7263f11-8240-4a23-93ba-bf84dd6a4088.jpg' },
];

const ProductSwiper = () => {
  const swiperRef = useRef(null);
  const router = useRouter();
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';
  const borderColor = isDark ? '#fff' : '#000';
  const textColor = isDark ? '#fff' : '#000';

  const handleClick = (slug:string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <Box sx={{ my: 4, px: { xs: 2, sm: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color={textColor}>
          Editor&apos;s Choice
        </Typography>
        <Button
            size="small"
            onClick={() => router.push('/products')}
            sx={{
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "0.85rem",
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            px: 2,
            py: 0.5,
            width:"180px",
            "&:hover": {
                backgroundColor: isDark ? "#222" : "#eee",
                color: "#d32f2f",
                borderColor: "#d32f2f",
            },
            }}
        >
          Show More
        </Button>
      </Box>

      {/* Swiper Carousel */}
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
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              onClick={() => handleClick(item.slug)}
              sx={{
                cursor: 'pointer',
                width: '100%',
                maxWidth: 300,
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  height: { xs: 200, sm: 200, md: 250, lg: 300 },
                  width: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `2px solid ${borderColor}`,
                  backgroundColor: ['#FFD700', '#FF6347', '#1E90FF', '#FFA500', '#32CD32'][index % 5],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  "&:hover": {
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
  );
};

export default ProductSwiper;
