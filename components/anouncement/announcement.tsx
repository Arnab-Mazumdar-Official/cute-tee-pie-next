'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, keyframes } from '@mui/material';

// Enhanced keyframes for more engaging animations
const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.9; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fadeInUp = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px rgba(252, 185, 0, 0.3);
  }
  50% { 
    box-shadow: 0 0 20px rgba(252, 185, 0, 0.6), 0 0 30px rgba(252, 185, 0, 0.4);
  }
`;

const AnnouncementBar = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const backgroundGradient = theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%)'
    : 'linear-gradient(135deg, #fcb900 0%, #ffd700 50%, #fcb900 100%)';

  const shimmerGradient = theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)';

  return (
    <Box
      sx={{
        width: '100%',
        background: backgroundGradient,
        backgroundSize: '200% 200%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        px: 2,
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: `${glow} 3s ease-in-out infinite`,
        '&:hover': {
          animation: `${pulse} 1s ease-in-out infinite, ${glow} 3s ease-in-out infinite`,
          '& .announcement-text': {
            animation: 'none',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: shimmerGradient,
          backgroundSize: '200% 100%',
          animation: `${shimmer} 3s ease-in-out infinite`,
          pointerEvents: 'none',
        }
      }}
    >
      {/* Static text for >=985px */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '100%',
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? `${fadeInUp} 0.8s ease-out` : 'none',
        }}
      >
        <Typography
          className="announcement-text"
          variant="body2"
          textAlign="center"
          fontWeight={600}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            textShadow: theme.palette.mode === 'dark' 
              ? '0 1px 2px rgba(0,0,0,0.8)' 
              : '0 1px 2px rgba(255,255,255,0.8)',
            letterSpacing: '0.5px',
            position: 'relative',
            zIndex: 1,
            '&::before': {
              content: '"✨"',
              marginRight: '8px',
              animation: `${pulse} 2s ease-in-out infinite`,
            },
            '&::after': {
              content: '"✨"',
              marginLeft: '8px',
              animation: `${pulse} 2s ease-in-out infinite 0.5s`,
            }
          }}
        >
          {"We're live! Discover unique, high-quality t-shirts designed to express your vibe – shop now and wear your story."}
        </Typography>
      </Box>

      {/* Enhanced scrolling text for <985px */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          whiteSpace: 'nowrap',
          animation: `${scroll} 12s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused',
          }
        }}
      >
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            textShadow: theme.palette.mode === 'dark' 
              ? '0 1px 2px rgba(0,0,0,0.8)' 
              : '0 1px 2px rgba(255,255,255,0.8)',
            letterSpacing: '0.5px',
            position: 'relative',
            zIndex: 1,
            '&::before': {
              content: '"🎉"',
              marginRight: '8px',
            },
            '&::after': {
              content: '"🛍️"',
              marginLeft: '8px',
            }
          }}
        >
          {"We're live! Discover unique, high-quality t-shirts designed to express your vibe – shop now and wear your story."}
        </Typography>
      </Box>

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          transform: 'translateX(-100%)',
          animation: `${scroll} 4s ease-in-out infinite`,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default AnnouncementBar;