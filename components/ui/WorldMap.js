"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

const NUM_CONCURRENT = 3;

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9"
}) {
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

  // Triple Concurrent Channel Refs
  const pathRefs = [useRef(null), useRef(null), useRef(null)];
  const beamRefs = [useRef(null), useRef(null), useRef(null)];
  const headRefs = [useRef(null), useRef(null), useRef(null)];
  const ringRefs = [useRef(null), useRef(null), useRef(null)];

  // ANIMATION LOOP: 3 COMET BEAMS LAUNCHING AND FLYING AT ONCE
  useEffect(() => {
    if (!dots || dots.length === 0) return;

    let animId;
    const FLIGHT_DURATION = 1900; // 1.9s flight duration
    const PAUSE_DURATION = 200;   // 0.2s pause before next destination in that channel
    const TOTAL_CYCLE = FLIGHT_DURATION + PAUSE_DURATION;
    const STAGGER_OFFSET = 600;   // 600ms phase offset between the 3 channels

    // Initialize the 3 channels distributed across the global destination list
    // e.g. Channel 0 -> Asia/East, Channel 1 -> Middle East/Europe, Channel 2 -> Americas
    const channelState = [
      {
        dotIdx: 0,
        startTime: null,
        offsetMs: 0,
        totalLength: 100,
        beamLength: 25,
        endPt: { x: 0, y: 0 }
      },
      {
        dotIdx: Math.floor(dots.length / 3),
        startTime: null,
        offsetMs: STAGGER_OFFSET,
        totalLength: 100,
        beamLength: 25,
        endPt: { x: 0, y: 0 }
      },
      {
        dotIdx: Math.floor((dots.length * 2) / 3),
        startTime: null,
        offsetMs: STAGGER_OFFSET * 2,
        totalLength: 100,
        beamLength: 25,
        endPt: { x: 0, y: 0 }
      }
    ];

    const setupChannel = (c) => {
      const state = channelState[c];
      const dot = dots[state.dotIdx % dots.length];
      if (!dot) return;

      const startPt = projectPoint(dot.start.lat, dot.start.lng);
      const endPt = projectPoint(dot.end.lat, dot.end.lng);
      state.endPt = endPt;

      const pathD = createCurvedPath(startPt, endPt);
      const pathEl = pathRefs[c].current;
      const beamEl = beamRefs[c].current;
      const headEl = headRefs[c].current;
      const ringEl = ringRefs[c].current;

      if (pathEl && beamEl) {
        pathEl.setAttribute("d", pathD);
        beamEl.setAttribute("d", pathD);
        state.totalLength = pathEl.getTotalLength() || 100;
        state.beamLength = Math.max(state.totalLength * 0.32, 12);

        beamEl.setAttribute("stroke-dasharray", `0 ${state.totalLength * 3}`);
        beamEl.setAttribute("stroke-dashoffset", "0");
      }
      if (headEl) headEl.setAttribute("opacity", "0");
      if (ringEl) {
        ringEl.setAttribute("cx", String(endPt.x));
        ringEl.setAttribute("cy", String(endPt.y));
        ringEl.setAttribute("opacity", "0");
        ringEl.setAttribute("r", "0.8");
      }
    };

    // Initial setup for all 3 channels
    for (let c = 0; c < NUM_CONCURRENT; c++) {
      setupChannel(c);
    }

    const step = (timestamp) => {
      for (let c = 0; c < NUM_CONCURRENT; c++) {
        const state = channelState[c];
        const pathEl = pathRefs[c].current;
        const beamEl = beamRefs[c].current;
        const headEl = headRefs[c].current;
        const ringEl = ringRefs[c].current;

        if (!pathEl || !beamEl) continue;

        if (state.startTime === null) {
          state.startTime = timestamp + state.offsetMs;
        }

        const elapsed = timestamp - state.startTime;

        if (elapsed < 0) {
          // Channel is waiting for initial stagger delay
          continue;
        }

        if (elapsed < FLIGHT_DURATION) {
          const p = elapsed / FLIGHT_DURATION; // 0 to 1

          // Smooth aerodynamic easing
          const easedP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

          // Head and tail distance along the arc
          const dHead = easedP * (state.totalLength + state.beamLength);
          const dTail = dHead - state.beamLength;

          const s0 = Math.max(0, dTail);
          const s1 = Math.min(state.totalLength, dHead);
          const visibleDash = Math.max(0, s1 - s0);

          // Update beam segment (moves along curve)
          beamEl.setAttribute("stroke-dasharray", `${visibleDash} ${state.totalLength * 3}`);
          beamEl.setAttribute("stroke-dashoffset", `${-s0}`);

          // Update Leading Comet Head Particle
          if (headEl) {
            if (s1 > 0 && s1 < state.totalLength) {
              const pt = pathEl.getPointAtLength(s1);
              headEl.setAttribute("cx", String(pt.x));
              headEl.setAttribute("cy", String(pt.y));
              headEl.setAttribute("opacity", "1");
            } else {
              headEl.setAttribute("opacity", "0");
            }
          }

          // Destination Impact Wave
          if (ringEl && dHead >= state.totalLength * 0.82) {
            const impactProgress = (dHead - state.totalLength * 0.82) / ((state.totalLength + state.beamLength) - state.totalLength * 0.82);
            const ringR = 0.8 + impactProgress * 4.2;
            const ringOp = Math.max(0, 0.9 * (1 - impactProgress));
            ringEl.setAttribute("r", String(ringR));
            ringEl.setAttribute("opacity", String(ringOp));
          }
        } else if (elapsed < TOTAL_CYCLE) {
          // Pause phase: beam has finished entering destination and disappeared
          beamEl.setAttribute("stroke-dasharray", `0 ${state.totalLength * 3}`);
          if (headEl) headEl.setAttribute("opacity", "0");
          if (ringEl) ringEl.setAttribute("opacity", "0");
        } else {
          // Cycle complete for this channel! Advance to next destination in partition
          state.dotIdx = (state.dotIdx + 1) % dots.length;
          state.startTime = timestamp;
          setupChannel(c);
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [dots, mapInstance]);

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

        {/* 3 CONCURRENT BEAM CHANNELS */}
        {[0, 1, 2].map((c) => (
          <g key={`channel-${c}`}>
            {/* Hidden guide path used for math length and getPointAtLength */}
            <path
              ref={pathRefs[c]}
              fill="none"
              stroke="none"
              style={{ display: "none" }}
            />

            {/* ACTIVE LAUNCHING BEAM: Single comet/dash shooting from India, traveling, and vanishing */}
            <path
              ref={beamRefs[c]}
              fill="none"
              stroke="url(#comet-gradient)"
              strokeWidth="0.8"
              strokeLinecap="round"
              style={{ filter: "url(#comet-glow)" }}
            />

            {/* COMET HEAD PARTICLE: Bright leading tip of the flying beam */}
            <circle
              ref={headRefs[c]}
              r="1.1"
              fill="#FFFFFF"
              stroke="#38BDF8"
              strokeWidth="0.5"
              opacity="0"
              style={{ filter: "url(#comet-glow)" }}
            />

            {/* DESTINATION IMPACT WAVE: Expanding ring triggered on arrival */}
            <circle
              ref={ringRefs[c]}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="0.45"
              opacity="0"
            />
          </g>
        ))}

        {/* Global Destination Pins & Central India HQ Radar */}
        {uniquePoints.map((point, i) => {
          const pt = projectPoint(point.lat, point.lng);
          const isHQ = point.isHQ;

          return (
            <g key={`marker-${i}`} style={{ cursor: "pointer" }}>
              <title>{point.label || `Lat: ${point.lat}, Lng: ${point.lng}`}</title>
              
              {/* Static Pin Core */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHQ ? "1.2" : "0.6"}
                fill={isHQ ? "#0169A9" : "#0284C7"}
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
