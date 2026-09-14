"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9"
}) {
  const svgRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  let currentTheme = "light";
  try {
    const themeContext = useTheme();
    if (themeContext?.theme) currentTheme = themeContext.theme;
  } catch (e) {
    currentTheme = "light";
  }

  // Generate DottedMap instance and background SVG
  const { svgMap, mapInstance } = useMemo(() => {
    const DMap = DottedMap?.default || DottedMap;
    const map = new DMap({ height: 100, grid: "diagonal" });
    const svg = map.getSVG({
      radius: 0.22,
      color: currentTheme === "dark" ? "#FFFFFF40" : "#00000030",
      shape: "circle",
      backgroundColor: currentTheme === "dark" ? "black" : "white",
    });
    return { svgMap: svg, mapInstance: map };
  }, [currentTheme]);

  // Exact projection matching DottedMap's SVG coordinates (viewBox 0 0 198 100)
  const projectPoint = (lat, lng) => {
    try {
      if (mapInstance && typeof mapInstance.getPin === "function") {
        const pin = mapInstance.getPin({ lat, lng });
        if (pin && typeof pin.x === "number" && typeof pin.y === "number") {
          return { x: pin.x, y: pin.y };
        }
      }
    } catch (e) {}
    // Fallback:
    const x = (lng + 180) * (198 / 360);
    const y = (90 - lat) * (100 / 180);
    return { x, y };
  };

  // Upward arced flight path between two projected coordinates
  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dist = Math.hypot(dx, dy);
    const arcHeight = Math.min(Math.max(dist * 0.28, 4), 16);
    const midY = Math.min(start.y, end.y) - arcHeight;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Sequential line rotation: shoots ONE pulse at a time like Probiota globe
  useEffect(() => {
    if (!dots || dots.length === 0) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % dots.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [dots.length]);

  // Deduplicate points for clear radar markers
  const uniquePoints = useMemo(() => {
    const map = new Map();
    dots.forEach((dot, idx) => {
      if (dot.start) {
        const sKey = `${dot.start.lat.toFixed(2)},${dot.start.lng.toFixed(2)}`;
        if (!map.has(sKey)) {
          map.set(sKey, { ...dot.start, isHQ: true, order: -1 });
        }
      }
      if (dot.end) {
        const eKey = `${dot.end.lat.toFixed(2)},${dot.end.lng.toFixed(2)}`;
        if (!map.has(eKey)) {
          map.set(eKey, { ...dot.end, isHQ: false, order: idx });
        }
      }
    });
    return Array.from(map.values());
  }, [dots]);

  const activeDot = dots[activeIdx];

  return (
    <div
      className="w-full aspect-[198/100] dark:bg-black bg-white rounded-lg relative font-sans"
      style={{
        width: "100%",
        aspectRatio: "198 / 100",
        position: "relative",
        borderRadius: "0.75rem",
        overflow: "hidden",
        backgroundColor: currentTheme === "dark" ? "black" : "white",
      }}
    >
      {/* 1. Background Dotted World Map */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          maskImage: "linear-gradient(to bottom, transparent, white 5%, white 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, white 5%, white 95%, transparent)",
          pointerEvents: "none",
          userSelect: "none",
        }}
        alt="Atlanta Global Telematics Network"
        draggable={false}
      />

      {/* 2. Interactive SVG Overlay (Matches exact 198 x 100 viewBox of DottedMap) */}
      <svg
        ref={svgRef}
        viewBox="0 0 198 100"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <defs>
          <linearGradient id="active-pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0169A9" stopOpacity="0.2" />
            <stop offset="20%" stopColor="#0169A9" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>
          <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Trajectory Tracks: subtle network grid */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const pathD = createCurvedPath(startPoint, endPoint);
          const isActive = i === activeIdx;
          return (
            <path
              key={`base-track-${i}`}
              d={pathD}
              fill="none"
              stroke={isActive ? "#0169A9" : "#0F2D4E"}
              strokeWidth={isActive ? "0.4" : "0.22"}
              strokeOpacity={isActive ? "0.35" : "0.1"}
            />
          );
        })}

        {/* ACTIVE SEQUENTIAL PULSE: Fires ONE at a time, radiating from India */}
        {activeDot && (() => {
          const startPoint = projectPoint(activeDot.start.lat, activeDot.start.lng);
          const endPoint = projectPoint(activeDot.end.lat, activeDot.end.lng);
          const pathD = createCurvedPath(startPoint, endPoint);
          return (
            <path
              key={`active-beam-${activeIdx}`}
              d={pathD}
              fill="none"
              stroke="url(#active-pulse-gradient)"
              strokeWidth="0.75"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="22 100"
              style={{ filter: "url(#subtle-glow)" }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="122"
                to="0"
                dur="2.0s"
                repeatCount="1"
                fill="freeze"
              />
            </path>
          );
        })()}

        {/* Global Destination Pins & Central India HQ Radar */}
        {uniquePoints.map((point, i) => {
          const pt = projectPoint(point.lat, point.lng);
          const isHQ = point.isHQ;
          const isActiveTarget = !isHQ && activeDot && activeDot.end.label === point.label;

          return (
            <g key={`marker-${i}`} style={{ cursor: "pointer" }}>
              <title>{point.label || `Lat: ${point.lat}, Lng: ${point.lng}`}</title>
              
              {/* Static Pin Core */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHQ ? "1.2" : isActiveTarget ? "0.8" : "0.55"}
                fill={isHQ ? "#0169A9" : isActiveTarget ? "#38BDF8" : "#0284C7"}
                stroke="#FFFFFF"
                strokeWidth={isHQ ? "0.45" : "0.2"}
              />

              {/* India HQ Continuous Pulsing Wave */}
              {isHQ && (
                <>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="1.2"
                    fill="#0169A9"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      from="1.2"
                      to="4.5"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.65"
                      to="0"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="1.2"
                    fill="#38BDF8"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="1.2"
                      to="6.0"
                      dur="2.2s"
                      begin="0.7s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.55"
                      to="0"
                      dur="2.2s"
                      begin="0.7s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}

              {/* Active Destination Landing Ping Wave */}
              {isActiveTarget && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="0.8"
                  fill="#38BDF8"
                  opacity="0.8"
                >
                  <animate
                    attributeName="r"
                    from="0.8"
                    to="3.8"
                    dur="1.2s"
                    begin="1.2s"
                    repeatCount="2"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.85"
                    to="0"
                    dur="1.2s"
                    begin="1.2s"
                    repeatCount="2"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
export { WorldMap };
