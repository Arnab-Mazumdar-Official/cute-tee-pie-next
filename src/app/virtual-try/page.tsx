'use client';
import React, { ChangeEvent, useState } from 'react';
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

export default function TryOnUploader() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [humanImage, setHumanImage] = useState<File | null>(null);
  const [clothImage, setClothImage] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject("Failed to convert image to base64.");
    });

  const handleHumanImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHumanImage(e.target.files[0]);
      setResultUrl(null);
      setError(null);
    }
  };

  const handleClothImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setClothImage(e.target.files[0]);
      setResultUrl(null);
      setError(null);
    }
  };

  const handleDeleteHuman = () => {
    setHumanImage(null);
    setResultUrl(null);
    setError(null);
  };

  const handleDeleteCloth = () => {
    setClothImage(null);
    setResultUrl(null);
    setError(null);
  };

  const handleTryOn = async () => {
    setError(null);
    if (!humanImage || !clothImage) {
      setError("Please upload both images to continue.");
      return;
    }

    setLoading(true);

    try {
      const humanBase64 = await toBase64(humanImage);
      const clothBase64 = await toBase64(clothImage);

      const res = await fetch('/api/vton', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          humanImageBase64: humanBase64,
          clothImageBase64: clothBase64,
        }),
      });

      const data = await res.json();

      if (data.url) {
        setResultUrl(data.url);
      } else {
        throw new Error(data.error || "Failed to generate try-on image.");
      }
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred during processing.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setHumanImage(null);
    setClothImage(null);
    setResultUrl(null);
    setError(null);
    setLoading(false);
  };

  // Borders colors based on theme
  const borderColor = isDark ? '#fff' : '#000';

  // Accent colors
  const accentRed = '#d32f2f';
  const accentYellow = '#fbc02d';

  return (
    <Box sx={{ bgcolor: isDark ? '#000' : '#fff', minHeight: '100vh' }}>
      <AnnouncementBar />
      <Header />

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
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: accentRed }}
        >
          🧥 Experience PrinteepaL's Virtual Trial Room!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 5,
            color: accentYellow,
            fontWeight: 700,
            maxWidth: 520,
            mx: 'auto',
          }}
        >
          Upload your photo and your favorite garment image — watch as we magically fit your style with our cutting-edge AI try-on. 
          <br />
          Discover your next look instantly and confidently!
        </Typography>

        {/* Container box with border + shadow around uploads + generated */}
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
          {/* Upload images row */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
            mb={4}
            >

            {/* Human Image */}
            <Box textAlign="center" width={160}>
              <Typography mb={1} fontWeight="600" color={accentYellow}>
                👤 Your Photo
              </Typography>
              {humanImage ? (
                <Paper
                  variant="outlined"
                  sx={{
                    position: 'relative',
                    width: 160,
                    height: 160,
                    borderColor: borderColor,
                    overflow: 'hidden',
                    borderRadius: 3,
                  }}
                >
                  <img
                    src={URL.createObjectURL(humanImage)}
                    alt="Human"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: isDark ? '#fff' : '#000',
                    borderColor: borderColor,
                    width: 160,
                    height: 160,
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
              )}
            </Box>

            {/* Cloth Image */}
            <Box textAlign="center" width={160}>
              <Typography mb={1} fontWeight="600" color={accentYellow}>
                👗 Garment
              </Typography>
              {clothImage ? (
                <Paper
                  variant="outlined"
                  sx={{
                    position: 'relative',
                    width: 160,
                    height: 160,
                    borderColor: borderColor,
                    overflow: 'hidden',
                    borderRadius: 3,
                  }}
                >
                  <img
                    src={URL.createObjectURL(clothImage)}
                    alt="Cloth"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Tooltip title="Remove garment image">
                    <IconButton
                      size="small"
                      onClick={handleDeleteCloth}
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
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: isDark ? '#fff' : '#000',
                    borderColor: borderColor,
                    width: 160,
                    height: 160,
                    borderRadius: 3,
                    fontWeight: 600,
                  }}
                >
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleClothImageChange}
                  />
                </Button>
              )}
            </Box>
          </Stack>

          {/* Try On and Reset Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            mb={3}
            sx={{
                '@media (max-width:433px)': {
                flexDirection: 'column',
                },
            }}
            >
            <Button
              variant="contained"
              color="error"
              onClick={handleTryOn}
              disabled={loading || !humanImage || !clothImage}
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
              disabled={loading && !resultUrl} // disable reset while loading with no result
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.2rem',
                borderColor: borderColor,
                color: isDark ? '#fff' : '#000',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  borderColor: borderColor,
                },
              }}
            >
              Reset
            </Button>
          </Stack>

          {/* Error Message */}
          {error && (
            <Typography
              variant="body1"
              color="error"
              fontWeight="bold"
              mb={3}
              textAlign="center"
            >
              ❌ {error}
            </Typography>
          )}

          {/* Result image below uploads */}
          <Box
            sx={{
                mx: 'auto',
                width: {
                xs: 220,           // For ≤386px
                sm: 282,           // From >386px to <600px
                md: 340            // ≥600px
                },
                height: {
                xs: 220,
                sm: 282,
                md: 340
                },
                borderRadius: 4,
                border: `2px solid ${borderColor}`,
                overflow: 'hidden',
                boxShadow: `0 0 12px ${accentYellow}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
            >
            {!resultUrl && !loading && (
              <Typography
                variant="body1"
                sx={{
                    fontWeight: 600,
                    color: borderColor,
                    textAlign: 'center',
                    display: 'block',
                    mt: 2,
                }}
                >
                Upload your images above and click "Try It On Now" to see yourself in style!
              </Typography>
            )}

            {/* Skeleton loader */}
            {loading && !resultUrl && (
              <Skeleton variant="rectangular" width={320} height={320} />
            )}

            {/* Result image with loader overlay */}
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

          {/* Instruction text */}
          {(loading || resultUrl) && (
            <Typography
              variant="caption"
              color={accentRed}
              fontWeight="bold"
              sx={{ display: 'block', textAlign: 'center', mb: 0 }}
            >
              ⚠️ Please do not close or refresh the page while your virtual try-on is being generated.
            </Typography>
          )}
        </Box>
      </Box>
    <TShirtGrid />
      <Footer />
    </Box>
  );
}
