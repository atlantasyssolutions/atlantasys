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

const globeColors = ["#06b6d4", "#3b82f6", "#6366f1"];

const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: "#06b6d4",
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: "#3b82f6",
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: "#6366f1",
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: "#06b6d4",
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: "#3b82f6",
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: "#6366f1",
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: "#3b82f6",
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#6366f1",
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: "#06b6d4",
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: "#3b82f6",
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: "#6366f1",
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: "#3b82f6",
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: "#6366f1",
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: "#06b6d4",
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: "#3b82f6",
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#6366f1",
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: "#06b6d4",
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: "#3b82f6",
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: "#6366f1",
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: "#06b6d4",
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: "#3b82f6",
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: "#6366f1",
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: "#06b6d4",
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: "#3b82f6",
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: "#6366f1",
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: "#06b6d4",
  },
  {
    order: 10,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: "#3b82f6",
  },
  {
    order: 10,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.3,
    color: "#6366f1",
  },
  {
    order: 11,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: "#06b6d4",
  },
  {
    order: 11,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.2,
    color: "#3b82f6",
  },
  {
    order: 11,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: "#6366f1",
  },
  {
    order: 12,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.1,
    color: "#06b6d4",
  },
  {
    order: 12,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.2,
    color: "#3b82f6",
  },
  {
    order: 12,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.3,
    color: "#6366f1",
  },
  {
    order: 13,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: 13,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: "#3b82f6",
  },
  {
    order: 13,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.1,
    color: "#6366f1",
  },
  {
    order: 14,
    startLat: -33.936138,
    startLng: 18.436529,
    endLat: 21.395643,
    endLng: 39.883798,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
];

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
