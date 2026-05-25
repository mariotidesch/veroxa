import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onStart: () => void;
}

const ENERGY_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 6,
  duration: 3 + Math.random() * 5,
  delay: Math.random() * 4,
  color: ["#fbbf24", "#60a5fa", "#34d399", "#f87171", "#a78bfa", "#fb923c"][i % 6],
}));

const LIGHTNING_BOLTS = [
  { x1: 15, y1: 0, points: "15,0 12,18 17,18 13,38", delay: 0 },
  { x1: 85, y1: 5, points: "85,5 82,22 87,22 83,42", delay: 1.4 },
  { x1: 50, y1: 2, points: "50,2 47,16 52,16 48,30", delay: 2.7 },
  { x1: 30, y1: 8, points: "30,8 27,24 32,24 28,40", delay: 0.8 },
  { x1: 70, y1: 3, points: "70,3 67,20 72,20 68,36", delay: 2.1 },
];

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  const handleStart = () => {
    setVisible(false);
    setTimeout(onStart, 600);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#04091f" }}
        >
          {/* ── Animated SVG background ── */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="atomGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sunGlowSpl" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lavaGlowSpl" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>

              <style>{`
                @keyframes orbit1 {
                  from { transform: rotate(0deg) translateX(18px) rotate(0deg); }
                  to   { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
                }
                @keyframes orbit2 {
                  from { transform: rotate(60deg) translateX(24px) rotate(-60deg); }
                  to   { transform: rotate(420deg) translateX(24px) rotate(-420deg); }
                }
                @keyframes orbit3 {
                  from { transform: rotate(120deg) translateX(30px) rotate(-120deg); }
                  to   { transform: rotate(480deg) translateX(30px) rotate(-480deg); }
                }
                @keyframes atomSpin {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
                @keyframes atomSpin2 {
                  from { transform: rotate(60deg); }
                  to   { transform: rotate(420deg); }
                }
                @keyframes atomSpin3 {
                  from { transform: rotate(120deg); }
                  to   { transform: rotate(480deg); }
                }
                @keyframes pulseBig {
                  0%,100% { opacity:0.15; r:16; }
                  50%     { opacity:0.32; r:18; }
                }
                @keyframes boltFlash {
                  0%,85%,100% { opacity:0; }
                  87%,97%     { opacity:0.85; }
                }
                @keyframes floatUp {
                  0%   { transform: translateY(0px); opacity:0.7; }
                  100% { transform: translateY(-80px); opacity:0; }
                }
                @keyframes waveMove {
                  0%   { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes sunRotate {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
                @keyframes turbineSpin {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
              `}</style>
            </defs>

            {/* Deep space background */}
            <rect width="100" height="100" fill="#04091f" />

            {/* Stars */}
            {[
              [8,5],[15,12],[25,4],[35,8],[48,3],[60,7],[72,4],[82,9],[92,5],
              [5,20],[18,25],[32,18],[55,22],[68,15],[80,20],[95,18],
              [10,40],[28,35],[45,38],[62,33],[78,37],[90,42],
              [3,55],[20,60],[38,52],[58,58],[75,55],[88,58],
              [7,75],[22,80],[40,72],[60,77],[77,73],[93,78],
            ].map(([sx, sy], i) => (
              <circle key={i} cx={sx} cy={sy} r={Math.random() > 0.7 ? 0.25 : 0.12} fill="white" opacity={0.4 + Math.random() * 0.5} />
            ))}

            {/* ── Atom at center-left ── */}
            <g transform="translate(22, 42)">
              <circle cx="0" cy="0" r="16" fill="url(#atomGlow)" style={{ animation: "pulseBig 3s ease-in-out infinite" }} />
              <circle cx="0" cy="0" r="2.2" fill="#60a5fa" opacity="0.9" />
              {/* Electron orbits */}
              <g style={{ transformOrigin: "0 0", animation: "atomSpin 4s linear infinite" }}>
                <ellipse cx="0" cy="0" rx="9" ry="4" fill="none" stroke="#60a5fa" strokeWidth="0.3" opacity="0.6" />
                <circle cx="9" cy="0" r="0.8" fill="#93c5fd" />
              </g>
              <g style={{ transformOrigin: "0 0", animation: "atomSpin2 3s linear infinite" }}>
                <ellipse cx="0" cy="0" rx="9" ry="4" fill="none" stroke="#818cf8" strokeWidth="0.3" opacity="0.5"
                  transform="rotate(60)" />
                <circle cx="0" cy="0" r="0.8" fill="#a5b4fc"
                  style={{ animation: "orbit2 3s linear infinite", transformOrigin: "0 0" }} />
              </g>
              <g style={{ transformOrigin: "0 0", animation: "atomSpin3 5s linear infinite" }}>
                <ellipse cx="0" cy="0" rx="9" ry="4" fill="none" stroke="#34d399" strokeWidth="0.3" opacity="0.5"
                  transform="rotate(120)" />
                <circle cx="0" cy="0" r="0.8" fill="#6ee7b7"
                  style={{ animation: "orbit3 5s linear infinite", transformOrigin: "0 0" }} />
              </g>
            </g>

            {/* ── Sun top-right ── */}
            <g transform="translate(78, 18)">
              <circle cx="0" cy="0" r="14" fill="url(#sunGlowSpl)" />
              <g style={{ transformOrigin: "0 0", animation: "sunRotate 20s linear infinite" }}>
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
                  <line key={i}
                    x1={8.5 * Math.cos(a * Math.PI / 180)}
                    y1={8.5 * Math.sin(a * Math.PI / 180)}
                    x2={11 * Math.cos(a * Math.PI / 180)}
                    y2={11 * Math.sin(a * Math.PI / 180)}
                    stroke="#fbbf24" strokeWidth="0.4" strokeLinecap="round" opacity="0.7"
                  />
                ))}
              </g>
              <circle cx="0" cy="0" r="6" fill="#fbbf24" opacity="0.95" />
              <circle cx="0" cy="0" r="4" fill="#fef08a" opacity="0.85" />
            </g>

            {/* ── Volcano bottom-right ── */}
            <g transform="translate(88, 75)">
              <circle cx="0" cy="0" r="12" fill="url(#lavaGlowSpl)" />
              <path d="M-10,15 L0,-8 L10,15 Z" fill="#7f1d1d" opacity="0.8" />
              <ellipse cx="0" cy="-8" rx="2" ry="0.8" fill="#f97316" opacity="0.9" />
              <ellipse cx="0" cy="-8" rx="1.2" ry="0.5" fill="#fbbf24" />
            </g>

            {/* ── Wind turbine bottom-left ── */}
            <g transform="translate(12, 80)">
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#94a3b8" strokeWidth="0.4" />
              <g style={{ transformOrigin: "0 -18px", animation: "turbineSpin 2s linear infinite" }}>
                <line x1="0" y1="-18" x2="0" y2="-24" stroke="#e2e8f0" strokeWidth="0.35" />
                <line x1="0" y1="-18" x2="5.2" y2="-15" stroke="#e2e8f0" strokeWidth="0.35" />
                <line x1="0" y1="-18" x2="-5.2" y2="-15" stroke="#e2e8f0" strokeWidth="0.35" />
              </g>
            </g>

            {/* ── Energy wave lines ── */}
            <g opacity="0.12">
              <path d="M0,65 Q12,61 25,65 Q37,69 50,65 Q62,61 75,65 Q87,69 100,65" stroke="#60a5fa" strokeWidth="0.5" fill="none" />
              <path d="M0,68 Q12,64 25,68 Q37,72 50,68 Q62,64 75,68 Q87,72 100,68" stroke="#34d399" strokeWidth="0.4" fill="none" />
              <path d="M0,71 Q12,67 25,71 Q37,75 50,71 Q62,67 75,71 Q87,75 100,71" stroke="#a78bfa" strokeWidth="0.3" fill="none" />
            </g>

            {/* ── Lightning bolts ── */}
            {LIGHTNING_BOLTS.map((bolt, i) => (
              <polyline
                key={i}
                points={bolt.points}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.5"
                strokeLinejoin="round"
                opacity="0"
                style={{
                  animation: `boltFlash ${2.5 + i * 0.7}s ease-in-out infinite`,
                  animationDelay: `${bolt.delay}s`,
                }}
              />
            ))}

            {/* ── Floating energy particles ── */}
            {ENERGY_PARTICLES.map((p) => (
              <circle
                key={p.id}
                cx={`${p.x}%`}
                cy={`${p.y}%`}
                r={p.size * 0.12}
                fill={p.color}
                opacity="0.6"
                style={{
                  animation: `floatUp ${p.duration}s ease-in infinite`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}

            {/* Grid lines (subtle energy grid) */}
            <g opacity="0.04" stroke="#60a5fa" strokeWidth="0.2">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(v => (
                <g key={v}>
                  <line x1={v} y1="0" x2={v} y2="100" />
                  <line x1="0" y1={v} x2="100" y2={v} />
                </g>
              ))}
            </g>
          </svg>

          {/* ── Content overlay ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* School logo */}
            <motion.img
              src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
              alt="San Leone Magno"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="h-14 mb-6 object-contain"
            />

            {/* App title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7, type: "spring", stiffness: 120 }}
            >
              <h1
                className="text-6xl md:text-8xl font-black tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #ffffff 60%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(251,191,36,0.4))",
                }}
              >
                EnergiApp
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-3 text-base md:text-lg font-medium"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Un viaggio interattivo nel mondo dell'energia
            </motion.p>

            {/* Student info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-4 flex items-center gap-2"
            >
              <span
                className="px-3 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Progetto di Mario Tedeschi · Classe 3A
              </span>
            </motion.div>

            {/* Start button */}
            <motion.button
              onClick={handleStart}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              data-testid="button-inizia"
              className="mt-10 px-10 py-4 rounded-full text-base font-black tracking-wide text-gray-900 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                boxShadow: "0 0 40px rgba(251,191,36,0.5), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              Inizia l'esplorazione
            </motion.button>

            {/* Energy type chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-8 flex flex-wrap justify-center gap-2 max-w-md"
            >
              {[
                { label: "Solare", color: "#f59e0b" },
                { label: "Eolica", color: "#22d3ee" },
                { label: "Nucleare", color: "#22c55e" },
                { label: "Idroelettrica", color: "#3b82f6" },
                { label: "Geotermica", color: "#ef4444" },
                { label: "Chimica", color: "#a855f7" },
                { label: "Termica", color: "#f97316" },
                { label: "Meccanica", color: "#60a5fa" },
                { label: "Elettrica", color: "#facc15" },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: chip.color + "22",
                    border: `1px solid ${chip.color}55`,
                    color: chip.color,
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
