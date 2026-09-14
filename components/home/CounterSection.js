'use client';

import { useState, useEffect, useRef } from 'react';
import WorldMap from '@/components/ui/WorldMap';

const INDIA_HQ = { lat: 28.6139, lng: 77.2090, label: "Atlanta Systems HQ & SMT Plant (New Delhi, India)" };

const TARGETED_DESTINATIONS = [
  // --- South East Asia (Priority Expansion Markets) ---
  { lat: 1.3521, lng: 103.8198, label: "Singapore (SE Asia Gateway)" },
  { lat: 3.1390, lng: 101.6869, label: "Kuala Lumpur, Malaysia" },
  { lat: 14.5995, lng: 120.9842, label: "Manila, Philippines" },
  { lat: -6.2088, lng: 106.8456, label: "Jakarta, Indonesia" },
  { lat: 13.7563, lng: 100.5018, label: "Bangkok, Thailand" },

  // --- Middle East & Gulf (WASAL, TAMEEM, SASO, UAE RTA) ---
  { lat: 25.2048, lng: 55.2708, label: "Dubai, UAE" },
  { lat: 24.7136, lng: 46.6753, label: "Riyadh, Saudi Arabia" },
  { lat: 25.2854, lng: 51.5310, label: "Doha, Qatar" },
  { lat: 23.5880, lng: 58.3829, label: "Muscat, Oman" },
  { lat: 29.3759, lng: 47.9774, label: "Kuwait City, Kuwait" },
  { lat: 30.0444, lng: 31.2357, label: "Cairo, Egypt" },

  // --- Europe & UK (Smart Tachograph 2.0 & GSR 2024 ADAS) ---
  { lat: 51.5074, lng: -0.1278, label: "London, United Kingdom" },
  { lat: 50.1109, lng: 8.6821, label: "Frankfurt, Germany" },
  { lat: 52.2297, lng: 21.0122, label: "Warsaw, Poland" },
  { lat: 48.8566, lng: 2.3522, label: "Paris, France" },
  { lat: 40.4168, lng: -3.7038, label: "Madrid, Spain" },

  // --- North America (FMCSA ELD, IFTA & Intermodal Drayage) ---
  { lat: 40.7128, lng: -74.0060, label: "New York, USA" },
  { lat: 41.8781, lng: -87.6298, label: "Chicago, USA" },
  { lat: 29.7604, lng: -95.3698, label: "Houston, USA" },
  { lat: 34.0522, lng: -118.2437, label: "Los Angeles, USA" },

  // --- Latin America (NOM-012, ANTT, DIAN, MTC) ---
  { lat: 19.4326, lng: -99.1332, label: "Mexico City, Mexico" },
  { lat: 4.7110, lng: -74.0721, label: "Bogota, Colombia" },
  { lat: -23.5505, lng: -46.6333, label: "Sao Paulo, Brazil" },

  // --- East Asia & Oceania ---
  { lat: 35.6762, lng: 139.6503, label: "Tokyo, Japan" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney, Australia" },
];

const WORLD_MAP_DOTS = TARGETED_DESTINATIONS.map((dest, idx) => ({
  order: idx,
  start: INDIA_HQ,
  end: dest,
}));

// Match exact values from the legacy PHP/CSS source
const STATS = [
  {
    id: 'plants',
    icon: 'fal fa-microchip',
    target: 2,
    suffix: '',
    label: 'State-of-the-art manufacturing plants',
  },
  {
    id: 'years',
    icon: 'fal fa-award',
    target: 32,
    suffix: '+',
    label: 'Years of\nexpertise',
  },
  {
    id: 'countries',
    icon: 'fal fa-globe-americas',
    target: 27,
    suffix: '+',
    label: 'Countries\nserved',
  },
  {
    id: 'awards',
    icon: 'fal fa-trophy-alt',
    target: 20,
    suffix: '+',
    label: 'Awards\nwon',
  },
  {
    id: 'devices',
    icon: 'fal fa-globe-asia',
    target: 2,
    suffix: 'M+',
    label: 'Devices\ndelivered',
  },
  {
    id: 'states',
    icon: 'fal fa-chart-network',
    target: 25,
    suffix: '+',
    label: 'States & UTs empanelled across India',
  },
];

export default function CounterSection({ showMap = true }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800;
          const startTime = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCounts(STATS.map((stat) => Math.round(easeOut * stat.target)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(STATS.map((stat) => stat.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  return (
    <div
      ref={sectionRef}
      className={`counter-area${showMap ? ' d-none d-sm-block d-md-block' : ''} pt-50 pb-50`}
    >
      <div className="container">
        {showMap && (
          <div className="mb-50">
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 44px)',
                  fontWeight: '800',
                  color: '#111827',
                  marginBottom: '12px',
                  letterSpacing: '-0.5px',
                }}
              >
                Remote <span style={{ color: '#94a3b8', fontWeight: '700' }}>Connectivity</span>
              </h2>
              <p
                style={{
                  maxWidth: '750px',
                  margin: '0 auto',
                  color: '#64748B',
                  fontSize: '17px',
                  lineHeight: '1.6',
                }}
              >
                Break free from traditional boundaries. Connect, monitor, and manage fleets, high-value assets, and IoT sensors across 27+ countries with carrier-grade telematics and real-time synchronization.
              </p>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-8 col-md-10 col-12">
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                  <WorldMap dots={WORLD_MAP_DOTS} lineColor="#0ea5e9" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Milestone Counters — exact replica of legacy PHP counter-another-content */}
        <div className="row align-items-center justify-content-center" id="counter">
          {STATS.map((stat, idx) => (
            <div key={stat.id} className="col-md-2 col-6" style={{ textAlign: 'center' }}>
              <div className="counter-another-content">
                <i className={stat.icon}></i>
                <div className="milestone-counter">
                  <h3 className="highlight">
                    <span></span>
                    <b className="stat-count">{counts[idx]}</b>
                    {stat.suffix}
                  </h3>
                  <span>
                    {stat.label.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < stat.label.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
