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
  return [((z.hotspotX - 50) / 50) * 14, 3.2, ((z.hotspotY - 35) / 50) * 12];
}

const srand = (s: number) => {
  const x = Math.sin(s * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/* ───────────── Realistic terrain ───────────── */
function Terrain() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(400, 400, 100, 100);
    const pos = g.attributes.position;
    const colors: number[] = [];
    const grass = new THREE.Color("#3d5a3a");
    const grassLight = new THREE.Color("#4d6a40");
    const dirt = new THREE.Color("#6b5640");
    const sand = new THREE.Color("#8a7256");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.hypot(x, y);
      // Subtle terrain elevation (slight rolling hills, increases far from center)
      let h = 0;
      if (r > 16) {
        h = (Math.sin(x * 0.08) * Math.cos(y * 0.08) + Math.sin(x * 0.15 + y * 0.1)) * 0.5;
        h += Math.max(0, (r - 24) * 0.05);
      } else {
        h = Math.sin(x * 0.4) * Math.cos(y * 0.4) * 0.06;
      }
      pos.setZ(i, h);

      // Vertex color variation for terrain
      const n = srand(i * 7.3);
      const m = srand(i * 11.7);
      let c: THREE.Color;
      if (n < 0.12) c = dirt.clone();
      else if (n < 0.18) c = sand.clone();
      else if (m < 0.5) c = grass.clone();
      else c = grassLight.clone();
      // Slight per-vertex jitter
      c.r *= 0.92 + srand(i * 2.1) * 0.16;
      c.g *= 0.92 + srand(i * 3.7) * 0.16;
      c.b *= 0.92 + srand(i * 5.1) * 0.16;
      colors.push(c.r, c.g, c.b);
    }
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow geometry={geometry}>
      <meshStandardMaterial vertexColors roughness={1} metalness={0} />
    </mesh>
  );
}

