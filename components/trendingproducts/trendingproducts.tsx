'use client';

import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/navigation';

const fetchProducts = async ({ pageParam = 0 }) => {
  const res = await fetch(`/api/user-product-list?page=${pageParam}&limit=6`);
  const data = await res.json();
  return {
    products: data.data.category.slice(0, 6),
    hasMore: data.data.category.length === 6,
  };
};

export default function ProductList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
  });

  const { ref, inView } = useInView();
  const router = useRouter();

  const handleClick = (productname: string) => {
      const route = `/blog/${productname}`;
      router.push(route);
    };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap(page => page.products) ?? [];

  return (
    <div style={styles.container}>
        <h2 style={styles.heading}>Our Best Selling T-Shirt</h2>
        <div style={styles.gridContainer} className="product-grid">
          {status === 'loading'
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} style={styles.card}>
                  <div className="image-border">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={0}
                      sx={{ paddingTop: '100%' }}
                    />
                  </div>
                  <Skeleton variant="text" width="80%" height={30} />
                </div>
              ))
            : allProducts.map((product, idx) => (
                <div
                  onClick={() => handleClick(product.slug)}
                  key={idx}
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  <div style={styles.card}>
                    <div className="image-border">
                      <div style={styles.imageWrapper}>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={styles.image}
                        />
                      </div>
                    </div>
                    <div style={styles.title}>{product.title}</div>
                  </div>
                </div>
              ))}
          {hasNextPage && (
            <div ref={ref} style={{ width: '100%' }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={0}
                sx={{ paddingTop: '100%' }}
              />
            </div>
          )}
        </div>

        {/* Theme & Responsive Grid Styles */}
        <style jsx>{`
          .image-border {
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid black;
          }

          body.dark .image-border {
            border: 2px solid white;
          }

          body.dark {
            background-color: black;
            color: white;
          }

          body:not(.dark) {
            background-color: white;
            color: black;
          }

          .product-grid {
            display: grid;
            gap: 32px;
            padding: 0 20px;
          }

          /* 6 columns for large screens */
          @media (min-width: 1232px) {
            .product-grid {
              grid-template-columns: repeat(6, 1fr);
            }
          }

          /* Auto-fit for mid-range screens */
          @media (max-width: 1231px) and (min-width: 577px) {
            .product-grid {
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
          }

          /* 2 columns minimum on small screens */
          @media (max-width: 576px) {
            .product-grid {
              grid-template-columns: repeat(2, minmax(45%, 1fr));
            }
          }
        `}</style>
      </div>

  );
}

const styles = {
  container: {
    padding: '40px 20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  gridContainer: {
    display: 'grid',
    gap: '32px',
    // maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    cursor: 'pointer',
  },
  imageWrapper: {
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  title: {
    marginTop: '12px',
    fontSize: '1.1rem',
    fontWeight: 600,
    textAlign: 'center',
  },
};

