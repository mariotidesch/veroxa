import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Compass, Calculator, BookOpen } from "lucide-react";
import panoramaVideo from "@assets/Scene_Builder_-_Scene_1779818958401.mp4";

type Destination = "panorama" | "calcolatrice" | "informazioni";

const ROUTES: Record<Destination, string> = {
  panorama: "/panorama",
  calcolatrice: "/calcolatrice",
  informazioni: "/informazioni",
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [exitingTo, setExitingTo] = useState<Destination | null>(null);

  const handleGo = (dest: Destination) => {
    if (exitingTo) return;
    setExitingTo(dest);
    setTimeout(() => setLocation(ROUTES[dest]), 1000);
  };

  const exiting = exitingTo !== null;

  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 overflow-hidden"
        style={{ background: "#000" }}
      >
        {/* Looping panorama video as background */}
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

        {/* Dark vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Colored exit glow */}
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

        {/* Content overlay */}
        <motion.div
          className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6"
          animate={
            exiting
              ? { opacity: 0, scale: 1.15, y: -20 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        >
          <motion.img
            src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
            alt="San Leone Magno"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-14 mb-6 object-contain drop-shadow-2xl"
          />

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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-3 text-base md:text-lg font-medium"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Un viaggio interattivo nel mondo dell'energia
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-4"
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

          {/* ── Three navigation buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl"
          >
            {[
              {
                id: "panorama" as const,
                label: "Esplora",
                desc: "Le 9 energie nel panorama",
                Icon: Compass,
                gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                glow: "rgba(251,191,36,0.55)",
                color: "#1f1300",
              },
              {
                id: "calcolatrice" as const,
                label: "Calcolatrice",
                desc: "Calcola i tuoi consumi",
                Icon: Calculator,
                gradient: "linear-gradient(135deg, #60a5fa, #2563eb)",
                glow: "rgba(96,165,250,0.55)",
                color: "#ffffff",
              },
              {
                id: "informazioni" as const,
                label: "Informazioni",
                desc: "Sul progetto e la classe",
                Icon: BookOpen,
                gradient: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                glow: "rgba(167,139,250,0.55)",
                color: "#ffffff",
              },
            ].map(({ id, label, desc, Icon, gradient, glow, color }) => (
              <motion.button
                key={id}
                onClick={() => handleGo(id)}
                disabled={exiting}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
                data-testid={`button-${id}`}
                className="rounded-2xl px-6 py-5 text-left flex flex-col items-start gap-2 shadow-2xl transition-transform"
                style={{
                  background: gradient,
                  boxShadow: `0 0 35px ${glow}, 0 8px 28px rgba(0,0,0,0.45)`,
                  color,
                }}
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon size={26} strokeWidth={2.5} />
                  <span className="text-lg font-black tracking-tight flex-1">{label}</span>
                </div>
                <span className="text-xs font-semibold opacity-80">{desc}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Flash on exit */}
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
    </AnimatePresence>
  );
}
