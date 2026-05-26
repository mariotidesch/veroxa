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

// Order shown on the page (left→right, top→bottom)
const ORDER = [
  "solare",
  "eolica",
  "idroelettrica",
  "nucleare",
  "geotermica",
  "termica",
  "chimica",
  "meccanica",
  "elettrica",
];

// Friendly "machinery" label for each energy
const MACHINERY: Record<string, string> = {
  solare:        "Pannello Solare",
  eolica:        "Turbina Eolica",
  idroelettrica: "Diga Idroelettrica",
  nucleare:      "Reattore Nucleare",
  geotermica:    "Centrale Geotermica",
  termica:       "Centrale Termoelettrica",
  chimica:       "Batteria / Combustione",
  meccanica:     "Motore Meccanico",
  elettrica:     "Generatore Elettrico",
};

// Solid hex color per energy (matches existing palette)
const COLORS: Record<string, string> = {
  solare:        "#f59e0b",
  eolica:        "#22d3ee",
  idroelettrica: "#3b82f6",
  nucleare:      "#22c55e",
  geotermica:    "#ef4444",
  termica:       "#f97316",
  chimica:       "#a855f7",
  meccanica:     "#60a5fa",
  elettrica:     "#facc15",
};

export default function Panorama() {
  const [, setLocation] = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyType | null>(null);

  const orderedEnergies = ORDER
    .map((id) => energies.find((e) => e.id === id))
    .filter((e): e is EnergyType => Boolean(e));

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

      {/* ── Machinery grid ── */}
      <div className="relative z-10 flex-1 h-[calc(100vh-72px)] flex flex-col items-center justify-center px-4 py-6 overflow-y-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/65 text-sm md:text-base text-center mb-6 max-w-2xl"
        >
          Clicca su un macchinario per scoprire la sua fonte di energia
        </motion.p>

        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl w-full">
          {orderedEnergies.map((energy, i) => {
            const Icon = ICONS[energy.icon] ?? Zap;
            const color = COLORS[energy.id] ?? "#facc15";
            const machinery = MACHINERY[energy.id] ?? energy.name;

            return (
              <motion.button
                key={energy.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.06, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedEnergy(energy)}
                data-testid={`machine-${energy.id}`}
                className="group relative flex flex-col items-center justify-center gap-2 p-4 md:p-5 rounded-2xl backdrop-blur-md transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${color}22, rgba(0,0,0,0.45))`,
                  border: `1px solid ${color}55`,
                  boxShadow: `0 6px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset`,
                }}
              >
                {/* Glowing icon circle */}
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${color}, ${color}99)`,
                    boxShadow: `0 0 24px ${color}88, 0 4px 12px rgba(0,0,0,0.4)`,
                  }}
                >
                  <Icon size={28} className="text-white drop-shadow" strokeWidth={2.2} />
                </div>

                {/* Machinery label */}
                <div className="text-center mt-1">
                  <div className="text-white font-bold text-sm md:text-base leading-tight">
                    {machinery}
                  </div>
                  <div
                    className="text-[11px] md:text-xs font-semibold mt-0.5 uppercase tracking-wide"
                    style={{ color }}
                  >
                    Energia {energy.name.replace("Energia ", "")}
                  </div>
                </div>

                {/* Subtle "click for info" pill */}
                <div
                  className="text-[9px] md:text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
                >
                  scopri di più
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Energy info panel slides in */}
      <EnergyPanel energy={selectedEnergy} onClose={() => setSelectedEnergy(null)} />

      {/* Welcome splash overlay */}
      {showSplash && <SplashScreen onStart={() => setShowSplash(false)} />}
    </div>
  );
}
