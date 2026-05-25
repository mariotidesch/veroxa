import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";

function useWebGL() {
  const [ok] = useState<boolean>(() => {
    try {
      const c = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  });
  return ok;
}

const ORB_CONFIGS = [
  { color: "#f59e0b", label: "Solare",       radius: 9,  speed: 0.18, phase: 0,   size: 0.42 },
  { color: "#22d3ee", label: "Eolica",        radius: 11, speed: 0.13, phase: 0.7, size: 0.38 },
  { color: "#3b82f6", label: "Idroelettrica", radius: 8,  speed: 0.22, phase: 1.4, size: 0.35 },
  { color: "#22c55e", label: "Nucleare",      radius: 13, speed: 0.10, phase: 2.1, size: 0.44 },
  { color: "#ef4444", label: "Geotermica",    radius: 10, speed: 0.16, phase: 2.8, size: 0.40 },
  { color: "#f97316", label: "Termica",       radius: 7,  speed: 0.25, phase: 3.5, size: 0.32 },
  { color: "#a855f7", label: "Chimica",       radius: 12, speed: 0.12, phase: 4.2, size: 0.36 },
  { color: "#60a5fa", label: "Meccanica",     radius: 6,  speed: 0.28, phase: 4.9, size: 0.30 },
  { color: "#facc15", label: "Elettrica",     radius: 14, speed: 0.09, phase: 5.6, size: 0.48 },
];

/* ─── Three.js floating orb ─── */
function FloatingOrb({ cfg, index }: { cfg: typeof ORB_CONFIGS[0]; index: number }) {
  const ref    = useRef<THREE.Mesh>(null!);
  const glow   = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t     = state.clock.getElapsedTime();
    const angle = t * cfg.speed + cfg.phase;
    const yBob  = Math.sin(t * 0.6 + cfg.phase) * 0.6;
    const pos = new THREE.Vector3(
      Math.cos(angle) * cfg.radius,
      yBob + (index % 3) * 1.2 - 1.5,
      Math.sin(angle) * cfg.radius * 0.55
    );
    if (ref.current)  ref.current.position.copy(pos);
    if (glow.current) glow.current.position.copy(pos);
    if (ref.current)
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.4 + Math.sin(t * 1.8 + cfg.phase) * 0.6;
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[cfg.size, 24, 24]} />
        <meshStandardMaterial color={cfg.color} emissive={cfg.color} emissiveIntensity={1.5} roughness={0.15} metalness={0.7} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[cfg.size * 2.2, 12, 12]} />
        <meshBasicMaterial color={cfg.color} transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

/* ─── Central atom ─── */
function CentralAtom() {
  const r1 = useRef<THREE.Group>(null!);
  const r2 = useRef<THREE.Group>(null!);
  const r3 = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (r1.current) r1.current.rotation.y = t * 0.5;
    if (r2.current) r2.current.rotation.x = t * 0.7;
    if (r3.current) r3.current.rotation.z = t * 0.4;
  });
  const M = <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} side={THREE.DoubleSide} />;
  return (
    <group>
      <pointLight color="#60a5fa" intensity={12} distance={18} />
      <mesh><sphereGeometry args={[0.7, 32, 32]} /><meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={2.5} roughness={0.1} /></mesh>
      <mesh><sphereGeometry args={[1.4, 16, 16]} /><meshBasicMaterial color="#3b82f6" transparent opacity={0.08} side={THREE.BackSide} /></mesh>
      <group ref={r1}><mesh><torusGeometry args={[3, 0.06, 8, 80]} />{M}</mesh><mesh position={[3, 0, 0]}><sphereGeometry args={[0.22, 12, 12]} /><meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={3} /></mesh></group>
      <group ref={r2} rotation={[Math.PI / 3, 0, 0]}><mesh><torusGeometry args={[3.5, 0.06, 8, 80]} />{M}</mesh><mesh position={[3.5, 0, 0]}><sphereGeometry args={[0.22, 12, 12]} /><meshStandardMaterial color="#a5b4fc" emissive="#818cf8" emissiveIntensity={3} /></mesh></group>
      <group ref={r3} rotation={[0, Math.PI / 4, Math.PI / 3]}><mesh><torusGeometry args={[4, 0.06, 8, 80]} />{M}</mesh><mesh position={[4, 0, 0]}><sphereGeometry args={[0.22, 12, 12]} /><meshStandardMaterial color="#6ee7b7" emissive="#34d399" emissiveIntensity={3} /></mesh></group>
    </group>
  );
}

function EnergyGrid() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => { if (ref.current) ref.current.position.z = (s.clock.getElapsedTime() * 0.3) % 2; });
  return <group ref={ref} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}><gridHelper args={[60, 30, "#1a2a6e", "#0d1540"]} /></group>;
}

function SplashScene3D() {
  return (
    <>
      <ambientLight intensity={0.15} color="#1e3a6e" />
      <hemisphereLight args={["#1e3a6e", "#000820", 0.5]} />
      <Stars radius={80} depth={60} count={5000} factor={3} saturation={0.2} fade />
      <EnergyGrid />
      <CentralAtom />
      {ORB_CONFIGS.map((cfg, i) => <FloatingOrb key={cfg.label} cfg={cfg} index={i} />)}
    </>
  );
}

