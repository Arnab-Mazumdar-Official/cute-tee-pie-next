'use client';
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import RocketIcon from '@mui/icons-material/Rocket';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public';
import { useRouter } from 'next/navigation';

const cardData = [
  {
    title: 'Unisex Over Size T-Shirts',
    description:
      'Comfortable and stylish oversized T-shirts suitable for everyone. Perfect for a relaxed and trendy look.',
    icon: <RocketIcon fontSize="large" sx={{ color: '#fff' }} />,
    image: 'types/vcezkoaARs6PaWFpQeRVew.jpg',
    path: '/products-by-type/Uinsex_Over_Size_T-Shirts',
    bgColor: '#2B65EC',
  },
  {
    title: 'Female Round Neck Half Sleeve',
    description:
      'Elegantly crafted for women, these half sleeve round neck tees blend comfort with contemporary fashion.',
    icon: <CampaignIcon fontSize="large" sx={{ color: '#fff' }} />,
    image: 'types/6OUSsqLETD2tv36Rj1755Q.jpg',
    path: '/products-by-type/Female_Round_Neck_Half_Sleeve',
    bgColor: '#E75480', // Hot pink
  },
  {
    title: 'Work Wear Polo',
    description:
      'Durable and smart polo shirts ideal for professional or industrial work environments.',
    icon: <SchoolIcon fontSize="large" sx={{ color: '#fff' }} />,
    image: 'types/sXgLH7-xRTK-L3X_Fd45vg.jpg',
    path: '/products-by-type/Work_Wear_Polo',
    bgColor: '#3CB371', // Medium sea green
  },
  {
    title: 'Men Round Neck Half Sleeve',
    description:
      'Classic and versatile round neck tees for men. A wardrobe essential for any occasion.',
    icon: <PublicIcon fontSize="large" sx={{ color: '#fff' }} />,
    image: 'types/BVMGg-POTB6mjHYpZKwEdg.webp',
    path: '/products-by-type/Men_Round_Neck_Half_Sleeve',
    bgColor: '#FFA500', // Orange
  },
];

const FourboxSec = () => {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.palette.mode === 'dark';
  const textColor = isDark ? '#fff' : '#000';

  return (
    <Box>
      {/* Top Fixed Background */}
      {/* <Box
        sx={{
          height: '25vh',
          backgroundImage: 'url(/banner/d14cef2f-3d0d-4953-ba4a-7714d9de360b.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      /> */}

      {/* Middle Foreground Section */}
      <Box
        sx={{
          py: 8,
          px: 2,
          position: 'relative',
          backgroundColor: isDark ? '#000' : '#fff',
          color: textColor,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={6}>
          Our Product Types
        </Typography>

        {/* Card Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            position: 'relative',
            zIndex: 1,
            maxWidth: 1200,
            mx: 'auto',
            width: '100%',
            px: 2,
            '@media (max-width: 904px)': {
              gridTemplateColumns: '1fr',
              gap: 2,
            },
          }}
        >
          {cardData.map((card, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: card.bgColor,
                borderRadius: 2,
                p: 4,
                color: '#fff',
                minHeight: 275,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
                gap: 6,
                '@media (max-width: 485px)': {
                  flexDirection: 'column',
                  p: 2,
                  minHeight: 200,
                  gap: 2,
                },
              }}
              onClick={() => router.push(card.path)}
            >
              {/* Left side: Image */}
              <Box
                component="img"
                src={card.image}
                alt={card.title}
                sx={{
                  width: 180,
                  height: 275,
                  borderRadius: 2,
                  objectFit: 'cover',
                  border: '2px solid #fff',
                  '@media (max-width: 485px)': {
                    width: 250,
                    height: 256,
                  },
                }}
              />

              {/* Right side: Text content */}
              <Box sx={{ flex: 1, width: '100%' }}>
                {/* Icon Bubble */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '@media (max-width: 485px)': {
                      width: 36,
                      height: 36,
                      top: -16,
                      right: -16,
                    },
                  }}
                >
                  {card.icon}
                </Box>

                <Typography variant="h5" fontWeight="bold" mb={1}>
                  {card.title}
                </Typography>
                <Typography variant="body1">{card.description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom Fixed Background */}
      {/* <Box
        sx={{
          height: '25vh',
          backgroundImage:
            'url(/banner/c6794aca-1c7e-49bd-89d4-316ab2580393.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      /> */}
    </Box>
  );
};

export default FourboxSec;
