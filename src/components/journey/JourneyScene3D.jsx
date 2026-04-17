import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { journeyPhases } from '../../data/portfolio.js';

const PLANET_SPACING = 22;
const CAM = { x: 2.0, y: 1.5, z: 8 };

// ── Spaceship (main focus) ───────────────────────────────────────────────────
function Spaceship({ position }) {
  const group      = useRef();
  const exhaustRef = useRef();

  const mats = useMemo(() => ({
    body:    new THREE.MeshStandardMaterial({ color: 0x1e1b4b, emissive: 0x312e81, emissiveIntensity: 0.25, metalness: 0.9,  roughness: 0.2 }),
    nose:    new THREE.MeshStandardMaterial({ color: 0x4f46e5, emissive: 0x6366f1, emissiveIntensity: 0.4,  metalness: 0.8,  roughness: 0.1 }),
    wing:    new THREE.MeshStandardMaterial({ color: 0x312e81, emissive: 0x4338ca, emissiveIntensity: 0.15, metalness: 0.95, roughness: 0.15 }),
    cockpit: new THREE.MeshStandardMaterial({ color: 0xa5f3fc, emissive: 0x67e8f9, emissiveIntensity: 0.6, transparent: true, opacity: 0.65 }),
    glow:    new THREE.MeshStandardMaterial({ color: 0x818cf8, emissive: 0x818cf8, emissiveIntensity: 1.2, transparent: true, opacity: 0.8  }),
    engine:  new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 1.8, transparent: true, opacity: 0.85 }),
    tip:     new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 2.0 }),
  }), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.position.copy(position.current);
    group.current.rotation.z = Math.sin(t * 0.8) * 0.035;
    group.current.rotation.x = Math.sin(t * 0.6) * 0.025 - 0.07;
    if (exhaustRef.current) {
      exhaustRef.current.scale.setScalar(0.88 + Math.sin(t * 7) * 0.1);
      exhaustRef.current.material.emissiveIntensity = 1.0 + Math.sin(t * 9) * 0.4;
    }
  });

  return (
    <group ref={group}>
      <mesh material={mats.body}>    <cylinderGeometry args={[0.18, 0.32, 1.6, 10]} /></mesh>
      <mesh position={[0, 1.0, 0]} material={mats.nose}><coneGeometry    args={[0.18, 0.7, 10]} /></mesh>
      <mesh position={[0, 0.55, 0.1]} material={mats.cockpit}><sphereGeometry args={[0.1,  8,  8]} /></mesh>
      <mesh position={[-0.6,-0.1, 0]} rotation={[0,0, Math.PI*0.12]} material={mats.wing}><boxGeometry args={[0.7, 0.06, 0.38]} /></mesh>
      <mesh position={[ 0.6,-0.1, 0]} rotation={[0,0,-Math.PI*0.12]} material={mats.wing}><boxGeometry args={[0.7, 0.06, 0.38]} /></mesh>
      <mesh position={[0,-0.3,-0.2]}  rotation={[Math.PI*0.1,0,0]}   material={mats.wing}><boxGeometry args={[0.05, 0.4, 0.35]} /></mesh>
      <mesh position={[0,-1.05, 0]} material={mats.glow}>  <sphereGeometry args={[0.18, 8, 8]} /></mesh>
      <mesh ref={exhaustRef} position={[0,-1.45,0]} rotation={[Math.PI,0,0]} material={mats.engine}><coneGeometry args={[0.22,0.7,8]} /></mesh>
      {[-0.95, 0.95].map((x, i) => (
        <mesh key={i} position={[x,-0.1,0]} material={mats.tip}><sphereGeometry args={[0.04,6,6]} /></mesh>
      ))}
      <pointLight color={0x818cf8} intensity={0.9}  distance={5} />
      <pointLight position={[0,-1.4,0]} color={0x06b6d4} intensity={2.0} distance={3.5} />
    </group>
  );
}

