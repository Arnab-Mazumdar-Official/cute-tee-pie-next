'use client';
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import ComingSoonModal from '../commingsoon/commingsoon';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button
} from "@mui/material";

type TShirtItem = {
  title: string;
  image: string;
};

const items: TShirtItem[] = [
  {
    title: "Casuals with chaos.",
    image:
      "https://cuteteepie.myshopify.com/cdn/shop/collections/xG6sLdpQfCH3Z6Nc4V74g.jpg?v=1745137793"
  },
  {
    title: "Bong Roots",
    image:
      "https://cuteteepie.myshopify.com/cdn/shop/collections/3_Front_bce8e706-fa0c-446a-9599-747034d96a64.png?v=1745137690"
  },
  {
    title: "Breezy Formals",
    image:
      "https://cuteteepie.myshopify.com/cdn/shop/collections/MlbMBFTOQw6bLSoPyO9o7A.jpg?v=1745137533"
  },
  {
    title: "Cosmic Vibes",
    image:
      "https://cuteteepie.myshopify.com/cdn/shop/collections/WhatsApp_Image_2025-04-20_at_2.55.25_PM.jpg?v=1745141253"
  },
  {
    title: "Oops I Did Nothing",
    image:
      "https://cuteteepie.myshopify.com/cdn/shop/collections/aawIiUoTQJeQxJ17Mez6qA.jpg?v=1745138386"
  },
  {
    title: "Thoda Pagal, Thoda Pro",
    image:
      "https://cuteteepie.myshopify.com/cdn/shop/collections/eyST3-ZUSgSog3J-OmixXA.jpg?v=1745138517"
  }
];

const TShirtGrid = () => {
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
    <Box sx={{ backgroundColor: "#000", py: 5, px: 2 }}>
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
            slidesPerView: 1
          },
          600: {
            slidesPerView: 2
          },
          960: {
            slidesPerView: 3
          }
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              onClick={() => handleCardClick()}
              onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay?.start()}
              sx={{
                bgcolor: "#fff",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                sx={{
                  height: 480,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {item.title} →
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Button */}
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

export default TShirtGrid;
