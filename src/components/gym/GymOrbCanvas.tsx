'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import type { MuscleGroup } from '@/types'

interface GymOrbCanvasProps {
  selectedGroup: MuscleGroup | 'all'
  onSelectGroup: (g: MuscleGroup | 'all') => void
  color?: string
}

/* ── 3D Olympic Barbell & Weight Plates ── */
function BarbellModel({ color = '#00F0FF' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.4
    groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.12
    groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.1
  })

  const glowColor = useMemo(() => new THREE.Color(color), [color])

  return (
    <group ref={groupRef} scale={1.1}>
      {/* Central Knurled Chrome Shaft */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 1.6, 32]} />
        <meshStandardMaterial metalness={0.95} roughness={0.08} color="#e2e8f0" />
      </mesh>

      {/* Center Knurling Grips */}
      {[-0.25, 0.25].map((pos, i) => (
        <mesh key={i} position={[pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.048, 0.048, 0.25, 32]} />
          <meshStandardMaterial metalness={0.9} roughness={0.3} color="#cbd5e1" />
        </mesh>
      ))}

      {/* Left Sleeves & Weight Plates */}
      <group position={[-0.6, 0, 0]}>
        {/* Sleeve Collar */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.05, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
          <meshStandardMaterial metalness={0.9} roughness={0.15} color="#94a3b8" />
        </mesh>

        {/* Big 45lb / 20kg Outer Iron Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.04, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.07, 32]} />
          <meshStandardMaterial metalness={0.7} roughness={0.3} color="#0f172a" />
        </mesh>
        {/* Accent Glow Ring on Left Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.08, 0, 0]}>
          <torusGeometry args={[0.425, 0.015, 16, 32]} />
          <meshBasicMaterial color={glowColor} />
        </mesh>

        {/* Medium 25lb Inner Iron Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.13, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.06, 32]} />
          <meshStandardMaterial metalness={0.8} roughness={0.25} color="#1e293b" />
        </mesh>

        {/* Lock Collar */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.18, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 32]} />
          <meshStandardMaterial metalness={0.95} roughness={0.1} color={glowColor} />
        </mesh>
      </group>

      {/* Right Sleeves & Weight Plates */}
      <group position={[0.6, 0, 0]}>
        {/* Sleeve Collar */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.05, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
          <meshStandardMaterial metalness={0.9} roughness={0.15} color="#94a3b8" />
        </mesh>

        {/* Big 45lb / 20kg Outer Iron Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.04, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.07, 32]} />
          <meshStandardMaterial metalness={0.7} roughness={0.3} color="#0f172a" />
        </mesh>
        {/* Accent Glow Ring on Right Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.08, 0, 0]}>
          <torusGeometry args={[0.425, 0.015, 16, 32]} />
          <meshBasicMaterial color={glowColor} />
        </mesh>

        {/* Medium 25lb Inner Iron Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.13, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.06, 32]} />
          <meshStandardMaterial metalness={0.8} roughness={0.25} color="#1e293b" />
        </mesh>

        {/* Lock Collar */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.18, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 32]} />
          <meshStandardMaterial metalness={0.95} roughness={0.1} color={glowColor} />
        </mesh>
      </group>
    </group>
  )
}

/* ── Orbiting Power Sparks ── */
function PowerSparks({ color }: { color: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = 35

  const { positions, scales, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    const off = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 1.0 + Math.random() * 0.35
      pos[i * 3] = r * Math.cos(angle)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6
      pos[i * 3 + 2] = r * Math.sin(angle)

      scl[i] = 0.02 + Math.random() * 0.025
      off[i] = Math.random() * Math.PI * 2
    }
    return { positions: pos, scales: scl, offsets: off }
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const col = useMemo(() => new THREE.Color(color), [color])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.9
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]
      const s = scales[i]
      const o = offsets[i]

      dummy.position.set(
        x * Math.cos(t * 0.6) - z * Math.sin(t * 0.6),
        y + Math.sin(t + o) * 0.1,
        x * Math.sin(t * 0.6) + z * Math.cos(t * 0.6)
      )
      dummy.scale.setScalar(s * (0.7 + Math.sin(t * 2 + o) * 0.3))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={col} transparent opacity={0.8} />
    </instancedMesh>
  )
}

function GymScene({ color = '#00F0FF' }: { color?: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 3]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color={color} />
      <pointLight position={[3, -2, -2]} intensity={0.5} color="#38bdf8" />

      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
        <BarbellModel color={color} />
        <PowerSparks color={color} />
      </Float>
    </>
  )
}

export default function GymOrbCanvas({ selectedGroup, onSelectGroup }: GymOrbCanvasProps) {
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
    <div className="relative flex flex-col items-center" style={{ width: 280, height: 320 }}>
      <div className="w-full h-[250px] relative">
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          style={{ background: 'transparent' }}
        >
          <GymScene color={activeColor} />
        </Canvas>
      </div>

      {/* Target Muscle Selector Pills */}
      <div className="flex flex-wrap justify-center gap-1 mt-1 z-10">
        {(['all', 'chest', 'back', 'shoulders', 'legs', 'core'] as MuscleGroup[]).map((g) => (
          <button
            key={g}
            onClick={() => onSelectGroup(g)}
            className="px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all capitalize"
            style={{
              background: selectedGroup === g ? `${groupColors[g]}20` : 'rgba(255,255,255,0.03)',
              border: selectedGroup === g ? `1px solid ${groupColors[g]}40` : '1px solid rgba(255,255,255,0.06)',
              color: selectedGroup === g ? groupColors[g] : '#64748b',
            }}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}
