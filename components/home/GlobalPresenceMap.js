'use client';

import { useState } from 'react';
import styles from './GlobalPresenceMap.module.css';

// Coordinate system: 1000 x 485.33 (matches 1500:728 map-back.webp aspect ratio)
const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 485.33;

const HQ_NODE = {
  id: 'india',
  city: 'New Delhi',
  country: 'India',
  role: 'Global Corporate HQ & Primary R&D Center',
  description: 'In-house hardware engineering, SMT electronics manufacturing lines, and 24/7 central IoT cloud telemetry command center.',
  status: 'Central Command Active',
  x: 690,
  y: 208.7,
  region: 'hq',
  devices: '1.2M+ Active Devices',
  latency: '< 15ms Core Network',
  flag: '🇮🇳',
};

const GLOBAL_HUBS = [
  {
    id: 'kuwait',
    city: 'Kuwait City',
    country: 'Kuwait',
    role: 'Oilfield Logistics & Heavy Haul Telematics',
    description: 'Capacitive fuel probes, dual-tank calibration, and CAN-bus telemetry for desert transport and heavy commercial fleets.',
    status: 'Regional Network Active',
    x: 590,
    y: 184.4,
    cx: 640,
    cy: 135,
    region: 'middle-east',
    devices: '45,000+ Assets',
    latency: '24ms Uplink',
    duration: 2.8,
    flag: '🇰🇼',
  },
  {
    id: 'bahrain',
    city: 'Manama',
    country: 'Bahrain',
    role: 'Intermodal Port & Cold Chain Logistics',
    description: 'Reefer temperature telemetry, BLE wireless sensor beacons, and cross-border customs fleet tracking gateways.',
    status: 'Regional Network Active',
    x: 590,
    y: 194.1,
    cx: 640,
    cy: 152,
    region: 'middle-east',
    devices: '32,000+ Assets',
    latency: '22ms Uplink',
    duration: 3.1,
    flag: '🇧🇭',
  },
  {
    id: 'qatar',
    city: 'Doha',
    country: 'Qatar',
    role: 'Infrastructure & Construction Telematics',
    description: 'AIS-certified video telematics MDVR units, heavy machinery tracking, and driver safety compliance platforms.',
    status: 'Regional Network Active',
    x: 600,
    y: 203.8,
    cx: 645,
    cy: 168,
    region: 'middle-east',
    devices: '50,000+ Assets',
    latency: '20ms Uplink',
    duration: 2.6,
    flag: '🇶🇦',
  },
  {
    id: 'malaysia',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    role: 'Southeast Asia Regional Telematics Hub',
    description: 'Cold chain food distribution, cross-state express freight tracking, and anti-tamper security telemetry.',
    status: 'Regional Network Active',
    x: 760,
    y: 247.5,
    cx: 730,
    cy: 195,
    region: 'southeast-asia',
    devices: '68,000+ Assets',
    latency: '35ms Uplink',
    duration: 2.7,
    flag: '🇲🇾',
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    role: 'Maritime Gateway & Tech Infrastructure',
    description: 'Intermodal container telemetry, port drayage logistics, and low-latency cloud fleet management integrations.',
    status: 'Regional Network Active',
    x: 770,
    y: 262.1,
    cx: 742,
    cy: 205,
    region: 'southeast-asia',
    devices: '40,000+ Assets',
    latency: '28ms Uplink',
    duration: 3.2,
    flag: '🇸🇬',
  },
  {
    id: 'philippines',
    city: 'Manila',
    country: 'Philippines',
    role: 'Island Logistics & Urban Transit Hub',
    description: 'Public utility vehicle tracking, motorcycle courier telemetry, and rugged cargo tamper sensor deployments.',
    status: 'Regional Network Active',
    x: 830,
    y: 242.7,
    cx: 760,
    cy: 155,
    region: 'southeast-asia',
    devices: '55,000+ Assets',
    latency: '42ms Uplink',
    duration: 3.5,
    flag: '🇵🇭',
  },
];

