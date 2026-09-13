'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import type { MuscleGroup } from '@/types'

interface GymOrbCanvasProps {
  selectedGroup: MuscleGroup | 'all'
  onSelectGroup?: (g: MuscleGroup | 'all') => void
  color?: string
}

/* ── 3D Olympic Barbell & Weight Plates ── */
function BarbellModel({ color = '#00F0FF' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Subtle tilt & roll on idle
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.08
    groupRef.current.rotation.x = Math.cos(t * 0.6) * 0.06
  })

  const glowColor = useMemo(() => new THREE.Color(color), [color])

  return (
    <group ref={groupRef} scale={1.25} position={[0, 0.1, 0]}>
      {/* Central Knurled Chrome Shaft */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 1.8, 32]} />
        <meshStandardMaterial metalness={0.98} roughness={0.12} color="#f1f5f9" />
      </mesh>

      {/* Center Knurling Grips */}
      {[-0.35, -0.12, 0.12, 0.35].map((pos, i) => (
        <mesh key={i} position={[pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.048, 0.048, 0.18, 32]} />
          <meshStandardMaterial metalness={0.92} roughness={0.4} color="#94a3b8" />
        </mesh>
      ))}

      {/* Left Sleeves & Weight Plates */}
      <group position={[-0.7, 0, 0]}>
        {/* Sleeve Collar */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.06, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.05, 32]} />
          <meshStandardMaterial metalness={0.95} roughness={0.15} color="#cbd5e1" />
        </mesh>

        {/* Big Outer Plate (20kg / 45lb) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.04, 0, 0]}>
          <cylinderGeometry args={[0.44, 0.44, 0.07, 40]} />
          <meshStandardMaterial metalness={0.8} roughness={0.25} color="#0b1329" />
        </mesh>
        {/* Accent Glow Ring on Left Outer Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.08, 0, 0]}>
          <torusGeometry args={[0.445, 0.018, 16, 36]} />
          <meshBasicMaterial color={glowColor} />
        </mesh>

        {/* Medium Inner Plate (10kg / 25lb) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.14, 0, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.06, 36]} />
          <meshStandardMaterial metalness={0.85} roughness={0.2} color="#1e293b" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.175, 0, 0]}>
          <torusGeometry args={[0.365, 0.014, 16, 36]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.7} />
        </mesh>

        {/* Small Plate (5kg) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.23, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.05, 32]} />
          <meshStandardMaterial metalness={0.9} roughness={0.18} color="#0f172a" />
        </mesh>

        {/* Lock Collar */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.28, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.04, 32]} />
          <meshStandardMaterial metalness={0.98} roughness={0.1} color={glowColor} />
        </mesh>
      </group>

      {/* Right Sleeves & Weight Plates */}
      <group position={[0.7, 0, 0]}>
        {/* Sleeve Collar */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.06, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.05, 32]} />
          <meshStandardMaterial metalness={0.95} roughness={0.15} color="#cbd5e1" />
        </mesh>

        {/* Big Outer Plate (20kg / 45lb) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.04, 0, 0]}>
          <cylinderGeometry args={[0.44, 0.44, 0.07, 40]} />
          <meshStandardMaterial metalness={0.8} roughness={0.25} color="#0b1329" />
        </mesh>
        {/* Accent Glow Ring on Right Outer Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.08, 0, 0]}>
          <torusGeometry args={[0.445, 0.018, 16, 36]} />
          <meshBasicMaterial color={glowColor} />
        </mesh>

        {/* Medium Inner Plate (10kg / 25lb) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.14, 0, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.06, 36]} />
          <meshStandardMaterial metalness={0.85} roughness={0.2} color="#1e293b" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.175, 0, 0]}>
          <torusGeometry args={[0.365, 0.014, 16, 36]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.7} />
        </mesh>

        {/* Small Plate (5kg) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.23, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.05, 32]} />
          <meshStandardMaterial metalness={0.9} roughness={0.18} color="#0f172a" />
        </mesh>

        {/* Lock Collar */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.28, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.04, 32]} />
          <meshStandardMaterial metalness={0.98} roughness={0.1} color={glowColor} />
        </mesh>
      </group>
    </group>
  )
}

/* ── Orbiting Kinetic Power Embers ── */
function PowerSparks({ color }: { color: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = 40

  const { positions, scales, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    const off = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 1.1 + Math.random() * 0.45
      pos[i * 3] = r * Math.cos(angle)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.7
      pos[i * 3 + 2] = r * Math.sin(angle)

      scl[i] = 0.02 + Math.random() * 0.025
      off[i] = Math.random() * Math.PI * 2
    }
    return { positions: pos, scales: scl, offsets: off }
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const col = useMemo(() => new THREE.Color(color), [color])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.8
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]
      const s = scales[i]
      const o = offsets[i]

      dummy.position.set(
        x * Math.cos(t * 0.5) - z * Math.sin(t * 0.5),
        y + Math.sin(t + o) * 0.12,
        x * Math.sin(t * 0.5) + z * Math.cos(t * 0.5)
      )
      dummy.scale.setScalar(s * (0.8 + Math.sin(t * 2 + o) * 0.35))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={col} transparent opacity={0.75} />
    </instancedMesh>
  )
}

function GymScene({ color = '#00F0FF' }: { color?: string }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 4]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, 3, -3]} intensity={0.9} color="#7C5CFC" />
      <pointLight position={[0, -2, 2]} intensity={1.2} color={color} />
      <pointLight position={[0, 3, -2]} intensity={0.7} color="#38bdf8" />

      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.35}>
        <BarbellModel color={color} />
        <PowerSparks color={color} />
      </Float>

      <ContactShadows
        position={[0, -0.9, 0]}
        opacity={0.45}
        scale={3.5}
        blur={2}
        far={1.8}
        color="#000000"
      />

      {/* OrbitControls: allows smooth user interaction to spin the 3D barbell */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={1.4}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 2.8}
      />
    </>
  )
}

export default function GymOrbCanvas({ selectedGroup }: GymOrbCanvasProps) {
  const groupColors: Record<string, string> = {
    all: '#00F0FF',
    chest: '#FF5C8D',
    back: '#00F0FF',
    shoulders: '#FFB300',
    biceps: '#10b981',
    triceps: '#a855f7',
    legs: '#7C5CFC',
    core: '#f97316',
    glutes: '#ec4899',
    full_body: '#3b82f6',
  }

  const activeColor = groupColors[selectedGroup] || '#00F0FF'

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      {/* Ambient background glow behind canvas */}
      <div
        className="absolute inset-4 rounded-full blur-[80px] pointer-events-none opacity-40 transition-colors duration-700"
        style={{ background: activeColor }}
      />

      <Canvas
        camera={{ position: [0, 0.1, 3.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <GymScene color={activeColor} />
      </Canvas>

      {/* Hint Badge for interactive drag */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide flex items-center gap-1.5 pointer-events-none backdrop-blur-md"
        style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#94a3b8',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: activeColor }} />
        <span>Drag to rotate in 3D</span>
      </div>
    </div>
  )
}
