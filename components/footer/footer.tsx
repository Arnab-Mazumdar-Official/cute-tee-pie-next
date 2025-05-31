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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

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
        <Typography variant="h5" fontWeight="bold" color="#f5f5f5" gutterBottom>
          Get Support 24/7 From Us
        </Typography>
        <Typography>Whatsapp on: 8250738104</Typography>
        <Typography>Mail on: contact.printeepal@gmail.com</Typography>

        {/* WhatsApp & Email Icons Side by Side */}
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <IconButton
            onClick={() => socialRedirect('https://wa.me/8250738104')}
            sx={{
              bgcolor: '#25D366',
              color: 'white',
              '&:hover': { bgcolor: '#1ebe5d' },
            }}
          >
            <WhatsAppIcon />
          </IconButton>

          <IconButton
            onClick={() => (window.location.href = 'contact.printeepal@gmail.com')}
            sx={{
              bgcolor: '#D44638',
              color: 'white',
              '&:hover': { bgcolor: '#bb3b2f' },
            }}
          >
            <EmailIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
