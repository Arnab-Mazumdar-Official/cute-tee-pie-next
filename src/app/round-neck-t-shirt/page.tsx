'use client';
import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Input,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  LinearProgress,
  Snackbar,
  Alert,
  TextField,
  FormLabel,
} from '@mui/material';
import AnnouncementBar from '../../../components/anouncement/announcement';
import Header from '../../../components/header/header';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import LoginNeeded from '../../../components/loginneed/loginneed';
import moment from 'moment';

// Constants
const tshirtColors = ['White', 'Black','Navy Blue','Royal Blue', 'Red','Maroon','Chocolate Brown','Army Green'];
const tshirtSizes = ['Ex','S', 'M', 'L', 'XL','2XL','3Xl','4XL','5XL','6XL'];
const frontBackOptions = ['front', 'back'];

export default function TshirtCustomizerPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('White');
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [frontBack, setFrontBack] = useState<'front' | 'back'>('front');
  const [designImageFront, setDesignImageFront] = useState<string | null>(null);
  const [designImageBack, setDesignImageBack] = useState<string | null>(null);
  const [designPos, setDesignPos] = useState({ top: 100, left: 100 });
  const [designSize, setDesignSize] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [openLogineed, setOpenLogineed] = useState(false);
  const router = useRouter();
  const [snackbar, setSnackbar] = useState<{
      open: boolean;
      message: string;
      severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

  const dragOffset = useRef({ x: 0, y: 0 });
  const tshirtRef = useRef<HTMLDivElement>(null);

  const currentDesignImage = frontBack === 'front' ? designImageFront : designImageBack;
  const setCurrentDesignImage = frontBack === 'front' ? setDesignImageFront : setDesignImageBack;

  const basePrice = 300;
  const price =
    basePrice +
    (designImageFront ? designSize * 2 : 0) +
    (designImageBack ? designSize * 2 : 0);

  const handleDesignUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      if (frontBack === 'front') setDesignImageFront(url);
      else setDesignImageBack(url);
      setDesignPos({ top: 100, left: 100 });
      setDesignSize(100);
    }
  };

  const handleDeleteDesign = () => {
    if (frontBack === 'front') setDesignImageFront(null);
    else setDesignImageBack(null);
    setDesignSize(100);
    setDesignPos({ top: 100, left: 100 });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    setDragging(true);
    const rect = tshirtRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left - designPos.left,
        y: e.clientY - rect.top - designPos.top,
      };
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || !tshirtRef.current) return;

    const rect = tshirtRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.current.x;
    const y = e.clientY - rect.top - dragOffset.current.y;

    const maxLeft = 300 - designSize;
    const maxTop = 400 - designSize;

    setDesignPos({
      left: Math.max(0, Math.min(x, maxLeft)),
      top: Math.max(0, Math.min(y, maxTop)),
    });
  };

  const onMouseUp = () => setDragging(false);

  // For touch start
const onTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
  setDragging(true);
  const rect = tshirtRef.current?.getBoundingClientRect();
  if (rect) {
    const touch = e.touches[0];
    dragOffset.current = {
      x: touch.clientX - rect.left - designPos.left,
      y: touch.clientY - rect.top - designPos.top,
    };
  }
};

// For touch move
const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  if (!dragging || !tshirtRef.current) return;
  e.preventDefault(); // prevent scrolling while dragging

  const rect = tshirtRef.current.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left - dragOffset.current.x;
  const y = touch.clientY - rect.top - dragOffset.current.y;

  const maxLeft = 300 - designSize;
  const maxTop = 400 - designSize;

  setDesignPos({
    left: Math.max(0, Math.min(x, maxLeft)),
    top: Math.max(0, Math.min(y, maxTop)),
  });
};

