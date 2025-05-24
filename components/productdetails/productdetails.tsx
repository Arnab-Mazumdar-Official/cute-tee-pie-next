'use client';
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import ComingSoonModal from '../commingsoon/commingsoon';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from "@mui/material";

type TShirtItem = {
  title: string;
  image: string;
};

const items: TShirtItem[] = [
  {
    title: "Casuals with chaos.",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/xG6sLdpQfCH3Z6Nc4V74g.jpg?v=1745137793"
  },
  {
    title: "Bong Roots",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/3_Front_bce8e706-fa0c-446a-9599-747034d96a64.png?v=1745137690"
  },
  {
    title: "Breezy Formals",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/MlbMBFTOQw6bLSoPyO9o7A.jpg?v=1745137533"
  },
  {
    title: "Cosmic Vibes",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/WhatsApp_Image_2025-04-20_at_2.55.25_PM.jpg?v=1745141253"
  },
  {
    title: "Oops I Did Nothing",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/aawIiUoTQJeQxJ17Mez6qA.jpg?v=1745138386"
  },
  {
    title: "Thoda Pagal, Thoda Pro",
    image: "https://cuteteepie.myshopify.com/cdn/shop/collections/eyST3-ZUSgSog3J-OmixXA.jpg?v=1745138517"
  }
];

const TShirtGrid = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleCardClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "#000" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        py: 5,
        px: 2,
        position: "relative",
        animation: "slideIn 0.6s ease-out",
        "@keyframes slideIn": {
          from: { opacity: 0, transform: "translateX(100px)" },
          to: { opacity: 1, transform: "translateX(0)" }
        },
        "& .swiper-button-next, & .swiper-button-prev": {
          display: "none !important"
        },
        "& .swiper-pagination": {
          bottom: "-20px !important",
          textAlign: "center"
        }
      }}
    >
      {/* Heading & Show More */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Explore Our T-Shirts
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setOpenModal(true)}
          sx={{
            textTransform: "none",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: isDarkMode ? "#fff" : "#000",
            borderColor: isDarkMode ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
              borderColor: isDarkMode ? "#fff" : "#000"
            }
          }}
        >
          Show More
        </Button>
      </Box>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          960: { slidesPerView: 3 }
        }}
        style={{ paddingBottom: "40px" }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              onClick={handleCardClick}
              onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay?.start()}
              sx={{
                bgcolor: isDarkMode ? "#111" : "#fafafa",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                border: `1px solid ${isDarkMode ? "#fff" : "#000"}`,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                  zIndex: 2,
                },
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ height: 400, objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    color: isDarkMode ? "yellow" : "blue"
                  }}
                  noWrap
                >
                  {item.title} →
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      <ComingSoonModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default TShirtGrid;
