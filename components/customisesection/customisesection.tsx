'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

const tshirtOptions = [
  {
    title: 'Female Round Neck',
    path: '/female-round-neck-tshirt',
    color: '#FF6347',
    image: '/customise image/94fuL-bvR7CzGUcqoDI7Fg.webp', // Optional placeholder or leave blank
  },
  {
    title: 'Polo Customised',
    path: '/polo-customised-tshirt',
    color: '#1E90FF',
    image: '/customise image/P1ynu4uRRaWY1Nc2w8lNfg.webp',
  },
  {
    title: 'Unisex Oversize',
    path: '/unisex-oversize-tshirt',
    color: '#FFA500',
    image: '/customise image/Kp09pJXgSLezZgAoSSnHWQ.jpeg',
  },
  {
    title: 'Men Full Sleeve',
    path: '/mens_full_sleeve_t_shirt',
    color: '#32CD32',
    image: '/customise image/3UX-2Fu9RVymhot05SCJtQ.webp',
  },
  {
    title: 'Round Neck T-shirt',
    path: '/round-neck-t-shirt',
    color: '#FFD700',
    image: '/customise image/-q74ZP7iRHiWD2s9nio2cg.jpeg', // Replace with actual path
  },
];

const TshirtCustomizeSection = () => {
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
        Customise Your T-Shirt
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

export default TshirtCustomizeSection;
