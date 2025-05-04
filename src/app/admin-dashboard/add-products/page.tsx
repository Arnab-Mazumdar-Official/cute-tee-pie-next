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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Autocomplete } from '@mui/material';


const TshirtCategoryForm = () => {
    interface CollectionOption {
        label: string;
        value: string;
      }
      
  const [collectionOptions, setCollectionOptions] = useState<CollectionOption[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  

  const [isEditMode, setIsEditMode] = useState(false);
  const [collection, setCollection] = useState<string>('');

  const [product_id, setProductId] = useState(null);
  const [title, setTitle] = useState('');
  const [active, setActive] = useState(true);
  const [priority, setPriority] = useState(1);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:454px)');
  const [errors, setErrors] = useState({ title: '', active: '', priority: '', image: '' });
  const tshirtTypes = ['Men Round Neck Half Sleev', 'Female Round Neck Half Sleev', 'Uinsex Over Size T-Shirts', 'Work Ware Polo', 'Round Neck Full Sleev T-Shirts','Sweatshirt','Hoodie'];

  useEffect(() => {
    const controller = new AbortController();
  
    async function init() {
      // 1) FETCH COLLECTIONS
      try {
        const res = await fetch('/api/get-collections', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  
        const data = await res.json();
        if (data.success && Array.isArray(data.collections)) {
          const options: CollectionOption[] = data.collections.map((item: any) => ({
            label: item.label,
            value: item.value,
          }));
          setCollectionOptions(options);
        } else {
          console.warn('Unexpected collections payload', data);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching collections:', err);
        }
      }
  
      // 2) INITIALIZE EDIT MODE FROM COOKIE
      const stored = Cookies.get('edit-product-data');
      console.log("Stored:::::",stored);
      
      if (stored) {
        try {
          const category = JSON.parse(stored);
          console.log("category:::::",category);
          setIsEditMode(true);
          setProductId(category.payload._id);
          setTitle(category.payload.title);
          setActive(category.payload.active ?? false);
          setPriority(category.payload.priority);
          setDescription(category.payload.description);
          setType(category.payload.type);
          setPrice(category.payload.price);
          setSizes(category.payload.sizes ?? []);
          setColors(category.payload.colors ?? []);
          setCollection(category.payload.collectionId ?? '');
          if (Array.isArray(category.payload.image_urls) && category.payload.image_urls.length > 0) {
            setImagePreviews(category.payload.image_urls);
            setImageFiles(category.payload.image_urls);
            setThumbnailIndex(0);
          }
        } catch (err) {
          console.error('Failed to parse edit-product-data cookie:', err);
        }
      }
    }
  
    init();
  
    return () => {
      controller.abort();
    };
  }, []);
  

const handleGoBack = () => {
    if (isEditMode) {
        Cookies.remove('edit-product-data');
      }
    window.history.back();
  };

  const handleReset = () => {
    setTitle('');
    setActive(true);
    setPriority(1);
    setDescription('');
    setType('');
    setPrice('');
    setSizes([]);
    setColors([]);
    setCollection('');
    setImageFiles([]);
    setImagePreviews([]);
    setThumbnailIndex(0);
    setErrors({ title: '', active: '', priority: '', image: '' });
  };
  

  const allSizes = ['Ex','S', 'M', 'L', 'XL','2XL','3Xl','4XL','5XL','6XL'];
  const allColors = ['Red','Cherry Red',"Maroon", 'Black', 'White', 'Gray','Beige','Royal Blue',"Navy Blue","Durcoise Blue","Olive green","Army Green","Bottle Green","Mastered Yellow", 'Yellow'];


  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files ?? []) as File[];
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    if (imagePreviews.length === 0) setThumbnailIndex(0);
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    if (index === thumbnailIndex) setThumbnailIndex(0);
  };

