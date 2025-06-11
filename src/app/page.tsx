'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Box, Fab, Slide } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import AnnouncementBar from '../../components/anouncement/announcement';
import Header from '../../components/header/header';
import BannerSection from '../../components/firstbanner/firstbanner';
import TShirtGrid from '../../components/collections/collections';
import TshirtCustomizeSection from '../../components/customisesection/customisesection';
import MovableSectionWithBackgrounds from '../../components/secoendbanner/secoendbanner';
import Footer from '../../components/footer/footer';
import ProductSwiper from '../../components/thirdbanner/thirdbanner';
import FourboxSec from '../../components/fourboxsec/fourboxsec';
import ScrollableProductCarousel from '../../components/numberimage/numberimage';
import Weeklypick from '../../components/weaklypick/weaklypick';
import CoupleGoalsSection from '../../components/couplesection/couplesection';

export default function Page() {
  const [queryClient] = useState(() => new QueryClient());

  const [showHeader, setShowHeader] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      // Show scroll-to-top button
      setShowScrollTop(currentScrollY > 300);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        {/* Animated Header & AnnouncementBar */}
        <Slide in={showHeader} direction="down" appear={false}>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1200 }}>
            <AnnouncementBar />
            <Header />
          </Box>
        </Slide>

        {/* Content Sections */}
        <BannerSection />
        <TShirtGrid />
        <TshirtCustomizeSection />
        <MovableSectionWithBackgrounds />
        <ProductSwiper />
        <FourboxSec />
        <ScrollableProductCarousel />
        <Weeklypick />
        <CoupleGoalsSection />
        <Footer />

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Fab
            color="primary"
            size="medium"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1300,
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        )}
      </Box>
    </QueryClientProvider>
  );
}
