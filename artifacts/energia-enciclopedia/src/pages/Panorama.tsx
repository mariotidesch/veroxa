import { useState } from "react";
import { motion } from "framer-motion";
import { energies, EnergyType } from "@/data/energie";
import EnergyPanel from "@/components/EnergyPanel";

function SchoolLogo() {
  return (
    <div className="flex flex-col items-end gap-1">
      <img
        src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
        alt="Istituto San Leone Magno"
        className="h-12 w-auto object-contain"
        style={{ opacity: 0.85 }}
      />
    </div>
  );
}

type ZoneConfig = {
  id: string;
  label: string;
  hotspotX: number;
  hotspotY: number;
  color: string;
};

const zones: ZoneConfig[] = [
  { id: "solare",        label: "Solare",         hotspotX: 12,  hotspotY: 22, color: "#f59e0b" },
  { id: "eolica",        label: "Eolica",          hotspotX: 28,  hotspotY: 50, color: "#22d3ee" },
  { id: "idroelettrica", label: "Idroelettrica",   hotspotX: 46,  hotspotY: 55, color: "#3b82f6" },
  { id: "nucleare",      label: "Nucleare",        hotspotX: 64,  hotspotY: 52, color: "#22c55e" },
  { id: "geotermica",    label: "Geotermica",      hotspotX: 80,  hotspotY: 42, color: "#ef4444" },
  { id: "termica",       label: "Termica",         hotspotX: 20,  hotspotY: 68, color: "#f97316" },
  { id: "chimica",       label: "Chimica",         hotspotX: 38,  hotspotY: 70, color: "#a855f7" },
  { id: "meccanica",     label: "Meccanica",       hotspotX: 58,  hotspotY: 72, color: "#60a5fa" },
  { id: "elettrica",     label: "Elettrica",       hotspotX: 76,  hotspotY: 70, color: "#facc15" },
];

