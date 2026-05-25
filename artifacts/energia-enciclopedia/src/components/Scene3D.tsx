import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  Sun, Wind, Droplets, Atom, Mountain,
  Flame, FlaskConical, Cog, Zap,
} from "lucide-react";
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
  return [((z.hotspotX - 50) / 50) * 14, 1.6, ((z.hotspotY - 35) / 50) * 12];
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.04) * 1.5;
    state.camera.position.y = 12 + Math.sin(t * 0.06) * 0.4;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#050d2a" roughness={0.9} metalness={0.1} />
      </mesh>
      <gridHelper args={[80, 40, "#1a2a5e", "#0d1a40"]} position={[0, 0.01, 0]} />
    </>
  );
}

function EnergyMarker({ zone, onClick }: { zone: ZoneConfig; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const pos = zoneToPos(zone);
  const Icon = ICONS[zone.id] ?? Zap;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const seed = zone.hotspotX * 0.3;
    if (meshRef.current) {
      meshRef.current.position.y = pos[1] + Math.sin(t * 0.9 + seed) * 0.22;
      const pulse = hovered ? 1.35 : 1 + Math.sin(t * 2.2 + seed) * 0.08;
      meshRef.current.scale.setScalar(pulse);
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        hovered ? 2.8 : 1.5 + Math.sin(t * 2 + seed) * 0.5;
    }
    if (ringRef.current) ringRef.current.rotation.z = t * 0.6 + seed;
  });

  return (
    <group position={pos}>
      <pointLight color={zone.color} intensity={hovered ? 6 : 3} distance={5} />
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
        castShadow
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={zone.color} emissive={zone.color} emissiveIntensity={1.5} roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <ringGeometry args={[0.75, 1.05, 64]} />
        <meshBasicMaterial color={zone.color} transparent opacity={hovered ? 0.55 : 0.28} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.85, 16, 16]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>
      <Html center distanceFactor={14} position={[0, 1.3, 0]} style={{ pointerEvents: "none" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, pointerEvents: "all", cursor: "pointer", userSelect: "none" }} onClick={onClick}>
          <div style={{ background: `radial-gradient(circle, ${zone.color}33 0%, ${zone.color}11 70%)`, border: `1.5px solid ${zone.color}88`, borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 18px ${zone.color}66`, backdropFilter: "blur(4px)" }}>
            <Icon size={18} color={zone.color} strokeWidth={2} />
          </div>
          <span style={{ color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textShadow: `0 0 8px ${zone.color}, 0 1px 3px rgba(0,0,0,0.9)`, whiteSpace: "nowrap", background: "rgba(0,0,0,0.5)", padding: "1px 6px", borderRadius: 4 }}>
            {zone.label}
          </span>
        </div>
      </Html>
    </group>
  );
}

function SunElement() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => { if (ref.current) ref.current.rotation.z = s.clock.getElapsedTime() * 0.15; });
  return (
    <group position={[-13, 10, -14]}>
      <pointLight color="#fbbf24" intensity={25} distance={40} />
      <mesh><sphereGeometry args={[2.2, 32, 32]} /><meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={3} roughness={0.1} /></mesh>
      <mesh><sphereGeometry args={[3.2, 16, 16]} /><meshBasicMaterial color="#fbbf24" transparent opacity={0.09} side={THREE.BackSide} /></mesh>
      <mesh><sphereGeometry args={[4.5, 16, 16]} /><meshBasicMaterial color="#f59e0b" transparent opacity={0.04} side={THREE.BackSide} /></mesh>
      <group ref={ref}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <mesh key={i} position={[Math.cos(a) * 3.2, Math.sin(a) * 3.2, 0]} rotation={[0, 0, a]}><boxGeometry args={[0.12, 1.2, 0.08]} /><meshBasicMaterial color="#fef08a" transparent opacity={0.55} /></mesh>;
        })}
      </group>
    </group>
  );
}

function WindTurbine({ position }: { position: [number, number, number] }) {
  const bladesRef = useRef<THREE.Group>(null!);
  useFrame((s) => { if (bladesRef.current) bladesRef.current.rotation.z = s.clock.getElapsedTime() * 1.8; });
  return (
    <group position={position}>
      <mesh position={[0, 2.5, 0]}><cylinderGeometry args={[0.08, 0.14, 5, 8]} /><meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} /></mesh>
      <group ref={bladesRef} position={[0, 5.1, 0]}>
        <mesh><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#e2e8f0" metalness={0.8} /></mesh>
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return <mesh key={i} position={[Math.sin(rad) * 1.3, Math.cos(rad) * 1.3, 0]} rotation={[0, 0, rad]}><boxGeometry args={[0.1, 2.6, 0.06]} /><meshStandardMaterial color="#f1f5f9" metalness={0.4} roughness={0.6} /></mesh>;
        })}
      </group>
    </group>
  );
}

function AtomElement() {
  const r1 = useRef<THREE.Group>(null!), r2 = useRef<THREE.Group>(null!), r3 = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (r1.current) r1.current.rotation.y = t * 0.8;
    if (r2.current) r2.current.rotation.x = t * 1.1;
    if (r3.current) r3.current.rotation.z = t * 0.6;
  });
  const M = <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} side={THREE.DoubleSide} />;
  return (
    <group position={[12, 3.5, -10]}>
      <pointLight color="#60a5fa" intensity={8} distance={12} />
      <mesh><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={2} /></mesh>
      {[r1, r2, r3].map((ref, i) => (
        <group key={i} ref={ref} rotation={[i * 1.05, 0, 0]}>
          <mesh><torusGeometry args={[2, 0.05, 8, 64]} />{M}</mesh>
          <mesh position={[2, 0, 0]}><sphereGeometry args={[0.18, 8, 8]} /><meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={3} /></mesh>
        </group>
      ))}
    </group>
  );
}

function VolcanoElement() {
  const lavaRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (lavaRef.current) (lavaRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + Math.sin(s.clock.getElapsedTime() * 2.5) * 0.8;
  });
  return (
    <group position={[9, 0, -8]}>
      <pointLight color="#ef4444" intensity={15} distance={14} position={[0, 5, 0]} />
      <mesh position={[0, 2.4, 0]} castShadow><coneGeometry args={[3.5, 5, 8]} /><meshStandardMaterial color="#374151" roughness={0.95} metalness={0.05} /></mesh>
      <mesh ref={lavaRef} position={[0, 4.9, 0]}><coneGeometry args={[0.7, 0.9, 8]} /><meshStandardMaterial color="#ef4444" emissive="#f97316" emissiveIntensity={2} roughness={0.3} /></mesh>
    </group>
  );
}

function WaterElement() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => { if (ref.current) ref.current.position.x = -5 + Math.sin(s.clock.getElapsedTime() * 0.3) * 0.4; });
  return (
    <mesh ref={ref} position={[-4, 0.05, 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 3, 1, 1]} />
      <meshStandardMaterial color="#1d4ed8" emissive="#1e40af" emissiveIntensity={0.5} metalness={0.6} roughness={0.1} transparent opacity={0.75} />
    </mesh>
  );
}

function SceneContent({ zones, onZoneClick }: { zones: ZoneConfig[]; onZoneClick: (id: string) => void }) {
  const { scene } = useThree();
  scene.fog = new THREE.FogExp2("#020818", 0.028);
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.25} color="#1e3a6e" />
      <hemisphereLight args={["#1e3a6e", "#000820", 0.6]} />
      <directionalLight position={[-12, 14, -8]} intensity={0.8} color="#fbbf24" castShadow />
      <Stars radius={80} depth={50} count={4000} factor={3} saturation={0.3} fade />
      <Ground />
      <SunElement />
      <WindTurbine position={[-9, 0, -5]} />
      <WindTurbine position={[-6, 0, -9]} />
      <WindTurbine position={[-12, 0, -7]} />
      <AtomElement />
      <VolcanoElement />
      <WaterElement />
      {zones.map((zone) => (
        <EnergyMarker key={zone.id} zone={zone} onClick={() => onZoneClick(zone.id)} />
      ))}
    </>
  );
}

/* ─── CSS Fallback (no WebGL) ─── */
function CSSFallback({ zones, onZoneClick }: { zones: ZoneConfig[]; onZoneClick: (id: string) => void }) {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: "linear-gradient(160deg, #020818 0%, #0c1445 45%, #050d2a 100%)" }}>
      <style>{`
        @keyframes cssFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes cssPulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
        @keyframes starTwinkle { 0%,100%{opacity:.3} 50%{opacity:.9} }
      `}</style>
      {/* Stars */}
      {Array.from({ length: 60 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: `${(i * 37 + 7) % 100}%`, top: `${(i * 53 + 11) % 100}%`, width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1, borderRadius: "50%", background: "white", animation: `starTwinkle ${2 + (i % 3)}s ease-in-out infinite`, animationDelay: `${(i * 0.4) % 3}s` }} />
      ))}
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <g key={i}>
          <line x1={`${i * 5.26}%`} y1="0" x2={`${i * 5.26}%`} y2="100%" stroke="#60a5fa" strokeWidth="0.5" />
          <line x1="0" y1={`${i * 5.26}%`} x2="100%" y2={`${i * 5.26}%`} stroke="#60a5fa" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
      {/* Decorative glows */}
      <div style={{ position: "absolute", left: "8%", top: "15%", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, #fbbf2444, transparent 70%)" }} />
      <div style={{ position: "absolute", right: "12%", top: "25%", width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, #ef444433, transparent 70%)" }} />
      <div style={{ position: "absolute", right: "6%", top: "35%", width: 40, height: 40, borderRadius: "50%", background: "radial-gradient(circle, #3b82f644, transparent 70%)" }} />
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              animation: `cssFloat ${3.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.35}s`,
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: `radial-gradient(circle, ${zone.color}44, ${zone.color}11)`,
              border: `1.5px solid ${zone.color}99`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 20px ${zone.color}55, 0 0 40px ${zone.color}22`,
              animation: `cssPulse ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}>
              <Icon size={20} color={zone.color} strokeWidth={2} />
            </div>
            <span style={{ color: "white", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textShadow: `0 0 8px ${zone.color}`, background: "rgba(0,0,0,0.6)", padding: "1px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>
              {zone.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Exported component — skips Canvas entirely if no WebGL ─── */
export default function Scene3D({ zones, onZoneClick }: { zones: ZoneConfig[]; onZoneClick: (id: string) => void }) {
  const webgl = useWebGL();
  const fallback = <CSSFallback zones={zones} onZoneClick={onZoneClick} />;
  if (!webgl) return fallback;
  return (
    <WebGLErrorBoundary fallback={fallback}>
      <Canvas camera={{ position: [0, 12, 22], fov: 58 }} shadows style={{ background: "#020818" }} gl={{ antialias: true, alpha: false }}>
        <SceneContent zones={zones} onZoneClick={onZoneClick} />
      </Canvas>
    </WebGLErrorBoundary>
  );
}
