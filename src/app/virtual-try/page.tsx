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

  const imageBoxWidth = 240;
  const imageBoxHeight = 300;
  // const accentRed = isDark ? '#FF6B6B' : '#D32F2F';
  // const accentYellow = isDark ? '#FFD600' : '#FBC02D';
  // const borderColor = isDark ? '#BDBDBD' : '#424242';

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
      console.log("Data------------>>",data);
      
      if (data.url) {
        setResultUrl(data.url);
      } else {
        throw new Error("Failed to generate try-on image, please try sometimes leter");
      }
    } catch (err: any) {
      setError("Failed to generate try-on image, please try sometimes leter");
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
        Upload your photo and your favorite garment image — watch as we magically fit your style with our cutting-edge AI try-on. <br />
        Discover your next look instantly and confidently!
      </Typography>

      </Box>
      <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, py: 5, textAlign: 'center', color: isDark ? '#fff' : '#000' }}>
        
        <Box
          sx={{
            border: `2px solid ${borderColor}`,
            borderRadius: 3,
            p: 4,
            boxShadow: isDark ? '0 0 20px rgba(255,255,255,0.2)' : '0 0 20px rgba(0,0,0,0.15)',
            mb: 5,
          }}
        >
          {/* Upload Area */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" alignItems="center" mb={4}>
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
                    borderColor,
                    width: imageBoxWidth,
                    height: imageBoxHeight,
                    borderRadius: 3,
                    fontWeight: 600,
                  }}
                >
                  Upload
                  <input hidden accept="image/*" type="file" onChange={handleHumanImageChange} />
                </Button>
              )}
            </Box>

            {/* Cloth Image Upload */}
            <Box textAlign="center" width={imageBoxWidth}>
              <Typography mb={1} fontWeight="600" color={accentYellow}>
                👗 Garment
              </Typography>
              {clothImage ? (
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
                    borderColor,
                    width: imageBoxWidth,
                    height: imageBoxHeight,
                    borderRadius: 3,
                    fontWeight: 600,
                  }}
                >
                  Upload
                  <input hidden accept="image/*" type="file" onChange={handleClothImageChange} />
                </Button>
              )}
            </Box>
          </Stack>

          {/* Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" mb={3}>
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
              disabled={loading && !resultUrl}
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.2rem',
                borderColor,
                color: isDark ? '#fff' : '#000',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
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
              <Typography variant="body1" fontWeight={600} color={borderColor} textAlign="center" mt={2}>
                Upload your images above and click "Try It On Now" to see yourself in style!
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
                  style={{ width: '100%', height: '100%', borderRadius: 16, objectFit: 'cover' }}
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
                    <CircularProgress size={70} thickness={5} sx={{ color: accentYellow }} />
                  </Box>
                )}
              </>
            )}
          </Box>

          {(loading || !resultUrl) && (
            <Typography variant="caption" color={accentRed} fontWeight="bold" textAlign="center" display="block" mt={2}>
              ⚠️ Please do not close or refresh the page while your virtual try-on is being generated.
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
            (Use front-facing, full-body, clear photos and try these types of poses for the best results)
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
    { src: '/vton/-w_QHuw3SFS14Jo3i-jXMQ.jpeg', label: 'Male Example' },
    { src: '/vton/1E3fdYN9RYWHimhBuYzo_w.jpeg', label: 'Male Example' },
    { src: '/vton/2mLXWWW4S4mHA44grtFQgA.jpeg', label: 'Male Example' },
    { src: '/vton/aawIiUoTQJeQxJ17Mez6qA.jpeg', label: 'Male Example' },
    { src: '/vton/eyST3-ZUSgSog3J-OmixXA.jpeg', label: 'Male Example' },
    { src: '/vton/gXNiIUXwRD-dev4jiFhg2A.jpeg', label: 'Male Example' },
    { src: '/vton/wcMYcwTJTjiAKlbo-djYOQ.jpeg', label: 'Male Example' },
    { src: '/customise_image/human02.jpg', label: 'Female Example' },
    { src: '/customise_image/human01.jpg', label: 'Female Example' },
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
