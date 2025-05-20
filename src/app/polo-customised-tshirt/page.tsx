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
import { letterSpacing } from 'html2canvas/dist/types/css/property-descriptors/letter-spacing';

// Constants
const tshirtColors = ['White', 'Black', 'Navy Blue','Maroon','Beige'];
const tshirtSizes = ['Ex', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'];
const frontBackOptions = ['front', 'back'];

export default function TshirtCustomizerPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const router = useRouter();

  // States
  const [color, setColor] = useState('White');
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [frontBack, setFrontBack] = useState<'front' | 'back'>('front');

  const [designImageFront, setDesignImageFront] = useState<string | null>(null);
  const [designImageBack, setDesignImageBack] = useState<string | null>(null);
  // const [designPos, setDesignPos] = useState({ top: 100, left: 100 });
  // const [designSize, setDesignSize] = useState(100);
  const [frontDesignPos, setFrontDesignPos] = useState({ left: 0, top: 0 });
  const [backDesignPos, setBackDesignPos] = useState({ left: 0, top: 0 });
  const [frontDesignSize, setFrontDesignSize] = useState(100); // initial size in px
  const [backDesignSize, setBackDesignSize] = useState(100);

  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  // const tshirtRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [openLoginNeed, setOpenLoginNeed] = useState(false);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const getCurrentRef = () => (frontBack === 'front' ? frontRef : backRef);
  const getCurrentDesignPos = () => (frontBack === 'front'  ? frontDesignPos : backDesignPos);
  const setCurrentDesignPos = (pos: { left: number; top: number }) =>
  frontBack === 'front'  ? setFrontDesignPos(pos) : setBackDesignPos(pos);

  const getCurrentDesignSize = () => (frontBack === 'front'  ? frontDesignSize : backDesignSize);
  const setCurrentDesignSize = (size: number) =>
  frontBack === 'front'  ? setFrontDesignSize(size) : setBackDesignSize(size);
  // Determine which design image is current
  const currentDesignImage = frontBack === 'front' ? designImageFront : designImageBack;
  const setCurrentDesignImage = frontBack === 'front' ? setDesignImageFront : setDesignImageBack;

  // Price calculation
  const basePrice = 400;
  const rawPrice =
  basePrice +
  (designImageFront ? frontDesignSize * 0.9 : 0) +
  (designImageBack ? backDesignSize * 0.9 : 0);

  const price = parseFloat(rawPrice.toFixed(2));


  // Handle design upload
  const handleDesignUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  setCurrentDesignImage(url);
  setCurrentDesignPos({ top: 100, left: 100 });
  setCurrentDesignSize(100);
};

// Delete current design
const handleDeleteDesign = () => {
  setCurrentDesignImage(null);
  setCurrentDesignPos({ top: 100, left: 100 });
  setCurrentDesignSize(100);
};

// Drag & Drop handlers
const onMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
  setDragging(true);
  const activeRef = getCurrentRef();
  if (!activeRef.current) return;

  const rect = activeRef.current.getBoundingClientRect();
  const { left, top } = getCurrentDesignPos();
  dragOffset.current = {
    x: e.clientX - rect.left - left,
    y: e.clientY - rect.top - top,
  };
};

const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const activeRef = getCurrentRef();
  if (!dragging || !activeRef.current) return;

  const rect = activeRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left - dragOffset.current.x;
  const y = e.clientY - rect.top - dragOffset.current.y;

  const size = getCurrentDesignSize();
  const maxLeft = 300 - size;
  const maxTop = 400 - size;

  setCurrentDesignPos({
    left: Math.max(0, Math.min(x, maxLeft)),
    top: Math.max(0, Math.min(y, maxTop)),
  });
};

const onMouseUp = () => setDragging(false);

// Touch handlers
const onTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
  e.preventDefault(); // Prevent touchstart from triggering scroll
  setDragging(true);

  const activeRef = getCurrentRef();
  if (!activeRef.current) return;

  const rect = activeRef.current.getBoundingClientRect();
  const touch = e.touches[0];
  const { left, top } = getCurrentDesignPos();

  dragOffset.current = {
    x: touch.clientX - rect.left - left,
    y: touch.clientY - rect.top - top,
  };
};

