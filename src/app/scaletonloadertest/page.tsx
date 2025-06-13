// components/SectionFallback.tsx
'use client';

import React from 'react';
import { Box, Skeleton, useMediaQuery, useTheme } from '@mui/material';

const SectionFallback = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:895px)');

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
            height={300}
            animation="wave"
          />
          <Box
            sx={{
              width: '38%',
              height: 300,
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
            height={300}
            animation="wave"
          />
        </>
      )}
    </Box>
  );
};

export default SectionFallback;
