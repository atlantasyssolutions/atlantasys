'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const SLIDES = [
  {
    id: 0,
    image: '/assets/img/banner/adas-and-dms.webp',
    title: 'ADAS & DMS',
    description: 'Elevating your safety with every drive and every mile',
    link: '/trackers/video-telematics',
    alt: 'Dash Cam and Video Surveillance for fleets',
  },
  {
    id: 1,
    image: '/assets/img/banner/vehicle-telematics.webp',
    title: 'Vehicle Telematics',
    description: 'Track, analyze, and optimize your fleet with real-time insights',
    link: '/trackers/vehicle-telematics',
    alt: 'Fleet Management Software with real-time GPS tracking',
  },
  {
    id: 2,
    image: '/assets/img/banner/asset-management.webp',
    title: 'Asset Management',
    description: 'Secure your assets, streamline operations, and ensure accuracy',
    link: '/trackers/assets-&-personal-telematics',
    alt: 'Asset tracking devices and software',
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-ride="carousel"
      aria-label="Atlanta Systems Highlights"
      style={{ position: 'relative' }}
    >
      <div className="carousel-indicators">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            className={idx === activeIndex ? 'active' : ''}
            aria-current={idx === activeIndex ? 'true' : undefined}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      <div className="carousel-inner" style={{ position: 'relative', overflow: 'hidden' }}>
        {SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={slide.id}
              className={`carousel-item img-overlay ${isActive ? 'active' : ''}`}
              style={{
                display: isActive ? 'block' : 'none',
                position: 'relative',
                transition: 'opacity 0.6s ease-in-out',
              }}
            >
              <img
                src={slide.image}
                className="d-block w-100"
                alt={slide.alt}
                loading={idx === 0 ? 'eager' : 'lazy'}
                style={{
                  minHeight: '480px',
                  maxHeight: '680px',
                  objectFit: 'cover',
                  width: '100%',
                }}
              />
              <div className="banner-item-content carousel-caption d-flex flex-column h-100 bottom-0">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <div className="banner-btn">
                  <Link
                    href={slide.link}
                    className="default-btn btn-bg-two border-radius-50"
                  >
                    Learn More <i className="fas fa-chevron-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
