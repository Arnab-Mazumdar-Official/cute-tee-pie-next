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
import Footer from '../../components/footer/footer';
import ProductSwiper from '../../components/thirdbanner/thirdbanner';
import FourboxSec from '../../components/fourboxsec/fourboxsec';
import ScrollableProductCarousel from '../../components/numberimage/numberimage';

export default function Page() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AnnouncementBar />
        <Header />
        <BannerSection />
        <TShirtGrid />
        <TshirtCustomizeSection />
        <MovableSectionWithBackgrounds />
        {/* <TrendingProducts /> */}
        {/* <TraditionalTShirtSection /> */}
        {/* <WelcomePage /> */}
        <ProductSwiper />
        <FourboxSec />
        <ScrollableProductCarousel />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
