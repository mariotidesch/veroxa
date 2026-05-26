import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgVideo from "@assets/Scene_Builder_-_Scene_1779818958401.mp4";

interface SplashScreenProps {
  onStart: () => void;
}

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
          {/* ── Background video (loop) ── */}
          <video
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,9,31,0.55) 0%, rgba(4,9,31,0.35) 40%, rgba(4,9,31,0.65) 100%)" }} />

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
