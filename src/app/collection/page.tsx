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
import { useRouter } from 'next/navigation';
import AnnouncementBar from '../../../components/anouncement/announcement';
import Header from '../../../components/header/header';

const fetchCollections = async ({ pageParam = 0 }) => {
  const res = await fetch(`/api/user-collection-list?page=${pageParam}&limit=6`);
  const data = await res.json();

  const collections = data.data.category.slice(0, 6);
  const hasMore = collections.length === 6;

  return {
    collections,
    hasMore,
  };
};

export default function CollectionList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length : undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const { ref, inView } = useInView();
  const router = useRouter();
  const throttleRef = useRef(false);

  const handleClick = (slug: string) => {
    router.push(`/products-under/${slug}`);
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

  const allCollections = data?.pages.flatMap((page) => page.collections) ?? [];

  return (
    <Box>
      <AnnouncementBar />
      <Header />
      <Box sx={{ px: 2, py: 5, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Explore Collections to Upgrade Your Wardrobe
        </Typography>

        <Grid container spacing={4}>
          {status === 'loading'
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Grid item xs={6} sm={4} md={2} key={idx}>
                  <Card>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: '100%',
                        height: '201px', // default for smallest screens
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
              ))
            : allCollections.map((collection, idx) => (
                <Grid item xs={6} sm={4} md={2} key={idx}>
                  <Box
                    onClick={() => handleClick(collection._id)}
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
                        image={collection.image}
                        alt={collection.title}
                        sx={{
                          width: '100%',
                          objectFit: 'cover',
                          height: '201px', // default fallback
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
                        {collection.title}
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
              ))}
        </Grid>

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
    </Box>
  );
}
