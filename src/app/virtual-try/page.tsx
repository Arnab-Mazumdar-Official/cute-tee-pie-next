'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  Skeleton,
  CircularProgress,
  Stack,
  Tooltip,
  Paper,
  Container,
  Card,
  CardContent,
  Fade,
  Zoom,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { keyframes } from '@emotion/react';
import TShirtGrid from '../../../components/collections/collections';
import Footer from '../../../components/footer/footer';
import AnnouncementBar from '../../../components/anouncement/announcement';
import Header from '../../../components/header/header';

// Animated keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 64, 129, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 64, 129, 0.6); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function TryOnUploader() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [humanImage, setHumanImage] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);

  const clothImageUrl =
    'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/0cdfd891-4de2-4480-a13a-f6570a00709f.jpg';
  const imageBoxWidth = 280;
  const imageBoxHeight = 350;

  const toBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject('Failed to convert image to base64.');
    });

  const MAX_SIZE = 5 * 1024 * 1024;
  const MIN_SIZE = 100 * 1024;

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isValid = img.width >= 300 && img.height >= 400;
        resolve(isValid);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleHumanImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError('No image selected.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image.');
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('Image is too large. Please upload an image under 5MB.');
      return;
    }

    if (file.size < MIN_SIZE) {
      setError(
        'Image is too small. Please upload a clearer image (min 100KB).'
      );
      return;
    }

    const isValidDimensions = await validateImageDimensions(file);
    if (!isValidDimensions) {
      setError(
        'Image resolution is too low. Please upload a photo with minimum 300x400 pixels.'
      );
      return;
    }

    setShowUploadAnimation(true);
    setTimeout(() => setShowUploadAnimation(false), 1000);
    setHumanImage(file);
    setResultUrl(null);
    setError(null);
  };

  const handleDeleteHuman = () => {
    setHumanImage(null);
    setResultUrl(null);
    setError(null);
  };

  const handleTryOn = async () => {
    setError(null);
    if (!humanImage) {
      setError('Please upload your photo to continue.');
      return;
    }

    setLoading(true);

    try {
      if (humanImage.size > MAX_SIZE || humanImage.size < MIN_SIZE) {
        setError('Please upload a clearer photo (between 100KB to 5MB).');
        return;
      }

      const humanBase64 = await toBase64(humanImage);

      if (!clothImageUrl) throw new Error('Garment image URL is missing.');

      console.log('Base64 Human Image:', humanBase64.substring(0, 100));

      const res = await fetch('/api/vton', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          humanImageBase64: humanBase64,
          garm_img_url: clothImageUrl, // just pass URL, don't fetch it client-side
        }),
      });

      const data = await res.json();
      console.log('Response from /api/vton:', data);
      console.log('Sending request to VTON API...');
      console.log('Human image size:', humanBase64.length);

      if (data.url) {
        setResultUrl(data.url);
      } else {
        throw new Error(
          'We’re a bit overwhelmed. Please try again later,Pardon us'
        );
      }
    } catch (err: any) {
      console.error('Try-on error:', err);
      setError(
        err.message ||
          'We’re a bit overwhelmed. Please try again later,Pardon us'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setHumanImage(null);
    setResultUrl(null);
    setError(null);
    setLoading(false);
  };

  return (
    <Box>
      <AnnouncementBar />
      <Header />
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)'
            : 'linear-gradient(135deg, #f8f9ff 0%, #e8f4ff 50%, #f0f8ff 100%)',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark
              ? 'radial-gradient(circle at 20% 50%, rgba(255, 64, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(64, 196, 255, 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 20% 50%, rgba(255, 64, 129, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(64, 196, 255, 0.05) 0%, transparent 50%)',
            zIndex: 0,
          },
        }}
      >
        {/* Floating Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #ff4081, #40c4ff)',
            opacity: 0.1,
            top: '10%',
            right: '10%',
            animation: `${float} 6s ease-in-out infinite`,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #40c4ff, #4caf50)',
            opacity: 0.1,
            bottom: '15%',
            left: '15%',
            animation: `${float} 8s ease-in-out infinite reverse`,
            zIndex: 0,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{ position: 'relative', zIndex: 1, py: 4 }}
        >
          {/* Header Section */}
          <Fade in timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <AutoAwesomeIcon
                  sx={{
                    fontSize: 48,
                    color: '#ff4081',
                    mr: 2,
                    animation: `${pulse} 2s ease-in-out infinite`,
                  }}
                />
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    background: isDark
                      ? 'linear-gradient(135deg, #ffffff 0%, #ff4081 50%, #40c4ff 100%)'
                      : 'linear-gradient(135deg, #1a1a1a 0%, #ff4081 50%, #40c4ff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 200%',
                    animation: `${gradientShift} 4s ease infinite`,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: isDark
                      ? '0 0 30px rgba(255, 64, 129, 0.3)'
                      : 'none',
                  }}
                >
                  PrinteepaL Studio
                </Typography>
                <FlashOnIcon
                  sx={{
                    fontSize: 48,
                    color: '#40c4ff',
                    ml: 2,
                    animation: `${pulse} 2s ease-in-out infinite 0.5s`,
                  }}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: isDark ? '#fff' : '#333',
                  mb: 2,
                  textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                ✨ AI-Powered Virtual Try-On Experience
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Transform your shopping experience with cutting-edge AI
                technology. Upload your photo and watch the magic happen
                instantly!
              </Typography>
            </Box>
          </Fade>

          {/* Main Try-On Interface */}
          <Slide direction="up" in timeout={1200}>
            <Card
              elevation={0}
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(20px)',
                border: isDark
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(0,0,0,0.1)',
                borderRadius: 4,
                p: 4,
                mb: 6,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background:
                    'linear-gradient(90deg, #ff4081, #40c4ff, #4caf50, #ff4081)',
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 3s ease-in-out infinite`,
                  borderRadius: '16px 16px 0 0',
                },
              }}
            >
              {/* Upload Section */}
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={4}
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                {/* Human Image Upload */}
                <Zoom in timeout={800}>
                  <Box textAlign="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <TrendingUpIcon sx={{ color: '#ff4081', mr: 1 }} />
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        color={isDark ? '#fff' : '#333'}
                      >
                        Upload Your Photo
                      </Typography>
                    </Box>

                    {humanImage ? (
                      <Paper
                        elevation={8}
                        sx={{
                          position: 'relative',
                          width: imageBoxWidth,
                          height: imageBoxHeight,
                          overflow: 'hidden',
                          borderRadius: 3,
                          border: '3px solid #ff4081',
                          animation: showUploadAnimation
                            ? `${glow} 1s ease-in-out`
                            : 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 10px 30px rgba(255, 64, 129, 0.3)',
                          },
                        }}
                      >
                        <img
                          src={URL.createObjectURL(humanImage)}
                          alt="Your Photo"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Tooltip title="Remove photo">
                          <IconButton
                            size="small"
                            onClick={handleDeleteHuman}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: 'rgba(255, 64, 129, 0.9)',
                              color: '#fff',
                              '&:hover': {
                                bgcolor: '#ff4081',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Paper>
                    ) : (
                      <Box
                        sx={{
                          width: imageBoxWidth,
                          height: imageBoxHeight,
                          border: `3px dashed ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
                          borderRadius: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isDark
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)'
                            : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#ff4081',
                            background: isDark
                              ? 'linear-gradient(135deg, rgba(255,64,129,0.05) 0%, rgba(64,196,255,0.05) 100%)'
                              : 'linear-gradient(135deg, rgba(255,64,129,0.02) 0%, rgba(64,196,255,0.02) 100%)',
                          },
                        }}
                      >
                        <Stack spacing={2} alignItems="center">
                          <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                              background:
                                'linear-gradient(135deg, #ff4081 0%, #ff6b9d 100%)',
                              color: '#fff',
                              fontWeight: 600,
                              px: 3,
                              py: 1.5,
                              borderRadius: 3,
                              textTransform: 'none',
                              boxShadow: '0 4px 15px rgba(255, 64, 129, 0.3)',
                              '&:hover': {
                                background:
                                  'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(255, 64, 129, 0.4)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                          >
                            Choose File
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={handleHumanImageChange}
                            />
                          </Button>

                          <Button
                            variant="outlined"
                            component="label"
                            startIcon={<CameraAltIcon />}
                            sx={{
                              color: '#40c4ff',
                              borderColor: '#40c4ff',
                              fontWeight: 600,
                              px: 3,
                              py: 1.5,
                              borderRadius: 3,
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#29b6f6',
                                backgroundColor: 'rgba(64, 196, 255, 0.1)',
                                transform: 'translateY(-2px)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                          >
                            Take Photo
                            <input
                              hidden
                              accept="image/*"
                              capture="environment"
                              type="file"
                              onChange={handleHumanImageChange}
                            />
                          </Button>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </Zoom>

                {/* Featured Garment */}
                <Zoom in timeout={1000}>
                  <Box textAlign="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <AutoAwesomeIcon sx={{ color: '#4caf50', mr: 1 }} />
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        color={isDark ? '#fff' : '#333'}
                      >
                        Featured Garment
                      </Typography>
                    </Box>

                    <Paper
                      elevation={8}
                      sx={{
                        position: 'relative',
                        width: imageBoxWidth,
                        height: imageBoxHeight,
                        overflow: 'hidden',
                        borderRadius: 3,
                        border: '3px solid #4caf50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)',
                        },
                      }}
                    >
                      <img
                        src={clothImageUrl}
                        alt="Featured Garment"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          background:
                            'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
                          color: '#fff',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
                        }}
                      >
                        ⭐ Featured
                      </Box>
                    </Paper>
                  </Box>
                </Zoom>
              </Stack>

              {/* Action Buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Button
                  variant="contained"
                  onClick={handleTryOn}
                  disabled={loading || !humanImage}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <AutoAwesomeIcon />
                    )
                  }
                  sx={{
                    background: loading
                      ? 'linear-gradient(135deg, #666 0%, #888 100%)'
                      : 'linear-gradient(135deg, #ff4081 0%, #ff6b9d 50%, #40c4ff 100%)',
                    color: '#fff',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: loading
                      ? 'none'
                      : '0 6px 20px rgba(255, 64, 129, 0.4)',
                    minWidth: 200,
                    '&:hover': {
                      background: loading
                        ? 'linear-gradient(135deg, #666 0%, #888 100%)'
                        : 'linear-gradient(135deg, #e91e63 0%, #ff4081 50%, #29b6f6 100%)',
                      transform: loading ? 'none' : 'translateY(-3px)',
                      boxShadow: loading
                        ? 'none'
                        : '0 8px 25px rgba(255, 64, 129, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                    '&:disabled': {
                      background: 'linear-gradient(135deg, #ccc 0%, #ddd 100%)',
                      color: '#999',
                    },
                  }}
                >
                  {loading ? '🎨 Creating Magic...' : '✨ Try It On Now'}
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading}
                  sx={{
                    color: isDark ? '#fff' : '#333',
                    borderColor: isDark
                      ? 'rgba(255,255,255,0.3)'
                      : 'rgba(0,0,0,0.3)',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    minWidth: 200,
                    '&:hover': {
                      borderColor: '#ff4081',
                      backgroundColor: 'rgba(255, 64, 129, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  🔄 Reset
                </Button>
              </Stack>

              {/* Error Display */}
              {error && (
                <Fade in>
                  <Box
                    sx={{
                      background:
                        'linear-gradient(135deg, #ff5252 0%, #ff1744 100%)',
                      color: '#fff',
                      p: 2,
                      borderRadius: 2,
                      mb: 3,
                      textAlign: 'center',
                      boxShadow: '0 4px 15px rgba(255, 82, 82, 0.3)',
                    }}
                  >
                    <Typography variant="body1" fontWeight="600">
                      ❌ {error}
                    </Typography>
                  </Box>
                </Fade>
              )}

              {/* Result Display */}
              <Box
                sx={{
                  mx: 'auto',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
                  border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  minHeight: 400,
                  width: '100%',
                  maxWidth: 600,
                }}
              >
                {!resultUrl && !loading && (
                  <Box textAlign="center" p={4}>
                    <AutoAwesomeIcon
                      sx={{
                        fontSize: 64,
                        color: isDark
                          ? 'rgba(255,255,255,0.3)'
                          : 'rgba(0,0,0,0.3)',
                        mb: 2,
                        animation: `${pulse} 2s ease-in-out infinite`,
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={
                        isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
                      }
                      mb={1}
                    >
                      Ready to Transform Your Look?
                    </Typography>
                    <Typography
                      variant="body1"
                      color={
                        isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
                      }
                    >
                      Upload your photo and click "Try It On Now" to see the
                      magic happen!
                    </Typography>
                  </Box>
                )}

                {loading && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4,
                    }}
                  >
                    <CircularProgress
                      size={80}
                      thickness={4}
                      sx={{
                        color: '#ff4081',
                        mb: 3,
                        filter: 'drop-shadow(0 0 10px rgba(255, 64, 129, 0.5))',
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={isDark ? '#fff' : '#333'}
                      mb={1}
                    >
                      🎨 AI Magic in Progress...
                    </Typography>
                    <Typography
                      variant="body2"
                      color={
                        isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
                      }
                      textAlign="center"
                    >
                      Our advanced AI is working to create your perfect virtual
                      try-on experience
                    </Typography>
                  </Box>
                )}

                {resultUrl && (
                  <Zoom in>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <img
                        src={resultUrl}
                        alt="Try-On Result"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 16,
                          objectFit: 'cover',
                        }}
                      />
                      <Tooltip title="View Full Size">
                        <IconButton
                          href={resultUrl}
                          target="_blank"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            bgcolor: 'rgba(0,0,0,0.7)',
                            color: '#fff',
                            '&:hover': {
                              bgcolor: 'rgba(255, 64, 129, 0.8)',
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <FullscreenIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Zoom>
                )}
              </Box>

              {loading && (
                <Typography
                  variant="caption"
                  color="#ff4081"
                  fontWeight="bold"
                  textAlign="center"
                  display="block"
                  mt={2}
                  sx={{
                    background: isDark
                      ? 'rgba(255, 64, 129, 0.1)'
                      : 'rgba(255, 64, 129, 0.05)',
                    p: 1,
                    borderRadius: 1,
                    border: '1px solid rgba(255, 64, 129, 0.2)',
                  }}
                >
                  ⚠️ Please stay on this page while we create your virtual
                  try-on
                </Typography>
              )}
            </Card>
          </Slide>

          {/* Sample Poses Section */}
          <Slide direction="up" in timeout={1400}>
            <Card
              elevation={0}
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(20px)',
                border: isDark
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(0,0,0,0.1)',
                borderRadius: 4,
                p: 4,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, #fff 0%, #ff4081 100%)'
                    : 'linear-gradient(135deg, #333 0%, #ff4081 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                }}
              >
                📸 Perfect Pose Guide
              </Typography>

              <Typography
                variant="body1"
                color={isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'}
                mb={4}
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                For the best virtual try-on results, use front-facing, full-body
                photos with good lighting. Here are some ideal pose examples:
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
              >
                {[
                  {
                    src: '/vton/-w_QHuw3SFS14Jo3i-jXMQ.jpeg',
                    label: '✨ Classic Pose',
                    tip: 'Stand straight, arms relaxed',
                  },
                  {
                    src: '/vton/aawIiUoTQJeQxJ17Mez6qA.jpeg',
                    label: '🌟 Natural Stance',
                    tip: 'Slight angle, confident posture',
                  },
                  {
                    src: '/customise_image/human02.jpg',
                    label: '💫 Professional Look',
                    tip: 'Formal pose, good lighting',
                  },
                ].map((item, idx) => (
                  <Zoom key={idx} in timeout={1000 + idx * 200}>
                    <Card
                      elevation={4}
                      sx={{
                        position: 'relative',
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.05)',
                          boxShadow: '0 15px 35px rgba(255, 64, 129, 0.2)',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={item.src}
                        alt={item.label}
                        sx={{
                          width: { xs: 180, sm: 160, md: 200 },
                          height: { xs: 240, sm: 220, md: 280 },
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <CardContent
                        sx={{
                          background: isDark
                            ? 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(255,64,129,0.1) 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,64,129,0.05) 100%)',
                          backdropFilter: 'blur(10px)',
                          p: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="600"
                          color={isDark ? '#fff' : '#333'}
                          mb={0.5}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          color={
                            isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
                          }
                        >
                          {item.tip}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                ))}
              </Stack>

              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(64,196,255,0.1) 0%, rgba(76,175,80,0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(64,196,255,0.05) 0%, rgba(76,175,80,0.05) 100%)',
                  borderRadius: 2,
                  border: isDark
                    ? '1px solid rgba(64,196,255,0.2)'
                    : '1px solid rgba(64,196,255,0.1)',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={isDark ? '#40c4ff' : '#1976d2'}
                  mb={1}
                >
                  💡 Pro Tips for Best Results
                </Typography>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  divider={
                    <Box
                      sx={{
                        width: { xs: '100%', md: '1px' },
                        height: { xs: '1px', md: '40px' },
                        background: isDark
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.1)',
                      }}
                    />
                  }
                >
                  <Box flex={1} textAlign="center">
                    <Typography
                      variant="body2"
                      color={
                        isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
                      }
                    >
                      <strong>📱 Good Lighting:</strong> Use natural light or
                      bright indoor lighting
                    </Typography>
                  </Box>
                  <Box flex={1} textAlign="center">
                    <Typography
                      variant="body2"
                      color={
                        isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
                      }
                    >
                      <strong>📏 Full Body:</strong> Include your entire body in
                      the frame
                    </Typography>
                  </Box>
                  <Box flex={1} textAlign="center">
                    <Typography
                      variant="body2"
                      color={
                        isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
                      }
                    >
                      <strong>🎯 Clear Focus:</strong> Ensure the image is sharp
                      and not blurry
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Card>
          </Slide>
        </Container>
        <TShirtGrid />
        <Footer />
      </Box>
    </Box>
  );
}
