'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import AnnouncementBar from '../../components/anouncement/announcement';
import Header from '../../components/header/header';
import BannerSection from '../../components/firstbanner/firstbanner';
import TShirtGrid from '../../components/collections/collections';
import TshirtCustomizeSection from '../../components/customisesection/customisesection';
import MovableSectionWithBackgrounds from '../../components/secoendbanner/secoendbanner';
import TrendingProducts from '../../components/trendingproducts/trendingproducts';
// Uncomment if needed
// import TraditionalTShirtSection from '../../components/productadvertisement/productadvertisement';
// import WelcomePage from '../../components/welcomenote/welcomenote';
// import Footer from '../../components/footer/footer';

export default function Page() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <AnnouncementBar />
        <Header />
        <BannerSection />
        <TShirtGrid />
        <TshirtCustomizeSection />
        <MovableSectionWithBackgrounds />
        <TrendingProducts />
        {/* <TraditionalTShirtSection />
        <WelcomePage />
        <Footer /> */}
      </div>
    </QueryClientProvider>
  );
}