/* ─── CSS fallback background (no WebGL) ─── */
function CSSBackground() {
  return (
    <div className="absolute inset-0" style={{ background: "#020818", overflow: "hidden" }}>
      <style>{`
        @keyframes splOrbit { from{transform:rotate(0deg) translateX(var(--r)) rotate(0deg)} to{transform:rotate(360deg) translateX(var(--r)) rotate(-360deg)} }
        @keyframes splTwinkle { 0%,100%{opacity:.25} 50%{opacity:.8} }
        @keyframes splBolt { 0%,80%,100%{opacity:0} 85%,95%{opacity:.7} }
        @keyframes splPulse { 0%,100%{opacity:.15} 50%{opacity:.35} }
      `}</style>
      {/* Stars */}
      {Array.from({ length: 80 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: `${(i * 43 + 7) % 100}%`, top: `${(i * 61 + 5) % 100}%`, width: i % 6 === 0 ? 2 : 1, height: i % 6 === 0 ? 2 : 1, borderRadius: "50%", background: "white", animation: `splTwinkle ${1.5 + (i % 4)}s ease-in-out infinite`, animationDelay: `${(i * 0.31) % 3}s` }} />
      ))}
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }}>
        {Array.from({ length: 20 }, (_, i) => (<g key={i}><line x1={`${i * 5.26}%`} y1="0" x2={`${i * 5.26}%`} y2="100%" stroke="#60a5fa" strokeWidth="0.5"/><line x1="0" y1={`${i * 5.26}%`} x2="100%" y2={`${i * 5.26}%`} stroke="#60a5fa" strokeWidth="0.5"/></g>))}
      </svg>
      {/* Central atom glow */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, #3b82f622 0%, transparent 70%)", animation: "splPulse 3s ease-in-out infinite" }} />
      {/* Atom rings */}
      {[{ w: 160, h: 60, r: "0deg" }, { w: 160, h: 60, r: "60deg" }, { w: 160, h: 60, r: "120deg" }].map((ring, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: ring.w, height: ring.h, marginLeft: -ring.w / 2, marginTop: -ring.h / 2, border: "1px solid #60a5fa55", borderRadius: "50%", transform: `rotate(${ring.r})`, animation: `splOrbit ${8 + i * 2}s linear infinite`, "--r": "0px" } as React.CSSProperties} />
      ))}
      {/* Orbiting energy dots */}
      {ORB_CONFIGS.map((cfg, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 10, height: 10, marginLeft: -5, marginTop: -5, borderRadius: "50%", background: cfg.color, boxShadow: `0 0 12px ${cfg.color}`, animation: `splOrbit ${(i + 4) * 1.8}s linear infinite`, animationDelay: `${i * -0.9}s`, ["--r" as string]: `${80 + i * 12}px` }} />
      ))}
      {/* Lightning bolts */}
      {[{ x: "15%", y: "5%" }, { x: "80%", y: "8%" }, { x: "50%", y: "3%" }].map((pos, i) => (
        <div key={i} style={{ position: "absolute", left: pos.x, top: pos.y, color: "#fbbf24", fontSize: 18, opacity: 0, animation: `splBolt ${2 + i * 0.8}s ease-in-out infinite`, animationDelay: `${i * 1.1}s` }}>⚡</div>
      ))}
    </div>
  );
}

/* ─── HTML overlay (shared between WebGL and CSS modes) ─── */
function SplashContent({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
      <motion.img
        src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
        alt="San Leone Magno"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="h-14 mb-6 object-contain"
      />
      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7, type: "spring", stiffness: 110 }}
        className="text-6xl md:text-8xl font-black tracking-tight"
        style={{ background: "linear-gradient(135deg,#fbbf24 0%,#f59e0b 28%,#ffffff 58%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 32px rgba(251,191,36,0.35))" }}
      >
        EnergiApp
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-3 text-base md:text-lg font-medium"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Un viaggio interattivo nel mondo dell'energia
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-4">
        <span className="px-3 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.11)" }}>
          Progetto di Mario Tedeschi · Classe 3A · San Leone Magno
        </span>
      </motion.div>
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}
        whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
        data-testid="button-inizia"
        className="mt-10 px-10 py-4 rounded-full text-base font-black tracking-wide text-gray-900 shadow-2xl"
        style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)", boxShadow: "0 0 40px rgba(251,191,36,0.5),0 8px 32px rgba(0,0,0,0.45)" }}
      >
        Inizia l'esplorazione
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-8 flex flex-wrap justify-center gap-2 max-w-md"
      >
        {ORB_CONFIGS.map((cfg) => (
          <span key={cfg.label} className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: cfg.color + "22", border: `1px solid ${cfg.color}55`, color: cfg.color }}>
            {cfg.label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main export ─── */
export default function SplashScreen({ onStart }: { onStart: () => void }) {
  const [visible, setVisible] = useState(true);
  const webgl = useWebGL();
  const handleStart = () => { setVisible(false); setTimeout(onStart, 600); };

  const background = webgl ? (
    <WebGLErrorBoundary fallback={<CSSBackground />}>
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        <Canvas camera={{ position: [0, 2, 18], fov: 62 }} gl={{ antialias: true, alpha: false }} style={{ background: "#020818" }}>
          <SplashScene3D />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  ) : (
    <CSSBackground />
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ background: "#020818" }}
        >
          {background}
          <SplashContent onStart={handleStart} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