/* ───────────── Road network (asphalt main + branches) ───────────── */
function RoadNetwork() {
  // Main asphalt road curves through the front of the scene
  const mainSegments = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-32, 0, 13),
      new THREE.Vector3(-22, 0, 14.5),
      new THREE.Vector3(-12, 0, 12),
      new THREE.Vector3(-3, 0, 13.5),
      new THREE.Vector3(6, 0, 11.5),
      new THREE.Vector3(16, 0, 13.5),
      new THREE.Vector3(26, 0, 12),
      new THREE.Vector3(34, 0, 13),
    ]);
    const points = curve.getPoints(120);
    const segs: { x: number; z: number; angle: number; len: number }[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1];
      const dx = b.x - a.x, dz = b.z - a.z;
      const len = Math.hypot(dx, dz) + 0.04;
      segs.push({
        x: (a.x + b.x) / 2,
        z: (a.z + b.z) / 2,
        angle: Math.atan2(dz, dx),
        len,
      });
    }
    return segs;
  }, []);

  // Lane markings (dashed center line) along main road
  const lanes = useMemo(() => mainSegments.filter((_, i) => i % 3 === 0), [mainSegments]);

  // Dirt access roads from main road to each installation
  const branchTargets: { from: [number, number]; to: [number, number] }[] = useMemo(() => [
    { from: [-10.5, 13], to: [-10.6, -1.5] },   // solare
    { from: [-6, 13], to: [-6.2, 5] },          // eolica (short)
    { from: [-1, 13.5], to: [-1.5, 5] },        // idroelettrica
    { from: [4, 12], to: [4, 5] },              // nucleare
    { from: [8.5, 12.5], to: [9, 1] },          // geotermica
    { from: [-19, 14], to: [-22, -14] },        // village
  ], []);

  const branches = useMemo(() => {
    const out: { x: number; z: number; angle: number; len: number; dirt?: boolean }[] = [];
    branchTargets.forEach((b) => {
      const dx = b.to[0] - b.from[0];
      const dz = b.to[1] - b.from[1];
      const len = Math.hypot(dx, dz);
      const angle = Math.atan2(dz, dx);
      // Split into multiple segments to allow slight curvature
      const steps = Math.ceil(len / 1.5);
      for (let i = 0; i < steps; i++) {
        const t1 = i / steps;
        const t2 = (i + 1) / steps;
        const ax = b.from[0] + dx * t1;
        const az = b.from[1] + dz * t1;
        const bx = b.from[0] + dx * t2;
        const bz = b.from[1] + dz * t2;
        const ddx = bx - ax, ddz = bz - az;
        out.push({
          x: (ax + bx) / 2,
          z: (az + bz) / 2,
          angle: Math.atan2(ddz, ddx),
          len: Math.hypot(ddx, ddz) + 0.04,
          dirt: true,
        });
      }
    });
    return out;
  }, [branchTargets]);

  return (
    <group>
      {/* Main asphalt road */}
      {mainSegments.map((s, i) => (
        <mesh key={`m-${i}`} rotation={[-Math.PI / 2, 0, -s.angle]} position={[s.x, 0.025, s.z]} receiveShadow>
          <planeGeometry args={[s.len, 2.2]} />
          <meshStandardMaterial color="#252525" roughness={0.95} metalness={0.05} />
        </mesh>
      ))}
      {/* Road shoulders (lighter) */}
      {mainSegments.map((s, i) => (
        <mesh key={`sh-${i}`} rotation={[-Math.PI / 2, 0, -s.angle]} position={[s.x, 0.022, s.z]} receiveShadow>
          <planeGeometry args={[s.len, 2.7]} />
          <meshStandardMaterial color="#3d3530" roughness={1} />
        </mesh>
      ))}
      {/* Center lane dashes */}
      {lanes.map((s, i) => (
        <mesh key={`l-${i}`} rotation={[-Math.PI / 2, 0, -s.angle]} position={[s.x, 0.028, s.z]}>
          <planeGeometry args={[s.len * 0.5, 0.08]} />
          <meshStandardMaterial color="#e8c060" roughness={0.7} />
        </mesh>
      ))}
      {/* Dirt branch roads */}
      {branches.map((s, i) => (
        <mesh key={`b-${i}`} rotation={[-Math.PI / 2, 0, -s.angle]} position={[s.x, 0.018, s.z]} receiveShadow>
          <planeGeometry args={[s.len, 1.3]} />
          <meshStandardMaterial color="#5a4a36" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/* ───────────── Mountain ring (irregular, less stylized) ───────────── */
function MountainRing() {
  const mountains = useMemo(() => {
    const arr: { key: number; x: number; z: number; h: number; w: number; color: string; rot: number; snow: boolean; squash: number }[] = [];
    for (let ring = 0; ring < 2; ring++) {
      const count = ring === 0 ? 40 : 26;
      const baseR = ring === 0 ? 58 : 42;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + ring * 0.07 + srand(i * 1.1 + ring) * 0.15;
        const r = baseR + Math.sin(i * 1.7 + ring) * 8 + (srand(i * 5.3 + ring) - 0.5) * 6;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const h = (ring === 0 ? 17 : 11) + Math.sin(i * 2.3) * 6 + (srand(i * 7.7 + ring) - 0.5) * 4;
        const w = (ring === 0 ? 9 : 6.5) + (srand(i * 9.1 + ring) - 0.5) * 3;
        const palette = ring === 0
          ? ["#3a3f55", "#444a60", "#363b50", "#2f354a"]
          : ["#2a2f42", "#323750", "#2c3144"];
        arr.push({
          key: ring * 1000 + i,
          x, z, h, w,
          color: palette[i % palette.length],
          rot: srand(i * 13.7 + ring) * Math.PI * 2,
          snow: srand(i * 17.3 + ring) > 0.7 && ring === 0 && h > 18,
          squash: 0.75 + srand(i * 23.1 + ring) * 0.5,
        });
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {mountains.map((m) => (
        <group key={m.key} position={[m.x, 0, m.z]} rotation={[0, m.rot, 0]} scale={[m.squash, 1, 1 / m.squash * 0.95]}>
          <mesh position={[0, m.h / 2 - 0.5, 0]} castShadow receiveShadow>
            <coneGeometry args={[m.w, m.h, 6, 3]} />
            <meshStandardMaterial color={m.color} roughness={1} metalness={0} />
          </mesh>
          {m.snow && (
            <mesh position={[0, m.h - 0.5, 0]}>
              <coneGeometry args={[m.w * 0.4, m.h * 0.25, 6, 2]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.7} metalness={0} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/* ───────────── Forest ───────────── */
function Forest() {
  const trees = useMemo(() => {
    const arr: { x: number; z: number; s: number; rot: number; type: number }[] = [];
    const exclusionZones: Array<[number, number, number]> = [
      [-10.6, -1.5, 5.5],   // solar farm
      [-6.2, 4, 5.5],       // wind farm
      [-1.5, 4, 6.5],       // hydro lake+dam
      [4, 4, 5],            // nuclear
      [9, 1, 5.5],          // geothermal/volcano
      [-8.4, 7.9, 3.5],     // thermal
      [-3.4, 8.4, 3],       // chemical
      [2.2, 8.9, 3],        // factory
      [7.3, 8.4, 3],        // substation
      [-22, -17, 8],        // village
    ];
    const onRoad = (x: number, z: number) => Math.abs(z - 13) < 2 && Math.abs(x) < 30;
    for (let i = 0; i < 380; i++) {
      const r = 12 + srand(i * 1.3) * 32;
      const angle = srand(i * 2.7) * Math.PI * 2;
      const x = Math.cos(angle) * r + (srand(i * 3.1) - 0.5) * 4;
      const z = Math.sin(angle) * r + (srand(i * 4.3) - 0.5) * 4;
      let blocked = false;
      for (const [ex, ez, er] of exclusionZones) {
        if (Math.hypot(x - ex, z - ez) < er) { blocked = true; break; }
      }
      if (blocked || onRoad(x, z)) continue;
      arr.push({
        x, z,
        s: 0.5 + srand(i * 5.7) * 0.9,
        rot: srand(i * 6.1) * Math.PI * 2,
        type: i % 3,
      });
    }
    return arr;
  }, []);

  const tall = trees.filter((t) => t.type === 0);
  const med = trees.filter((t) => t.type === 1);
  const small = trees.filter((t) => t.type === 2);

  return (
    <>
      {/* Trunks */}
      <Instances limit={400}>
        <cylinderGeometry args={[0.09, 0.13, 0.8, 6]} />
        <meshStandardMaterial color="#3e2c20" roughness={1} />
        {trees.map((t, i) => (
          <Instance key={`tr-${i}`} position={[t.x, 0.4 * t.s, t.z]} scale={[t.s, t.s, t.s]} />
        ))}
      </Instances>
      {/* Tall narrow conifers */}
      <Instances limit={200} castShadow>
        <coneGeometry args={[0.55, 3.2, 7]} />
        <meshStandardMaterial color="#1e3d28" roughness={1} />
        {tall.map((t, i) => (
          <Instance key={`tall-${i}`} position={[t.x, 2.2 * t.s, t.z]} scale={[t.s, t.s * 1.1, t.s]} rotation={[0, t.rot, 0]} />
        ))}
      </Instances>
      {/* Medium spruces (layered) */}
      <Instances limit={200} castShadow>
        <coneGeometry args={[0.85, 1.6, 8]} />
        <meshStandardMaterial color="#234d2c" roughness={1} />
        {med.map((t, i) => (
          <Instance key={`med1-${i}`} position={[t.x, 1.3 * t.s, t.z]} scale={t.s} rotation={[0, t.rot, 0]} />
        ))}
      </Instances>
      <Instances limit={200}>
        <coneGeometry args={[0.6, 1.3, 8]} />
        <meshStandardMaterial color="#2e5d35" roughness={1} />
        {med.map((t, i) => (
          <Instance key={`med2-${i}`} position={[t.x, 2.1 * t.s, t.z]} scale={t.s} rotation={[0, t.rot + 0.3, 0]} />
        ))}
      </Instances>
      {/* Small bushy pines */}
      <Instances limit={150} castShadow>
        <coneGeometry args={[0.7, 1.6, 8]} />
        <meshStandardMaterial color="#264d2c" roughness={1} />
        {small.map((t, i) => (
          <Instance key={`small-${i}`} position={[t.x, 1.1 * t.s, t.z]} scale={t.s * 0.85} rotation={[0, t.rot, 0]} />
        ))}
      </Instances>
    </>
  );
}

/* ───────────── Rocks ───────────── */
function Rocks() {
  const rocks = useMemo(() => {
    const arr: { x: number; z: number; s: number; rot: number; sx: number; sy: number; sz: number }[] = [];
    for (let i = 0; i < 70; i++) {
      const r = 13 + srand(i * 7.7) * 35;
      const angle = srand(i * 8.3) * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      if (Math.abs(z - 13) < 2 && Math.abs(x) < 30) continue;
      arr.push({
        x, z,
        s: 0.25 + srand(i * 9.1) * 0.7,
        rot: srand(i * 10.3) * Math.PI * 2,
        sx: 0.7 + srand(i * 11.1) * 0.6,
        sy: 0.5 + srand(i * 12.3) * 0.6,
        sz: 0.7 + srand(i * 13.5) * 0.6,
      });
    }
    return arr;
  }, []);

  return (
    <Instances limit={80} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color="#6e6760" roughness={1} metalness={0} />
      {rocks.map((r, i) => (
        <Instance key={i} position={[r.x, r.s * r.sy * 0.35, r.z]}
          scale={[r.s * r.sx, r.s * r.sy, r.s * r.sz]}
          rotation={[r.rot, r.rot * 0.5, r.rot * 0.3]} />
      ))}
    </Instances>
  );
}

/* ───────────── Italian village ───────────── */
function House({ x, z, rot, w, d, h, wall, roof }: { x: number; z: number; rot: number; w: number; d: number; h: number; wall: string; roof: string }) {
  // Two-slope tile roof using two angled boxes
  const roofH = 0.55;
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      {/* Walls */}
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={wall} roughness={0.95} metalness={0.02} />
      </mesh>
      {/* Stone base */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[w + 0.04, 0.24, d + 0.04]} />
        <meshStandardMaterial color="#85786a" roughness={1} />
      </mesh>
      {/* Sloped tile roof (two pitched planes) */}
      <mesh position={[0, h + roofH / 2, d / 4]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[w + 0.18, 0.06, d / 2 + 0.4]} />
        <meshStandardMaterial color={roof} roughness={0.85} metalness={0.03} />
      </mesh>
      <mesh position={[0, h + roofH / 2, -d / 4]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[w + 0.18, 0.06, d / 2 + 0.4]} />
        <meshStandardMaterial color={roof} roughness={0.85} metalness={0.03} />
      </mesh>
      {/* Gable ends triangle */}
      <mesh position={[w / 2 + 0.04, h + roofH * 0.22, 0]} rotation={[0, Math.PI / 2, 0]}>
        <shapeGeometry args={[(() => {
          const s = new THREE.Shape();
          s.moveTo(-d / 2, 0); s.lineTo(d / 2, 0); s.lineTo(0, roofH); s.lineTo(-d / 2, 0);
          return s;
        })()]} />
        <meshStandardMaterial color={wall} roughness={0.95} />
      </mesh>
      <mesh position={[-w / 2 - 0.04, h + roofH * 0.22, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <shapeGeometry args={[(() => {
          const s = new THREE.Shape();
          s.moveTo(-d / 2, 0); s.lineTo(d / 2, 0); s.lineTo(0, roofH); s.lineTo(-d / 2, 0);
          return s;
        })()]} />
        <meshStandardMaterial color={wall} roughness={0.95} />
      </mesh>
      {/* Door */}
      <mesh position={[0, h * 0.32, d / 2 + 0.01]}>
        <boxGeometry args={[0.24, h * 0.6, 0.02]} />
        <meshStandardMaterial color="#5b3a22" roughness={0.85} />
      </mesh>
      {/* Windows with green shutters */}
      {[-w * 0.3, w * 0.3].map((wx) => (
        <group key={wx} position={[wx, h * 0.6, d / 2 + 0.01]}>
          <mesh>
            <boxGeometry args={[0.22, 0.22, 0.015]} />
            <meshStandardMaterial color="#2a3540" emissive="#fbbf24" emissiveIntensity={0.35} />
          </mesh>
          <mesh position={[-0.15, 0, 0.005]}>
            <boxGeometry args={[0.07, 0.24, 0.01]} />
            <meshStandardMaterial color="#3e6b3e" roughness={0.85} />
          </mesh>
          <mesh position={[0.15, 0, 0.005]}>
            <boxGeometry args={[0.07, 0.24, 0.01]} />
            <meshStandardMaterial color="#3e6b3e" roughness={0.85} />
          </mesh>
        </group>
      ))}
      {/* Side windows */}
      <mesh position={[w / 2 + 0.01, h * 0.6, 0]}>
        <boxGeometry args={[0.015, 0.2, 0.2]} />
        <meshStandardMaterial color="#2a3540" emissive="#fbbf24" emissiveIntensity={0.25} />
      </mesh>
      {/* Chimney */}
      <mesh position={[w * 0.28, h + 0.55, -d * 0.18]} castShadow>
        <boxGeometry args={[0.14, 0.45, 0.14]} />
        <meshStandardMaterial color="#9a7560" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Village() {
  const houses = useMemo(() => [
    { x: -22, z: -14, rot: 0.35, w: 1.4, d: 1.1, h: 1.1, wall: "#e8d5b7", roof: "#8b3a26" },
    { x: -19.5, z: -16, rot: -0.45, w: 1.2, d: 1.2, h: 0.95, wall: "#e0c79f", roof: "#a14730" },
    { x: -24, z: -17, rot: 0.15, w: 1.5, d: 1, h: 1.15, wall: "#dcc4a3", roof: "#7a3220" },
    { x: -20, z: -19, rot: -0.22, w: 1.3, d: 1.3, h: 1.05, wall: "#e5d2b0", roof: "#9b3f28" },
    { x: -25.5, z: -20, rot: 0.55, w: 1.4, d: 1.1, h: 0.95, wall: "#d4bb95", roof: "#8b3a26" },
    { x: -16.5, z: -18, rot: -0.32, w: 1.2, d: 1, h: 0.9, wall: "#e8d5b7", roof: "#a14730" },
    { x: -27, z: -14, rot: 0.22, w: 1.5, d: 1.2, h: 1.15, wall: "#dcc4a3", roof: "#7a3220" },
    { x: -15, z: -21, rot: -0.5, w: 1.3, d: 1.1, h: 1, wall: "#e0c79f", roof: "#9b3f28" },
    { x: -28, z: -18, rot: 0.4, w: 1.2, d: 1.3, h: 1.05, wall: "#e5d2b0", roof: "#8b3a26" },
  ], []);

  return (
    <group>
      {houses.map((h, i) => <House key={i} {...h} />)}

      {/* Church */}
      <group position={[-22, 0, -22.5]} rotation={[0, 0.15, 0]}>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 2, 3.4]} />
          <meshStandardMaterial color="#ebd9b8" roughness={0.95} />
        </mesh>
        {/* Pitched roof */}
        <mesh position={[0, 2.4, 0.85]} rotation={[Math.PI / 6, 0, 0]} castShadow>
          <boxGeometry args={[2.05, 0.06, 2.05]} />
          <meshStandardMaterial color="#7a3220" roughness={0.85} />
        </mesh>
        <mesh position={[0, 2.4, -0.85]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
          <boxGeometry args={[2.05, 0.06, 2.05]} />
          <meshStandardMaterial color="#7a3220" roughness={0.85} />
        </mesh>
        {/* Bell tower */}
        <mesh position={[0, 2, -1.95]} castShadow>
          <boxGeometry args={[0.95, 3.2, 0.95]} />
          <meshStandardMaterial color="#ebd9b8" roughness={0.95} />
        </mesh>
        {/* Pyramidal tower roof */}
        <mesh position={[0, 3.9, -1.95]} castShadow>
          <coneGeometry args={[0.7, 1.3, 4]} />
          <meshStandardMaterial color="#7a3220" roughness={0.85} />
        </mesh>
        {/* Cross */}
        <mesh position={[0, 4.85, -1.95]}>
          <boxGeometry args={[0.04, 0.55, 0.04]} />
          <meshStandardMaterial color="#c9a050" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 4.7, -1.95]}>
          <boxGeometry args={[0.32, 0.04, 0.04]} />
          <meshStandardMaterial color="#c9a050" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Bell window (arched opening simulated as dark rectangle) */}
        <mesh position={[0, 2.6, -1.45]}>
          <boxGeometry args={[0.4, 0.6, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#fbbf24" emissiveIntensity={0.25} />
        </mesh>
        {/* Door */}
        <mesh position={[0, 0.55, 1.71]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#3a2515" roughness={0.85} />
        </mesh>
        {/* Rosette window */}
        <mesh position={[0, 1.55, 1.71]}>
          <circleGeometry args={[0.22, 16]} />
          <meshStandardMaterial color="#2a3540" emissive="#fbbf24" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Low stone walls around village */}
      {[[-19, -22, 4, 0.05], [-26, -15, 0.05, 4], [-15, -16, 0.05, 3]].map(([x, z, sx, sz], i) => (
        <mesh key={i} position={[x as number, 0.25, z as number]} receiveShadow castShadow>
          <boxGeometry args={[(sx as number) || 0.3, 0.5, (sz as number) || 0.3]} />
          <meshStandardMaterial color="#857162" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/* ───────────── Lake ───────────── */
function Lake() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0.07, 5.5]} receiveShadow>
      <circleGeometry args={[4.2, 48]} />
      <MeshReflectorMaterial
        blur={[200, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={45}
        roughness={0.1}
        depthScale={0.6}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color="#2a4a78"
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
      ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.5 - cycle * 0.45);
    });
  });
  return (
    <group position={[-2, 0, 2]} rotation={[0, 0.15, 0]}>
      {/* Curved-feeling wall (slight rotation hint) */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.5, 2.8, 0.85]} />
        <meshStandardMaterial color="#a8a39a" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Top walkway */}
      <mesh position={[0, 2.86, 0]} castShadow>
        <boxGeometry args={[7.7, 0.14, 1.25]} />
        <meshStandardMaterial color="#6b6862" roughness={0.85} />
      </mesh>
      {/* Railings */}
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={i} position={[-3.5 + i * 0.55, 3.18, 0.55]}>
          <boxGeometry args={[0.04, 0.32, 0.04]} />
          <meshStandardMaterial color="#2e2e2e" metalness={0.55} roughness={0.6} />
        </mesh>
      ))}
      {/* Side buttresses */}
      {[-3.8, 3.8].map((x, i) => (
        <mesh key={i} position={[x, 1.2, -0.3]} castShadow>
          <boxGeometry args={[1, 2.4, 1.4]} />
          <meshStandardMaterial color="#9d9890" roughness={0.9} />
        </mesh>
      ))}
      {/* Spillway gates (3) */}
      {[-1.6, 0, 1.6].map((x, i) => (
        <mesh key={i} position={[x, 0.6, 0.43]}>
          <boxGeometry args={[1, 1.2, 0.05]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.55} roughness={0.5} />
        </mesh>
      ))}
      {/* Waterfall sheet */}
      <mesh position={[0, 1.1, 0.46]}>
        <planeGeometry args={[5.5, 2.4]} />
        <meshStandardMaterial color="#7fb3d4" transparent opacity={0.5} roughness={0.05} metalness={0.55} side={THREE.DoubleSide} emissive="#3d7da6" emissiveIntensity={0.15} />
      </mesh>
      {/* Mist */}
      <group ref={mistRef}>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh key={i} position={[-2.8 + i * 0.45, 2.3, 0.7]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshBasicMaterial color="white" transparent opacity={0.4} depthWrite={false} />
          </mesh>
        ))}
      </group>
      {/* Powerhouse at base */}
      <mesh position={[0, 0.4, 1.2]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.8, 1]} />
        <meshStandardMaterial color="#8c8880" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.86, 1.2]} castShadow>
        <boxGeometry args={[2.55, 0.08, 1.05]} />
        <meshStandardMaterial color="#5a463a" roughness={0.85} />
      </mesh>
    </group>
  );
}

/* ───────────── Solar farm (irregular layout) ───────────── */
function SolarFarm() {
  const panels = useMemo(() => {
    const out: { key: string; x: number; z: number; rot: number }[] = [];
    // 3 staggered rows with random offsets per panel
    const rows = [
      { z: -4, count: 5 },
      { z: -2.5, count: 6 },
      { z: -1, count: 5 },
      { z: 0.5, count: 4 },
    ];
    let k = 0;
    for (const row of rows) {
      const startX = -14 + (4 - row.count) * 0.6;
      for (let c = 0; c < row.count; c++) {
        out.push({
          key: `${k++}`,
          x: startX + c * 1.35 + (srand(k * 3.7) - 0.5) * 0.2,
          z: row.z + (srand(k * 5.1) - 0.5) * 0.3,
          rot: (srand(k * 7.3) - 0.5) * 0.1,
        });
      }
    }
    return out;
  }, []);

  return (
    <group>
      {panels.map((p) => (
        <group key={p.key} position={[p.x, 0.45, p.z]} rotation={[-Math.PI / 5, p.rot, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.15, 0.05, 0.75]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <planeGeometry args={[1.05, 0.65]} />
            <meshStandardMaterial color="#1c2c5a" metalness={0.85} roughness={0.18} emissive="#2244aa" emissiveIntensity={0.18} />
          </mesh>
          {[-0.2, 0, 0.2].map((y) => (
            <mesh key={y} position={[0, 0.04, y]}>
              <planeGeometry args={[1.04, 0.008]} />
              <meshBasicMaterial color="#0a0a1a" />
            </mesh>
          ))}
          {[-0.4, 0.4].map((x) => (
            <mesh key={x} position={[x, 0.04, 0]}>
              <planeGeometry args={[0.008, 0.65]} />
              <meshBasicMaterial color="#0a0a1a" />
            </mesh>
          ))}
          {/* Stand */}
          <mesh position={[0, -0.32, 0]}>
            <boxGeometry args={[0.06, 0.62, 0.06]} />
            <meshStandardMaterial color="#85807a" metalness={0.4} roughness={0.6} />
          </mesh>
        </group>
      ))}
      {/* Inverter cabinet */}
      <group position={[-13.5, 0, -5]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.7, 1, 0.45]} />
          <meshStandardMaterial color="#3a4555" roughness={0.7} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.7, 0.23]}>
          <planeGeometry args={[0.5, 0.3]} />
          <meshStandardMaterial color="#1a1a2a" emissive="#22aa44" emissiveIntensity={0.4} />
        </mesh>
      </group>
      {/* Perimeter fence posts */}
      {[-14, -12, -10, -8, -6].map((x, i) => (
        <mesh key={i} position={[x, 0.35, -5.2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 6]} />
          <meshStandardMaterial color="#5a554f" metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ───────────── Wind turbines (varied positions) ───────────── */
function WindTurbine({ position, scale = 1, speedMul = 1, yawDeg = 0 }: { position: [number, number, number]; scale?: number; speedMul?: number; yawDeg?: number }) {
  const bladesRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (bladesRef.current) bladesRef.current.rotation.z = s.clock.getElapsedTime() * 1.3 * speedMul;
  });
  return (
    <group position={position} scale={scale} rotation={[0, (yawDeg * Math.PI) / 180, 0]}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.7, 0.2, 16]} />
        <meshStandardMaterial color="#4a4640" roughness={0.85} metalness={0.15} />
      </mesh>
      <mesh position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.24, 8, 14]} />
        <meshStandardMaterial color="#e5e5e0" metalness={0.4} roughness={0.55} />
      </mesh>
      <mesh position={[0, 8.05, 0.2]} castShadow>
        <boxGeometry args={[0.5, 0.5, 1.3]} />
        <meshStandardMaterial color="#d4d4d0" metalness={0.5} roughness={0.45} />
      </mesh>
      <group ref={bladesRef} position={[0, 8.05, 0.9]}>
        <mesh>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#a0a09a" metalness={0.6} roughness={0.4} />
        </mesh>
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.sin(rad) * 2, Math.cos(rad) * 2, 0]} rotation={[0, 0, rad]} castShadow>
              <boxGeometry args={[0.14, 3.8, 0.07]} />
              <meshStandardMaterial color="#f0f0ec" metalness={0.25} roughness={0.65} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function WindFarm() {
  // Spread non-uniformly across the eolica zone
  return (
    <>
      <WindTurbine position={[-6, 0, 4]} scale={1} speedMul={1} yawDeg={-10} />
      <WindTurbine position={[-9, 0, 2.5]} scale={1.1} speedMul={0.85} yawDeg={-5} />
      <WindTurbine position={[-4, 0, 6.5]} scale={0.9} speedMul={1.15} yawDeg={5} />
      <WindTurbine position={[-11, 0, 5]} scale={1.05} speedMul={0.95} yawDeg={-12} />
      <WindTurbine position={[-7.5, 0, 6]} scale={0.95} speedMul={1.05} yawDeg={2} />
      <WindTurbine position={[-3.5, 0, 3]} scale={0.85} speedMul={1.2} yawDeg={8} />
    </>
  );
}