export default function Panorama() {
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyType | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const handleZoneClick = (zoneId: string) => {
    const energy = energies.find(e => e.id === zoneId);
    if (energy) setSelectedEnergy(energy);
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col" style={{ background: "#0c1445" }}>
      {/* Header */}
      <div className="relative z-10 flex items-center px-4 py-2" style={{ background: "rgba(0,0,0,0.35)" }}>
        {/* Left: school logo */}
        <div className="flex items-center pr-4">
          <img
            src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
            alt="Istituto San Leone Magno"
            className="h-10 w-auto object-contain"
            style={{ opacity: 0.85 }}
          />
        </div>

        {/* Center: title */}
        <div className="flex-1 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight"
          >
            EnergiApp
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/70 text-sm md:text-base font-medium"
          >
            Progetto di Tedeschi · Classe 3A
          </motion.p>
        </div>

        {/* Right: student name + class */}
        <div className="flex flex-col items-end leading-tight pl-4">
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.38)" }}>
            Mario Tedeschi
          </span>
          <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.28)" }}>
            Classe 3A
          </span>
        </div>
      </div>

      {/* Panoramic Scene — fills remaining space */}
      <div className="relative flex-1 w-full">
        <svg
          viewBox="0 0 100 80"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          style={{ display: "block" }}
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c1445" />
              <stop offset="40%" stopColor="#1e3a6e" />
              <stop offset="100%" stopColor="#2d6a8f" />
            </linearGradient>
            <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d5a1b" />
              <stop offset="100%" stopColor="#1a3d0f" />
            </linearGradient>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="volcanoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>
            <linearGradient id="lavaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.4" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width="100" height="55" fill="url(#skyGrad)" />

          {/* Stars */}
          {[
            [5,3],[12,5],[20,2],[30,4],[45,2],[55,5],[65,3],[75,2],[85,4],[92,3],
            [8,8],[18,7],[38,6],[50,8],[70,7],[88,8],[95,5]
          ].map(([sx,sy],i) => (
            <circle key={i} cx={sx} cy={sy} r="0.15" fill="white" opacity="0.7" />
          ))}

          {/* Clouds */}
          <g className="cloud-anim" style={{ transformOrigin: "25px 10px" }}>
            <ellipse cx="22" cy="11" rx="4" ry="1.5" fill="white" opacity="0.15" />
            <ellipse cx="24" cy="10.2" rx="2.5" ry="1.8" fill="white" opacity="0.12" />
          </g>
          <g className="cloud-anim-slow" style={{ transformOrigin: "60px 8px" }}>
            <ellipse cx="60" cy="9" rx="5" ry="1.8" fill="white" opacity="0.12" />
            <ellipse cx="63" cy="8" rx="3" ry="2" fill="white" opacity="0.10" />
          </g>

          {/* SOLAR ZONE */}
          <rect x="0" y="48" width="18" height="32" fill="#c2845a" />
          <rect x="0" y="52" width="18" height="4" fill="#d4915f" opacity="0.5" />
          <g className="solar-anim" style={{ transformOrigin: "11px 13px" }}>
            <circle cx="11" cy="13" r="3.5" fill="url(#sunGrad)" />
            {[0,45,90,135,180,225,270,315].map((angle,i) => (
              <line key={i}
                x1={11 + 4 * Math.cos(angle * Math.PI/180)}
                y1={13 + 4 * Math.sin(angle * Math.PI/180)}
                x2={11 + 5.5 * Math.cos(angle * Math.PI/180)}
                y2={13 + 5.5 * Math.sin(angle * Math.PI/180)}
                stroke="#fbbf24" strokeWidth="0.25" strokeLinecap="round"
              />
            ))}
          </g>
          {[2, 5, 8, 11].map((px, i) => (
            <g key={i}>
              <rect x={px} y="49" width="2" height="1.2" fill="#1e40af" stroke="#3b82f6" strokeWidth="0.08" rx="0.1" />
              <rect x={px} y="50.2" width="2" height="1.2" fill="#1e40af" stroke="#3b82f6" strokeWidth="0.08" rx="0.1" />
              <line x1={px+1} y1="49" x2={px+1} y2="51.5" stroke="#374151" strokeWidth="0.1" />
            </g>
          ))}

          {/* WIND ZONE */}
          <path d="M18 55 Q25 42 32 55 Z" fill="#2d5a1b" />
          <path d="M16 55 Q22 44 28 55 Z" fill="#3a6b20" />
          <rect x="18" y="55" width="14" height="25" fill="#2d5a1b" />
          {[22, 27].map((tx, i) => (
            <g key={i}>
              <line x1={tx} y1="43" x2={tx} y2="55" stroke="#94a3b8" strokeWidth="0.25" />
              <g className={i === 0 ? "turbine-spin" : "turbine-spin-slow"}
                 style={{ transformOrigin: `${tx}px 43px` }}>
                <line x1={tx} y1="43" x2={tx} y2="39.5" stroke="#e2e8f0" strokeWidth="0.2" />
                <line x1={tx} y1="43" x2={tx + 3.12} y2="44.8" stroke="#e2e8f0" strokeWidth="0.2" />
                <line x1={tx} y1="43" x2={tx - 3.12} y2="44.8" stroke="#e2e8f0" strokeWidth="0.2" />
              </g>
              <circle cx={tx} cy="43" r="0.35" fill="#cbd5e1" />
            </g>
          ))}

          {/* HYDRO ZONE */}
          <path d="M32 55 L42 30 L52 55 Z" fill="url(#mountainGrad)" />
          <path d="M34 55 L42 32 L50 55 Z" fill="#475569" opacity="0.5" />
          <path d="M40 30 L42 25 L44 30 Z" fill="white" opacity="0.9" />
          <rect x="43" y="44" width="3" height="11" fill="#78716c" />
          <rect x="43" y="44" width="3" height="11" fill="#a8a29e" opacity="0.3" />
          <ellipse cx="39" cy="44" rx="7" ry="2" fill="#1e4d8c" className="water-anim" />
          <path d="M46 48 Q50 52 52 55 Q56 58 58 60" stroke="#3b82f6" strokeWidth="0.8" fill="none" opacity="0.8" className="water-anim" />

          {/* NUCLEAR ZONE */}
          <rect x="54" y="50" width="18" height="30" fill="#0d2b5e" className="water-anim" />
          <path d="M54 50 Q58 48 62 50 Q66 52 70 50 Q74 48 72 50" stroke="#3b82f6" strokeWidth="0.3" fill="none" opacity="0.5" />
          <rect x="56" y="44" width="5" height="8" fill="#6b7280" />
          <rect x="62" y="40" width="4" height="12" fill="#9ca3af" />
          <path d="M57.5 36 Q58.5 42 59.5 42 Q60.5 42 61.5 36 Z" fill="#d1d5db" />
          <path d="M63.5 32 Q64.5 39 65.5 39 Q66.5 39 67.5 32 Z" fill="#e5e7eb" />
          <ellipse cx="59.5" cy="35.5" rx="1.2" ry="0.6" fill="white" opacity="0.3" />
          <ellipse cx="65.5" cy="31.5" rx="1.5" ry="0.7" fill="white" opacity="0.25" />
          <circle cx="64" cy="38" r="0.6" fill="none" stroke="#22c55e" strokeWidth="0.15" opacity="0.6" />

          {/* GEOTHERMAL ZONE */}
          <path d="M72 55 L80 30 L88 55 Z" fill="url(#volcanoGrad)" />
          <path d="M74 55 L80 33 L86 55 Z" fill="#991b1b" opacity="0.4" />
          <ellipse cx="80" cy="30" rx="2.5" ry="1" fill="#f97316" className="lava-anim" />
          <ellipse cx="80" cy="30" rx="1.5" ry="0.6" fill="#fbbf24" opacity="0.8" />
          <path d="M79 31 Q78 36 77 40 Q76 44 77 48" stroke="url(#lavaGrad)" strokeWidth="0.6" fill="none" opacity="0.7" />
          <ellipse cx="80" cy="27" rx="1" ry="1.5" fill="#9ca3af" opacity="0.3" />
          <ellipse cx="79" cy="25" rx="0.8" ry="1" fill="#9ca3af" opacity="0.2" />
          <ellipse cx="85" cy="52" rx="2" ry="0.8" fill="#60a5fa" opacity="0.6" className="water-anim" />
          <ellipse cx="88" cy="53" rx="1.5" ry="0.6" fill="#93c5fd" opacity="0.5" />

          {/* GROUND */}
          <rect x="0" y="55" width="100" height="25" fill="url(#groundGrad)" />
          <path d="M0 57 Q10 56 20 57 Q30 58 40 57 Q50 56 60 57 Q70 58 80 57 Q90 56 100 57" stroke="#1a3d0f" strokeWidth="0.3" fill="none" opacity="0.4" />

          {/* THERMAL ZONE */}
          <rect x="8" y="52" width="6" height="7" fill="#374151" />
          <rect x="10" y="50" width="2" height="5" fill="#4b5563" />
          <rect x="9" y="47" width="1.2" height="5" fill="#6b7280" />
          <rect x="12" y="45" width="1.2" height="7" fill="#6b7280" />
          <ellipse cx="9.6" cy="46.5" rx="0.8" ry="0.5" fill="#9ca3af" opacity="0.4" />
          <ellipse cx="12.6" cy="44.5" rx="0.8" ry="0.5" fill="#9ca3af" opacity="0.3" />
          <path d="M9.5 55 Q10.5 52 11.5 55 Q12 53 12.5 55" fill="#f97316" opacity="0.8" />

          {/* CHEMICAL ZONE */}
          <rect x="29" y="53" width="7" height="6" fill="#374151" />
          {[30, 33, 36].map((tx, i) => (
            <g key={i}>
              <rect x={tx} y="50" width="1.8" height="3.5" rx="0.3" fill={i === 0 ? "#7c3aed" : i === 1 ? "#2563eb" : "#059669"} opacity="0.9" />
              <rect x={tx} y="50" width="1.8" height="0.5" rx="0.2" fill="white" opacity="0.2" />
            </g>
          ))}
          <path d="M31 52 H34 H37" stroke="#6b7280" strokeWidth="0.2" fill="none" />
          <circle cx="33" cy="49.5" r="0.2" fill="#a855f7" opacity="0.7" />
          <circle cx="34.5" cy="48.8" r="0.15" fill="#60a5fa" opacity="0.6" />
          <circle cx="32" cy="48.5" r="0.18" fill="#34d399" opacity="0.6" />

          {/* MECHANICAL ZONE */}
          <circle cx="54" cy="56" r="4" fill="none" stroke="#64748b" strokeWidth="0.4" />
          <circle cx="54" cy="56" r="2.5" fill="none" stroke="#64748b" strokeWidth="0.3" />
          <circle cx="54" cy="56" r="0.5" fill="#64748b" />
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
            <rect key={i}
              x={54 + 3.6 * Math.cos(a * Math.PI/180) - 0.3}
              y={56 + 3.6 * Math.sin(a * Math.PI/180) - 0.7}
              width="0.6" height="1.4"
              fill="#475569"
              transform={`rotate(${a} ${54 + 3.6 * Math.cos(a * Math.PI/180)} ${56 + 3.6 * Math.sin(a * Math.PI/180)})`}
            />
          ))}
          <circle cx="60" cy="57" r="2" fill="none" stroke="#64748b" strokeWidth="0.3" />
          <circle cx="60" cy="57" r="0.4" fill="#64748b" />
          <line x1="50" y1="52" x2="52" y2="62" stroke="#94a3b8" strokeWidth="0.25" />
          <circle cx="52" cy="62.5" r="0.8" fill="#94a3b8" />
          <path d="M44 61 Q47 58 50 61" stroke="#f59e0b" strokeWidth="0.3" fill="none" />

          {/* ELECTRIC ZONE */}
          {[68,71,73.5,76,78.5,81].map((bx, i) => (
            <rect key={i} x={bx} y={56 - i % 3 * 3} width="2.2" height={6 + i % 3 * 3} fill={`hsl(${220 + i*10}, 20%, ${25 + i*3}%)`} />
          ))}
          {[69,72,74.5,77].map((bx, i) => [58,60,62].map((by, j) => (
            <rect key={`${i}-${j}`} x={bx} y={by} width="0.5" height="0.5" fill="#fbbf24" opacity="0.9" />
          )))}
          <g>
            <line x1="84" y1="45" x2="84" y2="62" stroke="#94a3b8" strokeWidth="0.25" />
            <line x1="82.5" y1="47" x2="85.5" y2="47" stroke="#94a3b8" strokeWidth="0.2" />
            <line x1="82.8" y1="49" x2="85.2" y2="49" stroke="#94a3b8" strokeWidth="0.2" />
          </g>
          <g>
            <line x1="88" y1="42" x2="88" y2="62" stroke="#94a3b8" strokeWidth="0.25" />
            <line x1="86.5" y1="44" x2="89.5" y2="44" stroke="#94a3b8" strokeWidth="0.2" />
            <line x1="86.8" y1="46" x2="89.2" y2="46" stroke="#94a3b8" strokeWidth="0.2" />
          </g>
          <path d="M82.5 47 Q86 50 86.5 44" stroke="#94a3b8" strokeWidth="0.12" fill="none" />
          <path d="M82.8 49 Q86.2 52 86.8 46" stroke="#94a3b8" strokeWidth="0.12" fill="none" />
          <path d="M91 46 L90 50 L91.5 50 L90.5 54" stroke="#fbbf24" strokeWidth="0.3" fill="none" className="spark-anim" />

          {/* INTERACTIVE HOTSPOTS */}
          {zones.map((zone) => {
            const isHovered = hoveredZone === zone.id;
            return (
              <g key={zone.id}
                onClick={() => handleZoneClick(zone.id)}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                style={{ cursor: "pointer" }}
                data-testid={`zone-${zone.id}`}
              >
                {/* Main hotspot circle */}
                <circle
                  cx={zone.hotspotX}
                  cy={zone.hotspotY}
                  r={isHovered ? "1.6" : "1.3"}
                  fill={zone.color}
                  opacity={isHovered ? 1 : 0.9}
                  filter="url(#glow)"
                />
                {/* Plus icon */}
                <line x1={zone.hotspotX - 0.55} y1={zone.hotspotY} x2={zone.hotspotX + 0.55} y2={zone.hotspotY}
                  stroke="white" strokeWidth="0.22" strokeLinecap="round" />
                <line x1={zone.hotspotX} y1={zone.hotspotY - 0.55} x2={zone.hotspotX} y2={zone.hotspotY + 0.55}
                  stroke="white" strokeWidth="0.22" strokeLinecap="round" />
                {/* Label on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={zone.hotspotX - 4}
                      y={zone.hotspotY - 4}
                      width="8"
                      height="2"
                      rx="0.5"
                      fill="rgba(0,0,0,0.75)"
                    />
                    <text
                      x={zone.hotspotX}
                      y={zone.hotspotY - 2.6}
                      textAnchor="middle"
                      fill="white"
                      fontSize="1.2"
                      fontWeight="bold"
                      fontFamily="Inter, sans-serif"
                    >
                      {zone.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <EnergyPanel energy={selectedEnergy} onClose={() => setSelectedEnergy(null)} />
    </div>
  );
}
