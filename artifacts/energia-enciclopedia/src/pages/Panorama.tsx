import { useState } from "react";
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

const HOTSPOTS: Hotspot[] = [
  { id: "solare",        machinery: "Pannello Solare",           x: 14, y: 28, color: "#f59e0b" },
  { id: "eolica",        machinery: "Turbina Eolica",            x: 32, y: 45, color: "#22d3ee" },
  { id: "idroelettrica", machinery: "Diga Idroelettrica",        x: 48, y: 55, color: "#3b82f6" },
  { id: "nucleare",      machinery: "Reattore Nucleare",         x: 66, y: 48, color: "#22c55e" },
  { id: "geotermica",    machinery: "Centrale Geotermica",       x: 82, y: 40, color: "#ef4444" },
  { id: "termica",       machinery: "Centrale Termoelettrica",   x: 22, y: 72, color: "#f97316" },
  { id: "chimica",       machinery: "Batteria / Combustione",    x: 40, y: 78, color: "#a855f7" },
  { id: "meccanica",     machinery: "Motore Meccanico",          x: 60, y: 78, color: "#60a5fa" },
  { id: "elettrica",     machinery: "Generatore Elettrico",      x: 78, y: 72, color: "#facc15" },
];

export default function Panorama() {
  const [, setLocation] = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyType | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0c1445" }}>
      {/* ── Background video (loop) ── */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,40,0.78) 0%, rgba(8,12,40,0.55) 35%, rgba(8,12,40,0.78) 100%)",
        }}
      />

      {/* ── Header ── */}
      <div
        className="relative z-10 flex items-center px-4 py-2"
        style={{ background: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center pr-4">
          <img
            src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
            alt="Istituto San Leone Magno"
            className="h-10 w-auto object-contain"
            style={{ opacity: 0.85 }}
          />
        </div>

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

        <div className="flex items-center gap-3 pl-4">
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

      {/* ── Hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
          style={{
            background: "rgba(0,0,0,0.45)",
            color: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          Clicca i puntini sui macchinari per scoprire l'energia
        </span>
      </motion.div>

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
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
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