const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const newErrors = {
      title: title.trim() === '' ? 'Title is required' : '',
      active: active === null ? 'Status is required' : '',
      priority: priority === null || isNaN(priority) ? 'Priority is required' : '',
      image: imageFiles.length === 0 && !isEditMode ? 'At least one image is required' : '',
    };
    setErrors(newErrors);
  
    if (Object.values(newErrors).some((err) => err)) return;
  
    const formData = new FormData();
  
    formData.append('title', title);
    formData.append('description', description);
    formData.append('active', String(active));
    formData.append('priority', String(priority));
    formData.append('type', type);
    formData.append('price', price);
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('colors', JSON.stringify(colors));
    formData.append('thumbnailIndex', String(thumbnailIndex));
  
    // 👉 Ensure collection is an ID
    if (collection) {
      formData.append('collectionId', collection); // renamed to `collectionId` to reflect that it's an ID
    }
  
    imageFiles.forEach((file) => {
      formData.append('images[]', file);
    });
  
    if (isEditMode && product_id) {
      formData.append('_id', product_id);
    }
  
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(key, value);
    });
  
    setLoading(true);
  
    try {
      const res = await fetch('/api/add-products', {
        method: 'POST',
        body: formData,
      });
  
      const text = await res.text();
      const result = text ? JSON.parse(text) : {};
  
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Server error');
      }
  
      setSnackbar({
        open: true,
        message: isEditMode ? 'Updated successfully!' : 'Created successfully!',
        severity: 'success',
      });
      if (isEditMode) Cookies.remove('edit-product-data');
      if (!isEditMode) {
        setTitle('');
        setDescription('');
        setActive(true);
        setPriority(1);
        setType('');
        setPrice('');
        setSizes([]);
        setColors([]);
        setImageFiles([]);
        setImagePreviews([]);
        setThumbnailIndex(0);
        setCollection('');
      }
  
      setTimeout(() => (window.location.href = '/admin-dashboard/products'), 1000);
    } catch (err) {
      setSnackbar({ open: true, message: 'Something went wrong', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  interface CollectionOption {
    label: string;
    value: string;
  }
  
  

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
      <Paper sx={{ backgroundColor: '#121212', color: '#fff', p: 4, borderRadius: 3, maxWidth: 600, width: '100%' }}>
        <Typography variant="h5" align="center" sx={{mb:3}}>{isEditMode ? 'Edit' : 'Add'} Product</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
          <TextField label="Description" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#aaa' } }} />
          <Autocomplete<CollectionOption>
                        fullWidth
                        options={collectionOptions}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        value={collectionOptions.find((opt) => opt.value === collection) || null}
                        onChange={(_, newValue) => setCollection(newValue ? newValue.value : '')}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Collection"
                            variant="filled"
                            InputProps={{ ...params.InputProps, style: { color: '#fff' } }}
                            InputLabelProps={{ style: { color: '#aaa' } }}
                            />
                        )}
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
                <TextField
                    label="T-Shirt Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    select
                    fullWidth
                    variant="filled"
                    InputProps={{ style: { color: '#fff' } }}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    >
                    {tshirtTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField>

          <TextField label="Price (INR)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#aaa' } }} />
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#aaa' }}>Size</InputLabel>
            <Select multiple value={sizes} onChange={(e) => setSizes(e.target.value as string[])} renderValue={(selected) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
    {selected.map((value) => (
      <Chip
        key={value}
        label={value}
        sx={{ color: '#fff', backgroundColor: '#333' }} // white text, dark background
      />
    ))}
  </Box>
)}
 sx={{ color: '#fff' }}>
              {allSizes.map((size) => <MenuItem key={size} value={size}>{size}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#aaa' }}>Color</InputLabel>
            <Select multiple value={colors} onChange={(e) => setColors(e.target.value as string[])} renderValue={(selected) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
    {selected.map((value) => (
      <Chip
        key={value}
        label={value}
        sx={{ color: '#fff', backgroundColor: '#333' }} // white text, dark background
      />
    ))}
  </Box>
)}
 sx={{ color: '#fff' }}>
              {allColors.map((color) => <MenuItem key={color} value={color}>{color}</MenuItem>)}
            </Select>
          </FormControl>
          <Box sx={{ border: '1px solid #2196f3', p: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>Upload Images</Typography>
            <Button component="label" variant="outlined" sx={{ mt: 1 }}>
              Select Images
              <input hidden type="file" accept="image/*" multiple onChange={handleImageChange} />
            </Button>
            {imagePreviews.length > 0 && (
              <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                {imagePreviews.map((src, index) => (
                  <Box key={index} sx={{ position: 'relative', textAlign: 'center' }}>
                    <Image
                      src={src}
                      alt={`img-${index}`}
                      width={80}
                      height={80}
                      unoptimized
                      style={{
                        border: index === thumbnailIndex ? '2px solid #00e676' : '1px solid #999',
                        borderRadius: 6,
                        cursor: 'pointer',
                      }}
                      onClick={() => setThumbnailIndex(index)}
                    />
                    <IconButton
                      onClick={() => removeImage(index)}
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#fff' }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                    {index === thumbnailIndex && (
                      <Typography variant="caption" sx={{ color: '#00e676', mt: 0.5 }}>Thumbnail</Typography>
                    )}
                  </Box>
                ))}
              </Box>
            )}
            {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
          </Box>
          <Button type="submit" variant="outlined">{isEditMode ? 'Update' : 'Submit'}</Button>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
                    <Button variant="outlined" onClick={handleReset}>
                      Reset Form
                    </Button>
                    <Button variant="outlined" onClick={handleGoBack}>
                      Go Back
                    </Button>
                  </Box>
        {loading && <LinearProgress sx={{ mt: 2 }} />}
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} variant="filled">{snackbar.message}</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default TshirtCategoryForm;
