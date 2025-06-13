'use client';
import React from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { keyframes } from '@mui/system';

interface ChooseActionModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  productSlug: string;
}

// Custom animations
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(239, 68, 68, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.4);
  }
`;

const breathe = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const ChooseActionModal: React.FC<ChooseActionModalProps> = ({
  open,
  onClose,
  productId,
  productSlug,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery('(max-width:600px)');
  const router = useRouter();

  const handleGoToVTON = () => {
    router.push(`/virtual-try/${productSlug}`);
    onClose();
  };

  const handleGoToShop = () => {
    router.push(`/blog/${productSlug}`);
    onClose();
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={open} timeout={500}>
        <Box
          sx={{
            width: isMobile ? '90%' : 420,
            maxWidth: '95vw',
            background: isDarkMode 
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
            color: isDarkMode ? '#ffffff' : '#1a1a1a',
            borderRadius: '24px',
            p: 4,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDarkMode
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            animation: `${slideInUp} 0.6s ease-out`,
            
            // Glassmorphism effect
            backdropFilter: 'blur(16px)',
            
            // Subtle border glow
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '24px',
              padding: '2px',
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
                : 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
              pointerEvents: 'none',
            },
          }}
        >
          {/* Close Button */}
          <Box
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: isDarkMode
                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                : 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: `${glow} 3s ease-in-out infinite`,
              zIndex: 10,
              
              '&:hover': {
                transform: 'scale(1.1) rotate(90deg)',
                animation: `${breathe} 1s ease-in-out infinite`,
                boxShadow: '0 8px 25px -8px rgba(239, 68, 68, 0.6)',
              },
              
              '&:active': {
                transform: 'scale(0.95) rotate(90deg)',
              },
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                position: 'relative',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  background: '#ffffff',
                  borderRadius: '1px',
                  top: '50%',
                  left: 0,
                  transformOrigin: 'center',
                },
                '&::before': {
                  transform: 'translateY(-50%) rotate(45deg)',
                },
                '&::after': {
                  transform: 'translateY(-50%) rotate(-45deg)',
                },
              }}
            />
          </Box>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: isDarkMode ? '#4f46e5' : '#6366f1',
                top: `${20 + i * 10}%`,
                left: `${10 + i * 15}%`,
                animation: `${float} ${2 + i * 0.3}s ease-in-out infinite`,
                opacity: 0.6,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}

          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${
                isDarkMode ? '#4f46e5' : '#6366f1'
              }, transparent)`,
              animation: `${shimmer} 3s ease-in-out infinite`,
            }}
          />

          {/* Rotating Border Ring */}
          <Box
            sx={{
              position: 'absolute',
              top: -3,
              left: -3,
              right: -3,
              bottom: -3,
              borderRadius: '27px',
              background: `conic-gradient(from 0deg, transparent, ${
                isDarkMode ? '#4f46e5' : '#6366f1'
              }, transparent, transparent)`,
              animation: `${rotate} 4s linear infinite`,
              opacity: 0.3,
              pointerEvents: 'none',
            }}
          />
          
          <Zoom in={open} timeout={600} style={{ transitionDelay: '200ms' }}>
            <Typography 
              variant="h5" 
              sx={{
                fontWeight: 700,
                mb: 1,
                background: isDarkMode
                  ? 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)'
                  : 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: isMobile ? '1.5rem' : '1.75rem',
                animation: `${breathe} 4s ease-in-out infinite`,
              }}
            >
              Choose Your Experience
            </Typography>
          </Zoom>

          <Zoom in={open} timeout={700} style={{ transitionDelay: '300ms' }}>
            <Typography 
              variant="body1" 
              sx={{
                mb: 4,
                opacity: 0.8,
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              Ready to explore? Try it on virtually or visit our shop
            </Typography>
          </Zoom>

          <Box 
            sx={{
              display: 'flex', 
              gap: 3, 
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <Zoom in={open} timeout={800} style={{ transitionDelay: '400ms' }}>
              <Button
                variant="outlined"
                onClick={handleGoToVTON}
                sx={{
                  borderRadius: '16px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minWidth: isMobile ? '100%' : '140px',
                  position: 'relative',
                  overflow: 'hidden',
                  
                  border: `2px solid ${isDarkMode ? '#4f46e5' : '#6366f1'}`,
                  color: isDarkMode ? '#4f46e5' : '#6366f1',
                  background: 'transparent',
                  
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDarkMode
                      ? '0 10px 25px -5px rgba(79, 70, 229, 0.4)'
                      : '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
                    borderColor: isDarkMode ? '#6366f1' : '#4f46e5',
                    background: isDarkMode 
                      ? 'rgba(79, 70, 229, 0.1)' 
                      : 'rgba(99, 102, 241, 0.1)',
                    animation: `${pulse} 2s infinite`,
                  },
                  
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  
                  // Shimmer effect on hover
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${
                      isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)'
                    }, transparent)`,
                    transition: 'left 0.5s',
                  },
                  
                  '&:hover::before': {
                    left: '100%',
                  },
                }}
              >
                ✨ Virtual Try-On
              </Button>
            </Zoom>

            <Zoom in={open} timeout={900} style={{ transitionDelay: '500ms' }}>
              <Button
                variant="contained"
                onClick={handleGoToShop}
                sx={{
                  borderRadius: '16px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minWidth: isMobile ? '100%' : '140px',
                  position: 'relative',
                  overflow: 'hidden',
                  
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                    : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  border: 'none',
                  
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDarkMode
                      ? '0 15px 35px -5px rgba(79, 70, 229, 0.6)'
                      : '0 15px 35px -5px rgba(99, 102, 241, 0.6)',
                    background: isDarkMode
                      ? 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)'
                      : 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                  },
                  
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  
                  // Animated gradient background
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s',
                  },
                  
                  '&:hover::before': {
                    left: '100%',
                  },
                }}
              >
                🛍️ Visit Shop
              </Button>
            </Zoom>
          </Box>

          {/* Decorative bottom accent */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              borderRadius: '2px 2px 0 0',
              background: isDarkMode
                ? 'linear-gradient(90deg, #4f46e5, #6366f1)'
                : 'linear-gradient(90deg, #6366f1, #4f46e5)',
              animation: `${shimmer} 2s ease-in-out infinite`,
            }}
          />

          {/* Pulsing Corner Accents */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isDarkMode ? '#10b981' : '#059669',
              animation: `${glow} 2.5s ease-in-out infinite`,
              animationDelay: '0.5s',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: isDarkMode ? '#f59e0b' : '#d97706',
              animation: `${breathe} 3s ease-in-out infinite`,
              animationDelay: '1s',
            }}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChooseActionModal;