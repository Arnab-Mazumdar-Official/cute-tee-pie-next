'use client';
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Box,
  Paper,
  useMediaQuery,
  FormHelperText,
  LinearProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import Cookies from 'js-cookie'


const TshirtCategoryForm: React.FC = () => {


  const [isEditMode, setIsEditMode] = useState(false);
  const [category_id, setCategoryId] = useState(null);
  const [title, setTitle] = useState('');
  const [active, setActive] = useState(true);
  const [priority, setPriority] = useState<number>(1);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const isSmallScreen = useMediaQuery('(max-width:454px)');
  const [errors, setErrors] = useState({
    title: '',
    active: '',
    priority: '',
    image: '',
  });


  useEffect(() => {
    const storedData = Cookies.get('edit-category-data');
    if (storedData) {
        console.log("Store Data-------->>",storedData);
       
      const category = JSON.parse(storedData);
      console.log("Store Data-------->>",category);


      setIsEditMode(true);
      setCategoryId(category.payload._id);
      setTitle(category.payload.title);
      setActive(category.payload.active);
      setPriority(category.payload.priority);
      setDescription(category.payload.description);


      if (category.payload.imageUrl) {
        setImagePreviewUrl(category.payload.imageUrl);
        setImageFile(category.payload.imageUrl);
      }
    }
  }, []);




  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };


  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
  };






  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    const newErrors = {
      title: title.trim() === '' ? 'Title is required' : '',
      active: active === null ? 'Status is required' : '',
      priority: priority === null || isNaN(priority) ? 'Priority is required' : '',
      image: !imageFile && !isEditMode ? 'Image is required' : '', // allow skipping image in edit mode
    };
 
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err !== '')) return;
 
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description || '');
    formData.append('active', String(active));
    formData.append('priority', String(priority));
    if (imageFile) formData.append('image', imageFile);
    if (isEditMode && category_id) formData.append('_id', category_id);
 
    setLoading(true);
    console.log('🔄 Submitting form data:', { title, description, active, priority, imageFile });
 
    try {
      const res = await fetch('/api/add-collections', {
        method: 'POST',
        body: formData,
      });
 
      const rawText = await res.text();
      let result: any;
 
      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch {
        console.warn('⚠️ Response is not valid JSON:', rawText);
      }
 
      if (!res.ok || !result.success) {
        throw new Error(result?.error || `Server error (${res.status})`);
      }
 
      const successMessage = isEditMode
        ? '✅ Category updated successfully!'
        : '✅ Category created successfully!';
 
      setSnackbar({ open: true, message: successMessage, severity: 'success' });
      console.log('✅ Server response:', result);
 
      // If editing, remove the 'edit-category-data' cookie after success
      if (isEditMode) {
        Cookies.remove('edit-category-data');
      }
 
      if (!isEditMode) {
        setTitle('');
        setActive(true);
        setPriority(1);
        setDescription('');
        removeImage();
      }
 
      // Redirect after a short delay to allow user to see the success message
      setTimeout(() => {
        window.location.href = '/admin-dashboard/collections';
      }, 1000);
 
    } catch (err) {
    //   console.error('❌ Submission error:', err.message);
      setSnackbar({ open: true, message: 'Something went wrong', severity: 'error' });
    } finally {
      setLoading(false);
      console.log('✅ Request finished');
    }
  };
 
 
 


  const handleReset = () => {
    setTitle('');
    setActive(true);
    setPriority(1);
    setDescription('');
    removeImage();
  };


 
 


  const handleGoBack = () => {
    if (isEditMode) {
        Cookies.remove('edit-category-data');
      }
    window.history.back();
  };


  return (
    <Box
      sx={{
        backgroundColor: '#000',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
     
      <Paper
        elevation={4}
        sx={{
          backgroundColor: '#121212',
          color: '#fff',
          p: 4,
          borderRadius: 3,
          maxWidth: 600,
          width: '100%',
          margin:5
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Add Products
        </Typography>


        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            error={!!errors.title}
            helperText={errors.title}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#111', // matches the screenshot
                color: '#fff',
              },
              '& .MuiInputBase-input': {
                color: '#fff',
                '&:-webkit-autofill': {
                  boxShadow: '0 0 0 1000px #111 inset',
                  WebkitTextFillColor: '#fff',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#aaa',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  // borderColor: '#333',
                },
                '&:hover fieldset': {
                  // borderColor: '#666',
                },
                '&.Mui-focused fieldset': {
                  // borderColor: '#888',
                },
              },
            }}
          />










          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="filled"
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#aaa' } }}
          />


            <Box
            sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                alignItems: isSmallScreen ? 'flex-start' : 'center',
                gap: 2,
            }}
            >
            <TextField
              label="Priority"
              type="number"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              required
              variant="filled"
              InputProps={{ style: { color: '#fff' } }}
              InputLabelProps={{ style: { color: '#aaa' } }}
            />


            <FormControlLabel
              control={
                <Checkbox
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  sx={{ color: '#2196f3' }}
                />
              }
              label="Active"
              sx={{ color: '#fff' }}
            />


           
          </Box>


          <Box
            sx={{
                border: '2px solid #2196f3',
                borderRadius: 2,
                p: 3,
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
            }}
            >
            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                Upload Image
            </Typography>


            {imagePreviewUrl && (
              <Image
                src={imagePreviewUrl}
                alt="Preview"
                width={120} // ✅ Must be prop, not in style
                height={120} // ✅ Must be prop, not in style
                unoptimized // ✅ Needed for blob: URLs
                style={{
                  objectFit: 'cover',
                  borderRadius: 6,
                }}
              />
            )}




            <Box
            sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >


            <Button
            variant="outlined"
            component="label"
            sx={{
                color: '#2196f3',
                borderColor: '#2196f3',
                '&:hover': { borderColor: '#42a5f5' },
            }}
            >
            Upload
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
            />
            </Button>


            {imageFile && (
            <Button variant="outlined" color="error" onClick={removeImage}>
                Delete
            </Button>
            )}
        </Box>
        {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
        </Box>




          <Button
            type="submit"
            variant="outlined"
          >
            {isEditMode ? 'Update' : 'Submit'}
          </Button>


          <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
            <Button variant="outlined" onClick={handleReset}>
              Reset Form
            </Button>
            <Button variant="outlined" onClick={handleGoBack}>
              Go Back
            </Button>
          </Box>
          {loading && <LinearProgress />}
        </Box>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};


export default TshirtCategoryForm;
