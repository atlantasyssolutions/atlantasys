'use client';

import { useState, useEffect, useRef } from 'react';

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
          <>
            <div className="heading-title">
              <h2>Global Presence</h2>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-8 col-md-8">
                <div className="map-container">
                  <img
                    src="/assets/img/map-back.webp"
                    alt="Global presence map"
                    loading="lazy"
                  />
                  <div className="point india tippy" title="India"></div>
                  <div className="point qatar tippy" title="Qatar"></div>
                  <div className="point bahrain tippy" title="Bahrain"></div>
                  <div className="point kuwait tippy" title="Kuwait"></div>
                  <div className="point malaysia tippy" title="Malaysia"></div>
                  <div className="point singapore tippy" title="Singapore"></div>
                  <div className="point philippines tippy" title="Philippines"></div>
                </div>
              </div>
            </div>
          </>
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