const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  if (!dragging) return;

  const activeRef = getCurrentRef();
  if (!activeRef.current) return;

  e.preventDefault(); // Critical to disable scroll while dragging

  const rect = activeRef.current.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left - dragOffset.current.x;
  const y = touch.clientY - rect.top - dragOffset.current.y;

  const size = getCurrentDesignSize();
  const maxLeft = 300 - size;
  const maxTop = 400 - size;

  setCurrentDesignPos({
    left: Math.max(0, Math.min(x, maxLeft)),
    top: Math.max(0, Math.min(y, maxTop)),
  });
};

const onTouchEnd = () => {
  setDragging(false);
};


  // Capture tshirt preview as image blob
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

  // Upload blob to S3 via API
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

  // Submit order handler
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
        setOpenLoginNeed(true);
        setLoading(false);
        return;
      }

      const dateStr = moment().format('DD-MM-YYYY-HH:mm:ss');
      const uploadTasks: Promise<void>[] = [];
      const orderImages: {
        type: string;
        url: string;
        size: string;
        color: string;
        quantity: number;
        price: number;
      }[] = [];

      // Helper to upload original and mockup
      async function uploadDesign(typePrefix: string, imageUrl: string, side: 'front' | 'back') {
        const originalBlob = await (await fetch(imageUrl)).blob();

        // Set side to capture mockup
        setFrontBack(side);
        await new Promise((r) => setTimeout(r, 500)); // wait for UI update
        let mockupBlob;
        if(side === 'front'){
          mockupBlob= await captureImage(frontRef);
        }else{
          mockupBlob= await captureImage(backRef);
        }
         

        uploadTasks.push(
          uploadToS3(originalBlob, `${typePrefix}-design-${parsedUser._id}-${dateStr}.png`).then((url) => {
            orderImages.push({
              type: `${typePrefix}-design`,
              url,
              size,
              color,
              quantity,
              price,
            });
          })
        );

        uploadTasks.push(
          uploadToS3(mockupBlob, `${typePrefix}-mockup-${parsedUser._id}-${dateStr}.png`).then((url) => {
            orderImages.push({
              type: `${typePrefix}-mockup`,
              url,
              size,
              color,
              quantity,
              price,
            });
          })
        );
      }

      if (designImageFront) await uploadDesign('front', designImageFront, 'front');
      if (designImageBack) await uploadDesign('back', designImageBack, 'back');

      await Promise.all(uploadTasks);

      // Save order info in cookie (expires in 15 mins)
      const cookieData = {
        user_id: parsedUser._id,
        order_images: orderImages,
      };
      console.log("Coockie Data----->>",cookieData);
      
      const in15Minutes = new Date(Date.now() + 15 * 60 * 1000);
      Cookies.set('user_customise_order_data', JSON.stringify(cookieData), { expires: in15Minutes });

      // Redirect to checkout page
      router.push('/customise-t-shirt-check-out');
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: '❌ Failed to upload order files or validate user.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const designPos = getCurrentDesignPos();
  const designSize = getCurrentDesignSize();
  // const designImage = getCurrentDesignImage();

  // Render JSX
  return (
    <>
      <AnnouncementBar />
      <Header />

      <Box sx={{ p: 3, backgroundColor: isDarkMode ? '#121212' : '#fff', minHeight: '100vh' }}>
        <Box display="flex" justifyContent="center" width="100%">
          <Typography variant="h4" gutterBottom>
            Design Your Polo T-shirt
          </Typography>
        </Box>


      <Box display="flex" justifyContent="center" width="100%">
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {/* Left panel: T-shirt preview */}
          {frontBack === 'front' ? (
            <Box
              ref={frontRef}
              sx={{
                width: 300,
                height: 400,
                position: 'relative',
                border: '2px solid',
                borderColor: isDarkMode ? 'grey.700' : 'grey.300',
                backgroundColor: color.toLowerCase(),
                borderRadius: 2,
                userSelect: 'none',
                overflow: 'hidden',
              }}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(/polo-tshits/${color.toLowerCase().replace(/\s+/g, '_')}_front.png)`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  filter: dragging ? 'brightness(0.9)' : 'none',
                }}
              />
              {designImageFront && (
                <img
                  src={designImageFront}
                  alt="front design"
                  style={{
                    position: 'absolute',
                    top: designPos.top,
                    left: designPos.left,
                    width: designSize,
                    height: designSize,
                    cursor: dragging ? 'grabbing' : 'grab',
                    userSelect: 'none',
                  }}
                  onMouseDown={onMouseDown}
                  onTouchStart={onTouchStart}
                  draggable={false}
                />
              )}
            </Box>
          ) : (
            <Box
              ref={backRef}
              sx={{
                width: 300,
                height: 400,
                position: 'relative',
                border: '2px solid',
                borderColor: isDarkMode ? 'grey.700' : 'grey.300',
                backgroundColor: color.toLowerCase(),
                borderRadius: 2,
                userSelect: 'none',
                overflow: 'hidden',
              }}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(/polo-tshits/${color.toLowerCase().replace(/\s+/g, '_')}_back.png)`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  filter: dragging ? 'brightness(0.9)' : 'none',
                }}
              />
              {designImageBack && (
                <img
                  src={designImageBack}
                  alt="back design"
                  style={{
                    position: 'absolute',
                    top: designPos.top,
                    left: designPos.left,
                    width: designSize,
                    height: designSize,
                    cursor: dragging ? 'grabbing' : 'grab',
                    userSelect: 'none',
                  }}
                  onMouseDown={onMouseDown}
                  onTouchStart={onTouchStart}
                  draggable={false}
                />
              )}
            </Box>
          )}

          {/* Right panel: Controls */}
          <Box sx={{ flex: 1, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Front/Back select */}
            <FormControl fullWidth>
              <InputLabel id="front-back-label">Side</InputLabel>
              <Select
                labelId="front-back-label"
                value={frontBack}
                label="Side"
                onChange={(e) => setFrontBack(e.target.value as 'front' | 'back')}
              >
                {frontBackOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Upload Design */}
            <Button variant="outlined" component="label">
              Upload {frontBack} Design
              <input hidden accept="image/*" type="file" onChange={handleDesignUpload} />
            </Button>

            {/* Delete Design */}
            {currentDesignImage && (
              <Button variant="contained" color="error" onClick={handleDeleteDesign}>
                Delete {frontBack} Design
              </Button>
            )}

            {/* Design Size */}
            {currentDesignImage && (
              <Box>
                <Typography gutterBottom>Design Size: {getCurrentDesignSize()}px</Typography>
                <Slider
                  min={40}
                  max={200}
                  value={getCurrentDesignSize()}
                  onChange={(e, val) => setCurrentDesignSize(val as number)}
                />
              </Box>
            )}

            {/* Quantity */}
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              inputProps={{ min: 1 }}
              fullWidth
            />

            {/* Size Select */}
            <FormControl fullWidth>
              <InputLabel id="size-label">T-shirt Size</InputLabel>
              <Select
                labelId="size-label"
                value={size}
                label="T-shirt Size"
                onChange={(e) => setSize(e.target.value)}
              >
                {tshirtSizes.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Color Select */}
            <FormControl fullWidth>
              <InputLabel id="color-label">T-shirt Color</InputLabel>
              <Select
                labelId="color-label"
                value={color}
                label="T-shirt Color"
                onChange={(e) => setColor(e.target.value)}
              >
                {tshirtColors.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Price Display */}
            <Typography variant="h6">
              Total Price: ₹{price * quantity}
            </Typography>

            {/* Submit button */}
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitOrder}
              disabled={loading}
              size="large"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </Button>

            {loading && <LinearProgress />}
          </Box>
        </Box>
        </Box>

        {/* Login required dialog */}
        <LoginNeeded open={openLoginNeed} onClose={() => setOpenLoginNeed(false)} />

        {/* Snackbar alerts */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
