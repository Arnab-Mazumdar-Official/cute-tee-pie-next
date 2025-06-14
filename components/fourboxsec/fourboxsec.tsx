import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Zap,
  Star,
  TrendingUp,
  Gift,
  Crown,
  Sparkles,
  Heart,
} from 'lucide-react';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

const AnimatedProductSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.palette.mode === 'dark';
  const [pulseAnimation, setPulseAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (path: string) => {
    router.push(path);
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

  const textColor = isDark ? '#ffffff' : '#1f2937';
  const bgColor = isDark ? '#000000' : '#ffffff';
  const cardTextColor = isDark ? '#f8fafc' : '#ffffff';
  const cardDescColor = isDark
    ? 'rgba(248, 250, 252, 0.9)'
    : 'rgba(255, 255, 255, 0.9)';

  const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundColor: bgColor,
      padding: '64px 16px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: textColor,
      transition: 'all 0.3s ease',
    },
    backgroundElements: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    floatingParticle: {
      position: 'absolute',
      borderRadius: '50%',
      opacity: isDark ? 0.4 : 0.6,
    },
    particle1: {
      top: 40,
      left: 40,
      width: 12,
      height: 12,
      background: isDark
        ? 'linear-gradient(45deg, #7c3aed, #be185d)'
        : 'linear-gradient(45deg, #9C27B0, #E91E63)',
      animation: 'float 3s ease-in-out infinite',
    },
    particle2: {
      top: 128,
      right: 80,
      width: 8,
      height: 8,
      background: isDark
        ? 'linear-gradient(45deg, #1e40af, #0891b2)'
        : 'linear-gradient(45deg, #2196F3, #00BCD4)',
      animation: 'pulse 2s infinite 0.5s',
    },
    particle3: {
      bottom: 80,
      left: 128,
      width: 16,
      height: 16,
      background: isDark
        ? 'linear-gradient(45deg, #166534, #65a30d)'
        : 'linear-gradient(45deg, #4CAF50, #8BC34A)',
      animation: 'bounce 2s infinite 1s',
    },
    particle4: {
      top: '50%',
      right: 40,
      width: 12,
      height: 12,
      background: isDark
        ? 'linear-gradient(45deg, #ea580c, #dc2626)'
        : 'linear-gradient(45deg, #FF9800, #FF5722)',
      animation: 'pulse 2s infinite 2s',
    },
    gradientOrb1: {
      position: 'absolute',
      top: 0,
      left: '25%',
      width: 384,
      height: 384,
      background: isDark
        ? 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(190, 24, 93, 0.15) 100%)'
        : 'radial-gradient(circle, rgba(156, 39, 176, 0.2) 0%, rgba(233, 30, 99, 0.2) 100%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 6s infinite',
    },
    gradientOrb2: {
      position: 'absolute',
      bottom: 0,
      right: '25%',
      width: 320,
      height: 320,
      background: isDark
        ? 'radial-gradient(circle, rgba(30, 64, 175, 0.15) 0%, rgba(8, 145, 178, 0.15) 100%)'
        : 'radial-gradient(circle, rgba(33, 150, 243, 0.2) 0%, rgba(0, 188, 212, 0.2) 100%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 6s infinite 3s',
    },
    headerContainer: {
      textAlign: 'center',
      marginBottom: 64,
      position: 'relative',
      zIndex: 10,
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      flexWrap: 'wrap',
    },
    mainTitle: {
      fontSize: '4rem',
      fontWeight: 900,
      // background: isDark
      //   ? 'linear-gradient(45deg, #a78bfa, #f472b6, #60a5fa)'
      //   : 'linear-gradient(45deg, #9C27B0, #E91E63, #2196F3)',
      // backgroundClip: 'text',
      // WebkitBackgroundClip: 'text',
      // WebkitTextFillColor: 'transparent',
      margin: '0 16px',
      lineHeight: 1.2,
    },
    spinningIcon: {
      animation: 'spin 2s linear infinite',
    },
    liveCounterContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      marginBottom: 32,
      flexWrap: 'wrap',
    },
    chip: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 16px',
      borderRadius: '25px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1rem',
      border: 'none',
      cursor: 'default',
    },
    liveShoppingChip: {
      background: isDark
        ? 'linear-gradient(45deg, #dc2626, #991b1b)'
        : 'linear-gradient(45deg, #FF7043, #D32F2F)',
      animation: 'pulse 2s infinite',
    },
    megaSaleChip: {
      background: isDark
        ? 'linear-gradient(45deg, #7c3aed, #3730a3)'
        : 'linear-gradient(45deg, #9C27B0, #3F51B5)',
      animation: 'bounce 2s infinite',
    },
    pingDot: {
      width: 8,
      height: 8,
      backgroundColor: '#FF7043',
      borderRadius: '50%',
      marginRight: 8,
      animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
      gap: 32,
      maxWidth: 1400,
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
    },
    card: {
      borderRadius: 16,
      minHeight: 350,
      position: 'relative',
      overflow: 'visible',
      border: isDark
        ? '1px solid rgba(148, 163, 184, 0.2)'
        : '1px solid rgba(255,255,255,0.1)',
      cursor: 'pointer',
      transition: 'none',
      boxShadow: isDark
        ? '0 10px 25px rgba(0,0,0,0.5)'
        : '0 10px 25px rgba(0,0,0,0.15)',
    },
    discountBadge: {
      position: 'absolute',
      top: -8,
      left: 16,
      zIndex: 30,
      backgroundColor: '#FFD700',
      color: '#000',
      fontWeight: 900,
      fontSize: '0.875rem',
      padding: '4px 12px',
      borderRadius: '12px',
      transition: 'transform 0.3s ease',
    },
    urgencyBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 30,
      backgroundColor: '#F44336',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.75rem',
      padding: '4px 8px',
      borderRadius: '12px',
      animation: 'bounce 2s infinite',
    },
    iconBubble: {
      position: 'absolute',
      top: -16,
      right: -16,
      width: 64,
      height: 64,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(0,0,0,0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: isDark
        ? '2px solid rgba(148, 163, 184, 0.3)'
        : '2px solid rgba(255,255,255,0.2)',
      transition: 'none',
    },
    cardContent: {
      padding: 32,
      height: '100%',
    },
    cardInner: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      height: '100%',
    },
    imageContainer: {
      position: 'relative',
    },
    imageOverlay: {
      position: 'absolute',
      inset: 0,
      background: isDark
        ? 'linear-gradient(to top, rgba(15, 23, 42, 0.7), transparent)'
        : 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
      borderRadius: 8,
      zIndex: 10,
    },
    productImage: {
      width: 200,
      height: 280,
      objectFit: 'cover',
      borderRadius: 8,
      border: isDark
        ? '2px solid rgba(148, 163, 184, 0.4)'
        : '2px solid rgba(255,255,255,0.3)',
      transition: 'none',
      boxShadow: isDark
        ? '0 10px 25px rgba(0,0,0,0.6)'
        : '0 10px 25px rgba(0,0,0,0.2)',
    },
    ratingContainer: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      zIndex: 20,
      display: 'flex',
      gap: 2,
    },
    star: {
      color: '#FFD700',
      width: 16,
      height: 16,
    },
    contentSection: {
      flex: 1,
      textAlign: 'left',
    },
    cardTitle: {
      fontSize: '2rem',
      fontWeight: 900,
      color: cardTextColor,
      marginBottom: 16,
      transition: 'none',
    },
    cardDescription: {
      color: cardDescColor,
      fontSize: '1.125rem',
      lineHeight: 1.6,
      marginBottom: 24,
      transition: 'none',
    },
    shopButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: isDark
        ? 'linear-gradient(45deg, #7c3aed 30%, #be185d 90%)'
        : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 'none',
      borderRadius: 25,
      boxShadow: isDark
        ? '0 3px 5px 2px rgba(124, 58, 237, .3)'
        : '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      padding: '12px 32px',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      cursor: 'pointer',
      transition: 'none',
    },
    bottomCTA: {
      textAlign: 'center',
      marginTop: 64,
      position: 'relative',
      zIndex: 10,
    },
    ctaChip: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      background: isDark
        ? 'linear-gradient(45deg, #7c3aed, #be185d)'
        : 'linear-gradient(45deg, #9C27B0, #E91E63)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      padding: '16px 32px',
      borderRadius: '25px',
      boxShadow: isDark
        ? '0 10px 25px rgba(0,0,0,0.6)'
        : '0 10px 25px rgba(0,0,0,0.2)',
      animation: 'pulse 2s infinite',
      border: 'none',
      cursor: 'pointer',
    },
    themeToggle: {
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 1000,
      background: isDark ? '#374151' : '#f3f4f6',
      color: isDark ? '#ffffff' : '#1f2937',
      border: 'none',
      borderRadius: '50%',
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
  };

  const keyframes = `
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translateY(0);
      }
      40%, 43% {
        transform: translateY(-10px);
      }
      70% {
        transform: translateY(-5px);
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @media (max-width: 768px) {
      .cards-grid {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
      }
      .card-inner {
        flex-direction: column !important;
        text-align: center !important;
      }
      .product-image {
        width: 250px !important;
        height: 300px !important;
      }
      .main-title {
        font-size: 2.5rem !important;
      }
      .live-counter-container {
        flex-direction: column !important;
        gap: 16px !important;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Theme Toggle Button */}
        {/* <button 
          style={styles.themeToggle}
          onClick={() => setIsDark(!isDark)}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button> */}

        {/* Animated Background Elements */}
        <div style={styles.backgroundElements}>
          {/* Floating Particles */}
          <div
            style={{ ...styles.floatingParticle, ...styles.particle1 }}
          ></div>
          <div
            style={{ ...styles.floatingParticle, ...styles.particle2 }}
          ></div>
          <div
            style={{ ...styles.floatingParticle, ...styles.particle3 }}
          ></div>
          <div
            style={{ ...styles.floatingParticle, ...styles.particle4 }}
          ></div>

          {/* Gradient Orbs */}
          <div style={styles.gradientOrb1}></div>
          <div style={styles.gradientOrb2}></div>
        </div>

        {/* Header Section */}
        <div style={styles.headerContainer}>
          <div style={styles.titleContainer}>
            <div style={styles.spinningIcon}>
              <Sparkles style={{ color: '#FFD700', width: 32, height: 32 }} />
            </div>
            <h2 style={styles.mainTitle} className="main-title">
              Our Product Types
            </h2>
            <div style={styles.spinningIcon}>
              <Sparkles style={{ color: '#FFD700', width: 32, height: 32 }} />
            </div>
          </div>

          {/* Live Counter Animation */}
          <div
            style={styles.liveCounterContainer}
            className="live-counter-container"
          >
            <div style={{ ...styles.chip, ...styles.liveShoppingChip }}>
              <div style={styles.pingDot}></div>
              <span>1,247 people shopping now</span>
            </div>
            <div style={{ ...styles.chip, ...styles.megaSaleChip }}>
              <Zap style={{ width: 16, height: 16, marginRight: 8 }} />
              <span>Mega Sale - Limited Time!</span>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={styles.cardsGrid} className="cards-grid">
          {cardData.map((card, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                backgroundColor: card.bgColor,
              }}
            >
              {/* Discount Badge */}
              <div
                style={{
                  ...styles.discountBadge,
                  transform:
                    pulseAnimation === index ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {card.discount}
              </div>

              {/* Urgency Badge */}
              <div style={styles.urgencyBadge}>{card.urgencyText}</div>

              {/* Icon Bubble */}
              <div style={styles.iconBubble}>{card.icon}</div>

              <div style={styles.cardContent}>
                <div style={styles.cardInner} className="card-inner">
                  {/* Image Section */}
                  <div style={styles.imageContainer}>
                    <div style={styles.imageOverlay}></div>
                    <img
                      src={card.image}
                      alt={card.title}
                      style={styles.productImage}
                      className="product-image"
                    />
                    <div style={styles.ratingContainer}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} style={styles.star} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div style={styles.contentSection}>
                    <h3 style={styles.cardTitle}>{card.title}</h3>
                    <p style={styles.cardDescription}>{card.description}</p>

                    <button style={styles.shopButton} onClick={() => navigate(card.path)}>
                      <ShoppingBag style={{ width: 20, height: 20 }} />
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div style={styles.bottomCTA}>
          <button style={styles.ctaChip}>
            <Zap style={{ width: 24, height: 24 }} />
            <span>Limited Time - Shop All Categories!</span>
            <Zap style={{ width: 24, height: 24 }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AnimatedProductSection;
