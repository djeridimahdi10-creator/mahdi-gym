'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface OrbCanvasProps {
  calories: { current: number; target: number }
  protein: { current: number; target: number }
  carbs: { current: number; target: number }
  fat: { current: number; target: number }
}

/* ── 3D Glass Apple & Leaf Model ── */
function GlassAppleModel({ fillRatio }: { fillRatio: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.25
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08
  })

  const coreColor = fillRatio > 0.85 ? '#10b981' : fillRatio > 0.5 ? '#fbbf24' : '#f43f5e'

  return (
    <group ref={groupRef}>
      {/* Main Glass Apple Body */}
      <mesh>
        <sphereGeometry args={[0.82, 48, 48]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.35}
          chromaticAberration={0.04}
          ior={1.28}
          color="#06241b"
          roughness={0.04}
          transmission={0.98}
        />
      </mesh>

      {/* Inner Glowing Health Core */}
      <mesh scale={0.4 + fillRatio * 0.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.25} />
      </mesh>

      {/* Apple Stem */}
      <mesh position={[0, 0.85, 0]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.02, 0.035, 0.22, 16]} />
        <meshStandardMaterial metalness={0.4} roughness={0.5} color="#451a03" />
      </mesh>

      {/* Fresh Green Leaf */}
      <mesh position={[0.1, 0.92, 0]} rotation={[0.4, 0.2, -0.6]}>
        <ellipseCurve args={[0, 0, 0.15, 0.08, 0, Math.PI * 2, false, 0]} />
        <coneGeometry args={[0.12, 0.25, 16]} />
        <meshStandardMaterial metalness={0.1} roughness={0.3} color="#34d399" />
      </mesh>
    </group>
  )
}

/* ── Orbiting Macro Molecular Spheres ── */
function MacroMoleculeRings({
  color,
  ratio,
  radius,
  speed,
}: {
  color: string
  ratio: number
  radius: number
  speed: number
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = Math.max(4, Math.round(16 * ratio))

  const { positions, scales, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    const off = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const pseudoRand1 = Math.sin(i * 12.9898) * 0.5 + 0.5
      const pseudoRand2 = Math.cos(i * 4.1414) * 0.5 + 0.5
      const pseudoRand3 = Math.sin(i * 7.1234) * 0.5 + 0.5

      pos[i * 3] = radius * Math.cos(angle)
      pos[i * 3 + 1] = (pseudoRand1 - 0.5) * 0.3
      pos[i * 3 + 2] = radius * Math.sin(angle)

      scl[i] = 0.03 + pseudoRand2 * 0.025
      off[i] = pseudoRand3 * Math.PI * 2
    }
    return { positions: pos, scales: scl, offsets: off }
  }, [count, radius])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const col = useMemo(() => new THREE.Color(color), [color])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]
      const s = scales[i]
      const o = offsets[i]

      dummy.position.set(
        x * Math.cos(t) - z * Math.sin(t),
        y + Math.sin(t * 1.5 + o) * 0.06,
        x * Math.sin(t) + z * Math.cos(t)
      )
      dummy.scale.setScalar(s * (0.8 + Math.sin(t * 2 + o) * 0.2))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={col} metalness={0.6} roughness={0.2} />
    </instancedMesh>
  )
}

function NutritionScene(props: OrbCanvasProps) {
  const calRatio = Math.min(1, props.calories.current / (props.calories.target || 1))
  const protRatio = Math.min(1, props.protein.current / (props.protein.target || 1))
  const carbRatio = Math.min(1, props.carbs.current / (props.carbs.target || 1))
  const fatRatio = Math.min(1, props.fat.current / (props.fat.target || 1))

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-2, -2, 2]} intensity={0.6} color="#34d399" />
      <pointLight position={[2, 2, -2]} intensity={0.5} color="#a855f7" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <GlassAppleModel fillRatio={calRatio} />

        {/* Protein Macro Ring — Amber */}
        <MacroMoleculeRings color="#FFB300" ratio={protRatio} radius={1.05} speed={0.4} />

        {/* Carb Macro Ring — Purple */}
        <MacroMoleculeRings color="#A855F7" ratio={carbRatio} radius={1.25} speed={-0.35} />

        {/* Fat Macro Ring — Pink */}
        <MacroMoleculeRings color="#FF5C8D" ratio={fatRatio} radius={1.4} speed={0.45} />
      </Float>
    </>
  )
}

export default function NutritionOrbCanvas(props: OrbCanvasProps) {
  return (
    <div className="relative" style={{ width: 280, height: 280 }}>
      <Canvas
        camera={{ position: [0, 0, 2.9], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <NutritionScene {...props} />
      </Canvas>

      {/* Center Calorie Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          className="text-3xl font-bold text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
        >
          {props.calories.current}
        </span>
        <span className="text-[11px] text-slate-300 font-semibold mt-0.5" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
          / {props.calories.target} kcal
        </span>
      </div>
    </div>
  )
}
