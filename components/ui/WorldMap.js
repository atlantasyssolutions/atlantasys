"use client";

import { useRef, useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9"
}) {
  const svgRef = useRef(null);

  let currentTheme = "light";
  try {
    const themeContext = useTheme();
    if (themeContext?.theme) currentTheme = themeContext.theme;
  } catch (e) {
    currentTheme = "light";
  }

  const svgMap = useMemo(() => {
    const DMap = DottedMap?.default || DottedMap;
    const map = new DMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: currentTheme === "dark" ? "#FFFFFF40" : "#00000040",
      shape: "circle",
      backgroundColor: currentTheme === "dark" ? "black" : "white",
    });
  }, [currentTheme]);

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const dist = Math.hypot(end.x - start.x, end.y - start.y);
    const arcHeight = Math.min(Math.max(dist * 0.22, 28), 85);
    const midY = Math.min(start.y, end.y) - arcHeight;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Deduplicate points so each city has a clean, non-overlapping pulse marker
  const uniquePoints = useMemo(() => {
    const map = new Map();
    dots.forEach((dot) => {
      if (dot.start) {
        const sKey = `${dot.start.lat.toFixed(2)},${dot.start.lng.toFixed(2)}`;
        if (!map.has(sKey)) {
          map.set(sKey, { ...dot.start, isHQ: Boolean(dot.start.label?.includes("HQ")) });
        }
      }
      if (dot.end) {
        const eKey = `${dot.end.lat.toFixed(2)},${dot.end.lng.toFixed(2)}`;
        if (!map.has(eKey)) {
          map.set(eKey, { ...dot.end, isHQ: Boolean(dot.end.label?.includes("HQ")) });
        }
      }
    });
    return Array.from(map.values());
  }, [dots]);

  return (
    <div
      className="w-full aspect-[2/1] dark:bg-black bg-white rounded-lg relative font-sans"
      style={{
        width: "100%",
        aspectRatio: "2 / 1",
        position: "relative",
        borderRadius: "0.75rem",
        overflow: "hidden",
        backgroundColor: currentTheme === "dark" ? "black" : "white",
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          maskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
          pointerEvents: "none",
          userSelect: "none",
        }}
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
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
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0169A9" stopOpacity="0" />
            <stop offset="15%" stopColor="#0169A9" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Underlying Trajectory Tracks (subtle base lines like Probiota globe) */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const pathD = createCurvedPath(startPoint, endPoint);
          return (
            <path
              key={`base-track-${i}`}
              d={pathD}
              fill="none"
              stroke="#0169A9"
              strokeWidth="0.85"
              strokeOpacity="0.18"
            />
          );
        })}

        {/* 2. DYNAMIC FLYING DASH PULSES (Exact Probiota globe line behavior radiating from India) */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const pathD = createCurvedPath(startPoint, endPoint);
          const delay = (i * 0.1) % 2.5;
          return (
            <path
              key={`dynamic-beam-${i}`}
              d={pathD}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="2.2"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="18 100"
              style={{ filter: "url(#glow)" }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="118"
                to="0"
                dur="2.5s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        })}

        {/* 3. Central Origin & Destination Radar Pings */}
        {uniquePoints.map((point, i) => {
          const pt = projectPoint(point.lat, point.lng);
          const isHQ = point.isHQ;
          return (
            <g key={`marker-${i}`} style={{ cursor: 'pointer' }}>
              <title>{point.label || `Lat: ${point.lat}, Lng: ${point.lng}`}</title>
              {/* Core Dot */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHQ ? "3.8" : "2.2"}
                fill={isHQ ? "#0169A9" : "#0ea5e9"}
                stroke="#ffffff"
                strokeWidth={isHQ ? "1.5" : "0.5"}
              />
              {/* Radar Pulse Wave 1 */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHQ ? "3.8" : "2.2"}
                fill={isHQ ? "#0169A9" : "#0ea5e9"}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  from={isHQ ? "3.8" : "2.2"}
                  to={isHQ ? "14" : "7.5"}
                  dur={isHQ ? "1.4s" : "2s"}
                  begin={`${(i * 0.12) % 2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.75"
                  to="0"
                  dur={isHQ ? "1.4s" : "2s"}
                  begin={`${(i * 0.12) % 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Secondary Wave for India HQ */}
              {isHQ && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="3.8"
                  fill="#38bdf8"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="3.8"
                    to="18"
                    dur="1.8s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="1.8s"
                    begin="0.6s"
                    repeatCount="indefinite"
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

export default WorldMap;
