import { motion } from "framer-motion";

type Props = { id: string };

const DURATION = 2.5;

export default function EnergyEffect({ id }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {renderEffect(id)}
    </div>
  );
}

function renderEffect(id: string) {
  switch (id) {
    case "solare":         return <SolarFlood />;
    case "eolica":         return <WindStorm />;
    case "idroelettrica":  return <RainStorm />;
    case "nucleare":       return <AtomStorm />;
    case "geotermica":     return <GeyserBlast />;
    case "termica":        return <FireWall />;
    case "chimica":        return <BubbleFlood />;
    case "meccanica":      return <GearField />;
    case "elettrica":      return <LightningStorm />;
    default:               return null;
  }
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/* ── Solare: cielo che si accende con raggi e bagliore ── */
function SolarFlood() {
  const rays = Array.from({ length: 24 });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: DURATION, times: [0, 0.2, 0.7, 1] }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #fde047 0%, #f59e0b 35%, rgba(245,158,11,0.4) 70%, transparent 100%)",
        }}
      />
      {rays.map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: DURATION, delay: i * 0.02, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: 6,
            height: "70%",
            background: "linear-gradient(to top, transparent, #fef9c3, transparent)",
            transform: `translate(-50%, -100%) rotate(${(i * 360) / 24}deg) translateY(-10%)`,
            mixBlendMode: "screen",
          }}
        />
      ))}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 2.5] }}
        transition={{ duration: DURATION, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 80,
          height: 80,
          background: "radial-gradient(circle, #fff 0%, #fde047 60%, transparent 100%)",
          boxShadow: "0 0 60px #fde047",
        }}
      />
    </>
  );
}

/* ── Eolica: folate orizzontali che attraversano tutto ── */
function WindStorm() {
  const gusts = Array.from({ length: 30 });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.4, 0] }}
        transition={{ duration: DURATION }}
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #67e8f9 0%, #06b6d4 100%)" }}
      />
      {gusts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "-30%", opacity: 0 }}
          animate={{ x: "130%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: rand(0.8, 1.4),
            delay: i * 0.05,
            ease: "easeOut",
            repeat: 1,
            repeatDelay: 0.1,
          }}
          className="absolute rounded-full"
          style={{
            top: `${rand(2, 95)}%`,
            height: 3 + Math.random() * 3,
            width: 40 + Math.random() * 120,
            background: "linear-gradient(to right, transparent, #fff, transparent)",
            boxShadow: "0 0 8px #67e8f9",
          }}
        />
      ))}
    </>
  );
}