/* ───────────── Nuclear plant (under nuclear marker) ───────────── */
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
    <group position={[4, 0, 3.5]} rotation={[0, -0.2, 0]}>
      {[[-1.7, 0], [1.7, 0.4]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.05, 1.45, 3, 28, 1, false]} />
            <meshStandardMaterial color="#bcb8b0" roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[0, 3.85, 0]} castShadow>
            <cylinderGeometry args={[1.3, 1.05, 1.8, 28, 1, false]} />
            <meshStandardMaterial color="#bcb8b0" roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[0, 4.85, 0]}>
            <torusGeometry args={[1.3, 0.12, 8, 22]} />
            <meshStandardMaterial color="#5e5a52" roughness={0.6} metalness={0.35} />
          </mesh>
          {/* Vertical stripes/seams */}
          {[0, 1, 2, 3].map((j) => (
            <mesh key={j} position={[Math.sin((j / 4) * Math.PI * 2) * 1.2, 1.5, Math.cos((j / 4) * Math.PI * 2) * 1.2]} rotation={[0, (j / 4) * Math.PI * 2, 0]}>
              <boxGeometry args={[0.04, 3, 0.04]} />
              <meshStandardMaterial color="#8a8680" roughness={0.7} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Reactor building */}
      <mesh position={[-0.5, 1, -2.4]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 2, 2]} />
        <meshStandardMaterial color="#9e9a92" roughness={0.75} metalness={0.15} />
      </mesh>
      {/* Containment dome */}
      <mesh position={[-0.5, 2.5, -2.4]} castShadow>
        <sphereGeometry args={[1.05, 24, 18]} />
        <meshStandardMaterial color="#c0bcb4" roughness={0.55} metalness={0.25} />
      </mesh>
      {/* Pipes */}
      <mesh position={[-1.3, 0.5, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 2, 12]} />
        <meshStandardMaterial color="#b8a060" metalness={0.55} roughness={0.45} />
      </mesh>
      <mesh position={[0.7, 0.5, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 1.6, 12]} />
        <meshStandardMaterial color="#b8a060" metalness={0.55} roughness={0.45} />
      </mesh>
      {/* Control building */}
      <mesh position={[-2.6, 0.5, 1.4]} castShadow>
        <boxGeometry args={[1.2, 1, 0.8]} />
        <meshStandardMaterial color="#e0d5b8" roughness={0.7} />
      </mesh>
      <mesh position={[-2.6, 1.1, 1.4]} castShadow>
        <boxGeometry args={[1.25, 0.12, 0.85]} />
        <meshStandardMaterial color="#7a3220" />
      </mesh>
      {/* Parking lot pad */}
      <mesh position={[2, 0.012, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.4]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.95} />
      </mesh>
      {/* Steam */}
      <group ref={steamRef}>
        {Array.from({ length: 10 }, (_, i) => (
          <mesh key={i} position={[i % 2 === 0 ? -1.7 : 1.7, 5.5, i % 2 === 0 ? 0 : 0.4]}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color="white" transparent opacity={0.5} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ───────────── Volcano + geothermal (under geo marker) ───────────── */
function VolcanoElement() {
  const lavaRef = useRef<THREE.Mesh>(null!);
  const smokeRef = useRef<THREE.Group>(null!);
  const ventRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (lavaRef.current) {
      (lavaRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.8 + Math.sin(t * 2.5) * 0.8;
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
        ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.55 - cycle * 0.3);
      });
    }
  });

  return (
    <group position={[10, 0, -1]} rotation={[0, 0.4, 0]}>
      <pointLight color="#f97316" intensity={14} distance={20} position={[0, 5.5, 0]} decay={2} />

      {/* Main cone (irregular silhouette) */}
      <mesh position={[0, 2.9, 0]} castShadow receiveShadow scale={[1.1, 1, 0.9]}>
        <coneGeometry args={[5.2, 5.8, 9, 4]} />
        <meshStandardMaterial color="#3d362f" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* Secondary lower slope */}
      <mesh position={[0.4, 2, 0.2]} castShadow receiveShadow scale={[1.3, 0.7, 1.1]}>
        <coneGeometry args={[5.8, 4, 9, 3]} />
        <meshStandardMaterial color="#46403a" roughness={0.95} />
      </mesh>
      {/* Inner darker cone visible at crater */}
      <mesh position={[0.2, 2.7, 0.1]} rotation={[0, 0.3, 0]} scale={[1, 0.92, 1]}>
        <coneGeometry args={[4.3, 5.2, 9]} />
        <meshStandardMaterial color="#2d2823" roughness={0.95} />
      </mesh>
      {/* Crater lip */}
      <mesh position={[0, 5.85, 0]}>
        <torusGeometry args={[0.95, 0.32, 8, 22]} />
        <meshStandardMaterial color="#1a1612" roughness={0.95} />
      </mesh>
      {/* Lava core */}
      <mesh ref={lavaRef} position={[0, 5.95, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.35, 20]} />
        <meshStandardMaterial color="#ef4444" emissive="#f97316" emissiveIntensity={2.4} roughness={0.3} />
      </mesh>
      {/* Lava flows */}
      <mesh position={[0.5, 3.5, 2]} rotation={[Math.PI / 2.3, 0, 0.15]}>
        <boxGeometry args={[0.5, 3.5, 0.08]} />
        <meshStandardMaterial color="#c2410c" emissive="#ea580c" emissiveIntensity={1.4} roughness={0.6} />
      </mesh>
      <mesh position={[-1.6, 3.2, 1.1]} rotation={[Math.PI / 2.5, 0.3, -0.4]}>
        <boxGeometry args={[0.4, 2.8, 0.08]} />
        <meshStandardMaterial color="#c2410c" emissive="#ea580c" emissiveIntensity={1.3} roughness={0.6} />
      </mesh>
      <mesh position={[1.4, 3.5, -1.4]} rotation={[Math.PI / 2.5, 1.5, 0.3]}>
        <boxGeometry args={[0.3, 2.6, 0.08]} />
        <meshStandardMaterial color="#c2410c" emissive="#ea580c" emissiveIntensity={1.4} roughness={0.6} />
      </mesh>
      {/* Ash/burnt ground patch around base */}
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6, 24]} />
        <meshStandardMaterial color="#2a2520" roughness={1} />
      </mesh>

      {/* Smoke */}
      <group ref={smokeRef}>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[0, 6.5, 0]}>
            <sphereGeometry args={[0.85, 10, 10]} />
            <meshBasicMaterial color="#5a554f" transparent opacity={0.5} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {/* Geothermal plant at base */}
      <group position={[-3.2, 0, 3.5]} rotation={[0, 0.4, 0]}>
        {/* Building */}
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 1.1, 1.7]} />
          <meshStandardMaterial color="#7a756c" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[2.5, 0.12, 1.8]} />
          <meshStandardMaterial color="#4a423a" roughness={0.8} />
        </mesh>
        {/* Vertical heat exchanger pipes */}
        {[-0.7, 0, 0.7].map((x, i) => (
          <group key={i} position={[x, 0, -1]}>
            <mesh position={[0, 0.9, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.18, 1.8, 10]} />
              <meshStandardMaterial color="#5a4540" roughness={0.7} metalness={0.4} />
            </mesh>
            <mesh position={[0, 1.85, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.12, 10]} />
              <meshStandardMaterial color="#2a2520" />
            </mesh>
          </group>
        ))}
        <group ref={ventRef}>
          {Array.from({ length: 9 }, (_, i) => (
            <mesh key={i} position={[(i % 3 - 1) * 0.7, 2, -1]}>
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
      ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - cycle * 0.22);
    });
  });
  return (
    <group position={[-8.4, 0, 7.9]} rotation={[0, -0.3, 0]}>
      {/* Main building */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 2, 2.5]} />
        <meshStandardMaterial color="#888880" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <boxGeometry args={[3.6, 0.18, 2.6]} />
        <meshStandardMaterial color="#4a463e" roughness={0.85} />
      </mesh>
      {/* Side annex */}
      <mesh position={[2.3, 0.6, 0]} castShadow>
        <boxGeometry args={[1.1, 1.2, 1.5]} />
        <meshStandardMaterial color="#9a958a" roughness={0.85} />
      </mesh>
      {/* Tall chimneys */}
      {[-0.9, 0.9].map((x, i) => (
        <group key={i} position={[x, 0, -0.5]}>
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.42, 6, 16]} />
            <meshStandardMaterial color="#a35a4a" roughness={0.75} metalness={0.1} />
          </mesh>
          {[1.5, 3, 4.5].map((y, j) => (
            <mesh key={j} position={[0, y, 0]}>
              <cylinderGeometry args={[0.36 - j * 0.01, 0.36 - j * 0.01, 0.28, 16]} />
              <meshStandardMaterial color="#dad5cc" roughness={0.7} />
            </mesh>
          ))}
          <mesh position={[0, 5.95, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.15, 16]} />
            <meshStandardMaterial color="#1f1f1f" />
          </mesh>
        </group>
      ))}
      {/* Pipe between chimneys */}
      <mesh position={[0, 2.5, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 1.6, 12]} />
        <meshStandardMaterial color="#b8a060" metalness={0.55} roughness={0.45} />
      </mesh>
      {/* Storage tank */}
      <mesh position={[-2.2, 0.7, 0.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 1.4, 18]} />
        <meshStandardMaterial color="#dad5cc" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[-2.2, 1.45, 0.5]} castShadow>
        <sphereGeometry args={[0.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#dad5cc" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Smoke */}
      <group ref={smokeRef}>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh key={i} position={[i % 2 === 0 ? -0.9 : 0.9, 5.5, -0.5]}>
            <sphereGeometry args={[0.7, 10, 10]} />
            <meshBasicMaterial color="#3a3530" transparent opacity={0.6} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ───────────── Chemical plant ───────────── */
function ChemicalPlant() {
  return (
    <group position={[-3.4, 0, 8.4]} rotation={[0, 0.25, 0]}>
      {/* Storage tanks - more muted industrial palette */}
      {[
        [-1.4, 0.3, "#c0bdb6"],
        [0, -0.5, "#9a6c3a"],
        [1.4, 0.3, "#c0bdb6"],
        [0, 1.1, "#6a7585"]
      ].map(([x, z, color], i) => (
        <group key={i} position={[x as number, 0, z as number]}>
          <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.6, 0.6, 2.2, 22]} />
            <meshStandardMaterial color={color as string} roughness={0.55} metalness={0.5} />
          </mesh>
          <mesh position={[0, 2.25, 0]} castShadow>
            <sphereGeometry args={[0.6, 22, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={color as string} roughness={0.55} metalness={0.5} />
          </mesh>
          {/* Label band */}
          <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.61, 0.61, 0.16, 22]} />
            <meshStandardMaterial color="#2a2620" />
          </mesh>
          {/* Ladder */}
          <mesh position={[0.62, 1.1, 0]}>
            <boxGeometry args={[0.04, 2, 0.04]} />
            <meshStandardMaterial color="#4a4540" metalness={0.5} />
          </mesh>
          {[0.4, 0.9, 1.4, 1.9].map((yy) => (
            <mesh key={yy} position={[0.62, yy, 0]}>
              <boxGeometry args={[0.04, 0.02, 0.18]} />
              <meshStandardMaterial color="#4a4540" metalness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Distillation column */}
      <group position={[2.2, 0, 0.5]}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 3.6, 16]} />
          <meshStandardMaterial color="#b8b5ad" metalness={0.55} roughness={0.45} />
        </mesh>
        {[1, 2, 3].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.28, 0.05, 6, 16]} />
            <meshStandardMaterial color="#5a554d" metalness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 3.65, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.3, 8]} />
          <meshStandardMaterial color="#5a554d" />
        </mesh>
      </group>
      {/* Pipes between tanks */}
      <mesh position={[0, 0.35, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 2.8, 10]} />
        <meshStandardMaterial color="#8a857d" metalness={0.55} />
      </mesh>
      <mesh position={[0.7, 0.5, 0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 10]} />
        <meshStandardMaterial color="#8a857d" metalness={0.55} />
      </mesh>
      <mesh position={[0.7, 0.65, 0.4]}>
        <torusGeometry args={[0.14, 0.04, 6, 12]} />
        <meshStandardMaterial color="#8b3a26" metalness={0.5} />
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
    if (gearRef.current) gearRef.current.rotation.z = t * 1;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -t * 1.5;
  });
  return (
    <group position={[2.2, 0, 8.9]} rotation={[0, -0.15, 0]}>
      {/* Main building */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.8, 2.2]} />
        <meshStandardMaterial color="#9a958a" roughness={0.85} />
      </mesh>
      {/* Sawtooth roof */}
      {[-1, 0, 1].map((x, i) => (
        <group key={i} position={[x, 1.95, 0]}>
          <mesh rotation={[0, 0, Math.PI / 6]} castShadow>
            <boxGeometry args={[0.4, 0.6, 2.3]} />
            <meshStandardMaterial color="#6a655d" roughness={0.85} />
          </mesh>
          <mesh position={[0.25, 0.2, 0]} rotation={[0, 0, -Math.PI / 3]}>
            <planeGeometry args={[0.6, 2.2]} />
            <meshStandardMaterial color="#2a3540" emissive="#3a5570" emissiveIntensity={0.25} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      {/* Big gear on wall (more muted bronze) */}
      <group ref={gearRef} position={[-0.6, 0.95, 1.12]}>
        <mesh>
          <torusGeometry args={[0.55, 0.13, 10, 20]} />
          <meshStandardMaterial color="#a8804a" metalness={0.7} roughness={0.45} />
        </mesh>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.65, Math.sin(a) * 0.65, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.16, 0.16, 0.1]} />
              <meshStandardMaterial color="#967040" metalness={0.65} />
            </mesh>
          );
        })}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.12, 12]} />
          <meshStandardMaterial color="#5a4530" metalness={0.5} />
        </mesh>
      </group>
      {/* Small interlocked gear */}
      <group ref={gear2Ref} position={[0.4, 0.95, 1.12]}>
        <mesh>
          <torusGeometry args={[0.3, 0.09, 8, 16]} />
          <meshStandardMaterial color="#8a6035" metalness={0.7} roughness={0.45} />
        </mesh>
        {Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.36, Math.sin(a) * 0.36, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.12, 0.12, 0.08]} />
              <meshStandardMaterial color="#704a25" metalness={0.65} />
            </mesh>
          );
        })}
      </group>
      {/* Loading bay */}
      <mesh position={[1.3, 0.5, 1.11]}>
        <boxGeometry args={[0.6, 1, 0.04]} />
        <meshStandardMaterial color="#3a2c20" />
      </mesh>
      {/* Chimney */}
      <mesh position={[-1.2, 2.7, -0.7]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 1.6, 12]} />
        <meshStandardMaterial color="#5a554d" roughness={0.75} />
      </mesh>
      {/* Pallets outside */}
      <mesh position={[1.8, 0.1, 1.5]}>
        <boxGeometry args={[0.5, 0.2, 0.4]} />
        <meshStandardMaterial color="#7a5a3a" roughness={0.9} />
      </mesh>
      <mesh position={[2.1, 0.1, 1.7]}>
        <boxGeometry args={[0.5, 0.2, 0.4]} />
        <meshStandardMaterial color="#7a5a3a" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ───────────── Substation + Pylons + Cables ───────────── */