// ── Minimal glowing waypoint (replaces heavy planet) ─────────────────────────
function Waypoint({ phase, zPos, shipPosition }) {
  const group   = useRef();
  const coreRef = useRef();
  const ringRef = useRef();

  const colorHex = useMemo(() => parseInt(phase.planetColor.replace('#',''), 16), [phase.planetColor]);

  const coreMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.9,
  }), [colorHex]);

  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), [colorHex]);

  const haloPts = useMemo(() => {
    const geo    = new THREE.BufferGeometry();
    const count  = 48;
    const radius = 1.4;
    const pos    = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      pos[i*3]   = Math.cos(a) * radius;
      pos[i*3+1] = Math.sin(a) * radius;
      pos[i*3+2] = 0;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  const haloMat = useMemo(() => new THREE.LineBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
  }), [colorHex]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const dist = Math.abs(zPos - shipPosition.current.z);
    group.current.visible = dist < 60;

    const t = clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.2) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.008;
    }
  });

  // Alternate left/right
  const xOff = (zPos / PLANET_SPACING) % 2 === 0 ? 5.5 : -5.5;

  return (
    <group ref={group} position={[xOff, 0, zPos]}>
      {/* Core dot */}
      <mesh ref={coreRef} material={coreMat}>
        <sphereGeometry args={[0.35, 16, 16]} />
      </mesh>

      {/* Spinning ring */}
      <mesh ref={ringRef} material={ringMat} rotation={[Math.PI/2.1, 0.15, 0]}>
        <torusGeometry args={[0.7, 0.025, 4, 48]} />
      </mesh>

      {/* Static halo circle */}
      <lineLoop geometry={haloPts} material={haloMat} rotation={[Math.PI/2, 0, 0]} />

      {/* Soft point light */}
      <pointLight color={colorHex} intensity={0.8} distance={8} />
    </group>
  );
}

// ── Engine particle trail ────────────────────────────────────────────────────
function EngineTrail({ shipPosition }) {
  const COUNT  = 80;
  const geoRef = useRef();
  const pos    = useRef(new Float32Array(COUNT * 3));
  const idx    = useRef(0);

  useFrame(() => {
    if (!geoRef.current) return;
    const sp = shipPosition.current;
    const i  = idx.current % COUNT;
    const b  = i * 3;
    pos.current[b]   = sp.x + (Math.random() - 0.5) * 0.25;
    pos.current[b+1] = sp.y - 1.35 + (Math.random() - 0.5) * 0.15;
    pos.current[b+2] = sp.z;
    idx.current++;
    for (let j = 0; j < COUNT; j++) pos.current[j*3+2] += 0.04;
    geoRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[pos.current, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#22d3ee" size={0.15} sizeAttenuation transparent
        opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </points>
  );
}

// ── Camera follows ship with mouse parallax ───────────────────────────────────
function FollowCamera({ shipPosition }) {
  const { camera } = useThree();

  useFrame(({ pointer }) => {
    const sp = shipPosition.current;
    camera.position.lerp(
      new THREE.Vector3(
        sp.x + CAM.x * 0.3 + pointer.x * 1.2,
        sp.y + CAM.y       + pointer.y * 0.7,
        sp.z + CAM.z
      ),
      0.035
    );
    camera.lookAt(sp.x, sp.y, sp.z - 3);
  });

  return null;
}

// ── Scene content ─────────────────────────────────────────────────────────────
function SceneContent({ scrollProgress }) {
  const shipPos     = useRef(new THREE.Vector3());
  const totalLength = (journeyPhases.length - 1) * PLANET_SPACING;

  useFrame(() => {
    const tz = -scrollProgress.current * totalLength;
    shipPos.current.z = THREE.MathUtils.lerp(shipPos.current.z, tz, 0.05);
    shipPos.current.x = Math.sin(shipPos.current.z * 0.04) * 1.0;
    shipPos.current.y = Math.cos(shipPos.current.z * 0.065) * 0.35;
  });

  return (
    <>
      <ambientLight intensity={0.12} color={0x1a1040} />
      <directionalLight position={[8, 8, 4]} intensity={0.2} color={0x6080ff} />

      <Stars radius={150} depth={60} count={3000} factor={2.5} saturation={0.2} fade speed={0.35} />

      <Spaceship    position={shipPos} />
      <EngineTrail  shipPosition={shipPos} />

      {journeyPhases.map((phase, i) => (
        <Waypoint
          key={phase.id}
          phase={phase}
          zPos={-i * PLANET_SPACING}
          shipPosition={shipPos}
        />
      ))}

      <FollowCamera shipPosition={shipPos} />
    </>
  );
}

// ── Exported component ────────────────────────────────────────────────────────
export default function JourneyScene3D({ scrollProgress }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        dpr={[1, 1.5]}
        eventSource={document.body}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ fov: 55, near: 0.1, far: 700, position: [CAM.x * 0.3, CAM.y, CAM.z] }}
        frameloop="always"
      >
        <color attach="background" args={['#020614']} />
        <fog   attach="fog"        args={['#020614', 40, 110]} />
        <Suspense fallback={null}>
          <SceneContent scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
