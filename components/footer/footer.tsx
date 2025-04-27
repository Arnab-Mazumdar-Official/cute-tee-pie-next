'use client';
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const cardStyle = {
  bgcolor: '#1a1a1a',
  color: '#fff',
  mb: 2,
  cursor: 'pointer',
  width: 250,
};

const cardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const socialRedirect = (url: string) => {
  window.open(url, '_blank');
};

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#0c1717',
        color: '#fff',
        py: 6,
        px: 4,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 4,
      }}
    >
      {/* Left Section */}
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="h4" fontWeight="bold" color="#f5f5f5" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" color="#a0a0a0">
        We&apos;re a fun-loving brand on a mission to bring cuteness to your closet. Follow us and stay connected!
        </Typography>
        <Box mt={2}>
          <IconButton
            onClick={() => socialRedirect('https://instagram.com')}
            sx={{ color: '#f5e6c9', mx: 0.5 }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            onClick={() => socialRedirect('https://linkedin.com')}
            sx={{ color: '#f5e6c9', mx: 0.5 }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            onClick={() => socialRedirect('https://facebook.com')}
            sx={{ color: '#f5e6c9', mx: 0.5 }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            onClick={() => socialRedirect('https://twitter.com')}
            sx={{ color: '#f5e6c9', mx: 0.5 }}
          >
            <TwitterIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Right Section */}
      <Box>

        {/* New Heading for WhatsApp and Gmail */}
        <Typography variant="h5" fontWeight="bold" color="#f5f5f5" gutterBottom>
          Get Support 24/7 From Us
        </Typography>
        <Typography>
            Whatsapp on : 55434566789
        </Typography>
        <Typography>
            mail on : test@yopmail.com
        </Typography>

        {/* WhatsApp */}
        <Card
          sx={cardStyle}
          onClick={() => socialRedirect('https://wa.me/9475852582')} // Update with your number
        >
          <CardContent sx={cardContentStyle}>
            <Typography variant="h5" gutterBottom>📱</Typography>
            <Typography variant="body2">Chat on WhatsApp</Typography>
          </CardContent>
        </Card>

        {/* Gmail Shortcut */}
        <Card
          sx={cardStyle}
          onClick={() => window.location.href = 'mailto:arnabmazumdar9@gmail.com'} // Update with your Gmail
        >
          <CardContent sx={cardContentStyle}>
            <Typography variant="h5" gutterBottom>📧</Typography>
            <Typography variant="body2">Gmail Us</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Footer;
