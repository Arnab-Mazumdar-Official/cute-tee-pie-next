import React, { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Star,
  TrendingUp,
  Gift,
  Crown,
  Heart,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material';

const FormalProductSection = () => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const navigate = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  const cardData = [
    {
      title: 'Unisex Over Size T-Shirts',
      description:
        'Comfortable and stylish oversized T-shirts suitable for everyone. Perfect for a relaxed and trendy look.',
      icon: <Crown style={{ color: '#FFD700', width: 24, height: 24 }} />,
      image: 'types/vcezkoaARs6PaWFpQeRVew.jpg',
      path: '/products-by-type/Uinsex_Over_Size_T-Shirts',
      bgColor: isDark ? '#1a365d' : '#2B65EC',
      discount: '30% OFF',
      urgencyText: 'SALE',
    },
    {
      title: 'Female Round Neck Half Sleeve',
      description:
        'Elegantly crafted for women, these half sleeve round neck tees blend comfort with contemporary fashion.',
      icon: <TrendingUp style={{ color: '#4CAF50', width: 24, height: 24 }} />,
      image: 'types/6OUSsqLETD2tv36Rj1755Q.jpg',
      path: '/products-by-type/Female_Round_Neck_Half_Sleeve',
      bgColor: isDark ? '#702459' : '#E75480',
      discount: '25% OFF',
      urgencyText: 'HOT',
    },
    {
      title: 'Work Wear Polo',
      description:
        'Durable and smart polo shirts ideal for professional or industrial work environments.',
      icon: <Gift style={{ color: '#E91E63', width: 24, height: 24 }} />,
      image: 'types/sXgLH7-xRTK-L3X_Fd45vg.jpg',
      path: '/products-by-type/Work_Ware_Polo',
      bgColor: isDark ? '#2d5016' : '#3CB371',
      discount: '20% OFF',
      urgencyText: 'NEW',
    },
    {
      title: 'Men Round Neck Half Sleeve',
      description:
        'Classic and versatile round neck tees for men. A wardrobe essential for any occasion.',
      icon: <Heart style={{ color: '#F44336', width: 24, height: 24 }} />,
      image: 'types/BVMGg-POTB6mjHYpZKwEdg.webp',
      path: '/products-by-type/Men_Round_Neck_Half_Sleeve',
      bgColor: isDark ? '#7c2d12' : '#FFA500',
      discount: '35% OFF',
      urgencyText: 'DEAL',
    },
  ];

  const textColor = isDark ? '#ffffff' : '#000000';
  const bgColor = isDark ? '#000000' : '#ffffff';
  const borderColor = isDark ? '#ffffff' : '#000000';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: bgColor,
        padding: '64px 16px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        color: textColor,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Our Product Types
        </h2>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(600px, 100%), 1fr))',
          gap: '32px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {cardData.map((card, index) => (
          <div
            key={index}
            style={{
              borderRadius: '8px',
              minHeight: '350px',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: card.bgColor,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            }}
          >
            {/* Discount Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: '#FFD700',
                color: '#000',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '4px 12px',
                borderRadius: '4px',
                zIndex: 30,
              }}
            >
              {card.discount}
            </div>

            {/* Urgency Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: '#F44336',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '4px',
                zIndex: 30,
              }}
            >
              {card.urgencyText}
            </div>

            <div style={{ padding: '32px', height: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                  gap: '24px',
                  textAlign: isMobile ? 'center' : 'left',
                  height: '100%',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative' }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: isMobile ? '250px' : '200px',
                      height: isMobile ? '300px' : '280px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      display: 'flex',
                      gap: '2px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        style={{
                          color: '#FFD700',
                          width: '16px',
                          height: '16px',
                        }}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isCompact ? 'center' : 'flex-start',
                    textAlign: isCompact ? 'center' : 'left',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      marginBottom: '16px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                      maxWidth: '400px',
                    }}
                  >
                    {card.description}
                  </p>

                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'transparent',
                      border: '1px solid #ffffff',
                      borderRadius: '4px',
                      color: '#ffffff',
                      padding: '12px 24px',
                      fontWeight: '500',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease, color 0.2s ease',
                    }}
                    onClick={() => navigate(card.path)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#ffffff';
                    }}
                  >
                    <ShoppingBag style={{ width: '18px', height: '18px' }} />
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormalProductSection;
