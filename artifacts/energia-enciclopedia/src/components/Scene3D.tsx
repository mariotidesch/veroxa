import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sky, Environment, OrbitControls, Cloud, Clouds,
  Sparkles, Html, MeshReflectorMaterial, Instance, Instances,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Sun, Wind, Droplets, Atom, Mountain,
  Flame, FlaskConical, Cog, Zap,
} from "lucide-react";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";

/* ───────────── WebGL detection ───────────── */
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

const srand = (s: number) => {
  const x = Math.sin(s * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/* ───────────── Terrain ───────────── */
function Terrain() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(400, 400, 80, 80);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // distance from center
      const r = Math.hypot(x, y);
      let h = 0;
      if (r > 18) {
        // slight rolling hills away from installations
        h = (Math.sin(x * 0.08) * Math.cos(y * 0.08) + Math.sin(x * 0.15 + y * 0.1)) * 0.6;
        h += Math.max(0, (r - 25) * 0.04);
      }
      pos.setZ(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow geometry={geometry}>
      <meshStandardMaterial color="#2d4a2a" roughness={1} metalness={0} />
    </mesh>
  );
}

/* ───────────── Path / road ───────────── */
function Road() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 11]}>
        <planeGeometry args={[35, 1.6]} />
        <meshStandardMaterial color="#a8896b" roughness={1} />
      </mesh>
      {/* Lane markings */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-14 + i * 2.6, 0.03, 11]}>
          <planeGeometry args={[1.2, 0.08]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>
      ))}
    </group>
  );
}

