import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sky, Environment, OrbitControls, Cloud, Clouds,
  Sparkles, Html, MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Sun, Wind, Droplets, Atom, Mountain,
  Flame, FlaskConical, Cog, Zap,
} from "lucide-react";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";

/* ─── WebGL detection ─── */
function useWebGL() {
  const [ok] = useState<boolean>(() => {
    try {
      const c = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl"))
      );
    } catch { return false; }
  });
  return ok;
}

const ICONS: Record<string, React.ElementType> = {
  solare: Sun, eolica: Wind, idroelettrica: Droplets,
  nucleare: Atom, geotermica: Mountain, termica: Flame,
  chimica: FlaskConical, meccanica: Cog, elettrica: Zap,
};

type ZoneConfig = {
  id: string; label: string;
  hotspotX: number; hotspotY: number; color: string;
};

function zoneToPos(z: ZoneConfig): [number, number, number] {
  return [((z.hotspotX - 50) / 50) * 14, 2.4, ((z.hotspotY - 35) / 50) * 12];
}

/* ─── Terrain ─── */
function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[400, 400, 1, 1]} />
      <meshStandardMaterial color="#2d4a2a" roughness={1} metalness={0} />
    </mesh>
  );
}

/* ─── Mountain ring (panorama horizon) ─── */
function MountainRing() {
  const mountains = useMemo(() => {
    const arr: { key: number; x: number; z: number; h: number; w: number; color: string; rot: number }[] = [];
    const count = 32;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 52 + Math.sin(i * 1.7) * 7 + Math.cos(i * 3.3) * 4;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const h = 12 + Math.sin(i * 2.3) * 5 + Math.cos(i * 5.1) * 3;
      const w = 7 + Math.sin(i * 3.1) * 2;
      const palette = ["#1e2a3a", "#2d3a4d", "#252d40", "#1a2435", "#34304a"];
      const color = palette[i % palette.length];
      arr.push({ key: i, x, z, h, w, color, rot: (i * 0.7) % (Math.PI * 2) });
    }
    return arr;
  }, []);

  return (
    <group>
      {mountains.map((m) => (
        <mesh
          key={m.key}
          position={[m.x, m.h / 2 - 0.5, m.z]}
          rotation={[0, m.rot, 0]}
          castShadow
          receiveShadow
        >
          <coneGeometry args={[m.w, m.h, 5, 1]} />
          <meshStandardMaterial color={m.color} roughness={1} metalness={0} flatShading />
        </mesh>
      ))}
      {/* A few snow caps on tallest peaks */}
      {mountains.filter((_, i) => i % 5 === 0).map((m) => (
        <mesh
          key={`snow-${m.key}`}
          position={[m.x, m.h - 0.3, m.z]}
          rotation={[0, m.rot, 0]}
        >
          <coneGeometry args={[m.w * 0.35, m.h * 0.22, 5, 1]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.6} metalness={0} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Reflective lake ─── */
function Lake() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0.04, 4]} receiveShadow>
      <planeGeometry args={[14, 9]} />
      <MeshReflectorMaterial
        blur={[200, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={35}
        roughness={0.15}
        depthScale={0.5}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color="#1e3a8a"
        metalness={0.7}
        mirror={0.7}
      />
    </mesh>
  );
}

/* ─── Solar panel array ─── */
function SolarPanels() {
  const panels = useMemo(() => {
    const out: { key: string; x: number; z: number }[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        out.push({ key: `${row}-${col}`, x: -13 + col * 1.4, z: -9 + row * 1.3 });
      }
    }
    return out;
  }, []);

  return (
    <group>
      {panels.map((p) => (
        <group key={p.key} position={[p.x, 0.4, p.z]} rotation={[-Math.PI / 5, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.05, 0.8]} />
            <meshStandardMaterial color="#0c1a4a" metalness={0.85} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <planeGeometry args={[1.1, 0.7]} />
            <meshStandardMaterial
              color="#1e40af"
              metalness={0.95}
              roughness={0.08}
              emissive="#3b82f6"
              emissiveIntensity={0.25}
            />
          </mesh>
          {/* Stand */}
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.08, 0.6, 0.08]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Wind turbines ─── */
function WindTurbine({ position, scale = 1, speedMul = 1 }: { position: [number, number, number]; scale?: number; speedMul?: number }) {
  const bladesRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (bladesRef.current)
      bladesRef.current.rotation.z = s.clock.getElapsedTime() * 1.6 * speedMul;
  });
  return (
    <group position={position} scale={scale}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 0.2, 16]} />
        <meshStandardMaterial color="#475569" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Mast */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.22, 7, 12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Nacelle */}
      <mesh position={[0, 7.1, 0.2]} castShadow>
        <boxGeometry args={[0.5, 0.5, 1.2]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Blades */}
      <group ref={bladesRef} position={[0, 7.1, 0.85]}>
        <mesh>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh
              key={i}
              position={[Math.sin(rad) * 1.7, Math.cos(rad) * 1.7, 0]}
              rotation={[0, 0, rad]}
              castShadow
            >
              <boxGeometry args={[0.12, 3.3, 0.06]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.4} roughness={0.55} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ─── Nuclear cooling towers ─── */
function NuclearPlant() {
  const steamRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (steamRef.current) {
      const t = s.clock.getElapsedTime();
      steamRef.current.children.forEach((child, i) => {
        const offset = i * 0.4;
        const cycle = (t * 0.35 + offset) % 2.5;
        child.position.y = 5.4 + cycle * 1.2;
        const sc = 1 + cycle * 0.6;
        child.scale.setScalar(sc);
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 0.55 - cycle * 0.22);
      });
    }
  });

  return (
    <group position={[5, 0, -2]}>
      {[[-1.7, 0], [1.7, 0]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Cooling tower (hyperboloid approximated with two cones) */}
          <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1.4, 2.8, 24, 1, false]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.15} />
          </mesh>
          <mesh position={[0, 3.7, 0]} castShadow>
            <cylinderGeometry args={[1.25, 1, 1.8, 24, 1, false]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.15} />
          </mesh>
          <mesh position={[0, 4.65, 0]}>
            <torusGeometry args={[1.25, 0.12, 8, 16]} />
            <meshStandardMaterial color="#6b7280" roughness={0.5} metalness={0.4} />
          </mesh>
        </group>
      ))}
      {/* Reactor building */}
      <mesh position={[0, 1, -2.2]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2, 1.6]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[0, 2.4, -2.2]} castShadow>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Steam puffs */}
      <group ref={steamRef}>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[i % 2 === 0 ? -1.7 : 1.7, 5.4, 0]}>
            <sphereGeometry args={[0.9, 10, 10]} />
            <meshBasicMaterial color="white" transparent opacity={0.5} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ─── Volcano ─── */
