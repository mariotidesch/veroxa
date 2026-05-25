import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Zap } from "lucide-react";
import { energies, EnergyType } from "@/data/energie";
import EnergyPanel from "@/components/EnergyPanel";
import SplashScreen from "@/components/SplashScreen";
import Scene3D from "@/components/Scene3D";

const zones = [
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
  const [, setLocation] = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyType | null>(null);

  const handleZoneClick = (zoneId: string) => {
    const energy = energies.find(e => e.id === zoneId);
    if (energy) setSelectedEnergy(energy);
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col" style={{ background: "#020818" }}>
      {/* Header */}
      <div
        className="relative z-20 flex items-center px-4 py-2 flex-shrink-0"
        style={{ background: "rgba(2,8,24,0.75)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
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
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #ffffff 55%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            EnergiApp
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-sm font-medium"
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
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>Mario Tedeschi</span>
            <span className="text-xs font-medium"  style={{ color: "rgba(255,255,255,0.25)" }}>Classe 3A</span>
          </div>
        </div>
      </div>

      {/* 3D Scene fills remaining space */}
      <div className="relative flex-1 w-full">
        <Scene3D zones={zones} onZoneClick={handleZoneClick} />
        <EnergyPanel energy={selectedEnergy} onClose={() => setSelectedEnergy(null)} />
      </div>

      {showSplash && <SplashScreen onStart={() => setShowSplash(false)} />}
    </div>
  );
}
