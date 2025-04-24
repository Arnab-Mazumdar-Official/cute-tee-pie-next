'use client';
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const TraditionalTShirtSections = () => {
  const sections = [
    {
      img: "//cuteteepie.myshopify.com/cdn/shop/files/uVJedh3oTle_feK_0pubWw.jpg?v=1745135704&width=1500",
      title: "Timeless Traditional T-Shirts – Celebrate Culture in Comfort",
      subtitle: "WHERE TRADITION MEETS TREND – WEAR YOUR ROOTS PROUDLY",
      desc: `Step into tradition with our exclusive collection of Traditional T-Shirts, where heritage meets modern style. Designed with Indian roots in mind, these tees feature culturally inspired prints, regional motifs, and vibrant colors that reflect the spirit of India. Whether you're heading to a casual gathering or celebrating a festival, our traditional t-shirts offer unmatched comfort and style for any occasion. Made with soft, breathable fabric, each piece brings together tradition, craftsmanship, and everyday wearability.

            🪔 Perfect for: Festive occasions, casual outings, cultural events

            🧵 Fabric: 100% Cotton | Skin-friendly | All-day comfort

            🌿 Sizes: S to XXL – Unisex fits available

            Embrace your roots. Wear your culture. Shop now and add a traditional twist to your wardrobe!`,
    },
    {
      img: "//cuteteepie.myshopify.com/cdn/shop/files/MlbMBFTOQw6bLSoPyO9o7A.jpg?v=1745135385&width=1500",
      title: "Smart & Sophisticated – Formal Office T-Shirts for the Modern Professional",
      subtitle: "Look sharp, feel sharper – your 9-to-5 just got an upgrade.",
      desc: `Upgrade your workwear with our collection of Formal Office T-Shirts – where elegance meets everyday comfort. Tailored for the modern Indian professional, these t-shirts offer a sleek, semi-formal look that's perfect for office hours, meetings, and smart-casual occasions. Crafted with premium fabrics and clean, minimalist designs, they strike the ideal balance between relaxed fit and refined style.

        💼 Perfect for: Office wear, business casuals, team outings  
        🧶 Fabric: Breathable Cotton Blends | Wrinkle-Resistant | Lightweight  
        📏 Sizes: S to XXL – Tailored fits for men and women

        Stay sharp, stay comfortable – redefine your workday wardrobe today.`,
    },
    {
      img: "//cuteteepie.myshopify.com/cdn/shop/files/Zes5OxiyR4eqUPVOrQ8v5w.jpg?v=1745135359&width=1500",
      title: "Casual Date T-Shirts – Flirt with Style, Stay Effortlessly Cool",
      subtitle: "Cute tee. Cooler vibes. Perfect date",
      desc: `Make the right impression with our Casual Date T-Shirts, designed for those special moments when comfort and charm matter most. Whether it’s a coffee date, movie night, or a long walk with someone special, these tees are all about subtle style and feel-good vibes. Soft fabrics, clean cuts, and eye-catching designs make them the perfect go-to for casual yet confident looks.

        💖 Perfect for: First dates, weekend outings, day dates, casual evenings

        🧵 Fabric: Ultra-soft Cotton | Breathable | Tailored for comfort

        🎨 Style: Minimal, playful prints & flattering fits for all body types

        📏 Sizes: S to XXL – Men’s & Women’s styles available`,
    },
  ];

  const renderContent = (subtitle:string, title:string, desc:string) => (
    <CardContent sx={{ backgroundColor: '#1c1c1c', color: 'white', borderRadius: 2 }}>
      <Typography variant="overline" color="gray">
        {subtitle}
      </Typography>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" paragraph>
        {desc}
      </Typography>
      <Typography variant="body2" gutterBottom>
        🍊 <strong>Perfect for:</strong> Festive occasions, casual outings, cultural events
      </Typography>
      <Typography variant="body2" gutterBottom>
        🧵 <strong>Fabric:</strong> 100% Cotton | Skin-friendly | All-day comfort
      </Typography>
      <Typography variant="body2" gutterBottom>
        🌿 <strong>Sizes:</strong> S to XXL – Unisex fits available
      </Typography>
      <Typography variant="body1" mt={2}>
        Embrace your roots. Shop now and add a traditional twist to your wardrobe!
      </Typography>
    </CardContent>
  );

  return (
    <Box p={4}>
      {sections.map((section, index) => {
        const isImageLeft = index % 2 === 0;
        return (
          <Grid
            container
            spacing={4}
            alignItems="center"
            direction={isImageLeft ? 'row' : 'row-reverse'}
            key={index}
            mb={6}
          >
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={section.img}
                alt={`Traditional T-Shirt ${index + 1}`}
                sx={{ borderRadius: 2, boxShadow: 3, height: 600 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={0}>
                {renderContent(section.subtitle, section.title, section.desc)}
              </Card>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default TraditionalTShirtSections;
