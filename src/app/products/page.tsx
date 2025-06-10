'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import AnnouncementBar from '../../../components/anouncement/announcement';
import Header from '../../../components/header/header';
import TrendingProducts from '../../../components/trendingproducts/trendingproducts';
import Footer from '../../../components/footer/footer';

export default function Page() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AnnouncementBar />
        <Header />
        <TrendingProducts />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