/* ── Idroelettrica: gocce d'acqua che cadono ── */
function RainStorm() {
  const drops = Array.from({ length: 70 });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.5, 0] }}
        transition={{ duration: DURATION }}
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)" }}
      />
      {drops.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "-20%", opacity: 0 }}
          animate={{ y: "130%", opacity: [0, 1, 1, 1, 0] }}
          transition={{
            duration: rand(0.6, 1.1),
            delay: Math.random() * 1.5,
            ease: "linear",
            repeat: 1,
          }}
          className="absolute rounded-full"
          style={{
            left: `${rand(0, 100)}%`,
            width: 3 + Math.random() * 2,
            height: 14 + Math.random() * 18,
            background: "linear-gradient(to bottom, rgba(255,255,255,0), #bfdbfe, #fff)",
            boxShadow: "0 0 4px #93c5fd",
          }}
        />
      ))}
      {/* Splash at bottom */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={`s${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, delay: 0.3 + Math.random() * 1.5 }}
          className="absolute rounded-full"
          style={{
            left: `${rand(0, 100)}%`,
            bottom: 0,
            width: 18,
            height: 6,
            background: "radial-gradient(ellipse, #dbeafe, transparent)",
          }}
        />
      ))}
    </>
  );
}

/* ── Nucleare: atomi e onde di energia ── */
function AtomStorm() {
  const atoms = Array.from({ length: 14 });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.6, 0] }}
        transition={{ duration: DURATION }}
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, #16a34a 0%, #14532d 80%)" }}
      />
      {/* Shockwaves */}
      {[0, 0.4, 0.8, 1.2].map((d, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 1.4, delay: d, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
          style={{ width: 60, height: 60, borderColor: "#86efac" }}
        />
      ))}
      {/* Orbiting atoms scattered */}
      {atoms.map((_, i) => {
        const left = rand(5, 95);
        const top = rand(5, 95);
        const size = rand(28, 60);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.5], rotate: 360 }}
            transition={{ duration: DURATION, delay: i * 0.06 }}
            className="absolute"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, transform: "translate(-50%,-50%)" }}
          >
            <div
              className="absolute inset-1/3 rounded-full"
              style={{ background: "#86efac", boxShadow: "0 0 10px #4ade80" }}
            />
            {[0, 60, 120].map((r) => (
              <div
                key={r}
                className="absolute inset-0 border-2 rounded-full"
                style={{ borderColor: "rgba(134,239,172,0.8)", transform: `rotate(${r}deg)`, width: "100%", height: "30%", top: "35%" }}
              />
            ))}
          </motion.div>
        );
      })}
    </>
  );
}

/* ── Geotermica: geyser gigantesco che riempie tutto ── */
function GeyserBlast() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.5, 0] }}
        transition={{ duration: DURATION }}
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #7f1d1d 0%, #ea580c 100%)" }}
      />
      {/* Main geyser column rising */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0.95 }}
        animate={{ scaleY: 1, opacity: [0.95, 1, 0] }}
        transition={{ duration: DURATION, ease: "easeOut", times: [0, 0.6, 1] }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom rounded-t-full"
        style={{
          width: "35%",
          height: "100%",
          background:
            "linear-gradient(to top, #b91c1c, #f97316 30%, #fde047 60%, rgba(255,255,255,0.9) 90%)",
          filter: "blur(2px)",
          boxShadow: "0 0 60px #f97316",
        }}
      />
      {/* Steam clouds rising and filling */}
      {Array.from({ length: 20 }).map((_, i) => {
        const left = rand(0, 100);
        return (
          <motion.div
            key={i}
            initial={{ y: "120%", scale: 0.3, opacity: 0 }}
            animate={{ y: "-30%", scale: [0.3, 1.8, 2.4], opacity: [0, 0.9, 0] }}
            transition={{ duration: rand(1.6, 2.4), delay: i * 0.08, ease: "easeOut" }}
            className="absolute rounded-full blur-md"
            style={{
              left: `${left}%`,
              width: 60 + Math.random() * 50,
              height: 60 + Math.random() * 50,
              background: "rgba(255,255,255,0.75)",
            }}
          />
        );
      })}
      {/* Hot droplets */}
      {Array.from({ length: 25 }).map((_, i) => {
        const left = 30 + rand(0, 40);
        return (
          <motion.div
            key={`d${i}`}
            initial={{ y: "100%", x: 0, opacity: 1 }}
            animate={{
              y: "-20%",
              x: (Math.random() - 0.5) * 200,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: rand(1.2, 1.8), delay: 0.3 + Math.random() * 1.2 }}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              width: 6 + Math.random() * 4,
              height: 6 + Math.random() * 4,
              background: "radial-gradient(circle, #fef08a, #f97316)",
              boxShadow: "0 0 8px #f97316",
            }}
          />
        );
      })}
    </>
  );
}

/* ── Termica: muro di fuoco ── */
function FireWall() {
  const flames = Array.from({ length: 28 });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.7, 0] }}
        transition={{ duration: DURATION }}
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #7c2d12 0%, #dc2626 100%)" }}
      />
      {flames.map((_, i) => {
        const left = (i / flames.length) * 100;
        return (
          <motion.div
            key={i}
            initial={{ y: "100%", scale: 0, opacity: 1 }}
            animate={{ y: "-30%", scale: [0, 1.4, 0.8], opacity: [1, 1, 0] }}
            transition={{
              duration: rand(1.5, 2.2),
              delay: Math.random() * 1.2,
              ease: "easeOut",
              repeat: 1,
            }}
            className="absolute bottom-0 rounded-full blur-sm"
            style={{
              left: `${left}%`,
              width: 50 + Math.random() * 40,
              height: 80 + Math.random() * 60,
              background: "radial-gradient(circle at 50% 70%, #fef08a, #f97316 50%, #b91c1c 90%)",
              boxShadow: "0 0 30px #ea580c",
              transform: "translate(-50%, 0)",
            }}
          />
        );
      })}
      {/* Sparks */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`sp${i}`}
          initial={{ y: "100%", opacity: 1 }}
          animate={{
            y: "-20%",
            x: (Math.random() - 0.5) * 100,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: rand(1, 1.8), delay: Math.random() * 1.5 }}
          className="absolute rounded-full"
          style={{
            left: `${rand(0, 100)}%`,
            width: 3,
            height: 3,
            background: "#fde047",
            boxShadow: "0 0 6px #fde047",
          }}
        />
      ))}
    </>
  );
}

/* ── Chimica: bolle che riempiono tutto ── */
function BubbleFlood() {
  const bubbles = Array.from({ length: 40 });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.6, 0] }}
        transition={{ duration: DURATION }}
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #581c87 0%, #a855f7 100%)" }}
      />
      {bubbles.map((_, i) => {
        const size = rand(20, 70);
        return (
          <motion.div
            key={i}
            initial={{ y: "110%", scale: 0, opacity: 1 }}
            animate={{
              y: "-20%",
              x: (Math.random() - 0.5) * 60,
              scale: 1,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: rand(1.5, 2.4), delay: Math.random() * 1.5, ease: "easeOut" }}
            className="absolute rounded-full border-2"
            style={{
              left: `${rand(0, 100)}%`,
              width: size,
              height: size,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(168,85,247,0.4) 60%, transparent)",
              borderColor: "#c084fc",
              boxShadow: "0 0 10px #a855f7",
            }}
          />
        );
      })}
    </>
  );
}

/* ── Meccanica: campo di ingranaggi ── */
function GearField() {
  const gears = [
    { left: 12, top: 25, size: 100, dir: 1 },
    { left: 38, top: 65, size: 130, dir: -1 },
    { left: 65, top: 30, size: 90, dir: 1 },
    { left: 82, top: 70, size: 110, dir: -1 },
    { left: 25, top: 80, size: 70, dir: 1 },
    { left: 55, top: 15, size: 75, dir: -1 },
    { left: 88, top: 20, size: 60, dir: 1 },
    { left: 5, top: 60, size: 55, dir: -1 },
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.6, 0] }}
        transition={{ duration: DURATION }}
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)" }}
      />
      {gears.map((g, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 100"
          initial={{ rotate: 0, scale: 0, opacity: 1 }}
          animate={{
            rotate: g.dir * 540,
            scale: [0, 1, 1, 0],
            opacity: [1, 1, 1, 0],
          }}
          transition={{ duration: DURATION, ease: "easeInOut", delay: i * 0.05 }}
          className="absolute"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: g.size,
            height: g.size,
            transform: "translate(-50%, -50%)",
            filter: "drop-shadow(0 0 12px #60a5fa)",
          }}
        >
          <GearPath fill="#93c5fd" />
        </motion.svg>
      ))}
    </>
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
      <circle cx={cx} cy={cy} r={12} fill="rgba(15,23,42,0.85)" stroke={fill} strokeWidth={3} />
    </g>
  );
}

/* ── Elettrica: tempesta di fulmini ── */
function LightningStorm() {
  const bolts = Array.from({ length: 14 });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.5, 0] }}
        transition={{ duration: DURATION }}
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, #a16207 0%, #1e1b4b 100%)" }}
      />
      {/* Flash bursts */}
      {[0, 0.3, 0.6, 0.9, 1.4, 1.8].map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.18, delay: d }}
          className="absolute inset-0"
          style={{ background: "rgba(254,249,195,0.9)" }}
        />
      ))}
      {bolts.map((_, i) => {
        const left = rand(5, 95);
        const flip = Math.random() > 0.5 ? -1 : 1;
        const scale = rand(0.7, 1.3);
        return (
          <motion.svg
            key={i}
            viewBox="0 0 40 200"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 1, 1, 0.8] }}
            transition={{
              duration: 0.8,
              delay: Math.random() * (DURATION - 0.9),
              ease: "easeOut",
              repeat: 1,
              repeatDelay: 0.2,
            }}
            className="absolute top-0"
            style={{
              left: `${left}%`,
              width: 40 * scale,
              height: "100%",
              transform: `translateX(-50%) scaleX(${flip})`,
              transformOrigin: "top center",
              filter: "drop-shadow(0 0 12px #fde047) drop-shadow(0 0 4px #fff)",
            }}
          >
            <polygon
              points="20,0 8,80 24,80 12,160 32,70 16,70 28,0"
              fill="#fef9c3"
              stroke="#fff"
              strokeWidth={1}
            />
          </motion.svg>
        );
      })}
    </>
  );
}
