'use client';
import { Box, Typography, useTheme } from "@mui/material";

const offers = [
  "BENGALI VIBES",
  "BEST COMBO OFFERS",
  "EXCLUSIVE LIMITED-EDITION COLLECTIONS",
  "ECO-FRIENDLY PRODUCTION",
  "ROUND-THE-CLOCK CUSTOMER SUPPORT",
  "DESIGN YOUR OWN T-SHIRT",
  "FAST & FREE RETURNS",
  "SEASONAL DISCOUNTS",
  "NEW ARRIVALS EVERY WEEK",
  "EARN REWARDS WITH EVERY PURCHASE",
  "FLASH SALES & SPECIAL DEALS",
  "MEMBER-ONLY EXCLUSIVE ACCESS",
  "SUSTAINABLY SOURCED MATERIALS",
];

const ScrollingOffers = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const renderTexts = () =>
    offers.map((text, index) => (
      <Typography
        key={index}
        variant="caption"
        sx={{
          mx: 3,
          display: "inline-block",
          color: isDark ? '#fff' : '#000',
          fontWeight: 500,
        }}
      >
        ⚡ {text}
      </Typography>
    ));

  return (
    <Box
      sx={{
        borderTop: `1px solid ${isDark ? '#fff' : '#000'}`,
        borderBottom: `1px solid ${isDark ? '#fff' : '#000'}`,
        whiteSpace: "nowrap",
        overflow: "hidden",
        py: 1.5,
        backgroundColor: isDark ? "#000" : "#fff",
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "scroll-left 60s linear infinite",
        }}
      >
        {renderTexts()}
        {renderTexts()} {/* Duplicate content for seamless loop */}
      </Box>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </Box>
  );
};

export default ScrollingOffers;