function PowerInfra() {
  const pylons = useMemo(() => [
    { x: 7.3, z: 7 },     // near substation
    { x: 11, z: 5 },
    { x: 14, z: 2 },
    { x: 17, z: -1 },
    { x: 20, z: -4 },
    { x: 4, z: 8 },
    { x: 0, z: 9 },
    { x: -4, z: 9.5 },
    { x: -9, z: 11 },
  ], []);
  return (
    <group>
      {/* Substation */}
      <group position={[7.3, 0, 8.4]} rotation={[0, 0.2, 0]}>
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.4, 1.1]} />
          <meshStandardMaterial color="#5a5550" roughness={0.6} metalness={0.45} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.7, 0.56]}>
            <boxGeometry args={[0.05, 1.2, 0.04]} />
            <meshStandardMaterial color="#2a2520" metalness={0.6} />
          </mesh>
        ))}
        {[-0.5, 0, 0.5].map((x, i) => (
          <group key={i} position={[x, 1.7, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.12, 0.12, 0.7, 14]} />
              <meshStandardMaterial color="#2a2520" roughness={0.5} metalness={0.55} />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
              <coneGeometry args={[0.1, 0.18, 8]} />
              <meshStandardMaterial color="#705540" roughness={0.6} />
            </mesh>
          </group>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={`f-${i}`} position={[-1.5 + i * 0.6, 0.4, 0.85]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#6a655e" metalness={0.4} />
          </mesh>
        ))}
        {/* Warning sign */}
        <mesh position={[1, 0.5, 0.85]}>
          <planeGeometry args={[0.25, 0.25]} />
          <meshStandardMaterial color="#d4a428" emissive="#d4a428" emissiveIntensity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Pylons */}
      {pylons.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.2, 6, 6]} />
            <meshStandardMaterial color="#6a655e" metalness={0.35} />
          </mesh>
          {[1.5, 3, 4.5].map((y, j) => (
            <group key={j} position={[0, y, 0]}>
              <mesh castShadow>
                <boxGeometry args={[1.8 - j * 0.25, 0.07, 0.07]} />
                <meshStandardMaterial color="#6a655e" metalness={0.35} />
              </mesh>
              {[-0.8 + j * 0.12, 0.8 - j * 0.12].map((x, k) => (
                <mesh key={k} position={[x, -0.15, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
                  <meshStandardMaterial color="#cac5b8" metalness={0.25} />
                </mesh>
              ))}
            </group>
          ))}
          {[0, 1, 2, 3].map((j) => (
            <mesh key={j} position={[0, 0.7 + j * 1.4, 0]} rotation={[0, 0, j % 2 ? 0.5 : -0.5]}>
              <boxGeometry args={[0.6, 0.04, 0.04]} />
              <meshStandardMaterial color="#6a655e" metalness={0.35} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Cables between consecutive pylons */}
      {pylons.slice(0, -1).map((p, i) => {
        const next = pylons[i + 1];
        const midX = (p.x + next.x) / 2;
        const midZ = (p.z + next.z) / 2;
        const dx = next.x - p.x;
        const dz = next.z - p.z;
        const len = Math.hypot(dx, dz);
        const angle = Math.atan2(dz, dx);
        return [1.35, 2.85, 4.35].map((y, j) => (
          <mesh key={`${i}-${j}`} position={[midX, y, midZ]} rotation={[0, -angle, 0]}>
            <cylinderGeometry args={[0.018, 0.018, len, 4]} />
            <meshStandardMaterial color="#1a1612" metalness={0.3} roughness={0.7} />
          </mesh>
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
        hovered ? 3.2 : 1.8 + Math.sin(t * 2 + seed) * 0.6;
    }
    if (ringRef.current) ringRef.current.rotation.z = t * 0.7 + seed;
    if (beamRef.current) {
      (beamRef.current.material as THREE.MeshBasicMaterial).opacity =
        hovered ? 0.4 : 0.22 + Math.sin(t * 1.5 + seed) * 0.08;
    }
  });

  return (
    <group position={pos}>
      <pointLight color={zone.color} intensity={hovered ? 6 : 3.5} distance={7} decay={2} />

      <mesh ref={beamRef} position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.65, 5, 16, 1, true]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.22} side={THREE.DoubleSide} depthWrite={false} />
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
        turbidity={5}
        rayleigh={2.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.85}
      />
      <Environment preset="sunset" environmentIntensity={0.5} />

      <ambientLight intensity={0.4} color="#fde0b8" />
      <hemisphereLight args={["#ffe5c0", "#1a2a1a", 0.55]} />
      <directionalLight
        position={[50, 35, 40]}
        intensity={2.2}
        color="#fff2dd"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={140}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      <fog attach="fog" args={["#e8c890", 45, 130]} />

      {/* Landscape */}
      <Terrain />
      <MountainRing />
      <RoadNetwork />
      <Forest />
      <Rocks />
      <Village />

      {/* Water */}
      <Lake />
      <HydroDam />

      {/* Energy installations - positioned under their markers */}
      <SolarFarm />
      <WindFarm />
      <NuclearPlant />
      <VolcanoElement />
      <ThermalPlant />
      <ChemicalPlant />
      <Factory />
      <PowerInfra />

      {/* Atmosphere */}
      <Clouds material={THREE.MeshBasicMaterial} limit={80}>
        <Cloud seed={1} position={[-28, 22, -25]} bounds={[12, 2.5, 6]} segments={22} color="#ffedd5" opacity={0.5} speed={0.18} />
        <Cloud seed={2} position={[25, 26, -20]} bounds={[14, 2.5, 6]} segments={24} color="#fed7aa" opacity={0.45} speed={0.16} />
        <Cloud seed={3} position={[5, 28, 32]} bounds={[16, 2.5, 6]} segments={26} color="#fde68a" opacity={0.4} speed={0.2} />
        <Cloud seed={4} position={[-32, 24, 12]} bounds={[10, 2.5, 5]} segments={20} color="#fef3c7" opacity={0.38} speed={0.14} />
        <Cloud seed={5} position={[18, 30, 18]} bounds={[11, 2.5, 5]} segments={20} color="#ffedd5" opacity={0.42} speed={0.17} />
        <Cloud seed={6} position={[-10, 32, -35]} bounds={[14, 2.5, 6]} segments={22} color="#fde68a" opacity={0.36} speed={0.15} />
      </Clouds>

      <Sparkles count={150} scale={[70, 16, 70]} size={1.5} speed={0.2} color="#fbbf24" position={[0, 8, 0]} opacity={0.5} />
      <Sparkles count={50} scale={[18, 7, 18]} size={2.5} speed={0.35} color="#f97316" position={[10, 6, -1]} opacity={0.7} />

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
            autoRotateSpeed={0.2}
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
