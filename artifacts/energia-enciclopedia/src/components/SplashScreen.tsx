import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import panoramaVideo from "@assets/Scene_Builder_-_Scene_1779818958401.mp4";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const handleStart = () => {
    setExiting(true);
    setTimeout(() => setVisible(false), 950);
    setTimeout(onStart, 1100);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ background: "#000" }}
        >
          {/* ── Looping panorama video as background ── */}
          <motion.video
            src={panoramaVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={
              exiting
                ? { scale: 1.3, opacity: 1 }
                : { scale: 1.05, opacity: 1 }
            }
            transition={
              exiting
                ? { duration: 1.0, ease: [0.7, 0, 0.3, 1] }
                : { duration: 1.2, ease: "easeOut" }
            }
            style={{ background: "#000" }}
          />

          {/* Dark vignette to make text readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Subtle yellow glow accent */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0.9 : 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(250,204,21,0.35) 0%, rgba(250,204,21,0) 60%)",
            }}
          />

          {/* ── Content overlay ── */}
          <motion.div
            className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6"
            animate={
              exiting
                ? { opacity: 0, scale: 1.15, y: -20 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          >
            {/* School logo */}
            <motion.img
              src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
              alt="San Leone Magno"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 0.95, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-14 mb-6 object-contain drop-shadow-2xl"
            />

            {/* App title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 120 }}
            >
              <h1
                className="text-6xl md:text-8xl font-black tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #ffffff 60%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(251,191,36,0.5))",
                }}
              >
                EnergiApp
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-3 text-base md:text-lg font-medium"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Un viaggio interattivo nel mondo dell'energia
            </motion.p>

            {/* Student info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-4 flex items-center gap-2"
            >
              <span
                className="px-3 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  color: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                Progetto di Mario Tedeschi · Classe 3A
              </span>
            </motion.div>

            {/* Start button */}
            <motion.button
              onClick={handleStart}
              disabled={exiting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              data-testid="button-inizia"
              className="mt-10 px-10 py-4 rounded-full text-base font-black tracking-wide text-gray-900 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                boxShadow:
                  "0 0 40px rgba(251,191,36,0.6), 0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              Inizia l'esplorazione
            </motion.button>

            {/* Energy type chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
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
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{
                    background: chip.color + "33",
                    border: `1px solid ${chip.color}77`,
                    color: chip.color,
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Closing iris/flash on click ── */}
          <AnimatePresence>
            {exiting && (
              <motion.div
                key="flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0] }}
                transition={{ duration: 1.0, times: [0, 0.55, 1] }}
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ background: "#ffffff" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
