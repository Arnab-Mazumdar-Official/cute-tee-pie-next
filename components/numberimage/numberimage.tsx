import React from 'react';
import { Box, Typography, IconButton, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';



const products = [
  {
    id: 1,
    title: 'Muscle Hustle',
    category: 'Adventure Fit',
    price: '₹ 1299',
    path:"/blog/muscle-hustle",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/3cf60248-a2f2-4467-98e4-9dcc76c2b95e.jpg',
  },
  {
    id: 2,
    title: 'Geometric Escape',
    category: 'Minimalist Vibes',
    price: '₹ 1299',
    path:"/blog/geometric-escape",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/e1df5ee4-d3b6-4719-a561-4843b9751273.jpg',
  },
  {
    id: 3,
    title: 'Muscle Hustle',
    category: 'Adventure Fit',
    price: '₹ 1299',
    path:"/blog/muscle-hustle",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/f14a631b-4e13-40d6-b061-5d2c7e1b43e0.jpg',
  },
  {
    id: 4,
    title: 'Mountain Sketch',
    category: 'Minimalist Vibes',
    price: '₹ 1299',
    path:"/blog/mountain-sketch",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/63d5ad1f-9475-4a9c-b165-1ff0ead8da6c.jpg',
  },
  {
    id: 5,
    title: 'Muscle Hustle',
    category: 'Adventure Fit',
    price: '₹ 1299',
    path:"/blog/muscle-hustle",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/60eabcd1-4721-46bc-93a2-0543e3a7370c.jpg',
  },
  {
    id: 6,
    title: 'Calorie Burn',
    category: 'T-Shirts',
    price: '₹ 1299',
    path:"/blog/calorie-burn",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/c2447542-cc5e-49c2-b1bf-a8157f6fc932.jpg',
  },
  {
    id: 7,
    title: 'Overthinking Mode',
    category: 'T-Shirts',
    price: '₹ 1299',
    path:"/blog/overthinking-mode",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/27cd182e-5721-4250-909d-99ad52ad299a.jpg',
  },
  {
    id: 8,
    title: 'Muscle Hustle',
    category: 'Adventure Fit',
    price: '₹ 999',
    path:"/blog/muscle-hustle",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/c626c3b1-f2e0-4740-8ebb-b7c0934e1822.jpg',
  },
  {
    id: 9,
    title: 'Road Legend',
    category: 'Pants',
    price: '₹ 1699',
    path:"/blog/road-legend",
    image:"https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/17121ad2-3951-451e-a341-b047a69ea58f.jpg"
  },
  {
    id: 10,
    title: 'Road Legend',
    category: 'Joggers',
    price: '₹ 1299',
    path:"/blog/road-legend",
    image: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/9e6c0d03-8946-4407-97e9-fd96f7470e82.jpg',
  },
];

const ScrollableProductCarousel = () => {
  const containerRef = React.useRef();
  const theme = useTheme();
  const router = useRouter();

  const isDarkMode = theme.palette.mode === 'dark';
const textColor = isDarkMode ? '#fff' : '#000';
const borderColor = isDarkMode ? '#555' : '#ccc';

  const scroll = (direction) => {
    const { current } = containerRef;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: 4, mt: 2 }}
            >
            <Typography variant="h5" fontWeight="bold">
                Fitness Freak
            </Typography>

            <Button
                size="small"
                onClick={() => router.push('/products')}
                sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '0.85rem',
                color: textColor,
                border: `2px solid ${borderColor}`,
                borderRadius: 4,
                px: 2,
                py: 0.5,
                width: '180px',
                '&:hover': {
                    backgroundColor: isDarkMode ? '#222' : '#eee',
                    color: '#d32f2f',
                    borderColor: '#d32f2f',
                },
                }}
            >
                Show More
            </Button>
            </Box>
    
    <Box position="relative" sx={{ overflow: 'hidden', px: 4 }}>
        
      <IconButton
        onClick={() => scroll('left')}
        sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 2, transform: 'translateY(-50%)' }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        ref={containerRef}
        display="flex"
        gap={4}
        overflow="auto"
        sx={{
            scrollBehavior: 'smooth',
            py: 4,
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari
            },
        }}
        >
        {products.map((product) => (
         <Card
            key={product.id}
            sx={(theme) => ({
                minWidth: '250px',
                borderRadius: 4,
                boxShadow: 4,
                backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                [theme.breakpoints.down(471)]: {
                minWidth: '56.666vw', // 100vw / 1.5 => fits 1 full + half card in view
                },
            })}
            onClick={() => router.push(product.path)}
            >
            <Box position="relative">
              <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={(theme) => ({
                    objectFit: 'cover',
                    height: '311px',
                    [theme.breakpoints.down('sm')]: {
                        height: '185px',
                    },
                    })}
                />
              <Typography
                variant="h2"
                color="text.secondary"
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  fontSize: 60,
                  fontWeight: 600,
                  opacity: 0.2,
                }}
              >
                {product.id}
              </Typography>
            </Box>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>
              {/* <Typography variant="body1" fontWeight="bold" mt={1}>
                {product.price}
              </Typography> */}
            </CardContent>
          </Card>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll('right')}
        sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 2, transform: 'translateY(-50%)' }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
    </Box>
  );
};

export default ScrollableProductCarousel;