// Regional inter-hub mesh lines for extra authentic tech depth
const REGIONAL_MESH = [
  { id: 'kw-bh', from: 'kuwait', to: 'bahrain', path: 'M 590 184.4 Q 582 189 590 194.1', region: 'middle-east' },
  { id: 'bh-qa', from: 'bahrain', to: 'qatar', path: 'M 590 194.1 Q 593 200 600 203.8', region: 'middle-east' },
  { id: 'my-sg', from: 'malaysia', to: 'singapore', path: 'M 760 247.5 Q 764 255 770 262.1', region: 'southeast-asia' },
  { id: 'my-ph', from: 'malaysia', to: 'philippines', path: 'M 760 247.5 Q 795 230 830 242.7', region: 'southeast-asia' },
];

const ALL_NODES = [HQ_NODE, ...GLOBAL_HUBS];

const REGION_FILTERS = [
  { id: 'all', label: 'All Deployment Hubs', count: 6 },
  { id: 'middle-east', label: 'Middle East & Gulf', count: 3 },
  { id: 'southeast-asia', label: 'Southeast Asia', count: 3 },
  { id: 'hq', label: 'India (Global HQ)', count: 1 },
];

export default function GlobalPresenceMap() {
  const [activeRegion, setActiveRegion] = useState('all');
  const [hoveredCityId, setHoveredCityId] = useState(null);
  const [pinnedCityId, setPinnedCityId] = useState(null);

  const selectedCityId = pinnedCityId || hoveredCityId;
  const activeCity = ALL_NODES.find((node) => node.id === selectedCityId);

  const handleCityClick = (cityId) => {
    setPinnedCityId((prev) => (prev === cityId ? null : cityId));
  };

  const handleFilterClick = (regionId) => {
    setActiveRegion(regionId);
    setPinnedCityId(null);
    setHoveredCityId(null);
  };

  const isHubVisible = (hub) => {
    if (activeRegion === 'all') return true;
    if (activeRegion === 'hq') return true;
    return hub.region === activeRegion;
  };

  const isLineHighlighted = (hub) => {
    if (selectedCityId === hub.id) return true;
    if (selectedCityId === 'india') return true;
    return false;
  };

  const isLineDimmed = (hub) => {
    if (selectedCityId && selectedCityId !== 'india') {
      return selectedCityId !== hub.id;
    }
    if (activeRegion !== 'all' && activeRegion !== 'hq') {
      return hub.region !== activeRegion;
    }
    return false;
  };

  // Safe tooltip coordinates and alignment
  const getTooltipStyle = (city) => {
    if (!city) return {};
    const xPct = (city.x / VIEW_WIDTH) * 100;
    const yPct = (city.y / VIEW_HEIGHT) * 100;

    let xTransform = '-50%';
    let arrowLeft = '50%';

    if (xPct > 75) {
      xTransform = '-82%';
      arrowLeft = '82%';
    } else if (xPct < 25) {
      xTransform = '-18%';
      arrowLeft = '18%';
    }

    return {
      left: `${xPct}%`,
      top: `${yPct}%`,
      transform: `translate(${xTransform}, -100%)`,
      '--arrow-left': arrowLeft,
    };
  };

  return (
    <div className={styles.presenceWrapper}>
      <p className={styles.sectionSubtitle}>
        Atlanta Systems connects commercial vehicle fleets, transport corridors, and industrial assets across 27+ countries with real-time GPS telemetry, capacitive fuel probes, and intelligent IoT gateway hardware.
      </p>

      {/* Interactive Region Filter Pills */}
      <div className={styles.filterBar}>
        {REGION_FILTERS.map((filter) => {
          const isActive = activeRegion === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
              onClick={() => handleFilterClick(filter.id)}
            >
              <span>{filter.label}</span>
              <span className={styles.filterBadge}>{filter.count}</span>
            </button>
          );
        })}
      </div>

      {/* Main Map Card */}
      <div className={styles.mapCard}>
        <div className={styles.mapViewport}>
          {/* Base Dotted World Map Image */}
          <img
            src="/assets/img/map-back.webp"
            alt="Atlanta Systems Global Network Map"
            className={styles.mapImage}
            loading="lazy"
          />

          {/* High Performance Interactive SVG Overlay */}
          <svg
            className={styles.svgOverlay}
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Soft glow filter */}
              <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Streaming beam gradient */}
              <linearGradient id="arcBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d2ff" stopOpacity="0" />
                <stop offset="50%" stopColor="#00d2ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
              </linearGradient>

              {/* Regional mesh beam gradient */}
              <linearGradient id="meshBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
              </linearGradient>

              {/* HQ Radar Beacon Gradient */}
              <radialGradient id="hqRipple">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
              </radialGradient>

              {/* Regional Node Beacon Gradient */}
              <radialGradient id="hubRipple">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </radialGradient>

              {/* Comet Photon Particle Glow */}
              <radialGradient id="cometGlow">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor="#00d2ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Regional Mesh Interconnects */}
            <g className="regional-mesh">
              {REGIONAL_MESH.map((mesh) => {
                const isRegionMatch = activeRegion === 'all' || activeRegion === mesh.region;
                const isCityMatch = selectedCityId === mesh.from || selectedCityId === mesh.to;
                return (
                  <path
                    key={mesh.id}
                    d={mesh.path}
                    fill="none"
                    stroke={isCityMatch ? '#0284c7' : 'rgba(14, 165, 233, 0.22)'}
                    strokeWidth={isCityMatch ? '1.8' : '1'}
                    strokeDasharray="3 3"
                    style={{
                      opacity: isRegionMatch ? (isCityMatch ? 1 : 0.45) : 0.08,
                      transition: 'opacity 0.3s ease, stroke 0.3s ease',
                    }}
                  />
                );
              })}
            </g>

            {/* Primary Curved Flight & Telemetry Lines Radiating from India HQ */}
            <g className="connection-arcs">
              {GLOBAL_HUBS.map((hub) => {
                const visible = isHubVisible(hub);
                const highlighted = isLineHighlighted(hub);
                const dimmed = isLineDimmed(hub);

                const arcPath = `M ${HQ_NODE.x} ${HQ_NODE.y} Q ${hub.cx} ${hub.cy} ${hub.x} ${hub.y}`;

                return (
                  <g
                    key={`line-group-${hub.id}`}
                    style={{
                      opacity: visible ? (dimmed ? 0.2 : 1) : 0.08,
                      transition: 'opacity 0.35s ease',
                    }}
                  >
                    {/* Base Curved Arc */}
                    <path
                      d={arcPath}
                      className={`${styles.arcBase} ${highlighted ? styles.arcActive : ''}`}
                    />

                    {/* Animated Streaming Pulse Dash */}
                    {visible && !dimmed && (
                      <path
                        d={arcPath}
                        className={styles.arcPulse}
                        style={{
                          animationDuration: `${hub.duration}s`,
                        }}
                      />
                    )}

                    {/* Gliding Comet Photon Particle */}
                    {visible && !dimmed && (
                      <g>
                        <circle r="3.2" fill="url(#cometGlow)">
                          <animateMotion
                            path={arcPath}
                            dur={`${hub.duration}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle r="1.6" fill="#ffffff">
                          <animateMotion
                            path={arcPath}
                            dur={`${hub.duration}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    )}

                    {/* Wide Transparent Path for Hover / Click on Line */}
                    <path
                      d={arcPath}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredCityId(hub.id)}
                      onMouseLeave={() => setHoveredCityId(null)}
                      onClick={() => handleCityClick(hub.id)}
                    />
                  </g>
                );
              })}
            </g>

            {/* Destination Hub Beacons */}
            <g className="destination-nodes">
              {GLOBAL_HUBS.map((hub) => {
                const visible = isHubVisible(hub);
                const isSelected = selectedCityId === hub.id;

                return (
                  <g
                    key={`node-${hub.id}`}
                    className={`${styles.nodeGroup} ${isSelected ? styles.nodeActive : ''}`}
                    onClick={() => handleCityClick(hub.id)}
                    onMouseEnter={() => setHoveredCityId(hub.id)}
                    onMouseLeave={() => setHoveredCityId(null)}
                    style={{
                      opacity: visible ? 1 : 0.4,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {/* Radar Pulse Wave 1 */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="5"
                      fill="url(#hubRipple)"
                      className={styles.beaconWave}
                    />

                    {/* Radar Pulse Wave 2 */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="5"
                      fill="url(#hubRipple)"
                      className={styles.beaconWave2}
                    />

                    {/* Solid Core Beacon */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? 6.8 : 5}
                      fill={isSelected ? '#00d2ff' : '#0284c7'}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? '2.4' : '1.6'}
                      className={styles.nodeCore}
                    />

                    {/* Generous Hit Target for Smooth Clicking & Tapping */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="20"
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                    />
                  </g>
                );
              })}
            </g>

            {/* India (Global Headquarters) Master Beacon */}
            <g
              className={`${styles.nodeGroup} ${selectedCityId === 'india' ? styles.nodeActive : ''}`}
              onClick={() => handleCityClick('india')}
              onMouseEnter={() => setHoveredCityId('india')}
              onMouseLeave={() => setHoveredCityId(null)}
            >
              {/* Outer Radiant Radar Ripple */}
              <circle
                cx={HQ_NODE.x}
                cy={HQ_NODE.y}
                r="6"
                fill="url(#hqRipple)"
                className={styles.beaconWave}
              />
              <circle
                cx={HQ_NODE.x}
                cy={HQ_NODE.y}
                r="6"
                fill="url(#hqRipple)"
                className={styles.beaconWave2}
              />

              {/* Master HQ Core */}
              <circle
                cx={HQ_NODE.x}
                cy={HQ_NODE.y}
                r="7"
                className={styles.hqCore}
              />

              {/* HQ Badge Tag */}
              <g transform={`translate(${HQ_NODE.x}, ${HQ_NODE.y - 14})`}>
                <rect
                  x="-23"
                  y="-10"
                  width="46"
                  height="16"
                  rx="4"
                  className={styles.hqBadgeRect}
                />
                <text x="0" y="2" className={styles.hqBadgeTag}>
                  HQ DELHI
                </text>
              </g>

              {/* Generous Hit Target */}
              <circle
                cx={HQ_NODE.x}
                cy={HQ_NODE.y}
                r="24"
                fill="transparent"
                style={{ cursor: 'pointer' }}
              />
            </g>
          </svg>

          {/* Floating Glassmorphic Interactive Detail Card */}
          {activeCity && (
            <div
              className={styles.tooltipCard}
              style={getTooltipStyle(activeCity)}
            >
              <div className={styles.tooltipHeader}>
                <div className={styles.tooltipTitle}>
                  <span className={styles.tooltipFlag}>{activeCity.flag}</span>
                  <span>{activeCity.city}, {activeCity.country}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div className={styles.liveBadge}>
                    <span className={styles.liveDot}></span>
                    <span>LIVE</span>
                  </div>
                  {pinnedCityId === activeCity.id && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPinnedCityId(null);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        padding: '0 2px',
                        fontSize: '12px',
                        lineHeight: 1,
                      }}
                      title="Close pinned card"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.tooltipRole}>{activeCity.role}</div>
              <p className={styles.tooltipDesc}>{activeCity.description}</p>
              <div className={styles.tooltipFooter}>
                <div>
                  Telemetry: <span className={styles.tooltipMetric}>{activeCity.devices}</span>
                </div>
                <div>
                  <span className={styles.tooltipMetric}>{activeCity.latency}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Quick City Chips */}
        <div className={styles.cityGrid}>
          {ALL_NODES.map((node) => {
            const isHq = node.id === 'india';
            const isSelected = selectedCityId === node.id;

            return (
              <button
                key={node.id}
                type="button"
                className={`
                  ${styles.cityChip}
                  ${isHq ? styles.cityChipHq : ''}
                  ${isSelected ? (isHq ? styles.cityChipHqActive : styles.cityChipActive) : ''}
                `}
                onClick={() => handleCityClick(node.id)}
                onMouseEnter={() => setHoveredCityId(node.id)}
                onMouseLeave={() => setHoveredCityId(null)}
              >
                <span>{node.flag}</span>
                <span>{node.city}</span>
                {isHq && <span style={{ opacity: 0.75, fontSize: '10px' }}>(HQ)</span>}
              </button>
            );
          })}
        </div>

        {/* Live Network Telemetry Bar */}
        <div className={styles.telemetryBar}>
          <div className={styles.telemetryLeft}>
            <span className={styles.liveDot} style={{ background: '#10b981' }}></span>
            <span>Atlanta Systems Global IoT Grid</span>
          </div>
          <div className={styles.telemetryRight}>
            <div className={styles.telemetryItem}>
              Central Hub: <span className={styles.telemetryVal}>New Delhi (HQ)</span>
            </div>
            <div className={styles.telemetryItem}>
              Active Deployment Nodes: <span className={styles.telemetryVal}>6 Strategic Hubs</span>
            </div>
            <div className={styles.telemetryItem}>
              Telemetry Stream: <span className={styles.telemetryVal}>24/7 Sub-Second Sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