// For touch end
const onTouchEnd = () => setDragging(false);


  const captureImage = async (ref: React.RefObject<HTMLDivElement>): Promise<Blob> => {
    if (!ref.current) throw new Error('Missing reference to element');
    const canvas = await html2canvas(ref.current);
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to generate blob'));
      });
    });
  };

  const uploadToS3 = async (file: Blob, filename: string) => {
    const formData = new FormData();
    formData.append('file', file, filename);

    const res = await fetch('/api/upload-to-s3', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error(`Failed to upload ${filename}`);
    return res.json();
  };

  const onSubmitOrder = async () => {
  if (!designImageFront && !designImageBack) {
    alert('❌ Please upload at least one design (front or back).');
    return;
  }

  if (!size || !color || !quantity) {
    setSnackbar({
      open: true,
      message: '❌ Please select quantity, size and color before submitting.',
      severity: 'error',
    });
    return;
  }

  setLoading(true);
  try {
    const userLoginData = Cookies.get('user_login_data');
    const parsedUser = userLoginData ? JSON.parse(userLoginData) : null;

    if (!parsedUser || !parsedUser._id) {
      setOpenLogineed(true);
      return;
    }

    const dateStr = moment().format('DD-MM-YYYY');
    const uploadTasks = [];
    const orderImages: {
          type: string;
          url: string;
          size: string;
          color: string;
          quantity: number;
          price: number;
        }[] = [];

    // FRONT DESIGN
    if (designImageFront) {
      const originalFrontBlob = await (await fetch(designImageFront)).blob();

      // Front mockup
      setFrontBack('front');
      await new Promise((res) => setTimeout(res, 500));
      const frontImageBlob = await captureImage(tshirtRef);

      // Upload both front images
      uploadTasks.push(
        uploadToS3(originalFrontBlob, `front-design-${parsedUser._id}-${dateStr}.png`).then((url) => {
          orderImages.push({
            type: 'front-design',
            url,
            size: size,
            color: color,
            quantity: quantity,
            price: price,
          });
        })
      );

      uploadTasks.push(
        uploadToS3(frontImageBlob, `front-mockup-${parsedUser._id}-${dateStr}.png`).then((url) => {
          orderImages.push({
            type: 'front-mockup',
            url,
            size: size,
            color: color,
            quantity: quantity,
            price: price,
          });
        })
      );
    }

    // BACK DESIGN
    if (designImageBack) {
      const originalBackBlob = await (await fetch(designImageBack)).blob();

      // Back mockup
      setFrontBack('back');
      await new Promise((res) => setTimeout(res, 500));
      const backImageBlob = await captureImage(tshirtRef);

      // Upload both back images
      uploadTasks.push(
        uploadToS3(originalBackBlob, `back-design-${parsedUser._id}-${dateStr}.png`).then((url) => {
          orderImages.push({
            type: 'back-design',
            url,
            size: size,
            color: color,
            quantity: quantity,
            price: price,
          });
        })
      );

      uploadTasks.push(
        uploadToS3(backImageBlob, `back-mockup-${parsedUser._id}-${dateStr}.png`).then((url) => {
          orderImages.push({
            type: 'back-mockup',
            url,
            size: size,
            color: color,
            quantity: quantity,
            price: price,
          });
        })
      );
    }

    // Wait for all uploads to finish
    await Promise.all(uploadTasks);
    const cookieData = {
    user_id: parsedUser._id,
    order_images: orderImages,
  };
    // Save order data in cookie for 15 minutes
    const in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
    Cookies.set('user_customise_order_data', JSON.stringify(cookieData), { expires: in15Minutes });

    // Redirect to address page
    router.push('/customise-t-shirt-check-out');
  } catch (error) {
    console.error(error);
    setSnackbar({
      open: true,
      message: '❌ Failed to upload order files or validate user.',
      severity: 'error',
    });
    // router.push('/login');
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? 'black' : 'white',
        color: isDarkMode ? 'white' : 'black',
        minHeight: '100vh',
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <AnnouncementBar />
      <Header />
      {loading && <LinearProgress sx={{ mt: 2 }} />}

      <Box sx={{ mx: 3 }}>
        {/* Sidebar Options */}
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 3, mb: 4 }}>
          {/* Color */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: isDarkMode ? 'white' : 'black' }}>Color</InputLabel>
            <Select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              label="Color"
              sx={{
                color: isDarkMode ? 'white' : 'black',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? 'white' : 'black',
                },
                '& .MuiSvgIcon-root': {
                  color: isDarkMode ? 'white' : 'black',
                },
              }}
            >
              {tshirtColors.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Size */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: isDarkMode ? 'white' : 'black' }}>Size</InputLabel>
            <Select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              label="Size"
              sx={{
                color: isDarkMode ? 'white' : 'black',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? 'white' : 'black',
                },
                '& .MuiSvgIcon-root': {
                  color: isDarkMode ? 'white' : 'black',
                },
              }}
            >
              {tshirtSizes.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                InputLabelProps={{
                  style: { color: isDarkMode ? 'white' : 'black' },
                }}
                InputProps={{
                  style: { color: isDarkMode ? 'white' : 'black' },
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? 'white' : 'black',
                  },
                }}
              />
            </FormControl>


          {/* Front/Back */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ color: isDarkMode ? 'white' : 'black' }}>Front / Back</InputLabel>
            <Select
              value={frontBack}
              onChange={(e) => setFrontBack(e.target.value as 'front' | 'back')}
              label="Front / Back"
              sx={{
                color: isDarkMode ? 'white' : 'black',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? 'white' : 'black',
                },
                '& .MuiSvgIcon-root': {
                  color: isDarkMode ? 'white' : 'black',
                },
              }}
            >
              {frontBackOptions.map((fb) => (
                <MenuItem key={fb} value={fb}>
                  {fb.charAt(0).toUpperCase() + fb.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Upload Design */}
          {/* <Typography variant="h6" gutterBottom>
            Upload {frontBack === 'front' ? 'Front' : 'Back'} Design
          </Typography>
          <Input
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleDesignUpload}
            sx={{ mb: 2, color: isDarkMode ? 'white' : 'black' }}
          /> */}

          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: isDarkMode ? 'white' : 'black' }}>
              Upload Design for {frontBack === 'front' ? 'Front Side' : 'Back Side'}
            </FormLabel>
            <Input
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleDesignUpload}
              aria-label={`Upload ${frontBack === 'front' ? 'Front' : 'Back'} Design`}
              sx={{ color: isDarkMode ? 'white' : 'black' }}
            />
          </FormControl>
          <Typography variant="body2" sx={{ color: isDarkMode ? 'white' : 'black', mb: 1 }}>
            Please upload a high-quality PNG or JPG image for the selected side.
          </Typography>



          {/* Resize Slider */}
          {currentDesignImage && (
            <>
              <Typography gutterBottom>Resize Design</Typography>
              <Slider
                value={designSize}
                min={50}
                max={250}
                onChange={(e, val) => setDesignSize(val as number)}
                sx={{
                  color: 'yellow',
                  '& .MuiSlider-thumb': {
                    borderColor: 'blue',
                  },
                }}
              />

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDeleteDesign}
                fullWidth
                sx={{ mt: 2 }}
              >
                Delete Design
              </Button>
            </>
          )}

          {/* Price */}
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Price: ₹{price}
          </Typography>

          {/* Place Order */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSubmitOrder}
            disabled={!designImageFront && !designImageBack}
            sx={{
              bgcolor: 'red',
              '&:hover': {
                bgcolor: 'darkred',
              },
            }}
          >
            Place Order
          </Button>
        </Box>

        {/* T-shirt Preview */}
        <Box
          ref={tshirtRef}
          sx={{
            width: 300,
            height: 400,
            mx: 'auto',
            position: 'relative',
            border: `1px solid ${isDarkMode ? 'white' : 'black'}`,
            backgroundImage:  `url(/round-neck-men-tshirts/${color.toLowerCase().replace(/\s+/g, '_')}_${frontBack}.png)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            userSelect: 'none',
          }}
        >
          {currentDesignImage && (
            <img
              src={currentDesignImage}
              alt="Design"
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              style={{
                width: designSize,
                position: 'absolute',
                top: designPos.top,
                left: designPos.left,
                cursor: 'grab',
                userSelect: 'none',
                pointerEvents: 'all',
              }}
            />
          )}
        </Box>
        <LoginNeeded open={openLogineed} onClose={() => setOpenLogineed(false)} />
      </Box>
      <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
    </Box>
  );
}
