'use client';
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ComingSoonModal from '../commingsoon/commingsoon';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const items = [
  {
    title: "Anime",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/xG6sLdpQfCH3Z6Nc4V74g.jpg?v=1745137793",
    price: "Rs. 435.42",
    soldOut: true
  },
  {
    title: "Bong roots Unique T shirt",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/3_Front_bce8e706-fa0c-446a-9599-747034d96a64.png?v=1745137690",
    price: "From Rs. 377.60",
    soldOut: true
  },
  {
    title: "Men’s Round Neck T-shirt",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/MlbMBFTOQw6bLSoPyO9o7A.jpg?v=1745137533",
    price: "Rs. 577.02",
    soldOut: true
  },
  {
    title: "Men’s Round Neck T-shirt",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/WhatsApp_Image_2025-04-20_at_2.55.25_PM.jpg?v=1745141253",
    price: "Rs. 577.02",
    soldOut: true
  },
  {
    title: "Men’s Round Neck T-shirt",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/aawIiUoTQJeQxJ17Mez6qA.jpg?v=1745138386",
    price: "Rs. 577.02",
    soldOut: true
  },
  {
    title: "Men’s Round Neck T-shirt",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/eyST3-ZUSgSog3J-OmixXA.jpg?v=1745138517",
    price: "Rs. 577.02",
    soldOut: true
  },
];

const TrendingProducts = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [openModal, setOpenModal] = useState(false); 
  // const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleCardClick = () => {
    // setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // setSelectedItem(null);
  };

  const handleViewAll = () => {
    setOpenModal(true);
  }
  return (
    <Box sx={{ backgroundColor: "#000", py: 6, px: 2 }}>
      <Typography
        variant="h4"
        color="#fff"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        All Treanding T-Shirts
      </Typography>
      <Typography
        variant="subtitle1"
        color="grey.400"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        FROM PUNNY PRINTS TO ADORABLE AESTHETICS, EVERY TEE IN OUR COLLECTION IS
        DESIGNED TO SPRINKLE CHARM INTO YOUR DAY. FIND YOUR NEW FAVE NOW!
      </Typography>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          960: {
            slidesPerView: 3,
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              onClick={() => handleCardClick()}
              onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay?.start()}
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                  zIndex: 2,
                },
              }}
            >
              <Card
                sx={{
                  bgcolor: "#121212",
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    height: 400,
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  {item.soldOut && (
                    <Chip
                      label="Sold out"
                      size="small"
                      sx={{ bgcolor: "#444", color: "#fff", mb: 1 }}
                    />
                  )}
                  <Typography variant="body1" fontWeight="bold" noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    {item.price}
                  </Typography>
                </CardContent>

                {/* Cart Icon on Hover */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 50,
                        right: 16,
                        opacity: 0,
                        transform: "scale(0.8)",
                        transition: "opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease",
                        pointerEvents: "none",
                        ".MuiCard-root:hover &": {
                        opacity: 1,
                        transform: "scale(1)",
                        filter: "drop-shadow(0 0 8px #ffffff)",
                        pointerEvents: "auto",
                        },
                    }}
                    >
                    <IconButton
                        onClick={() => {
                        // simple click animation (scale down then up)
                        const button = document.getElementById(`cart-icon-${index}`);
                        if (button) {
                            button.animate(
                            [
                                { transform: "scale(1)" },
                                { transform: "scale(0.9)" },
                                { transform: "scale(1)" },
                            ],
                            { duration: 150 }
                            );
                        }
                        }}
                        id={`cart-icon-${index}`}
                        sx={{
                        bgcolor: "#fff",
                        color: "#000",
                        "&:hover": {
                            bgcolor: "#fff",
                            filter: "drop-shadow(0 0 10px white)",
                        },
                        transition: "transform 0.2s ease",
                        }}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                </Box>

              </Card>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Button
          variant="outlined"
          onClick={handleViewAll}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#fff", // White text
            borderColor: "#fff", // White border
            px: 4,
            py: 1.5,
            borderRadius: 8,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)", // slight white transparent on hover
              borderColor: "#fff",
              transform: "scale(1.05)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          View All
        </Button>
      </Box>
      <ComingSoonModal
        open={openModal}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default TrendingProducts;
