'use client';

import { useRef } from 'react';
import Link from 'next/link';

const PRODUCTS = [
  {
    title: 'Vehicle Telematics',
    image: '/assets/product_category/advanced.webp',
    link: '/trackers/vehicle-telematics',
  },
  {
    title: 'Indoor Telematics',
    image: '/assets/product_category/indoorr.webp',
    link: '/trackers/indoor-telematics',
  },
  {
    title: 'Video Telematics',
    image: '/assets/product_category/video-telematics.webp',
    link: '/trackers/video-telematics',
  },
  {
    title: 'Assets & Personal Telematics',
    image: '/assets/product_category/asset-telematics.webp',
    link: '/trackers/assets-&-personal-telematics',
  },
  {
    title: 'OBD Telematics',
    image: '/assets/product_category/obd.webp',
    link: '/trackers/obd-telematics',
  },
  {
    title: 'IOT Sensors',
    image: '/assets/product_category/iot-sensors.webp',
    link: '/trackers/iot-sensors',
  },
  {
    title: 'Taxi GPS Meter',
    image: '/assets/product_category/taxi-meter.webp',
    link: '/trackers/taxi-gps-meter',
  },
  {
    title: 'Universal Find Devices',
    image: '/assets/product_category/5b747f0f4ab017ea24599204282d2635.webp',
    link: '/trackers/universal-find-devices',
  },
];

export default function ProductRangeSlider() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="case-study-area pt-50">
      <div className="container-fluid p-0">
        <div className="heading-title">
          <h2>Discover Our Range Of Products</h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '0 45px' }}>
          {/* Previous arrow */}
          <button
            type="button"
            className="slick-prev"
            onClick={() => scroll('left')}
            aria-label="Previous"
            style={{
              position: 'absolute',
              left: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              color: '#1d2250',
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 10,
              width: '38px',
              height: '38px',
              borderRadius: '50%',
            }}
          >
            &#10094;
          </button>

          {/* Slider track */}
          <section
            ref={scrollRef}
            className="customer-logos sliders"
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '20px 5px 30px',
            }}
          >
            {PRODUCTS.map((prod, idx) => (
              <div
                key={idx}
                className="slide"
                style={{
                  flex: '0 0 230px',
                  scrollSnapAlign: 'start',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#f1f2f4',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <Link href={prod.link} style={{ display: 'block', textDecoration: 'none' }}>
                  <div
                    style={{
                      height: '160px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '15px',
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.title}
                      loading="lazy"
                      style={{
                        maxHeight: '120px',
                        maxWidth: '90%',
                        objectFit: 'contain',
                        display: 'block',
                        margin: '0 auto',
                        background: 'transparent',
                      }}
                    />
                  </div>
                  <div className="content">
                    <h3>
                      <span className="product-title-text">{prod.title}</span>
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </section>

          {/* Next arrow */}
          <button
            type="button"
            className="slick-next"
            onClick={() => scroll('right')}
            aria-label="Next"
            style={{
              position: 'absolute',
              right: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              color: '#1d2250',
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 10,
              width: '38px',
              height: '38px',
              borderRadius: '50%',
            }}
          >
            &#10095;
          </button>
        </div>
      </div>

      <style jsx>{`
        .customer-logos::-webkit-scrollbar {
          display: none;
        }
        .slide:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        .slide:hover .content {
          background: #1d2250 !important;
        }
        .slide:hover .content h3,
        .slide:hover .content h3 a,
        .slide:hover .product-title-text {
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
