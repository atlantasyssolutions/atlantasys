"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9"
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // SVG Refs for 60fps direct DOM animation (No React re-render lag)
  const pathRef = useRef(null);
  const beamRef = useRef(null);
  const headRef = useRef(null);
  const ringRef = useRef(null);

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
      color: currentTheme === "dark" ? "#FFFFFF40" : "#00000028",
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
    // Dynamic aerodynamic arc elevation
    const arcHeight = Math.min(Math.max(dist * 0.26, 6), 22);
    const midY = Math.min(start.y, end.y) - arcHeight;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

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

  // PROBIOTA-STYLE ARC ANIMATION:
  // Launches from India HQ -> flies across the sky -> enters destination -> completely vanishes (no static lines!)
  useEffect(() => {
    if (!dots || dots.length === 0) return;

    let animId;
    let startTime = null;
    const FLIGHT_DURATION = 1850; // 1.85s flight time
    const PAUSE_DURATION = 250;   // 0.25s pause before next line launches
    const TOTAL_CYCLE = FLIGHT_DURATION + PAUSE_DURATION;

    const currentDot = dots[currentIdx];
    if (!currentDot) return;

    const startPt = projectPoint(currentDot.start.lat, currentDot.start.lng);
    const endPt = projectPoint(currentDot.end.lat, currentDot.end.lng);
    const pathD = createCurvedPath(startPt, endPt);

    const pathEl = pathRef.current;
    const beamEl = beamRef.current;
    const headEl = headRef.current;
    const ringEl = ringRef.current;

    if (!pathEl || !beamEl) return;

    // Set path data on both guide and beam
    pathEl.setAttribute("d", pathD);
    beamEl.setAttribute("d", pathD);

    const totalLength = pathEl.getTotalLength() || 100;
    // Comet beam length: 30% of total trajectory
    const beamLength = Math.max(totalLength * 0.32, 12);

    // Reset initial state to completely hidden
    beamEl.setAttribute("stroke-dasharray", `0 ${totalLength * 3}`);
    beamEl.setAttribute("stroke-dashoffset", "0");
    if (headEl) headEl.setAttribute("opacity", "0");
    if (ringEl) {
      ringEl.setAttribute("cx", String(endPt.x));
      ringEl.setAttribute("cy", String(endPt.y));
      ringEl.setAttribute("opacity", "0");
      ringEl.setAttribute("r", "0.8");
    }

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < FLIGHT_DURATION) {
        const p = elapsed / FLIGHT_DURATION; // 0 to 1

        // Smooth cubic acceleration & deceleration
        const easedP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        // Head and tail distances along the arc
        const dHead = easedP * (totalLength + beamLength);
        const dTail = dHead - beamLength;

        // Calculate clamped visible segment on [0, totalLength]
        const s0 = Math.max(0, dTail);
        const s1 = Math.min(totalLength, dHead);
        const visibleDash = Math.max(0, s1 - s0);

        // Update beam dasharray and offset (moves along curve)
        beamEl.setAttribute("stroke-dasharray", `${visibleDash} ${totalLength * 3}`);
        beamEl.setAttribute("stroke-dashoffset", `${-s0}`);

        // Update Glowing Comet Head Particle
        if (headEl) {
          if (s1 > 0 && s1 < totalLength) {
            const pt = pathEl.getPointAtLength(s1);
            headEl.setAttribute("cx", String(pt.x));
            headEl.setAttribute("cy", String(pt.y));
            headEl.setAttribute("opacity", "1");
          } else {
            headEl.setAttribute("opacity", "0");
          }
        }

        // Destination Impact Wave: bursts outward as the head touches the destination
        if (ringEl && dHead >= totalLength * 0.82) {
          const impactProgress = (dHead - totalLength * 0.82) / ((totalLength + beamLength) - totalLength * 0.82);
          const ringR = 0.8 + impactProgress * 4.2;
          const ringOp = Math.max(0, 0.9 * (1 - impactProgress));
          ringEl.setAttribute("r", String(ringR));
          ringEl.setAttribute("opacity", String(ringOp));
        }

        animId = requestAnimationFrame(step);
      } else if (elapsed < TOTAL_CYCLE) {
        // Pause period: the line has finished entering destination and completely DISAPPEARED ("then going")
        beamEl.setAttribute("stroke-dasharray", `0 ${totalLength * 3}`);
        if (headEl) headEl.setAttribute("opacity", "0");
        if (ringEl) ringEl.setAttribute("opacity", "0");
        animId = requestAnimationFrame(step);
      } else {
        // Launch cycle finished! Advance to next global destination
        setCurrentIdx((prev) => (prev + 1) % dots.length);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [currentIdx, dots, mapInstance]);

  const activeDot = dots[currentIdx];

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

      {/* 2. Dynamic SVG Layer (ViewBox exactly 198 x 100 matching DottedMap) */}
      <svg
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
          {/* Luminous Comet Beam Gradient */}
          <linearGradient id="comet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0169A9" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* High-Tech Glow Filter */}
          <filter id="comet-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hidden guide path used for math length and getPointAtLength calculation */}
        <path
          ref={pathRef}
          fill="none"
          stroke="none"
          style={{ display: "none" }}
        />

        {/* ACTIVE LAUNCHING BEAM: Single comet/dash shooting from India, traveling, and vanishing */}
        <path
          ref={beamRef}
          fill="none"
          stroke="url(#comet-gradient)"
          strokeWidth="0.8"
          strokeLinecap="round"
          style={{ filter: "url(#comet-glow)" }}
        />

        {/* COMET HEAD PARTICLE: Bright leading tip of the flying beam */}
        <circle
          ref={headRef}
          r="1.1"
          fill="#FFFFFF"
          stroke="#38BDF8"
          strokeWidth="0.5"
          opacity="0"
          style={{ filter: "url(#comet-glow)" }}
        />

        {/* DESTINATION IMPACT WAVE: Expanding ring triggered on arrival */}
        <circle
          ref={ringRef}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="0.45"
          opacity="0"
        />

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
                r={isHQ ? "1.2" : isActiveTarget ? "0.85" : "0.55"}
                fill={isHQ ? "#0169A9" : isActiveTarget ? "#38BDF8" : "#0284C7"}
                stroke="#FFFFFF"
                strokeWidth={isHQ ? "0.45" : "0.2"}
              />

              {/* India HQ Continuous Radar Wave (Radiating origin) */}
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
                      to="4.8"
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
                      to="6.2"
                      dur="2.2s"
                      begin="0.75s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.55"
                      to="0"
                      dur="2.2s"
                      begin="0.75s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
export { WorldMap };
