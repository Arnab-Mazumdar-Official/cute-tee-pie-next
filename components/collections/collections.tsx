'use client';
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SwiperCore from "swiper";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grow,
  useTheme
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ComingSoonModal from "../commingsoon/commingsoon";
import Skeleton from '@mui/material/Skeleton';

type TShirtItem = {
  title: string;
  image: string;
};

const fetchCollections = async (): Promise<TShirtItem[]> => {
  const res = await axios.get("/api/collections-list");
  console.log("API response:", res.data);
  return res.data.data.category || [];
};

const TShirtGrid = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  
  const isDark = theme.palette.mode === 'dark';
  const bgColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const borderColor = textColor;
  const isDarkMode = theme.palette.mode === "dark";

  const { data, isLoading } = useQuery({
    queryKey: ["tshirt-collections"],
    queryFn: fetchCollections,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });

  
  const items = Array.isArray(data) ? data : [];

  const handleCardClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (isLoading) {
  return (
      <Box sx={{ py: 6, px: 2 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
          Explore Our Collections
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto' }}>
          {[...Array(5)].map((_, idx) => (
            <Box key={idx} sx={{ width: 200 }}>
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
              <Skeleton variant="text" sx={{ mt: 1 }} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }


  return (
     <Box sx={{ backgroundColor: bgColor, py: 6, px: 2 }}>
      {/* Heading and CTA */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ color: textColor }}>
          Explore Our Collections
        </Typography>
        <Button
          size="small"
          onClick={handleCardClick}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "0.85rem",
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            px: 2,
            py: 0.5,
            "&:hover": {
              backgroundColor: isDarkMode ? "#222" : "#eee",
              color: "#d32f2f",
              borderColor: "#d32f2f",
            },
          }}
        >
          Show More
        </Button>
      </Box>

      {/* Swiper Section */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        spaceBetween={24}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          900: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              onClick={handleCardClick}
              sx={{
                cursor: 'pointer',
                width: '100%',
                maxWidth: 300,
                mx: 'auto',
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
                  overflow: 'hidden',
                  border: `2px solid ${borderColor}`,
                  backgroundColor: [ '#FFD700', '#FF6347', '#1E90FF', '#FFA500', '#32CD32' ][index % 5],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  "&:hover": {
                    transform: 'scale(1.05)',
                  },
                }}
              >
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
              </Box>

              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  mt: 1,
                  color: textColor,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <ComingSoonModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default TShirtGrid;