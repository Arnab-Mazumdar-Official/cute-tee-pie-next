'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardContent, CardMedia, Typography,
  Button, Box, Stack, Checkbox, FormControlLabel,
  TextField, MenuItem, IconButton, useMediaQuery,
  LinearProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';




type Product = {
    _id: string;
    title: string;
    image: string;
    createdOn: string;
    active: boolean;
  };
 


export default function ProductGrid() {
const router = useRouter();
const [productsData, setProductsData] = useState<Product[]>([]);
const [loading, setLoading] = useState(false);


  const [products, setProducts] = useState(
    productsData.map(product => ({ ...product, active: true }))
  );


  const [filters, setFilters] = useState({
    searchName: '',
    status: 'all',
    fromDate: '',
    toDate: ''
  });


  const [showCollections, setShowCollections] = useState(false);


  const isAbove716 = useMediaQuery('(min-width:716px)');


  const handleToggle = (index: number) => {
    const updated = [...products];
    updated[index].active = !updated[index].active;
    setProducts(updated);
  };


  const handleReset = () => {
    setFilters({
      searchName: '',
      status: 'all',
      fromDate: '',
      toDate: ''
    });
  };


  const handleShowCollections = async () => {
    setShowCollections(prev => !prev);


    if (!showCollections && products.length === 0) {
      try {
        setLoading(true);
        const res = await fetch('/api/collections-list');
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


  const handleAddCollections = () => {
    router.push('/admin-dashboard/add-collections');
  };


  const handleEdit = async (id:String) => {
    try {
        setLoading(true);
      const response = await fetch('/api/collection-data', {
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


      // Cookies.set('edit-category-data', JSON.stringify(data.data), { expires: 1 });
      const dataToStore = {
        payload: data.data,
        expiresAt: Date.now() + 30 * 1000, // current time + 30 sec
      };
      
      Cookies.set('edit-category-data', JSON.stringify(dataToStore));
      setLoading(false);
      router.push('/admin-dashboard/add-collections');
    } catch (error) {
        setLoading(false);
      console.error('Error fetching product:', error);
    }
  };
 
 


  const filteredProducts = products.filter(product => {
    const nameMatch = product.title.toLowerCase().includes(filters.searchName.toLowerCase());
    const statusMatch =
      filters.status === 'all' ||
      (filters.status === 'active' && product.active) ||
      (filters.status === 'inactive' && !product.active);


    const createdDate = new Date(product.createdOn);
    const fromDateMatch = filters.fromDate ? createdDate >= new Date(filters.fromDate) : true;
    const toDateMatch = filters.toDate ? createdDate <= new Date(filters.toDate) : true;


    return nameMatch && statusMatch && fromDateMatch && toDateMatch;
  });


  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
        {loading && <LinearProgress />}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            Our Collections
          </Typography>
        </Box>
      {/* Top Button Row */}
      <Stack
        direction={isAbove716 ? 'row' : 'column'}
        spacing={2}
        justifyContent="center"
        mb={3}
        alignItems="center"
      >
        <Button variant="outlined" onClick={() => router.push('/')}>
            Go To User Dashboard
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleAddCollections}>Add Collections</Button>
        <Button variant="outlined" onClick={handleShowCollections}>
          {showCollections ? 'Hide Collections' : 'Show Collections'}
        </Button>
      </Stack>


      {/* Filter Row 1 */}
      {showCollections && (
  <>
    {/* Filter Row 1 */}
    <Stack
      direction={isAbove716 ? 'row' : 'column'}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      mb={2}
    >
      <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        value={filters.searchName}
        onChange={(e) =>
          setFilters({ ...filters, searchName: e.target.value })
        }
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
        label="Status"
        variant="outlined"
        size="small"
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
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
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>
    </Stack>


    {/* Filter Row 2 */}
    <Stack
      direction={isAbove716 ? 'row' : 'column'}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      mb={4}
    >
      <TextField
        label="From Date"
        type="date"
        size="small"
        InputLabelProps={{ shrink: true }}
        value={filters.fromDate}
        onChange={(e) =>
          setFilters({ ...filters, fromDate: e.target.value })
        }
        sx={{ backgroundColor: 'white', minWidth: 250 }}
      />
      <TextField
        label="To Date"
        type="date"
        size="small"
        InputLabelProps={{ shrink: true }}
        value={filters.toDate}
        onChange={(e) =>
          setFilters({ ...filters, toDate: e.target.value })
        }
        sx={{ backgroundColor: 'white', minWidth: 250 }}
      />
    </Stack>


    {/* Reset Button */}
    <Box display="flex" justifyContent="center" mb={4}>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  </>
)}




      {/* Product Grid */}
      {showCollections && (
        <Grid container spacing={3} justifyContent="center">
        {filteredProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: 420, // reduced overall card height
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 3,
                boxShadow: 3
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: '#f0f0f0',
                  borderRadius: '50%',
                  padding: 0.8
                }}
              >
                <IconButton size="small" color="primary" onClick={() => handleEdit(product._id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
     
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ height: 280, objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, padding: '8px' }}> {/* reduced padding */}
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '0.9rem', // slightly smaller
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 0.5, fontSize: '0.75rem' }} // reduced margin and font size
                >
                  Created On: {product.createdOn}
                </Typography>
                <Box display="flex" justifyContent="center" mt={0.5}> {/* reduced margin */}
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
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
     
      )}
    </Box>
  );
}