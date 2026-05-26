import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Zap, Atom, Cog, Flame, FlaskConical, Wind, Droplets, Sun, Mountain,
  type LucideIcon,
} from "lucide-react";
import { energies, EnergyType } from "@/data/energie";
import EnergyPanel from "@/components/EnergyPanel";
import SplashScreen from "@/components/SplashScreen";
import bgVideo from "@assets/Scene_Builder_-_Scene_1779818958401.mp4";

const ICONS: Record<string, LucideIcon> = {
  Atom, Zap, Cog, Flame, FlaskConical, Wind, Droplets, Sun, Mountain,
};

// Hotspot config: position over the video (% of width/height), label, color.
// Positions can be tweaked later to match exactly the machinery visible in the video.
type Hotspot = {
  id: string;
  machinery: string;
  x: number;       // percent from left
  y: number;       // percent from top
  color: string;
};

// Positions match the actual machinery visible in the looping video.
const HOTSPOTS: Hotspot[] = [
  { id: "nucleare",      machinery: "Centrale Nucleare",         x: 10, y: 27, color: "#22c55e" },
  { id: "elettrica",     machinery: "Tralicci Alta Tensione",    x: 22, y: 34, color: "#facc15" },
  { id: "termica",       machinery: "Centrale Termoelettrica",   x: 34, y: 47, color: "#f97316" },
  { id: "eolica",        machinery: "Turbine Eoliche",           x: 73, y: 18, color: "#22d3ee" },
  { id: "idroelettrica", machinery: "Diga Idroelettrica",        x: 65, y: 53, color: "#3b82f6" },
  { id: "solare",        machinery: "Pannelli Solari",           x: 92, y: 50, color: "#f59e0b" },
  { id: "meccanica",     machinery: "Ingranaggi Meccanici",      x: 10, y: 78, color: "#60a5fa" },
  { id: "chimica",       machinery: "Idrogeno / Batterie",       x: 40, y: 82, color: "#a855f7" },
  { id: "geotermica",    machinery: "Sorgenti Geotermiche",      x: 82, y: 92, color: "#ef4444" },
];

// Intrinsic video aspect ratio (1916x1080 ≈ 16:9).
const VIDEO_W = 1916;
const VIDEO_H = 1080;

export default function Panorama() {
  const [, setLocation] = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyType | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Track the actual rendered video rect so hotspots stay anchored to machinery
  // even with object-contain letterboxing on non-16:9 viewports.
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoRect, setVideoRect] = useState({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      const videoRatio = VIDEO_W / VIDEO_H;
      const containerRatio = cw / ch;
      let w: number, h: number, left: number, top: number;
      if (containerRatio > videoRatio) {
        // Container wider → letterbox left/right
        h = ch;
        w = ch * videoRatio;
        left = (cw - w) / 2;
        top = 0;
      } else {
        // Container taller → letterbox top/bottom
        w = cw;
        h = cw / videoRatio;
        left = 0;
        top = (ch - h) / 2;
      }
      setVideoRect({ left, top, width: w, height: h });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden" style={{ background: "#0c1445" }}>
      {/* ── Background video (loop, full visible, no crop) ── */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
        style={{ background: "#000" }}
      />
      {/* Very light overlay — keeps video bright */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* ── Header ── */}
      <div
        className="relative z-10 flex items-center px-4 py-2 overflow-hidden"
        style={{ background: "#000", borderBottom: "1px solid rgba(250,204,21,0.25)" }}
      >
        {/* Decorative energy icons sprinkled in the background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-around opacity-[0.09]">
          {[
            { Icon: Sun,          color: "#f59e0b" },
            { Icon: Wind,         color: "#22d3ee" },
            { Icon: Droplets,     color: "#3b82f6" },
            { Icon: Atom,         color: "#22c55e" },
            { Icon: Mountain,     color: "#ef4444" },
            { Icon: Flame,        color: "#f97316" },
            { Icon: FlaskConical, color: "#a855f7" },
            { Icon: Cog,          color: "#60a5fa" },
            { Icon: Zap,          color: "#facc15" },
          ].map(({ Icon, color }, i) => (
            <Icon key={i} size={28} style={{ color }} strokeWidth={1.5} />
          ))}
        </div>

        <div className="relative flex items-center pr-4">
          <img
            src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
            alt="Istituto San Leone Magno"
            className="h-10 w-auto object-contain"
            style={{ opacity: 0.95 }}
          />
        </div>

        <div className="relative flex-1 text-center">
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

        <div className="relative flex items-center gap-3 pl-4">
          <button
            onClick={() => setLocation("/calcolatrice")}
            data-testid="button-calcolatrice"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
            style={{ background: "rgba(250,204,21,0.18)", border: "1px solid rgba(250,204,21,0.45)", color: "#facc15" }}
          >
            <Zap size={13} />
            Calcolatrice
          </button>
          <div className="flex flex-col items-end leading-tight">
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.38)" }}>
              Mario Tedeschi
            </span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.28)" }}>
              Classe 3A
            </span>
          </div>
        </div>
      </div>

      {/* ── Small dot hotspots over the video ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {HOTSPOTS.map((h, i) => {
          const energy = energies.find((e) => e.id === h.id);
          if (!energy) return null;
          const Icon = ICONS[energy.icon] ?? Zap;
          const isHovered = hoveredId === h.id;

          return (
            <motion.button
              key={h.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200 }}
              onClick={() => setSelectedEnergy(energy)}
              onMouseEnter={() => setHoveredId(h.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-testid={`hotspot-${h.id}`}
              className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2"
              style={{
                left: videoRect.left + (h.x / 100) * videoRect.width,
                top: videoRect.top + (h.y / 100) * videoRect.height,
              }}
            >
              {/* Pulsing outer ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: h.color,
                  opacity: 0.35,
                  animationDuration: "2.2s",
                }}
              />
              {/* Solid dot with icon */}
              <span
                className="relative flex items-center justify-center w-9 h-9 rounded-full transition-transform hover:scale-125 active:scale-95"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${h.color}, ${h.color}cc)`,
                  border: "2px solid rgba(255,255,255,0.85)",
                  boxShadow: `0 0 14px ${h.color}, 0 2px 6px rgba(0,0,0,0.5)`,
                }}
              >
                <Icon size={16} className="text-white drop-shadow" strokeWidth={2.5} />
              </span>

              {/* Tooltip on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap px-2.5 py-1 rounded-md text-xs font-bold pointer-events-none"
                  style={{
                    background: "rgba(0,0,0,0.85)",
                    color: h.color,
                    border: `1px solid ${h.color}88`,
                  }}
                >
                  {h.machinery}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Energy info panel slides in */}
      <EnergyPanel energy={selectedEnergy} onClose={() => setSelectedEnergy(null)} />

      {/* Welcome splash overlay */}
      {showSplash && <SplashScreen onStart={() => setShowSplash(false)} />}
    </div>
  );
}