function VolcanoElement() {
  const lavaRef = useRef<THREE.Mesh>(null!);
  const smokeRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (lavaRef.current) {
      (lavaRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.8 + Math.sin(t * 2.5) * 0.9;
    }
    if (smokeRef.current) {
      smokeRef.current.children.forEach((c, i) => {
        const cycle = (t * 0.25 + i * 0.5) % 3;
        c.position.y = 6 + cycle * 1.4;
        c.scale.setScalar(0.9 + cycle * 0.5);
        ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
          Math.max(0, 0.45 - cycle * 0.14);
      });
    }
  });
  return (
    <group position={[11, 0, -9]}>
      <pointLight color="#f97316" intensity={15} distance={18} position={[0, 5.5, 0]} decay={2} />
      {/* Main cone */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <coneGeometry args={[5, 6, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.95} metalness={0.05} flatShading />
      </mesh>
      {/* Crater lip */}
      <mesh position={[0, 5.85, 0]}>
        <torusGeometry args={[0.9, 0.3, 8, 16]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.95} />
      </mesh>
      {/* Lava core */}
      <mesh ref={lavaRef} position={[0, 5.95, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#f97316" emissiveIntensity={2.2} roughness={0.3} />
      </mesh>
      {/* Lava trail down side */}
      <mesh position={[0.4, 4.5, 1.6]} rotation={[Math.PI / 2.5, 0, 0.2]}>
        <boxGeometry args={[0.4, 2.5, 0.1]} />
        <meshStandardMaterial color="#dc2626" emissive="#ea580c" emissiveIntensity={1.5} />
      </mesh>
      {/* Smoke */}
      <group ref={smokeRef}>
        {Array.from({ length: 5 }, (_, i) => (
          <mesh key={i} position={[0, 6, 0]}>
            <sphereGeometry args={[0.7, 10, 10]} />
            <meshBasicMaterial color="#64748b" transparent opacity={0.45} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ─── Atom (decorative, floats above nuclear plant) ─── */
function AtomElement() {
  const r1 = useRef<THREE.Group>(null!), r2 = useRef<THREE.Group>(null!), r3 = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (r1.current) r1.current.rotation.y = t * 0.8;
    if (r2.current) r2.current.rotation.x = t * 1.1;
    if (r3.current) r3.current.rotation.z = t * 0.6;
  });
  const M = <meshBasicMaterial color="#34d399" transparent opacity={0.55} side={THREE.DoubleSide} />;
  return (
    <group position={[5, 7, -1]}>
      <pointLight color="#34d399" intensity={6} distance={9} />
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2.5} />
      </mesh>
      {[r1, r2, r3].map((ref, i) => (
        <group key={i} ref={ref} rotation={[i * 1.05, 0, 0]}>
          <mesh><torusGeometry args={[1.3, 0.04, 8, 64]} />{M}</mesh>
          <mesh position={[1.3, 0, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#86efac" emissive="#34d399" emissiveIntensity={3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Energy zone marker ─── */
function EnergyMarker({ zone, onClick }: { zone: ZoneConfig; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const beamRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const pos = zoneToPos(zone);
  const Icon = ICONS[zone.id] ?? Zap;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const seed = zone.hotspotX * 0.3;
    if (meshRef.current) {
      meshRef.current.position.y = pos[1] + Math.sin(t * 0.9 + seed) * 0.25;
      const pulse = hovered ? 1.4 : 1 + Math.sin(t * 2.2 + seed) * 0.09;
      meshRef.current.scale.setScalar(pulse);
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        hovered ? 3.2 : 1.8 + Math.sin(t * 2 + seed) * 0.6;
    }
    if (ringRef.current) ringRef.current.rotation.z = t * 0.7 + seed;
    if (beamRef.current) {
      (beamRef.current.material as THREE.MeshBasicMaterial).opacity =
        hovered ? 0.4 : 0.2 + Math.sin(t * 1.5 + seed) * 0.08;
    }
  });

  return (
    <group position={pos}>
      <pointLight color={zone.color} intensity={hovered ? 6 : 3.5} distance={6} decay={2} />

      {/* Light beam from sky to ground */}
      <mesh ref={beamRef} position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.04, 0.5, 4, 16, 1, true]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.22} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Core sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
        castShadow
      >
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color={zone.color}
          emissive={zone.color}
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Spinning halo ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <ringGeometry args={[0.7, 1, 64]} />
        <meshBasicMaterial color={zone.color} transparent opacity={hovered ? 0.6 : 0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.09} side={THREE.BackSide} />
      </mesh>

      {/* HTML label */}
      <Html center distanceFactor={14} position={[0, 1.4, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            pointerEvents: "all", cursor: "pointer", userSelect: "none",
          }}
          onClick={onClick}
        >
          <div
            style={{
              background: `radial-gradient(circle, ${zone.color}55 0%, ${zone.color}22 70%)`,
              border: `2px solid ${zone.color}`,
              borderRadius: "50%",
              width: 44, height: 44,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 22px ${zone.color}99, inset 0 0 12px ${zone.color}44`,
              backdropFilter: "blur(6px)",
            }}
          >
            <Icon size={22} color="white" strokeWidth={2.2} style={{ filter: `drop-shadow(0 0 4px ${zone.color})` }} />
          </div>
          <span
            style={{
              color: "white",
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textShadow: `0 0 10px ${zone.color}, 0 1px 3px rgba(0,0,0,0.95)`,
              whiteSpace: "nowrap",
              background: "rgba(0,0,0,0.55)",
              padding: "2px 8px",
              borderRadius: 6,
              border: `1px solid ${zone.color}66`,
            }}
          >
            {zone.label}
          </span>
        </div>
      </Html>
    </group>
  );
}

/* ─── Scene content ─── */
function SceneContent({ zones, onZoneClick }: { zones: ZoneConfig[]; onZoneClick: (id: string) => void }) {
  return (
    <>
      {/* Sky and environment */}
      <Sky
        distance={450000}
        sunPosition={[60, 8, 80]}
        inclination={0.49}
        azimuth={0.25}
        turbidity={6}
        rayleigh={3}
        mieCoefficient={0.005}
        mieDirectionalG={0.85}
      />
      <Environment preset="sunset" environmentIntensity={0.55} />

      {/* Lighting */}
      <ambientLight intensity={0.5} color="#fed7aa" />
      <hemisphereLight args={["#ffedd5", "#1a2d1a", 0.7]} />
      <directionalLight
        position={[50, 35, 40]}
        intensity={2.2}
        color="#fff7ed"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={120}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />

      {/* Atmospheric fog */}
      <fog attach="fog" args={["#f5d4a6", 38, 110]} />

      {/* Landscape */}
      <Terrain />
      <MountainRing />
      <Lake />
      <SolarPanels />

      {/* Energy installations */}
      <WindTurbine position={[-7, 0, -3]} />
      <WindTurbine position={[-10, 0, -6]} scale={1.1} speedMul={0.85} />
      <WindTurbine position={[-13, 0, -1]} scale={0.95} speedMul={1.15} />
      <NuclearPlant />
      <AtomElement />
      <VolcanoElement />

      {/* Clouds */}
      <Clouds material={THREE.MeshBasicMaterial} limit={50}>
        <Cloud seed={1} position={[-25, 20, -22]} bounds={[10, 2, 5]} segments={20} color="#ffedd5" opacity={0.55} speed={0.2} />
        <Cloud seed={2} position={[22, 24, -18]} bounds={[12, 2, 5]} segments={22} color="#fed7aa" opacity={0.5} speed={0.18} />
        <Cloud seed={3} position={[5, 26, 28]} bounds={[14, 2, 5]} segments={24} color="#fde68a" opacity={0.42} speed={0.22} />
        <Cloud seed={4} position={[-30, 22, 10]} bounds={[9, 2, 4]} segments={18} color="#fef3c7" opacity={0.4} speed={0.16} />
      </Clouds>

      {/* Atmospheric sparkles */}
      <Sparkles count={180} scale={[60, 15, 60]} size={2} speed={0.25} color="#fbbf24" position={[0, 7, 0]} opacity={0.7} />

      {/* Energy zone markers */}
      {zones.map((zone) => (
        <EnergyMarker key={zone.id} zone={zone} onClick={() => onZoneClick(zone.id)} />
      ))}
    </>
  );
}

/* ─── CSS Fallback (Replit preview / no WebGL) ─── */
function CSSFallback({ zones, onZoneClick }: { zones: ZoneConfig[]; onZoneClick: (id: string) => void }) {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{
      background: "linear-gradient(180deg, #1e3a5f 0%, #f59e0b 55%, #fed7aa 70%, #2d4a2a 72%, #1a3018 100%)",
    }}>
      <style>{`
        @keyframes cssFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes cssPulse { 0%,100%{opacity:.75;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
        @keyframes cloudDrift { from{transform:translateX(-100px)} to{transform:translateX(calc(100vw + 100px))} }
      `}</style>

      {/* Sun */}
      <div style={{ position: "absolute", left: "75%", top: "30%", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, #fef3c7 0%, #fbbf24 45%, transparent 75%)", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", left: "75%", top: "30%", width: 60, height: 60, marginLeft: 30, marginTop: 30, borderRadius: "50%", background: "#fef3c7", boxShadow: "0 0 60px #fbbf24" }} />

      {/* Clouds */}
      {[{ y: "12%", scale: 1, dur: "60s", delay: "0s", opacity: 0.7 }, { y: "22%", scale: 0.7, dur: "80s", delay: "-20s", opacity: 0.55 }, { y: "8%", scale: 0.8, dur: "100s", delay: "-50s", opacity: 0.5 }].map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 0, top: c.y, transform: `scale(${c.scale})`, animation: `cloudDrift ${c.dur} linear infinite`, animationDelay: c.delay, opacity: c.opacity }}>
          <div style={{ width: 140, height: 40, background: "#ffedd5", borderRadius: 30, filter: "blur(2px)" }} />
        </div>
      ))}

      {/* Mountain silhouette horizon */}
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: "28%", width: "100%", height: "30%" }}>
        <defs>
          <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#34304a" />
            <stop offset="1" stopColor="#1e2a3a" />
          </linearGradient>
          <linearGradient id="mtnNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e2a3a" />
            <stop offset="1" stopColor="#0f1825" />
          </linearGradient>
        </defs>
        {/* Far mountain range */}
        <path d="M0,30 L0,18 L7,8 L12,14 L20,5 L28,12 L35,7 L44,15 L52,6 L60,13 L68,4 L76,11 L84,8 L92,14 L100,9 L100,30 Z" fill="url(#mtnFar)" />
        {/* Near range */}
        <path d="M0,30 L0,22 L8,15 L16,20 L24,12 L32,18 L40,14 L48,21 L56,13 L64,19 L72,11 L80,18 L88,15 L96,20 L100,16 L100,30 Z" fill="url(#mtnNear)" />
      </svg>

      {/* Ground perspective grid */}
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "28%", opacity: 0.18 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="#fbbf24" strokeWidth="0.15" />
        ))}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={50 + (x - 50) * 4} y2="30" stroke="#fbbf24" strokeWidth="0.1" />
        ))}
      </svg>

      {/* Energy zone markers */}
      {zones.map((zone, i) => {
        const Icon = ICONS[zone.id] ?? Zap;
        return (
          <button
            key={zone.id}
            data-testid={`zone-${zone.id}`}
            onClick={() => onZoneClick(zone.id)}
            style={{
              position: "absolute",
              left: `${zone.hotspotX}%`,
              top: `${zone.hotspotY}%`,
              transform: "translate(-50%, -50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
              background: "none", border: "none", cursor: "pointer",
              animation: `cssFloat ${3.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.35}s`,
            }}
          >
            <div style={{
              width: 46, height: 46, borderRadius: "50%",
              background: `radial-gradient(circle, ${zone.color}55, ${zone.color}11)`,
              border: `2px solid ${zone.color}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 24px ${zone.color}aa, inset 0 0 12px ${zone.color}44`,
              animation: `cssPulse ${2 + i * 0.3}s ease-in-out infinite`,
              backdropFilter: "blur(4px)",
            }}>
              <Icon size={22} color="white" strokeWidth={2.2} style={{ filter: `drop-shadow(0 0 4px ${zone.color})` }} />
            </div>
            <span style={{
              color: "white", fontSize: 11, fontWeight: 800, letterSpacing: "0.06em",
              textShadow: `0 0 8px ${zone.color}`,
              background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: 6,
              border: `1px solid ${zone.color}66`,
              whiteSpace: "nowrap",
            }}>{zone.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Exported component ─── */
export default function Scene3D({ zones, onZoneClick }: { zones: ZoneConfig[]; onZoneClick: (id: string) => void }) {
  const webgl = useWebGL();
  const fallback = <CSSFallback zones={zones} onZoneClick={onZoneClick} />;
  if (!webgl) return fallback;

  return (
    <WebGLErrorBoundary fallback={fallback}>
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 10, 26], fov: 55 }}
          shadows
          gl={{
            antialias: true,
            alpha: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
        >
          <SceneContent zones={zones} onZoneClick={onZoneClick} />
          <OrbitControls
            enableZoom
            enablePan={false}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2.05}
            minDistance={14}
            maxDistance={50}
            target={[0, 2, 0]}
            autoRotate
            autoRotateSpeed={0.25}
            enableDamping
            dampingFactor={0.08}
            makeDefault
          />
        </Canvas>

        {/* Camera controls hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <div
            className="px-4 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            Trascina per ruotare · Scroll per zoom · Click sui marker
          </div>
        </div>
      </div>
    </WebGLErrorBoundary>
  );
}
