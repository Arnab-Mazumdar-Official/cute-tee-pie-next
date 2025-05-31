'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardContent, CardMedia, Typography,
  Button, Box, Checkbox, FormControlLabel, TextField,
  MenuItem, Stack, IconButton, useMediaQuery,
  LinearProgress
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Cookies from 'js-cookie';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface Product {
  _id: string;
  title: string;
  image: string;
  createdOn: string;
  active: boolean;
  category: string;
  slug: string;
}

export default function ProductGrid() {
  const router = useRouter();
  const isAbove716 = useMediaQuery('(min-width:716px)');
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [products, setProducts] = useState<Product[]>(productsData);
  const [categoryName, setCategoryName] = useState('');
  const [productName, setProductName] = useState('');
  const [status, setStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleShowCollections = async () => {
    setShowFilters(prev => !prev);
  
  
      if (!showFilters && products.length === 0) {
        try {
          setLoading(true);
          const res = await fetch('/api/products-list');
          const data = await res.json();
          console.log("data------>>",data.data.category)
          setProductsData(data.data.category);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch products:', error);
          setLoading(false);
        }
      }
    };
  
  
    useEffect(() => {
      console.log('productsData:', productsData);
      setProducts(productsData.map(product => ({ ...product, active: true })));
    }, [productsData]);

  const handleToggle = (index: number) => {
    const updated = [...products];
    updated[index].active = !updated[index].active;
    setProducts(updated);
  };

  const handleReset = () => {
    setCategoryName('');
    setProductName('');
    setStatus('All');
    setFromDate(null);
    setToDate(null);
  };

  const handleEdit = async (id:String) => {
      try {
          setLoading(true);
        const response = await fetch('/api/produts-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        });
  
  
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
  
  
        const data = await response.json();
  
        const dataToStore = {
          payload: data.data,
          expiresAt: Date.now() + 30 * 1000, // current time + 30 sec
        };
        
        Cookies.set('edit-product-data', JSON.stringify(dataToStore));
        setLoading(false);
        router.push('/admin-dashboard/add-products');
      } catch (error) {
          setLoading(false);
        console.error('Error fetching product:', error);
      }
    };

    const handleClick = (productname: string) => {
      const route = `/blog/${productname}`;
      // const route = `/shop/${encodeURIComponent(productname)}`;
      // Cookies.set('lastViewedProduct', route);
      router.push(route);
    };

  const filteredProducts = products.filter(product => {
    const matchCategory = product.category.toLowerCase().includes(categoryName.toLowerCase());
    const matchName = product.title.toLowerCase().includes(productName.toLowerCase());
    const matchStatus = status === 'All' || (status === 'Active' ? product.active : !product.active);
    const matchFromDate = fromDate ? dayjs(product.createdOn).isSameOrAfter(fromDate, 'day') : true;
    const matchToDate = toDate ? dayjs(product.createdOn).isSameOrBefore(toDate, 'day') : true;
    return matchCategory && matchName && matchStatus && matchFromDate && matchToDate;
  });

  const groupedProducts = filteredProducts.reduce<{ [category: string]: Product[] }>((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {loading && <LinearProgress />}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <Typography variant="h4" fontWeight="bold">
                    Our Products
                  </Typography>
                </Box>
      <Stack
            direction={isAbove716 ? 'row' : 'column'}
            spacing={2}
            justifyContent="center"
            mb={3}
            alignItems="center"
          >
            <Button variant="outlined" color="primary" onClick={() => router.push('/')}>Go To Dashboard</Button>
            <Button variant="outlined" color="primary" onClick={() => router.push('/admin-dashboard/add-products')}>Add Products</Button>
          <Button 
            variant="outlined" 
            color={showFilters ? "secondary" : "primary"} 
            // onClick={() => setShowFilters(prev => !prev)} 
            onClick={handleShowCollections}
            sx={{ mb: 2 }}
          >
            {showFilters ? 'Hide Products' : 'Show Products'}
          </Button>
          </Stack>
        {showFilters && (
          <>
            <Stack direction={isAbove716 ? 'row' : 'column'} spacing={2} justifyContent="center" alignItems="center" mb={2}>
              <TextField
                label="Search by Category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                size="small"
                // sx={{ minWidth: 200 }}
                sx={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
              <TextField
                label="Search by Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                size="small"
                // sx={{ minWidth: 200 }}
                sx={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
              <TextField
                select
                value={status}
                label="Status"
                size="small"
                onChange={(e) => setStatus(e.target.value)}
                // sx={{ minWidth: 200 }}
                sx={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Stack>

            <Stack direction={isAbove716 ? 'row' : 'column'} spacing={2} justifyContent="center" alignItems="center" mb={4}>
              <TextField
                label="From Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                size="small"
                value={fromDate ? fromDate.format('YYYY-MM-DD') : ''}
                onChange={(e) => setFromDate(dayjs(e.target.value))}
                sx={{ backgroundColor: 'white', minWidth: 250 }}
                // sx={{ minWidth: 200 }}
              />
              <TextField
                label="To Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                size="small"
                value={toDate ? toDate.format('YYYY-MM-DD') : ''}
                onChange={(e) => setToDate(dayjs(e.target.value))}
                sx={{ backgroundColor: 'white', minWidth: 250 }}
                // sx={{ minWidth: 200 }}
              />
            </Stack>

            <Box display="flex" justifyContent="center" mb={4}>
              <Button variant="outlined" onClick={handleReset}>Reset</Button>
            </Box>
          

        <Grid container spacing={4}>
          {Object.entries(groupedProducts).map(([category, productsInCategory]) => (
            <Grid item xs={12} key={category}>
              <Box
                sx={{
                  backgroundColor: '#3f083f',
                  borderRadius: 2,
                  padding: 2,
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="white">
                  {category}
                </Typography>
              </Box>

              <Grid container spacing={3} justifyContent="center">
                {productsInCategory.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card sx={{ position: 'relative', height: 350, width: '100%', display: 'flex', flexDirection: 'column' }}>
                      <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: '#fff' }}
                        onClick={() => handleEdit(product._id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <CardMedia
                        component="img"
                        alt={product.title}
                        image={product.image}
                        sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">{product.title}</Typography>
                          <Typography variant="body2" color="text.secondary">Created On: {product.createdOn}</Typography>
                        </Box>
                        <Box>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={product.active}
                                onChange={() => handleToggle(index)}
                                color="primary"
                                size="small" // smaller checkbox
                              />
                            }
                            label={product.active ? 'Active' : 'Inactive'}
                            sx={{ '.MuiFormControlLabel-label': { fontSize: '0.75rem' } }} // smaller label text
                          />
                          <Button variant="outlined" size="small" fullWidth sx={{ mt: '0 !important' , mb: 3 }} onClick={() => handleClick(product.slug)}>View</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
          
        </Grid>
        </>
        )}
      </Box>
    </LocalizationProvider>
  );
}