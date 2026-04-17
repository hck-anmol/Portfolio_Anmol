import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ── Gentle camera drift with mouse parallax ──────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const t = useRef(0);

  useFrame((state, delta) => {
    t.current += delta;
    const driftX = Math.sin(t.current * 0.06) * 0.8;
    const driftY = Math.cos(t.current * 0.04) * 0.5;
    const mx = state.pointer.x * 1.0;
    const my = state.pointer.y * 0.6;
    target.current.set(driftX + mx, driftY + my, 10);
    camera.position.lerp(target.current, 0.01);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Subtle nebula blob ───────────────────────────────────────────────────────
function NebulaBlob({ position, color, scale = 1, speed = 0.2, opacity = 0.04 }) {
  const ref = useRef();
  const base = useRef(Math.random() * 0.3 + 0.85);

  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  }), [color, opacity]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = base.current + Math.sin(clock.elapsedTime * speed) * 0.06;
    ref.current.scale.setScalar(pulse * scale);
    ref.current.rotation.y += 0.0003;
  });

  return (
    <mesh ref={ref} position={position} material={mat}>
      <sphereGeometry args={[12, 12, 12]} />
    </mesh>
  );
}

// ── Slow galaxy ring ─────────────────────────────────────────────────────────
function GalaxyDisk() {
  const ref = useRef();
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#3730a3',
    transparent: true,
    opacity: 0.018,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.012;
  });

  return (
    <mesh ref={ref} position={[0, -10, -50]} rotation={[Math.PI / 2.4, 0, 0]} material={mat}>
      <torusGeometry args={[28, 12, 3, 64]} />
    </mesh>
  );
}

// ── Scene ────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.08} />

      {/* Primary starfield — single draw call */}
      <Stars
        radius={180}
        depth={70}
        count={4000}
        factor={2.5}
        saturation={0.2}
        fade
        speed={0.4}
      />

      {/* Subtle dust / sparkles */}
      <Sparkles
        count={80}
        scale={[100, 70, 70]}
        size={0.9}
        speed={0.08}
        opacity={0.2}
        color="#7c72b8"
      />

      {/* Only 3 nebula blobs — spread far apart */}
      <NebulaBlob position={[-28,  12, -65]} color="#2563eb" scale={2.0} opacity={0.04}  speed={0.18} />
      <NebulaBlob position={[ 36, -14, -85]} color="#7c3aed" scale={2.4} opacity={0.032} speed={0.12} />
      <NebulaBlob position={[  5,  18,-105]} color="#db2777" scale={1.6} opacity={0.028} speed={0.22} />

      <GalaxyDisk />
      <CameraRig />
    </>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function SpaceBackground3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        dpr={[1, 1.5]}
        eventSource={document.body}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ fov: 60, near: 0.1, far: 900, position: [0, 0, 10] }}
        frameloop="always"
      >
        <color attach="background" args={['#020614']} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
