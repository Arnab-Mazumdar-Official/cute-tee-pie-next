'use client';
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Divider,
  Stack,
  useTheme,
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
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: isDarkMode ? '#000' : '#f4f4f4',
        color: isDarkMode ? '#fff' : '#000',
        py: 6,
        px: { xs: 3, sm: 6, md: 10 },
        borderTop: `1px solid ${isDarkMode ? '#333' : '#ccc'}`,
        transition: 'all 0.3s ease',
      }}
    >
      <Grid container spacing={6} justifyContent="space-between">
        {/* Brand Info */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: isDarkMode ? '#fff' : '#111' }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? '#ccc' : '#444', mb: 2 }}
          >
            We're a fun-loving brand on a mission to bring cuteness to your closet. Follow us and stay connected!
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => socialRedirect('https://instagram.com')}
              sx={{ color: isDarkMode ? '#fff' : '#000' }}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              onClick={() => socialRedirect('https://linkedin.com')}
              sx={{ color: isDarkMode ? '#fff' : '#000' }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              onClick={() => socialRedirect('https://facebook.com')}
              sx={{ color: isDarkMode ? '#fff' : '#000' }}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              onClick={() => socialRedirect('https://twitter.com')}
              sx={{ color: isDarkMode ? '#fff' : '#000' }}
              aria-label="Twitter"
            >
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={5}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: isDarkMode ? '#fff' : '#111' }}
          >
            24/7 Customer Support
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            WhatsApp: <strong>+91 8250738104</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Email: <strong>contact.printeepal@gmail.com</strong>
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              onClick={() => socialRedirect('https://wa.me/918250738104')}
              sx={{
                bgcolor: '#25D366',
                color: 'white',
                '&:hover': { bgcolor: '#1ebe5d' },
                transition: 'background-color 0.3s ease',
              }}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                (window.location.href = 'mailto:contact.printeepal@gmail.com')
              }
              sx={{
                bgcolor: '#D44638',
                color: 'white',
                '&:hover': { bgcolor: '#bb3b2f' },
                transition: 'background-color 0.3s ease',
              }}
              aria-label="Email"
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      {/* Divider and Footer Bottom Text */}
      <Divider
        sx={{
          my: 4,
          borderColor: isDarkMode ? '#444' : '#ccc',
        }}
      />
      <Typography
        variant="body2"
        align="center"
        sx={{
          fontSize: 13,
          color: isDarkMode ? '#aaa' : '#666',
        }}
      >
        © {new Date().getFullYear()} Prin Tee Pal. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
