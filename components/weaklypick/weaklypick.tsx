'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

const tshirtOptions = [
  {
    title: 'One More Chapter',
    path: '/blog/one-more-chapter',
    color: '#FF6347',
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/22e4615e-b6fc-47c1-ad74-e3a2bc5e05db.jpg', // Optional placeholder or leave blank
  },
  {
    title: 'Fly Like A Butterfly',
    path: 'blog/fly-like-a-butterfly',
    color: '#1E90FF',
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/194dc8fd-e5a1-45ce-b894-c6cf1aeeb3d2.jpg',
  },
  {
    title: 'Unlimited',
    path: '/blog/unlimited',
    color: '#FFA500',
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/98be9756-8323-4c99-88df-eff267c6164e.jpg',
  },
  {
    title: 'Error : 404',
    path: '/blog/error-404',
    color: '#32CD32',
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/63ee33be-e282-49a4-9b6d-3ef3c283038c.jpg',
  },
  {
    title: 'Tried and Tired',
    path: '/blog/tried-and-tired',
    color: '#FFD700',
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/7d966cd3-d2fc-4a8b-8cd4-c3fc73db84cc.jpg', // Replace with actual path
  },
];

const Weeklypick = () => {
  const theme = useTheme();
  const router = useRouter();

  const isDark = theme.palette.mode === 'dark';
  const bgColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const borderColor = textColor;

  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        backgroundColor: bgColor,
        color: textColor,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Weekly Pick
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          mt: 4,
        }}
      >
        {tshirtOptions.map((item) => (
          <Box
            key={item.path}
            onClick={() => router.push(item.path)}
            sx={{
              cursor: 'pointer',
              width: {
                xs: '45%',
                sm: 200,
                md: 250,
                lg: 250,
              },
              maxWidth: 300,
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
                border: `2px solid ${borderColor}`,
                backgroundColor: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {item.image ? (
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
              ) : (
                <Typography variant="body2" sx={{ p: 2 }}>
                  No Image
                </Typography>
              )}
            </Box>

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mt: 1, color: textColor }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Weeklypick;
