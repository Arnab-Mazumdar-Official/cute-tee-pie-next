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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../../../components/footer/footer';
import AnnouncementBar from '../../../components/anouncement/announcement';
import Header from '../../../components/header/header';
import TShirtGrid from '../../../components/collections/collections';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import axios from 'axios';

export default function TryOnUploader() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [humanImage, setHumanImage] = useState<File | null>(null);
  // Fixed cloth image URL from AWS S3
  const clothImageUrl =
    'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/0cdfd891-4de2-4480-a13a-f6570a00709f.jpg';
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageBoxWidth = 240;
  const imageBoxHeight = 300;

  const toBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject('Failed to convert image to base64.');
    });
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
  const MIN_SIZE = 100 * 1024; // 100 KB
  // Function to convert URL to base64 with CORS handling
  const urlToBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url, {
        mode: 'cors',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      return await toBase64(blob);
    } catch (error) {
      console.error('Error fetching image from URL:', error);
      throw new Error(
        'Failed to convert URL to base64. Please check CORS settings.'
      );
    }
  };

  const handleHumanImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError('No image selected.');
      return;
    }

    // Type validation
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image.');
      return;
    }

    // Size validation
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

    // Optional: Dimension validation
    const isValidDimensions = await validateImageDimensions(file);
    if (!isValidDimensions) {
      setError(
        'Image resolution is too low. Please upload a photo with minimum 300x400 pixels.'
      );
      return;
    }

    setHumanImage(file);
    setResultUrl(null);
    setError(null);
  };

  // Optional helper to validate image resolution
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
      }else {
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

  const borderColor = isDark ? '#fff' : '#000';
  const accentRed = '#d32f2f';
  const accentYellow = '#fbc02d';

  return (
    <Box sx={{ bgcolor: isDark ? '#000' : '#fff', minHeight: '100vh' }}>
      <AnnouncementBar />
      <Header />
      <Box sx={{ textAlign: 'center', px: 2 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: borderColor }}
        >
          🧥 Experience PrinteepaL's Virtual Trial Room!
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 5,
            color: borderColor,
            fontWeight: 700,
            maxWidth: 520,
            mx: 'auto',
          }}
        >
          Upload your photo and see how you look in our featured garment — watch
          as we magically fit your style with our cutting-edge AI try-on. <br />
          Discover your next look instantly and confidently!
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: 700,
          mx: 'auto',
          px: 3,
          py: 5,
          textAlign: 'center',
          color: isDark ? '#fff' : '#000',
        }}
      >
        <Box
          sx={{
            border: `2px solid ${borderColor}`,
            borderRadius: 3,
            p: 4,
            boxShadow: isDark
              ? '0 0 20px rgba(255,255,255,0.2)'
              : '0 0 20px rgba(0,0,0,0.15)',
            mb: 5,
          }}
        >
          {/* Upload Area */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            {/* Human Image Upload */}
            <Box textAlign="center" width={imageBoxWidth}>
              <Typography mb={1} fontWeight="600" color={accentYellow}>
                👤 Your Photo
              </Typography>

              {humanImage ? (
                <Paper
                  variant="outlined"
                  sx={{
                    position: 'relative',
                    width: imageBoxWidth,
                    height: imageBoxHeight,
                    borderColor,
                    overflow: 'hidden',
                    borderRadius: 3,
                  }}
                >
                  <img
                    src={URL.createObjectURL(humanImage)}
                    alt="Human"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Tooltip title="Remove your photo">
                    <IconButton
                      size="small"
                      onClick={handleDeleteHuman}
                      sx={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        bgcolor: accentRed,
                        color: '#fff',
                        '&:hover': { bgcolor: '#b71c1c' },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Paper>
              ) : (
                <Stack spacing={1}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      color: isDark ? '#fff' : '#000',
                      borderColor,
                      width: imageBoxWidth,
                      height: 48,
                      borderRadius: 3,
                      fontWeight: 600,
                    }}
                  >
                    Upload
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
                    sx={{
                      color: isDark ? '#fff' : '#000',
                      borderColor,
                      width: imageBoxWidth,
                      height: 48,
                      borderRadius: 3,
                      fontWeight: 600,
                    }}
                  >
                    Use Camera
                    <input
                      hidden
                      accept="image/*"
                      capture="environment"
                      type="file"
                      onChange={handleHumanImageChange}
                    />
                  </Button>
                </Stack>
              )}
            </Box>

            {/* Fixed Cloth Image Display */}
            <Box textAlign="center" width={imageBoxWidth}>
              <Typography mb={1} fontWeight="600" color={accentYellow}>
                👗 Featured Garment
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  position: 'relative',
                  width: imageBoxWidth,
                  height: imageBoxHeight,
                  borderColor,
                  overflow: 'hidden',
                  borderRadius: 3,
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
                {/* Optional: Add a badge to indicate it's a featured item */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 6,
                    left: 6,
                    bgcolor: accentYellow,
                    color: '#000',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}
                >
                  Featured
                </Box>
              </Paper>
            </Box>
          </Stack>

          {/* Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            mb={3}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleTryOn}
              disabled={loading || !humanImage}
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: `0 0 10px ${accentRed}`,
                '&:hover': {
                  backgroundColor: '#b71c1c',
                  boxShadow: `0 0 14px ${accentRed}`,
                },
              }}
            >
              {loading ? '⏳ Generating Your Look...' : 'Try It On Now'}
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              onClick={handleReset}
              disabled={loading && !resultUrl}
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.2rem',
                borderColor,
                color: isDark ? '#fff' : '#000',
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)',
                  borderColor,
                },
              }}
            >
              Reset
            </Button>
          </Stack>

          {error && (
            <Typography variant="body1" color="error" fontWeight="bold" mb={3}>
              ❌ {error}
            </Typography>
          )}

          {/* Result Image */}
          <Box
            sx={{
              mx: 'auto',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${borderColor}`,
              boxShadow: `0 0 12px ${accentYellow}`,

              // Default dimensions for larger viewports
              width: 549,
              height: 560,

              // Custom breakpoints
              '@media (max-width: 676px)': {
                width: 496,
                height: 560,
              },
              '@media (max-width: 599px)': {
                width: 437,
                height: 442,
              },
              '@media (max-width: 546px)': {
                width: 357,
                height: 386,
              },
              '@media (max-width: 467px)': {
                width: 298,
                height: 358,
              },
              '@media (max-width: 408px)': {
                width: 234,
                height: 358,
              },
              '@media (max-width: 321px)': {
                width: 182,
                height: 358,
              },
            }}
          >
            {!resultUrl && !loading && (
              <Typography
                variant="body1"
                fontWeight={600}
                color={borderColor}
                textAlign="center"
                mt={2}
              >
                Upload your photo above and click "Try It On Now" to see
                yourself in our featured garment!
              </Typography>
            )}

            {loading && !resultUrl && (
              <Box
                sx={{
                  position: 'relative',
                  width: imageBoxWidth,
                  height: imageBoxHeight + 60,
                  mx: 'auto',
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    borderRadius: 4,
                    animation: 'pulse 1.5s ease-in-out infinite',
                    background: 'linear-gradient(135deg, #333, #111)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <CircularProgress
                    size={64}
                    thickness={5}
                    sx={{
                      color: 'cyan',
                      animation: 'spin 2s linear infinite',
                      filter: 'drop-shadow(0 0 10px cyan)',
                    }}
                  />
                </Box>
              </Box>
            )}

            {resultUrl && (
              <>
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
                {/* Download Icon - shown only if result exists */}
                <Tooltip title="Show your look">
                  <IconButton
                    href={resultUrl}
                    download="tryon_result.jpg"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      zIndex: 2,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.2)',
                      },
                    }}
                  >
                    <FullscreenIcon />
                    {/* Or use an MUI Icon like DownloadIcon */}
                  </IconButton>
                </Tooltip>

                {loading && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}
                  >
                    <CircularProgress
                      size={70}
                      thickness={5}
                      sx={{ color: accentYellow }}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>

          {(loading || !resultUrl) && (
            <Typography
              variant="caption"
              color={accentRed}
              fontWeight="bold"
              textAlign="center"
              display="block"
              mt={2}
            >
              ⚠️ Please do not close or refresh the page while your virtual
              try-on is being generated.
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            textAlign: 'center',
            color: isDark ? '#fff' : '#000',
            bgcolor: isDark ? '#000' : '#fff',
            borderRadius: '30px',
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            👀 Sample Idol Poses & Reference Images
          </Typography>
          <Typography variant="caption">
            (Use front-facing, full-body, clear photos and try these types of
            poses for the best results)
          </Typography>
        </Box>
        <Box>
          <Stack
            direction="row"
            useFlexGap
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            spacing={0}
            sx={{
              rowGap: 3,
              columnGap: 3,
            }}
          >
            {[
              {
                src: '/vton/-w_QHuw3SFS14Jo3i-jXMQ.jpeg',
                label: 'Pose 1',
              },
              {
                src: '/vton/aawIiUoTQJeQxJ17Mez6qA.jpeg',
                label: 'Pose 2',
              },
              { src: '/customise_image/human02.jpg', label: 'Pose 3' },
            ].map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  flexBasis: {
                    xs: 'calc(50% - 12px)', // 2 per row on xs
                    sm: 'auto',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  component="img"
                  src={item.src}
                  alt={item.label}
                  sx={{
                    width: { xs: 172, sm: 138, md: 199 },
                    height: { xs: 183, sm: 223, md: 324 },
                    borderRadius: 2,
                    objectFit: 'cover',
                    border: `2px solid ${borderColor}`,
                  }}
                />
                <Typography
                  variant="caption"
                  display="block"
                  textAlign="center"
                  mt={1}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      <TShirtGrid />
      <Footer />
    </Box>
  );
}