/* ───────────── Mountain ring (panorama horizon) ───────────── */
function MountainRing() {
  const mountains = useMemo(() => {
    const arr: { key: number; x: number; z: number; h: number; w: number; color: string; rot: number; snow: boolean }[] = [];
    // Two rings: far and near
    for (let ring = 0; ring < 2; ring++) {
      const count = ring === 0 ? 36 : 22;
      const baseR = ring === 0 ? 58 : 42;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + ring * 0.07;
        const r = baseR + Math.sin(i * 1.7 + ring) * 7 + Math.cos(i * 3.3) * 4;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const h = (ring === 0 ? 16 : 10) + Math.sin(i * 2.3) * 5 + Math.cos(i * 5.1) * 3;
        const w = (ring === 0 ? 9 : 6) + Math.sin(i * 3.1) * 2;
        const palette = ring === 0
          ? ["#2a3548", "#34304a", "#2d3a4d", "#252d40"]
          : ["#1a2435", "#1e2a3a", "#202b3e"];
        arr.push({
          key: ring * 1000 + i,
          x, z, h, w,
          color: palette[i % palette.length],
          rot: (i * 0.7 + ring) % (Math.PI * 2),
          snow: i % 4 === 0 && ring === 0,
        });
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {mountains.map((m) => (
        <group key={m.key} position={[m.x, 0, m.z]} rotation={[0, m.rot, 0]}>
          <mesh position={[0, m.h / 2 - 0.5, 0]} castShadow receiveShadow>
            <coneGeometry args={[m.w, m.h, 5, 1]} />
            <meshStandardMaterial color={m.color} roughness={1} metalness={0} flatShading />
          </mesh>
          {m.snow && (
            <mesh position={[0, m.h - 0.3, 0]}>
              <coneGeometry args={[m.w * 0.35, m.h * 0.22, 5, 1]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.6} metalness={0} flatShading />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/* ───────────── Forest (instanced trees) ───────────── */
function Forest() {
  const { conifers, oaks } = useMemo(() => {
    const conifers: { x: number; z: number; s: number; rot: number }[] = [];
    const oaks: { x: number; z: number; s: number; rot: number }[] = [];
    const isClear = (x: number, z: number) => {
      // Avoid installation zones
      if (Math.hypot(x - 11, z + 9) < 9) return false; // volcano
      if (Math.hypot(x + 2, z - 4) < 9) return false; // lake/dam
      if (Math.hypot(x - 5, z + 2) < 7) return false; // nuclear
      if (Math.hypot(x + 10, z + 3) < 7) return false; // wind/solar
      if (Math.hypot(x + 8, z - 8) < 4) return false; // thermal
      if (Math.hypot(x + 3, z - 8) < 4) return false; // chemical
      if (Math.hypot(x - 2, z - 8) < 4) return false; // factory
      if (Math.hypot(x - 7, z - 8) < 4) return false; // substation
      if (Math.abs(z - 11) < 2 && Math.abs(x) < 18) return false; // road
      return true;
    };
    for (let i = 0; i < 220; i++) {
      const r = 13 + srand(i * 1.3) * 28;
      const angle = srand(i * 2.7) * Math.PI * 2;
      const x = Math.cos(angle) * r + (srand(i * 3.1) - 0.5) * 3;
      const z = Math.sin(angle) * r + (srand(i * 4.3) - 0.5) * 3;
      if (!isClear(x, z)) continue;
      const item = {
        x, z,
        s: 0.55 + srand(i * 5.7) * 0.8,
        rot: srand(i * 6.1) * Math.PI * 2,
      };
      if (i % 4 === 0) oaks.push(item);
      else conifers.push(item);
    }
    return { conifers, oaks };
  }, []);

  return (
    <>
      {/* Conifer foliage */}
      <Instances limit={200} castShadow>
        <coneGeometry args={[0.7, 2.4, 6]} />
        <meshStandardMaterial color="#1a4d2e" roughness={1} flatShading />
        {conifers.map((t, i) => (
          <Instance key={`cf-${i}`} position={[t.x, 1.7 * t.s + 0.2, t.z]} scale={t.s} rotation={[0, t.rot, 0]} />
        ))}
      </Instances>
      {/* Conifer second layer (smaller cone on top) */}
      <Instances limit={200}>
        <coneGeometry args={[0.5, 1.4, 6]} />
        <meshStandardMaterial color="#15803d" roughness={1} flatShading />
        {conifers.map((t, i) => (
          <Instance key={`cf2-${i}`} position={[t.x, 2.7 * t.s + 0.2, t.z]} scale={t.s} rotation={[0, t.rot + 0.4, 0]} />
        ))}
      </Instances>
      {/* Trunks */}
      <Instances limit={250}>
        <cylinderGeometry args={[0.1, 0.14, 0.7, 6]} />
        <meshStandardMaterial color="#3e2723" roughness={1} flatShading />
        {[...conifers, ...oaks].map((t, i) => (
          <Instance key={`tr-${i}`} position={[t.x, 0.35 * t.s, t.z]} scale={t.s} />
        ))}
      </Instances>
      {/* Oaks / round bushy trees */}
      <Instances limit={80} castShadow>
        <sphereGeometry args={[0.9, 10, 8]} />
        <meshStandardMaterial color="#2e6b35" roughness={1} flatShading />
        {oaks.map((t, i) => (
          <Instance key={`oak-${i}`} position={[t.x, 1.2 * t.s, t.z]} scale={t.s * 1.1} rotation={[0, t.rot, 0]} />
        ))}
      </Instances>
    </>
  );
}

/* ───────────── Rocks ───────────── */
function Rocks() {
  const rocks = useMemo(() => {
    const arr: { x: number; z: number; s: number; rot: number }[] = [];
    for (let i = 0; i < 50; i++) {
      const r = 14 + srand(i * 7.7) * 32;
      const angle = srand(i * 8.3) * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      if (Math.abs(z - 11) < 2 && Math.abs(x) < 18) continue;
      arr.push({
        x, z,
        s: 0.25 + srand(i * 9.1) * 0.7,
        rot: srand(i * 10.3) * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  return (
    <Instances limit={60} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color="#6b7280" roughness={1} flatShading />
      {rocks.map((r, i) => (
        <Instance key={i} position={[r.x, r.s * 0.35, r.z]} scale={r.s} rotation={[r.rot, r.rot * 0.5, r.rot * 0.3]} />
      ))}
    </Instances>
  );
}

/* ───────────── Village (houses + church) ───────────── */
function Village() {
  const houses = useMemo(() => [
    { x: -22, z: -14, rot: 0.3, w: 1.4, d: 1.1, h: 1, roof: "#7c2d12" },
    { x: -19, z: -16, rot: -0.4, w: 1.2, d: 1.2, h: 0.9, roof: "#92400e" },
    { x: -24, z: -17, rot: 0.1, w: 1.5, d: 1, h: 1.1, roof: "#7c2d12" },
    { x: -20, z: -19, rot: -0.2, w: 1.3, d: 1.3, h: 1, roof: "#9a3412" },
    { x: -25, z: -20, rot: 0.5, w: 1.4, d: 1.1, h: 0.95, roof: "#7c2d12" },
    { x: -16, z: -18, rot: -0.3, w: 1.2, d: 1, h: 0.9, roof: "#92400e" },
    { x: -27, z: -14, rot: 0.2, w: 1.5, d: 1.2, h: 1.1, roof: "#7c2d12" },
  ], []);

  return (
    <group>
      {houses.map((h, i) => (
        <group key={i} position={[h.x, 0, h.z]} rotation={[0, h.rot, 0]}>
          <mesh position={[0, h.h / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[h.w, h.h, h.d]} />
            <meshStandardMaterial color="#f5e6d3" roughness={0.9} />
          </mesh>
          <mesh position={[0, h.h + 0.3, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[Math.max(h.w, h.d) * 0.78, 0.65, 4]} />
            <meshStandardMaterial color={h.roof} roughness={0.85} />
          </mesh>
          <mesh position={[0, h.h * 0.3, h.d / 2 + 0.01]}>
            <boxGeometry args={[0.22, h.h * 0.55, 0.02]} />
            <meshStandardMaterial color="#3e2723" />
          </mesh>
          <mesh position={[-h.w * 0.28, h.h * 0.6, h.d / 2 + 0.01]}>
            <boxGeometry args={[0.18, 0.18, 0.02]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[h.w * 0.28, h.h * 0.6, h.d / 2 + 0.01]}>
            <boxGeometry args={[0.18, 0.18, 0.02]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={0.5} />
          </mesh>
          {/* Chimney */}
          <mesh position={[h.w * 0.3, h.h + 0.5, -h.d * 0.2]} castShadow>
            <boxGeometry args={[0.15, 0.5, 0.15]} />
            <meshStandardMaterial color="#9ca3af" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Church */}
      <group position={[-22, 0, -22]}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.8, 3.2]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[1.05, 1.05, 3.25, 16, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#7c2d12" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
        {/* Tower */}
        <mesh position={[0, 1.8, -1.7]} castShadow>
          <boxGeometry args={[0.9, 3, 0.9]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.9} />
        </mesh>
        <mesh position={[0, 3.55, -1.7]} castShadow>
          <coneGeometry args={[0.6, 1.2, 4]} />
          <meshStandardMaterial color="#7c2d12" roughness={0.8} />
        </mesh>
        {/* Cross */}
        <mesh position={[0, 4.4, -1.7]}>
          <boxGeometry args={[0.04, 0.5, 0.04]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 4.3, -1.7]}>
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Bell window */}
        <mesh position={[0, 2.4, -1.25]}>
          <boxGeometry args={[0.35, 0.5, 0.02]} />
          <meshStandardMaterial color="#1f2937" emissive="#fbbf24" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

/* ───────────── Lake ───────────── */
function Lake() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0.06, 4]} receiveShadow>
      <circleGeometry args={[5, 48]} />
      <MeshReflectorMaterial
        blur={[200, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={45}
        roughness={0.1}
        depthScale={0.6}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color="#1e3a8a"
        metalness={0.8}
        mirror={0.75}
      />
    </mesh>
  );
}

/* ───────────── Hydro dam ───────────── */
function HydroDam() {
  const mistRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (!mistRef.current) return;
    const t = s.clock.getElapsedTime();
    mistRef.current.children.forEach((c, i) => {
      const cycle = (t * 1.4 + i * 0.25) % 1;
      c.position.y = 2.3 - cycle * 2.1;
      c.scale.setScalar(0.5 + cycle * 0.5);
      ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.55 - cycle * 0.5);
    });
  });
  return (
    <group position={[-2, 0, -1.5]}>
      {/* Dam wall (concave from front, simplified as curved box) */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 2.8, 0.9]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Top walkway */}
      <mesh position={[0, 2.85, 0]} castShadow>
        <boxGeometry args={[8.2, 0.15, 1.3]} />
        <meshStandardMaterial color="#6b7280" roughness={0.7} />
      </mesh>
      {/* Railings */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[-3.6 + i * 0.8, 3.2, 0.6]}>
          <boxGeometry args={[0.05, 0.35, 0.05]} />
          <meshStandardMaterial color="#374151" metalness={0.6} />
        </mesh>
      ))}
      {/* Side buttresses */}
      {[-4, 4].map((x, i) => (
        <mesh key={i} position={[x, 1.2, -0.3]} castShadow>
          <boxGeometry args={[1, 2.4, 1.5]} />
          <meshStandardMaterial color="#9ca3af" roughness={0.85} />
        </mesh>
      ))}
      {/* Waterfall sheet */}
      <mesh position={[0, 1.1, 0.5]}>
        <planeGeometry args={[6, 2.4]} />
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={0.55}
          roughness={0.05}
          metalness={0.6}
          side={THREE.DoubleSide}
          emissive="#0ea5e9"
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Mist */}
      <group ref={mistRef}>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh key={i} position={[-3 + i * 0.5, 2.3, 0.8]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshBasicMaterial color="white" transparent opacity={0.5} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ───────────── Solar farm ───────────── */
function SolarFarm() {
  const panels = useMemo(() => {
    const out: { key: string; x: number; z: number }[] = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        out.push({ key: `${row}-${col}`, x: -14 + col * 1.3, z: -6 + row * 1.4 });
      }
    }
    return out;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {panels.map((p) => (
        <group key={p.key} position={[p.x, 0.45, p.z]} rotation={[-Math.PI / 5, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.15, 0.06, 0.75]} />
            <meshStandardMaterial color="#0c1a4a" metalness={0.85} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0.035, 0]}>
            <planeGeometry args={[1.05, 0.65]} />
            <meshStandardMaterial color="#1e40af" metalness={0.95} roughness={0.08} emissive="#3b82f6" emissiveIntensity={0.3} />
          </mesh>
          {/* Grid lines */}
          {[-0.2, 0, 0.2].map((y) => (
            <mesh key={y} position={[0, 0.04, y]}>
              <planeGeometry args={[1.04, 0.01]} />
              <meshBasicMaterial color="#475569" />
            </mesh>
          ))}
          <mesh position={[0, -0.32, 0]}>
            <boxGeometry args={[0.07, 0.6, 0.07]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}
      {/* Inverter cabinet */}
      <mesh position={[-8, 0.5, -3]} castShadow>
        <boxGeometry args={[0.6, 1, 0.4]} />
        <meshStandardMaterial color="#475569" roughness={0.7} metalness={0.4} />
      </mesh>
    </group>
  );
}

/* ───────────── Wind turbines ───────────── */
function WindTurbine({ position, scale = 1, speedMul = 1 }: { position: [number, number, number]; scale?: number; speedMul?: number }) {
  const bladesRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (bladesRef.current) bladesRef.current.rotation.z = s.clock.getElapsedTime() * 1.4 * speedMul;
  });
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.7, 0.2, 16]} />
        <meshStandardMaterial color="#475569" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.24, 8, 12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 8.05, 0.2]} castShadow>
        <boxGeometry args={[0.5, 0.5, 1.3]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>
      <group ref={bladesRef} position={[0, 8.05, 0.9]}>
        <mesh>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.sin(rad) * 2, Math.cos(rad) * 2, 0]} rotation={[0, 0, rad]} castShadow>
              <boxGeometry args={[0.14, 3.8, 0.07]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.4} roughness={0.55} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function WindFarm() {
  return (
    <>
      <WindTurbine position={[-8, 0, 1]} scale={1} speedMul={1} />
      <WindTurbine position={[-12, 0, 0]} scale={1.15} speedMul={0.85} />
      <WindTurbine position={[-10, 0, -2]} scale={0.9} speedMul={1.2} />
      <WindTurbine position={[-14, 0, -3]} scale={1.05} speedMul={0.95} />
      <WindTurbine position={[-7, 0, -2]} scale={0.95} speedMul={1.1} />
    </>
  );
}

/* ───────────── Nuclear plant ───────────── */
function NuclearPlant() {
  const steamRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (!steamRef.current) return;
    const t = s.clock.getElapsedTime();
    steamRef.current.children.forEach((child, i) => {
      const offset = i * 0.35;
      const cycle = (t * 0.32 + offset) % 2.5;
      child.position.y = 5.5 + cycle * 1.3;
      child.scale.setScalar(1 + cycle * 0.55);
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.55 - cycle * 0.22);
    });
  });

  return (
    <group position={[5, 0, 1.5]}>
      {[[-1.9, 0], [1.9, 0]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.1, 1.5, 3, 24, 1, false]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.15} />
          </mesh>
          <mesh position={[0, 3.9, 0]} castShadow>
            <cylinderGeometry args={[1.35, 1.1, 1.9, 24, 1, false]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.15} />
          </mesh>
          <mesh position={[0, 4.9, 0]}>
            <torusGeometry args={[1.35, 0.13, 8, 20]} />
            <meshStandardMaterial color="#6b7280" roughness={0.5} metalness={0.4} />
          </mesh>
        </group>
      ))}
      {/* Reactor dome */}
      <mesh position={[0, 1, -2.4]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 2, 1.8]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[0, 2.5, -2.4]} castShadow>
        <sphereGeometry args={[1, 20, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Pipes */}
      <mesh position={[-1, 0.5, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 1.8, 10]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[1, 0.5, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 1.8, 10]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Control room small building */}
      <mesh position={[-2.5, 0.5, 1]} castShadow>
        <boxGeometry args={[1.2, 1, 0.8]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.7} />
      </mesh>
      <mesh position={[-2.5, 1.1, 1]} castShadow>
        <boxGeometry args={[1.25, 0.15, 0.85]} />
        <meshStandardMaterial color="#7c2d12" />
      </mesh>
      {/* Steam */}
      <group ref={steamRef}>
        {Array.from({ length: 10 }, (_, i) => (
          <mesh key={i} position={[i % 2 === 0 ? -1.9 : 1.9, 5.5, 0]}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color="white" transparent opacity={0.5} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ───────────── Atom decoration ───────────── */
function AtomElement() {
  const r1 = useRef<THREE.Group>(null!), r2 = useRef<THREE.Group>(null!), r3 = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (r1.current) r1.current.rotation.y = t * 0.8;
    if (r2.current) r2.current.rotation.x = t * 1.1;
    if (r3.current) r3.current.rotation.z = t * 0.6;
  });
  return (
    <group position={[5, 8, 0]}>
      <pointLight color="#34d399" intensity={5} distance={9} />
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2.5} />
      </mesh>
      {[r1, r2, r3].map((ref, i) => (
        <group key={i} ref={ref} rotation={[i * 1.05, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.2, 0.04, 8, 64]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.55} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[1.2, 0, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#86efac" emissive="#34d399" emissiveIntensity={3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ───────────── Volcano with geothermal pipes ───────────── */
function VolcanoElement() {
  const lavaRef = useRef<THREE.Mesh>(null!);
  const smokeRef = useRef<THREE.Group>(null!);
  const ventRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (lavaRef.current) {
      (lavaRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        2 + Math.sin(t * 2.5) * 1;
    }
    if (smokeRef.current) {
      smokeRef.current.children.forEach((c, i) => {
        const cycle = (t * 0.28 + i * 0.4) % 3;
        c.position.y = 6.5 + cycle * 1.6;
        c.position.x = Math.sin(cycle * 1.5 + i) * 0.6;
        c.scale.setScalar(1 + cycle * 0.6);
        ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.5 - cycle * 0.15);
      });
    }
    if (ventRef.current) {
      ventRef.current.children.forEach((c, i) => {
        const cycle = (t * 0.6 + i * 0.3) % 1.8;
        c.position.y = 1.3 + cycle * 0.9;
        c.scale.setScalar(0.45 + cycle * 0.35);
        ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - cycle * 0.3);
      });
    }
  });

  return (
    <group position={[11, 0, -4]}>
      <pointLight color="#f97316" intensity={18} distance={22} position={[0, 6, 0]} decay={2} />

      {/* Main cone */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <coneGeometry args={[5.5, 6.2, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.95} metalness={0.05} flatShading />
      </mesh>
      {/* Inner darker layers (eroded look) */}
      <mesh position={[0.3, 2.7, 0.2]} rotation={[0, 0.3, 0]}>
        <coneGeometry args={[4.5, 5.3, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.95} flatShading />
      </mesh>
      {/* Crater lip */}
      <mesh position={[0, 6.1, 0]}>
        <torusGeometry args={[1, 0.35, 8, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>
      {/* Lava core */}
      <mesh ref={lavaRef} position={[0, 6.15, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.35, 18]} />
        <meshStandardMaterial color="#ef4444" emissive="#f97316" emissiveIntensity={2.4} roughness={0.3} />
      </mesh>
      {/* Multiple lava flows down sides */}
      <mesh position={[0.6, 4, 2]} rotation={[Math.PI / 2.3, 0, 0.2]}>
        <boxGeometry args={[0.5, 3.5, 0.1]} />
        <meshStandardMaterial color="#dc2626" emissive="#ea580c" emissiveIntensity={1.6} />
      </mesh>
      <mesh position={[-1.8, 3.5, 1.2]} rotation={[Math.PI / 2.5, 0.3, -0.4]}>
        <boxGeometry args={[0.4, 3, 0.1]} />
        <meshStandardMaterial color="#dc2626" emissive="#ea580c" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[1.5, 3.8, -1.5]} rotation={[Math.PI / 2.5, 1.5, 0.3]}>
        <boxGeometry args={[0.3, 2.8, 0.1]} />
        <meshStandardMaterial color="#dc2626" emissive="#ea580c" emissiveIntensity={1.5} />
      </mesh>

      {/* Smoke */}
      <group ref={smokeRef}>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[0, 6.5, 0]}>
            <sphereGeometry args={[0.85, 10, 10]} />
            <meshBasicMaterial color="#64748b" transparent opacity={0.5} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {/* Geothermal vent pipes at base */}
      <group position={[-3.5, 0, 3.5]}>
        {[-0.6, 0, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.18, 1.2, 10]} />
            <meshStandardMaterial color="#7f1d1d" roughness={0.7} metalness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[2.2, 0.6, 1.5]} />
          <meshStandardMaterial color="#525252" roughness={0.7} />
        </mesh>
        <group ref={ventRef}>
          {Array.from({ length: 9 }, (_, i) => (
            <mesh key={i} position={[(i % 3 - 1) * 0.6, 1.3, 0]}>
              <sphereGeometry args={[0.35, 8, 8]} />
              <meshBasicMaterial color="white" transparent opacity={0.55} depthWrite={false} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ───────────── Thermal plant ───────────── */
function ThermalPlant() {
  const smokeRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (!smokeRef.current) return;
    const t = s.clock.getElapsedTime();
    smokeRef.current.children.forEach((c, i) => {
      const cycle = (t * 0.45 + i * 0.3) % 3;
      c.position.y = 5.5 + cycle * 1.6;
      c.position.x = (i % 2 === 0 ? -0.8 : 0.8) + Math.sin(cycle * 1.5 + i) * 0.5;
      c.scale.setScalar(0.7 + cycle * 0.45);
      ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.65 - cycle * 0.22);
    });
  });
  return (
    <group position={[-8, 0, 7]}>
      {/* Main building */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 2, 2.5]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <boxGeometry args={[3.6, 0.2, 2.6]} />
        <meshStandardMaterial color="#475569" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Side annex */}
      <mesh position={[2.3, 0.6, 0]} castShadow>
        <boxGeometry args={[1.1, 1.2, 1.5]} />
        <meshStandardMaterial color="#a8a29e" roughness={0.7} />
      </mesh>
      {/* Tall chimneys */}
      {[-0.9, 0.9].map((x, i) => (
        <group key={i} position={[x, 0, -0.5]}>
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.42, 6, 14]} />
            <meshStandardMaterial color="#dc2626" roughness={0.6} metalness={0.2} />
          </mesh>
          {/* White safety bands */}
          {[1.5, 3, 4.5].map((y, j) => (
            <mesh key={j} position={[0, y, 0]}>
              <cylinderGeometry args={[0.36 - j * 0.01, 0.36 - j * 0.01, 0.3, 14]} />
              <meshStandardMaterial color="white" roughness={0.6} />
            </mesh>
          ))}
          {/* Top rim */}
          <mesh position={[0, 5.95, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.15, 14]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
        </group>
      ))}
      {/* Pipe between chimneys */}
      <mesh position={[0, 2.5, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 1.6, 10]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} />
      </mesh>
      {/* Smoke */}
      <group ref={smokeRef}>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh key={i} position={[i % 2 === 0 ? -0.9 : 0.9, 5.5, -0.5]}>
            <sphereGeometry args={[0.7, 10, 10]} />
            <meshBasicMaterial color="#475569" transparent opacity={0.6} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ───────────── Chemical plant ───────────── */
function ChemicalPlant() {
  return (
    <group position={[-3.5, 0, 8]}>
      {/* Storage tanks */}
      {[[-1.4, 0.3, "#e5e7eb"], [0, -0.5, "#d97706"], [1.4, 0.3, "#e5e7eb"], [0, 1.1, "#9333ea"]].map(([x, z, color], i) => (
        <group key={i} position={[x as number, 0, z as number]}>
          <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.6, 0.6, 2.2, 22]} />
            <meshStandardMaterial color={color as string} roughness={0.35} metalness={0.75} />
          </mesh>
          <mesh position={[0, 2.25, 0]} castShadow>
            <sphereGeometry args={[0.6, 22, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={color as string} roughness={0.35} metalness={0.75} />
          </mesh>
          {/* Tank label band */}
          <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.61, 0.61, 0.18, 22]} />
            <meshStandardMaterial color={i === 1 ? "#000" : "#374151"} />
          </mesh>
          {/* Ladder */}
          <mesh position={[0.65, 1.1, 0]}>
            <boxGeometry args={[0.04, 2, 0.04]} />
            <meshStandardMaterial color="#6b7280" metalness={0.6} />
          </mesh>
        </group>
      ))}
      {/* Distillation column */}
      <group position={[2.2, 0, 0.5]}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 3.6, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.4} />
        </mesh>
        {[1, 2, 3].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.28, 0.05, 6, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.5} />
          </mesh>
        ))}
      </group>
      {/* Pipes between tanks */}
      <mesh position={[0, 0.35, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 2.8, 10]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} />
      </mesh>
      <mesh position={[0.7, 0.5, 0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 10]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} />
      </mesh>
      <mesh position={[0.7, 0.65, 0.4]}>
        <torusGeometry args={[0.14, 0.04, 6, 12]} />
        <meshStandardMaterial color="#dc2626" metalness={0.6} />
      </mesh>
    </group>
  );
}

/* ───────────── Mechanical factory ───────────── */
function Factory() {
  const gearRef = useRef<THREE.Group>(null!);
  const gear2Ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (gearRef.current) gearRef.current.rotation.z = t * 1.2;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -t * 1.8;
  });
  return (
    <group position={[2, 0, 8.5]}>
      {/* Main factory body */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.8, 2.2]} />
        <meshStandardMaterial color="#a8a29e" roughness={0.8} />
      </mesh>
      {/* Sawtooth roof */}
      {[-1, 0, 1].map((x, i) => (
        <group key={i} position={[x, 1.95, 0]}>
          <mesh rotation={[0, 0, Math.PI / 6]} castShadow>
            <boxGeometry args={[0.4, 0.6, 2.3]} />
            <meshStandardMaterial color="#78716c" roughness={0.8} />
          </mesh>
          <mesh position={[0.25, 0.2, 0]} rotation={[0, 0, -Math.PI / 3]}>
            <planeGeometry args={[0.6, 2.2]} />
            <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      {/* Big gear on wall */}
      <group ref={gearRef} position={[-0.6, 0.95, 1.12]}>
        <mesh>
          <torusGeometry args={[0.55, 0.13, 10, 20]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.3} />
        </mesh>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.65, Math.sin(a) * 0.65, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.16, 0.16, 0.1]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.7} />
            </mesh>
          );
        })}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.12, 12]} />
          <meshStandardMaterial color="#92400e" metalness={0.5} />
        </mesh>
      </group>
      {/* Small interlocked gear */}
      <group ref={gear2Ref} position={[0.4, 0.95, 1.12]}>
        <mesh>
          <torusGeometry args={[0.3, 0.09, 8, 16]} />
          <meshStandardMaterial color="#ea580c" metalness={0.8} roughness={0.3} />
        </mesh>
        {Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.36, Math.sin(a) * 0.36, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.12, 0.12, 0.08]} />
              <meshStandardMaterial color="#c2410c" metalness={0.7} />
            </mesh>
          );
        })}
      </group>
      {/* Loading bay door */}
      <mesh position={[1.3, 0.5, 1.11]}>
        <boxGeometry args={[0.6, 1, 0.04]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Small chimney */}
      <mesh position={[-1.2, 2.6, -0.7]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 1.5, 10]} />
        <meshStandardMaterial color="#6b7280" roughness={0.7} />
      </mesh>
    </group>
  );
}

