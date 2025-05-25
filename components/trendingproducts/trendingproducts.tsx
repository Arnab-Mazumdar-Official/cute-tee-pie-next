'use client';

import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import Skeleton from '@mui/material/Skeleton';

const fetchProducts = async ({ pageParam = 0 }) => {
  const res = await fetch(`/api/user-product-list?page=${pageParam}&limit=6`);
  const data = await res.json();

  const products = data.data.category.slice(0, 6);
  const hasMore = products.length === 6;  // If less than 6 returned, no more products

  return {
    products,
    hasMore,
  };
};

export default function ProductList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length : undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const { ref, inView } = useInView();
  const router = useRouter();
  const throttleRef = useRef(false);

  const handleClick = (productname: string) => {
    const route = `/blog/${productname}`;
    router.push(route);
  };

  useEffect(() => {
    if (inView && hasNextPage && !throttleRef.current) {
      fetchNextPage();
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, 1000); // throttle: max 1 fetch per second
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Explore More To Set Your Wardrobe</h2>
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

        @media (min-width: 1232px) {
          .product-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }

        @media (max-width: 1231px) and (min-width: 577px) {
          .product-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }

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
