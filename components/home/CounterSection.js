'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const World = dynamic(() => import('@/components/ui/Globe').then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div style={{ height: '540px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  ),
});

const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

const sampleArcs = [
  // Order 1: Middle East, Western Europe, Southeast Asia
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 25.2048,
    endLng: 55.2708, // Dubai, UAE
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 51.5074,
    endLng: -0.1278, // London, UK
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 1.3521,
    endLng: 103.8198, // Singapore
    arcAlt: 0.2,
    color: colors[2],
  },

  // Order 2: Gulf, Central Europe, Southeast Asia
  {
    order: 2,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 24.7136,
    endLng: 46.6753, // Riyadh, Saudi Arabia
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 2,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 50.1109,
    endLng: 8.6821, // Frankfurt, Germany
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 2,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869, // Kuala Lumpur, Malaysia
    arcAlt: 0.2,
    color: colors[2],
  },

  // Order 3: Qatar, France, Thailand
  {
    order: 3,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 25.2854,
    endLng: 51.531, // Doha, Qatar
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 3,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 48.8566,
    endLng: 2.3522, // Paris, France
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 3,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 13.7563,
    endLng: 100.5018, // Bangkok, Thailand
    arcAlt: 0.2,
    color: colors[2],
  },

  // Order 4: Kuwait, Eastern Europe, Indonesia
  {
    order: 4,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 29.3759,
    endLng: 47.9774, // Kuwait City, Kuwait
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 4,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 52.2297,
    endLng: 21.0122, // Warsaw, Poland
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 4,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -6.2088,
    endLng: 106.8456, // Jakarta, Indonesia
    arcAlt: 0.3,
    color: colors[2],
  },

  // Order 5: Oman, Netherlands, Philippines
  {
    order: 5,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 23.588,
    endLng: 58.3829, // Muscat, Oman
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 5,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 51.9244,
    endLng: 4.4777, // Rotterdam, Netherlands
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 5,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 14.5995,
    endLng: 120.9842, // Manila, Philippines
    arcAlt: 0.3,
    color: colors[2],
  },

  // Order 6: UAE, Spain, Vietnam
  {
    order: 6,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 24.4539,
    endLng: 54.3773, // Abu Dhabi, UAE
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 6,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 40.4168,
    endLng: -3.7038, // Madrid, Spain
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 6,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 10.8231,
    endLng: 106.6297, // Ho Chi Minh City, Vietnam
    arcAlt: 0.2,
    color: colors[2],
  },

  // Order 7: Egypt, Italy, Japan
  {
    order: 7,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 30.0444,
    endLng: 31.2357, // Cairo, Egypt
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 7,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 45.4642,
    endLng: 9.19, // Milan, Italy
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 7,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo, Japan
    arcAlt: 0.3,
    color: colors[2],
  },

  // Order 8: North Africa, Northern Europe, East Asia
  {
    order: 8,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 33.5731,
    endLng: -7.5898, // Casablanca, Morocco
    arcAlt: 0.3,
    color: colors[0],
  },
  {
    order: 8,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 53.5511,
    endLng: 9.9937, // Hamburg, Germany
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 8,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 37.5665,
    endLng: 126.978, // Seoul, South Korea
    arcAlt: 0.3,
    color: colors[2],
  },

  // Order 9: East Africa, Belgium, Australia
  {
    order: 9,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -1.2921,
    endLng: 36.8219, // Nairobi, Kenya
    arcAlt: 0.3,
    color: colors[0],
  },
  {
    order: 9,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 51.2194,
    endLng: 4.4025, // Antwerp, Belgium
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 9,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -33.8688,
    endLng: 151.2093, // Sydney, Australia
    arcAlt: 0.4,
    color: colors[2],
  },

  // Order 10: Southern Africa, Eurasia, Australia
  {
    order: 10,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -26.2041,
    endLng: 28.0473, // Johannesburg, South Africa
    arcAlt: 0.3,
    color: colors[0],
  },
  {
    order: 10,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 41.0082,
    endLng: 28.9784, // Istanbul, Turkey
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 10,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -37.8136,
    endLng: 144.9631, // Melbourne, Australia
    arcAlt: 0.4,
    color: colors[2],
  },

  // Order 11: US East & Midwest, New Zealand
  {
    order: 11,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 40.7128,
    endLng: -74.006, // New York, USA
    arcAlt: 0.4,
    color: colors[0],
  },
  {
    order: 11,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 41.8781,
    endLng: -87.6298, // Chicago, USA
    arcAlt: 0.4,
    color: colors[1],
  },
  {
    order: 11,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -36.8485,
    endLng: 174.7633, // Auckland, New Zealand
    arcAlt: 0.5,
    color: colors[2],
  },

  // Order 12: US South & West Coast
  {
    order: 12,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 29.7604,
    endLng: -95.3698, // Houston, USA
    arcAlt: 0.4,
    color: colors[0],
  },
  {
    order: 12,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 32.7767,
    endLng: -96.797, // Dallas, USA
    arcAlt: 0.4,
    color: colors[1],
  },
  {
    order: 12,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 34.0522,
    endLng: -118.2437, // Los Angeles, USA
    arcAlt: 0.4,
    color: colors[2],
  },

  // Order 13: US Southeast, Mexico, Colombia
  {
    order: 13,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 25.7617,
    endLng: -80.1918, // Miami, USA
    arcAlt: 0.4,
    color: colors[0],
  },
  {
    order: 13,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 19.4326,
    endLng: -99.1332, // Mexico City, Mexico
    arcAlt: 0.5,
    color: colors[1],
  },
  {
    order: 13,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 4.711,
    endLng: -74.0721, // Bogotá, Colombia
    arcAlt: 0.5,
    color: colors[2],
  },

  // Order 14: South America (Brazil, Peru, Chile)
  {
    order: 14,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -23.5505,
    endLng: -46.6333, // São Paulo, Brazil
    arcAlt: 0.5,
    color: colors[0],
  },
  {
    order: 14,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -12.0464,
    endLng: -77.0428, // Lima, Peru
    arcAlt: 0.5,
    color: colors[1],
  },
  {
    order: 14,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: -33.4489,
    endLng: -70.6693, // Santiago, Chile
    arcAlt: 0.5,
    color: colors[2],
  },
];

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
              <div className="col-12">
                <div style={{ width: '100%', height: '600px', maxWidth: '600px', margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <World data={sampleArcs} globeConfig={globeConfig} />
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
