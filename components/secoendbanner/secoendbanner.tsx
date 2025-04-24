'use client'
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ComingSoonModal from '../commingsoon/commingsoon';

const MovableSectionWithBackgrounds = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      {/* Top Still Background */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(//cuteteepie.myshopify.com/cdn/shop/files/n_zWTHLRShW7z6jwCzt6Ag.jpg?v=1745137077&width=3840)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Middle Scrollable Foreground Section */}
      <Box
        sx={{
          backgroundColor: 'black',
          py: { xs: 8, md: 12 },
          px: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: { xs: 3, md: 4 },
            borderRadius: 3,
            boxShadow: 4,
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          {/* Text Section */}
          <Box sx={{ flex: 1, color: 'white' }}>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: { xs: '0.9rem', md: '1rem' },
                lineHeight: 1.8,
                margin: { xs: 2, md: 10 },
              }}
            >
              Say hello to the tee that gives “too cute to care” energy all day, every day. This isn't just a piece of clothing—it’s your flirty alter ego in fabric form. She’s cheeky, she’s confident, and she’s always camera-ready (even if you just rolled outta bed).

              🩷 Vibe check: Think bubblegum confidence with a side of sass.
              🌈 Style inspo: Perfect for coffee runs, Insta reels, or surprise run-ins with your crush.
              🧁 Fit check: Soft, breathable, and hugs just right—aka your new ride-or-die for cozy slayage.
              💋 Attitude: “Oops, did I steal the spotlight again?” – You, wearing this tee.

              Pair with your fave ripped jeans, platform sneakers, and a bold lip. Or go full cozy cutie with bike shorts and a messy bun. Either way, you're stealing hearts and taking names.

              Tee-Rrific Cutie isn’t just a look—it’s a lifestyle. And baby, you wear it well. 😘
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                mb: 4,
                marginLeft: { xs: 0, md: 5 },
                fontSize: { xs: '1.5rem', md: '1.75rem' },
              }}
            >
              “Tee-Rrific Cutie” – playful and bold
            </Typography>
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{
                mt: 2,
                marginLeft: { xs: 0, md: 15 },
                transition: 'transform 0.1s ease-in-out',
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
            >
              Best Selling Product
            </Button>
            <ComingSoonModal open={open} onClose={handleClose} />
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: { xs: 0, md: 2 },
              mb: { xs: 4, md: 0 }, // Adding margin bottom for smaller screens
            }}
          >
            <Box
              component="img"
              src="//cuteteepie.myshopify.com/cdn/shop/files/8WJ_Ma74RqaYTR_Ypz6SWw.jpg?v=1745140333&width=1500"
              alt="Tee image"
              sx={{
                width: '100%',
                maxWidth: { xs: '90%', md: '600px' },
                borderRadius: 3,
                objectFit: 'cover',
                transform: 'translateX(-5%)',
              }}
            />
          </Box>
        </Box>
      </Box>


      {/* Bottom Still Background */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(//cuteteepie.myshopify.com/cdn/shop/files/h_u0trkkRhyuYa06ouhurg.jpg?v=1745140671&width=3840)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </Box>
  );
};

export default MovableSectionWithBackgrounds;
