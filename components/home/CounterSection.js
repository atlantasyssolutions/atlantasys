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

const INDIA_HQ = { lat: 28.6139, lng: 77.2090, label: "Atlanta Systems HQ & SMT Plant (New Delhi, India)" };

const TARGETED_DESTINATIONS = [
  // Wave 1: Middle East, SE Asia, Europe
  { lat: 25.2048, lng: 55.2708, label: "Dubai, UAE" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore (SE Asia Gateway)" },
  { lat: 51.5074, lng: -0.1278, label: "London, United Kingdom" },

  // Wave 2: Middle East, SE Asia, Europe
  { lat: 24.7136, lng: 46.6753, label: "Riyadh, Saudi Arabia" },
  { lat: 3.1390, lng: 101.6869, label: "Kuala Lumpur, Malaysia" },
  { lat: 50.1109, lng: 8.6821, label: "Frankfurt, Germany" },

  // Wave 3: Middle East, SE Asia, Europe
  { lat: 25.2854, lng: 51.5310, label: "Doha, Qatar" },
  { lat: -6.2088, lng: 106.8456, label: "Jakarta, Indonesia" },
  { lat: 48.8566, lng: 2.3522, label: "Paris, France" },

  // Wave 4: SE Asia, Europe, Africa
  { lat: 13.7563, lng: 100.5018, label: "Bangkok, Thailand" },
  { lat: 51.9244, lng: 4.4777, label: "Rotterdam, Netherlands" },
  { lat: -1.2921, lng: 36.8219, label: "Nairobi, Kenya" },

  // Wave 5: East Asia, Europe, Africa
  { lat: 35.6762, lng: 139.6503, label: "Tokyo, Japan" },
  { lat: 52.2297, lng: 21.0122, label: "Warsaw, Poland" },
  { lat: -26.2041, lng: 28.0473, label: "Johannesburg, South Africa" },

  // Wave 6: SE Asia, Europe, Africa
  { lat: 14.5995, lng: 120.9842, label: "Manila, Philippines" },
  { lat: 40.4168, lng: -3.7038, label: "Madrid, Spain" },
  { lat: 30.0444, lng: 31.2357, label: "Cairo, Egypt" },

  // Wave 7: Middle East, Eurasia, North America
  { lat: 23.5880, lng: 58.3829, label: "Muscat, Oman" },
  { lat: 41.0082, lng: 28.9784, label: "Istanbul, Turkey" },
  { lat: 40.7128, lng: -74.0060, label: "New York, USA" },

  // Wave 8: SE Asia, Africa, North America
  { lat: 10.8231, lng: 106.6297, label: "Ho Chi Minh City, Vietnam" },
  { lat: 33.5731, lng: -7.5898, label: "Casablanca, Morocco" },
  { lat: 29.7604, lng: -95.3698, label: "Houston, USA" },

  // Wave 9: Oceania, Africa, North America
  { lat: -33.8688, lng: 151.2093, label: "Sydney, Australia" },
  { lat: 6.5244, lng: 3.3792, label: "Lagos, Nigeria" },
  { lat: 41.8781, lng: -87.6298, label: "Chicago, USA" },

  // Wave 10: East Asia, Africa, North America
  { lat: 37.5665, lng: 126.9780, label: "Seoul, South Korea" },
  { lat: -4.0435, lng: 39.6682, label: "Mombasa, Kenya" },
  { lat: 34.0522, lng: -118.2437, label: "Los Angeles, USA" },

  // Wave 11: Middle East, North America, Latin America
  { lat: 29.3759, lng: 47.9774, label: "Kuwait City, Kuwait" },
  { lat: 43.6532, lng: -79.3832, label: "Toronto, Canada" },
  { lat: 19.4326, lng: -99.1332, label: "Mexico City, Mexico" },

  // Wave 12: Middle East, Latin America, Oceania
  { lat: 24.4539, lng: 54.3773, label: "Abu Dhabi, UAE" },
  { lat: -23.5505, lng: -46.6333, label: "Sao Paulo, Brazil" },
  { lat: -37.8136, lng: 144.9631, label: "Melbourne, Australia" },

  // Wave 13: Middle East, Latin America
  { lat: 26.4207, lng: 50.0888, label: "Dammam, Saudi Arabia" },
  { lat: 4.7110, lng: -74.0721, label: "Bogota, Colombia" },
  { lat: -33.4489, lng: -70.6693, label: "Santiago, Chile" },
];

const WORLD_MAP_DOTS = TARGETED_DESTINATIONS.map((dest, idx) => ({
  order: idx,
  start: INDIA_HQ,
  end: dest,
}));

const globeColors = ["#06b6d4", "#3b82f6", "#6366f1"];

// Generate arcs originating 100% from India HQ and travelling outward to target global markets
const sampleArcs = TARGETED_DESTINATIONS.map((dest, idx) => {
  const dLat = (dest.lat - INDIA_HQ.lat) * (Math.PI / 180);
  const dLon = (dest.lng - INDIA_HQ.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((INDIA_HQ.lat * Math.PI) / 180) *
      Math.cos((dest.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const arcAlt = +(0.15 + (c / Math.PI) * 0.35).toFixed(2);

  // Group in waves of 3 simultaneous arcs per order
  const order = Math.floor(idx / 3) + 1;

  return {
    order,
    startLat: INDIA_HQ.lat,
    startLng: INDIA_HQ.lng,
    endLat: dest.lat,
    endLng: dest.lng,
    arcAlt,
    color: globeColors[idx % globeColors.length],
  };
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
  arcTime: 2600, // Smooth, cinematic 2.6s trajectory speed (replaces rushed 1s)
  arcLength: 0.45, // Sleek luminous pulse length
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 20.5937, lng: 78.9629 }, // Centered on India on load
  autoRotate: true,
  autoRotateSpeed: 0.4,
};

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
