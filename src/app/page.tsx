'use client';

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Fab, Slide, CircularProgress } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Skeleton, useMediaQuery, useTheme } from '@mui/material';

// Eager components (needed immediately)
import AnnouncementBar from '../../components/anouncement/announcement';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

// Lazy loaded components (heavy sections)
const BannerSection = lazy(
  () => import('../../components/firstbanner/firstbanner')
);
const TShirtGrid = lazy(
  () => import('../../components/collections/collections')
);
const TshirtCustomizeSection = lazy(
  () => import('../../components/customisesection/customisesection')
);
const MovableSectionWithBackgrounds = lazy(
  () => import('../../components/secoendbanner/secoendbanner')
);
const ProductSwiper = lazy(
  () => import('../../components/thirdbanner/thirdbanner')
);
const FourboxSec = lazy(() => import('../../components/fourboxsec/fourboxsec'));
const ScrollableProductCarousel = lazy(
  () => import('../../components/numberimage/numberimage')
);
const Weeklypick = lazy(() => import('../../components/weaklypick/weaklypick'));
const CoupleGoalsSection = lazy(
  () => import('../../components/couplesection/couplesection')
);

export default function Page() {
  const [queryClient] = useState(() => new QueryClient());

  const [showHeader, setShowHeader] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const lastScrollY = useRef(0);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:895px)');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setShowScrollTop(currentScrollY > 300);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100); // quick transition
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // const sectionFallback = <Skeleton variant="rectangular" height={300} animation="wave" sx={{ my: 2 }} />;
  const sectionFallback = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          my: 2,
          px: 2,
        }}
      >
        {isMobile ? (
          <>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width="63%"
              height={179}
              animation="wave"
            />
          </>
        ) : (
          <>
            {/* <Skeleton
                  variant="rectangular"
                  width="18%"
                  height={300}
                  animation="wave"
                /> */}
            <Skeleton
              variant="rectangular"
              width="38%"
              height={800}
              animation="wave"
            />
            <Box
              sx={{
                width: '38%',
                height: 800,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                bgcolor: theme.palette.mode === 'dark' ? '#000' : '#fff',
              }}
            >
              <Skeleton
                variant="text"
                width="80%"
                height={40}
                sx={{ mx: 'auto', mb: 2 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={30}
                sx={{ mx: 'auto', mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="50%"
                height={40}
                sx={{ mx: 'auto' }}
              />
            </Box>
            {/* <Skeleton
                  variant="rectangular"
                  width="18%"
                  height={300}
                  animation="wave"
                /> */}
            <Skeleton
              variant="rectangular"
              width="38%"
              height={800}
              animation="wave"
            />
          </>
        )}
      </Box>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!isPageReady ? (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1500,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box>
          {/* Sticky Header */}
          <Slide in={showHeader} direction="down" appear={false}>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 1200 }}>
              <AnnouncementBar />
              <Header />
            </Box>
          </Slide>

          {/* Page Sections - Lazy with fallback */}
          <Suspense fallback={sectionFallback()}>
            <BannerSection />
            <TShirtGrid />
            <TshirtCustomizeSection />
            <MovableSectionWithBackgrounds />
            <ProductSwiper />
            <FourboxSec />
            <ScrollableProductCarousel />
            <Weeklypick />
            <CoupleGoalsSection />
          </Suspense>

          {/* Footer (eager) */}
          <Footer />

          {/* Scroll to Top */}
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
      )}
    </QueryClientProvider>
  );
}
