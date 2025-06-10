'use client';

import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useRouter, useParams } from 'next/navigation';
import AnnouncementBar from '../../../../components/anouncement/announcement';
import Header from '../../../../components/header/header';
import TShirtGrid from '../../../../components/collections/collections';
import Footer from '../../../../components/footer/footer';
import { useTheme } from '@mui/material';


const fetchProductsByCategory = async ({ pageParam = 0, queryKey }) => {
  const type = queryKey[1];
  const res = await fetch(`/api/product-list-by-type?id=${type}&page=${pageParam}&limit=6`);
  const data = await res.json();

  const products = data.data.products.slice(0, 6); // Adjust depending on your API shape
  const hasMore = products.length === 6;

  return {
    products,
    hasMore,
  };
};

export default function ProductListByCategory() {
  const params = useParams();
  const type = params.id;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['product-list-by-type', type],
    queryFn: fetchProductsByCategory,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length : undefined,
    enabled: !!type,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const { ref, inView } = useInView();
  const router = useRouter();
  const throttleRef = useRef(false);
  const theme = useTheme();


  const handleClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  useEffect(() => {
    if (inView && hasNextPage && !throttleRef.current) {
      fetchNextPage();
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, 1000);
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
        minHeight: '100vh',
      }}
    >
      <AnnouncementBar />
      <Header />
      <Box sx={{ px: 2, py: 5, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Explore Products in This Category
        </Typography>

        {/* Show loading skeletons */}
        {(status === 'loading' || allProducts.length === 0) && (
          <Grid container spacing={4}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Grid item xs={6} sm={4} md={2} key={idx}>
                <Card>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: '100%',
                      height: '285px',
                      '@media (min-width:1069px)': {
                        height: '262px',
                      },
                      '@media (min-width:1373px)': {
                        height: '321px',
                      },
                      '@media (min-width:1721px)': {
                        height: '417px',
                      },
                    }}
                  />
                  <CardContent>
                    <Skeleton variant="text" width="80%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Show no products message if loaded and empty */}
        {status === 'success' && allProducts.length === 0 && (
          <Box sx={{ mt: 10 }}>
            <Typography variant="h6" color="text.secondary">
              Sorry, no products were found in this category.
            </Typography>
          </Box>
        )}

        {/* Show products grid */}
        {status === 'success' && allProducts.length > 0 && (
          <Grid container spacing={4}>
            {allProducts.map((product, idx) => (
              <Grid item xs={6} sm={4} md={2} key={idx}>
                <Box
                  onClick={() => handleClick(product.slug)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Box
                    sx={{
                      border: '2px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'white' : 'black',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.title}
                      sx={{
                        width: '100%',
                        objectFit: 'cover',
                        height: '201px',
                        '@media (min-width:1069px)': {
                          height: '262px',
                        },
                        '@media (min-width:1373px)': {
                          height: '321px',
                        },
                        '@media (min-width:1721px)': {
                          height: '417px',
                        },
                      }}
                    />
                  </Box>
                  <CardContent sx={{ px: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      align="center"
                    >
                      {product.title}
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Infinite scroll loader */}
        {hasNextPage && (
          <Box ref={ref} sx={{ mt: 4 }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: '100%',
                height: '201px',
                '@media (min-width:1069px)': {
                  height: '262px',
                },
                '@media (min-width:1373px)': {
                  height: '321px',
                },
                '@media (min-width:1721px)': {
                  height: '417px',
                },
              }}
            />
          </Box>
        )}
      </Box>
      <TShirtGrid />
      <Footer />
    </Box>
  );
}