/* ───────────── Substation + Power lines ───────────── */
function PowerInfra() {
  const pylons = useMemo(() => [
    { x: 5, z: 10 },
    { x: 11, z: 11 },
    { x: 17, z: 13 },
    { x: -1, z: 11 },
    { x: -7, z: 12 },
  ], []);
  return (
    <group>
      {/* Substation */}
      <group position={[7, 0, 8.5]}>
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.4, 1.1]} />
          <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Cooling fins */}
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.7, 0.55]}>
            <boxGeometry args={[0.06, 1.2, 0.04]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
        ))}
        {/* Coils on top */}
        {[-0.5, 0, 0.5].map((x, i) => (
          <group key={i} position={[x, 1.7, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.12, 0.12, 0.7, 14]} />
              <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
              <coneGeometry args={[0.1, 0.18, 8]} />
              <meshStandardMaterial color="#92400e" roughness={0.6} />
            </mesh>
          </group>
        ))}
        {/* Fence */}
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={`f-${i}`} position={[-1.5 + i * 0.6, 0.4, 0.85]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#6b7280" metalness={0.5} />
          </mesh>
        ))}
        {/* Warning sign */}
        <mesh position={[1, 0.5, 0.85]}>
          <planeGeometry args={[0.25, 0.25]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Pylons */}
      {pylons.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          {/* Lattice tower (cross diagonals) */}
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.18, 6, 6]} />
            <meshStandardMaterial color="#6b7280" metalness={0.4} />
          </mesh>
          {[1.5, 3, 4.5].map((y, j) => (
            <group key={j} position={[0, y, 0]}>
              <mesh castShadow>
                <boxGeometry args={[1.6 - j * 0.2, 0.07, 0.07]} />
                <meshStandardMaterial color="#6b7280" metalness={0.4} />
              </mesh>
              {/* Insulators hanging */}
              {[-0.7 + j * 0.1, 0.7 - j * 0.1].map((x, k) => (
                <mesh key={k} position={[x, -0.15, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
                  <meshStandardMaterial color="#e5e7eb" metalness={0.3} />
                </mesh>
              ))}
            </group>
          ))}
          {/* Diagonal lattice bars */}
          {[0, 1, 2, 3].map((j) => (
            <mesh key={j} position={[0, 0.7 + j * 1.4, 0]} rotation={[0, 0, j % 2 ? 0.5 : -0.5]}>
              <boxGeometry args={[0.6, 0.04, 0.04]} />
              <meshStandardMaterial color="#6b7280" metalness={0.4} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Cables strung between pylons (3 wires, 4 segments) */}
      {pylons.slice(0, -1).map((p, i) => {
        const next = pylons[i + 1];
        const midX = (p.x + next.x) / 2;
        const midZ = (p.z + next.z) / 2;
        const dx = next.x - p.x;
        const dz = next.z - p.z;
        const len = Math.hypot(dx, dz);
        const angle = Math.atan2(dz, dx);
        return [1.5, 3, 4.5].map((y, j) => (
          <group key={`${i}-${j}`} position={[midX, y - 0.25, midZ]} rotation={[0, -angle, 0]}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, len, 4]} />
              <meshStandardMaterial color="#1f2937" />
            </mesh>
          </group>
        ));
      })}
    </group>
  );
}

