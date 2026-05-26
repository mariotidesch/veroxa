import { motion } from "framer-motion";

type Props = {
  id: string;
};

const DURATION = 2.5;

export default function EnergyEffect({ id }: Props) {
  return (
    <div className="pointer-events-none flex items-center justify-center">
      {renderEffect(id)}
    </div>
  );
}

function renderEffect(id: string) {
  switch (id) {
    case "solare":         return <SolarBurst />;
    case "eolica":         return <WindGust />;
    case "idroelettrica":  return <WaterSplash />;
    case "nucleare":       return <AtomPulse />;
    case "geotermica":     return <Geyser />;
    case "termica":        return <FlamePlume />;
    case "chimica":        return <Bubbles />;
    case "meccanica":      return <SpinningGear />;
    case "elettrica":      return <LightningBolts />;
    default:               return null;
  }
}

/* ── Solare: raggi che esplodono dal centro ── */
function SolarBurst() {
  const rays = Array.from({ length: 12 });
  return (
    <div className="relative w-40 h-40">
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: DURATION, ease: "easeOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, #fde047 0%, #f59e0b 50%, transparent 70%)",
        }}
      />
      {rays.map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 1 }}
          animate={{ scaleY: 1, opacity: 0 }}
          transition={{ duration: DURATION, ease: "easeOut", delay: 0.1 }}
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: 4,
            height: 80,
            background: "linear-gradient(to top, transparent, #fde047)",
            transform: `translate(-50%, -100%) rotate(${(i * 360) / 12}deg) translateY(-30px)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Eolica: folate di vento orizzontali ── */
function WindGust() {
  return (
    <div className="relative w-48 h-32">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 200, opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, delay: i * 0.18, ease: "easeOut" }}
          className="absolute rounded-full"
          style={{
            top: `${15 + i * 18}%`,
            height: 3,
            width: 60 + (i % 2) * 30,
            background: "linear-gradient(to right, transparent, #67e8f9, transparent)",
            boxShadow: "0 0 8px #22d3ee",
          }}
        />
      ))}
    </div>
  );
}

/* ── Idroelettrica: spruzzo d'acqua + onde ── */
function WaterSplash() {
  const drops = Array.from({ length: 14 });
  return (
    <div className="relative w-40 h-40">
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: DURATION, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border-4"
        style={{ borderColor: "#3b82f6" }}
      />
      {drops.map((_, i) => {
        const angle = (i / drops.length) * Math.PI * 2;
        const dist = 90 + (i % 3) * 20;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + 50, opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.05 * i }}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 8,
              height: 12,
              background: "radial-gradient(circle, #93c5fd, #3b82f6)",
              boxShadow: "0 0 6px #60a5fa",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Nucleare: atomo con elettroni in orbita ── */
function AtomPulse() {
  return (
    <div className="relative w-40 h-40">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.4, 0.9, 0] }}
        transition={{ duration: DURATION, ease: "easeInOut" }}
        className="absolute inset-1/3 rounded-full"
        style={{
          background: "radial-gradient(circle, #86efac 0%, #22c55e 60%, transparent 80%)",
          boxShadow: "0 0 30px #22c55e",
        }}
      />
      {[0, 60, 120].map((rot) => (
        <motion.div
          key={rot}
          initial={{ rotate: rot, scale: 0 }}
          animate={{ rotate: rot + 720, scale: [0, 1, 1, 0] }}
          transition={{ duration: DURATION, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: "rgba(34,197,94,0.7)",
            transform: `rotate(${rot}deg)`,
            borderRadius: "50%",
            height: "100%",
            width: "30%",
            left: "35%",
          }}
        />
      ))}
    </div>
  );
}

/* ── Geotermica: geyser che sale ── */
function Geyser() {
  return (
    <div className="relative w-32 h-64" style={{ transform: "translateY(-30%)" }}>
      <motion.div
        initial={{ scaleY: 0, opacity: 0.9 }}
        animate={{ scaleY: 1, opacity: 0 }}
        transition={{ duration: DURATION, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom rounded-full"
        style={{
          width: 22,
          height: "100%",
          background: "linear-gradient(to top, #f87171, #fb923c, #fde047, rgba(255,255,255,0.6))",
          boxShadow: "0 0 30px rgba(239,68,68,0.7)",
        }}
      />
      {[0, 0.2, 0.4, 0.6, 0.8].map((d, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, scale: 0.3, opacity: 1 }}
          animate={{ y: -180, scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.6, delay: d, ease: "easeOut" }}
          className="absolute bottom-1/3 left-1/2 -translate-x-1/2 rounded-full blur-sm"
          style={{
            width: 32 + i * 4,
            height: 32 + i * 4,
            background: "rgba(255,255,255,0.55)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Termica: fiamma che si alza ── */
function FlamePlume() {
  return (
    <div className="relative w-32 h-48" style={{ transform: "translateY(-20%)" }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 20, scale: 0, opacity: 1 }}
          animate={{ y: -120, scale: [0, 1.2, 0.5], opacity: [1, 1, 0] }}
          transition={{ duration: 1.8, delay: i * 0.15, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-sm"
          style={{
            width: 50 - i * 6,
            height: 70 - i * 8,
            background: "radial-gradient(circle at 50% 70%, #fef08a, #f97316 50%, #dc2626 90%)",
            boxShadow: "0 0 25px #f97316",
          }}
        />
      ))}
    </div>
  );
}

/* ── Chimica: molecole/bolle che salgono ── */
function Bubbles() {
  const bubbles = Array.from({ length: 12 });
  return (
    <div className="relative w-40 h-48" style={{ transform: "translateY(-15%)" }}>
      {bubbles.map((_, i) => {
        const dx = (i - 6) * 12;
        return (
          <motion.div
            key={i}
            initial={{ y: 80, x: dx, scale: 0, opacity: 1 }}
            animate={{ y: -150, x: dx + (i % 2 ? 18 : -18), scale: 1, opacity: 0 }}
            transition={{ duration: 2, delay: i * 0.08, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 rounded-full border-2"
            style={{
              width: 14 + (i % 3) * 6,
              height: 14 + (i % 3) * 6,
              background: "rgba(168,85,247,0.45)",
              borderColor: "#c084fc",
              boxShadow: "0 0 10px #a855f7",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Meccanica: ingranaggi che girano ── */
function SpinningGear() {
  return (
    <div className="relative w-40 h-40">
      <motion.svg
        viewBox="0 0 100 100"
        initial={{ rotate: 0, scale: 0, opacity: 1 }}
        animate={{ rotate: 540, scale: [0, 1.2, 1, 0], opacity: [1, 1, 1, 0] }}
        transition={{ duration: DURATION, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{ filter: "drop-shadow(0 0 12px #60a5fa)" }}
      >
        <GearPath fill="#60a5fa" />
      </motion.svg>
      <motion.svg
        viewBox="0 0 100 100"
        initial={{ rotate: 0, scale: 0, opacity: 1 }}
        animate={{ rotate: -540, scale: [0, 0.7, 0.5, 0], opacity: [1, 1, 1, 0] }}
        transition={{ duration: DURATION, ease: "easeInOut", delay: 0.1 }}
        className="absolute"
        style={{
          width: "50%",
          height: "50%",
          right: "-10%",
          bottom: "-10%",
          filter: "drop-shadow(0 0 10px #93c5fd)",
        }}
      >
        <GearPath fill="#93c5fd" />
      </motion.svg>
    </div>
  );
}

function GearPath({ fill }: { fill: string }) {
  const teeth = 10;
  const cx = 50, cy = 50;
  const outerR = 45, innerR = 36;
  const points: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? outerR : innerR;
    points.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
  }
  return (
    <g>
      <polygon points={points.join(" ")} fill={fill} />
      <circle cx={cx} cy={cy} r={12} fill="rgba(15,23,42,0.7)" stroke={fill} strokeWidth={3} />
    </g>
  );
}

/* ── Elettrica: fulmini ── */
function LightningBolts() {
  return (
    <div className="relative w-40 h-40">
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: DURATION, ease: "easeOut" }}
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(250,204,21,0.6), transparent 70%)" }}
      />
      {[0, 72, 144, 216, 288].map((rot, i) => (
        <motion.svg
          key={rot}
          viewBox="0 0 20 80"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.1, 1, 0.9] }}
          transition={{ duration: 1.3, delay: i * 0.1, ease: "easeOut", repeat: 1 }}
          className="absolute left-1/2 top-1/2"
          style={{
            width: 22,
            height: 90,
            transform: `translate(-50%, -100%) rotate(${rot}deg)`,
            transformOrigin: "50% 100%",
            filter: "drop-shadow(0 0 10px #facc15)",
          }}
        >
          <polygon
            points="10,0 4,40 12,40 6,80 16,35 8,35 14,0"
            fill="#fde047"
            stroke="#fff"
            strokeWidth={0.8}
          />
        </motion.svg>
      ))}
    </div>
  );
}