/* ───────────── Birds ───────────── */
function Birds() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (!groupRef.current) return;
    const t = s.clock.getElapsedTime();
    groupRef.current.children.forEach((c, i) => {
      const speed = 0.18 + (i % 3) * 0.05;
      const angle = t * speed + i * 1.3;
      const r = 22 + (i % 4) * 4;
      c.position.x = Math.cos(angle) * r;
      c.position.z = Math.sin(angle) * r;
      c.position.y = 13 + (i % 3) * 2 + Math.sin(t * 1.5 + i) * 0.6;
      c.rotation.y = -angle + Math.PI / 2;
      const flap = Math.sin(t * 8 + i) * 0.3;
      (c.children[0] as THREE.Object3D).rotation.x = flap;
      (c.children[1] as THREE.Object3D).rotation.x = -flap;
    });
  });
  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }, (_, i) => (
        <group key={i}>
          <mesh position={[0.12, 0, 0]}>
            <boxGeometry args={[0.22, 0.02, 0.08]} />
            <meshBasicMaterial color="#1f2937" />
          </mesh>
          <mesh position={[-0.12, 0, 0]}>
            <boxGeometry args={[0.22, 0.02, 0.08]} />
            <meshBasicMaterial color="#1f2937" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ───────────── Energy zone marker ───────────── */
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
      meshRef.current.position.y = pos[1] + Math.sin(t * 0.9 + seed) * 0.3;
      const pulse = hovered ? 1.4 : 1 + Math.sin(t * 2.2 + seed) * 0.09;
      meshRef.current.scale.setScalar(pulse);
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        hovered ? 3.2 : 1.9 + Math.sin(t * 2 + seed) * 0.6;
    }
    if (ringRef.current) ringRef.current.rotation.z = t * 0.7 + seed;
    if (beamRef.current) {
      (beamRef.current.material as THREE.MeshBasicMaterial).opacity =
        hovered ? 0.42 : 0.22 + Math.sin(t * 1.5 + seed) * 0.08;
    }
  });

  return (
    <group position={pos}>
      <pointLight color={zone.color} intensity={hovered ? 7 : 4} distance={7} decay={2} />

      <mesh ref={beamRef} position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.05, 0.55, 4.2, 16, 1, true]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.25} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
        castShadow
      >
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial
          color={zone.color}
          emissive={zone.color}
          emissiveIntensity={1.9}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <ringGeometry args={[0.75, 1.05, 64]} />
        <meshBasicMaterial color={zone.color} transparent opacity={hovered ? 0.65 : 0.35} side={THREE.DoubleSide} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.78, 16, 16]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>

      <Html center distanceFactor={14} position={[0, 1.5, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, pointerEvents: "all", cursor: "pointer", userSelect: "none" }}
          onClick={onClick}
        >
          <div style={{
            background: `radial-gradient(circle, ${zone.color}55 0%, ${zone.color}22 70%)`,
            border: `2px solid ${zone.color}`,
            borderRadius: "50%",
            width: 46, height: 46,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 24px ${zone.color}99, inset 0 0 14px ${zone.color}44`,
            backdropFilter: "blur(6px)",
          }}>
            <Icon size={23} color="white" strokeWidth={2.2} style={{ filter: `drop-shadow(0 0 4px ${zone.color})` }} />
          </div>
          <span style={{
            color: "white",
            fontSize: 11.5, fontWeight: 800, letterSpacing: "0.06em",
            textShadow: `0 0 10px ${zone.color}, 0 1px 3px rgba(0,0,0,0.95)`,
            whiteSpace: "nowrap",
            background: "rgba(0,0,0,0.6)",
            padding: "2px 8px", borderRadius: 6,
            border: `1px solid ${zone.color}66`,
          }}>{zone.label}</span>
        </div>
      </Html>
    </group>
  );
}

/* ───────────── Scene content ───────────── */
function SceneContent({ zones, onZoneClick }: { zones: ZoneConfig[]; onZoneClick: (id: string) => void }) {
  return (
    <>
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

      <ambientLight intensity={0.5} color="#fed7aa" />
      <hemisphereLight args={["#ffedd5", "#1a2d1a", 0.7]} />
      <directionalLight
        position={[50, 35, 40]}
        intensity={2.2}
        color="#fff7ed"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={140}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      <fog attach="fog" args={["#f5d4a6", 42, 130]} />

      {/* Landscape */}
      <Terrain />
      <MountainRing />
      <Road />
      <Forest />
      <Rocks />
      <Village />

      {/* Water */}
      <Lake />
      <HydroDam />

      {/* Energy installations */}
      <SolarFarm />
      <WindFarm />
      <NuclearPlant />
      <AtomElement />
      <VolcanoElement />
      <ThermalPlant />
      <ChemicalPlant />
      <Factory />
      <PowerInfra />

      {/* Atmosphere */}
      <Clouds material={THREE.MeshBasicMaterial} limit={80}>
        <Cloud seed={1} position={[-28, 22, -25]} bounds={[12, 2.5, 6]} segments={22} color="#ffedd5" opacity={0.55} speed={0.18} />
        <Cloud seed={2} position={[25, 26, -20]} bounds={[14, 2.5, 6]} segments={24} color="#fed7aa" opacity={0.5} speed={0.16} />
        <Cloud seed={3} position={[5, 28, 32]} bounds={[16, 2.5, 6]} segments={26} color="#fde68a" opacity={0.42} speed={0.2} />
        <Cloud seed={4} position={[-32, 24, 12]} bounds={[10, 2.5, 5]} segments={20} color="#fef3c7" opacity={0.4} speed={0.14} />
        <Cloud seed={5} position={[18, 30, 18]} bounds={[11, 2.5, 5]} segments={20} color="#ffedd5" opacity={0.45} speed={0.17} />
        <Cloud seed={6} position={[-10, 32, -35]} bounds={[14, 2.5, 6]} segments={22} color="#fde68a" opacity={0.38} speed={0.15} />
      </Clouds>

      <Sparkles count={200} scale={[70, 16, 70]} size={2} speed={0.25} color="#fbbf24" position={[0, 8, 0]} opacity={0.7} />
      <Sparkles count={60} scale={[20, 8, 20]} size={3.5} speed={0.4} color="#f97316" position={[11, 6, -4]} opacity={0.8} />

      <Birds />

      {zones.map((zone) => (
        <EnergyMarker key={zone.id} zone={zone} onClick={() => onZoneClick(zone.id)} />
      ))}
    </>
  );
}

/* ───────────── CSS Fallback (Replit preview) ───────────── */
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
      <div style={{ position: "absolute", left: "75%", top: "30%", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, #fef3c7 0%, #fbbf24 45%, transparent 75%)", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", left: "78%", top: "33%", width: 60, height: 60, borderRadius: "50%", background: "#fef3c7", boxShadow: "0 0 60px #fbbf24" }} />
      {[{ y: "12%", scale: 1, dur: "60s", delay: "0s", opacity: 0.7 }, { y: "22%", scale: 0.7, dur: "80s", delay: "-20s", opacity: 0.55 }, { y: "8%", scale: 0.8, dur: "100s", delay: "-50s", opacity: 0.5 }].map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 0, top: c.y, transform: `scale(${c.scale})`, animation: `cloudDrift ${c.dur} linear infinite`, animationDelay: c.delay, opacity: c.opacity }}>
          <div style={{ width: 140, height: 40, background: "#ffedd5", borderRadius: 30, filter: "blur(2px)" }} />
        </div>
      ))}
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: "28%", width: "100%", height: "30%" }}>
        <defs>
          <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#34304a" /><stop offset="1" stopColor="#1e2a3a" /></linearGradient>
          <linearGradient id="mtnNear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e2a3a" /><stop offset="1" stopColor="#0f1825" /></linearGradient>
        </defs>
        <path d="M0,30 L0,18 L7,8 L12,14 L20,5 L28,12 L35,7 L44,15 L52,6 L60,13 L68,4 L76,11 L84,8 L92,14 L100,9 L100,30 Z" fill="url(#mtnFar)" />
        <path d="M0,30 L0,22 L8,15 L16,20 L24,12 L32,18 L40,14 L48,21 L56,13 L64,19 L72,11 L80,18 L88,15 L96,20 L100,16 L100,30 Z" fill="url(#mtnNear)" />
      </svg>
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "28%", opacity: 0.18 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (<line key={`h${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="#fbbf24" strokeWidth="0.15" />))}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (<line key={`v${x}`} x1={x} y1="0" x2={50 + (x - 50) * 4} y2="30" stroke="#fbbf24" strokeWidth="0.1" />))}
      </svg>
      {zones.map((zone, i) => {
        const Icon = ICONS[zone.id] ?? Zap;
        return (
          <button key={zone.id} data-testid={`zone-${zone.id}`} onClick={() => onZoneClick(zone.id)} style={{
            position: "absolute", left: `${zone.hotspotX}%`, top: `${zone.hotspotY}%`,
            transform: "translate(-50%, -50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
            background: "none", border: "none", cursor: "pointer",
            animation: `cssFloat ${3.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.35}s`,
          }}>
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
              border: `1px solid ${zone.color}66`, whiteSpace: "nowrap",
            }}>{zone.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ───────────── Exported component ───────────── */
export default function Scene3D({ zones, onZoneClick }: { zones: ZoneConfig[]; onZoneClick: (id: string) => void }) {
  const webgl = useWebGL();
  const fallback = <CSSFallback zones={zones} onZoneClick={onZoneClick} />;
  if (!webgl) return fallback;

  return (
    <WebGLErrorBoundary fallback={fallback}>
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 11, 28], fov: 55 }}
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
            maxDistance={55}
            target={[0, 2, 0]}
            autoRotate
            autoRotateSpeed={0.22}
            enableDamping
            dampingFactor={0.08}
            makeDefault
          />
        </Canvas>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <div className="px-4 py-1.5 rounded-full text-xs font-medium" style={{
            background: "rgba(0,0,0,0.55)",
            color: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}>
            Trascina per ruotare · Scroll per zoom · Click sui marker
          </div>
        </div>
      </div>
    </WebGLErrorBoundary>
  );
}
