'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── 3D Neural Brain Node Geometry ── */
function BrainNodeMesh() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.35
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.12
  })

  // Create left and right hemisphere lobes
  return (
    <group ref={groupRef}>
      {/* Outer Transmission Glass Core */}
      <mesh>
        <sphereGeometry args={[0.75, 48, 48]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.3}
          chromaticAberration={0.05}
          ior={1.25}
          color="#1e0a38"
          roughness={0.05}
          transmission={0.96}
        />
      </mesh>

      {/* Inner Brain Hemispheres */}
      <group scale={0.55}>
        {/* Left Hemisphere */}
        <mesh position={[-0.22, 0.05, 0]}>
          <boxGeometry args={[0.38, 0.5, 0.65]} />
          <meshStandardMaterial color="#a855f7" metalness={0.7} roughness={0.2} wireframe />
        </mesh>
        {/* Right Hemisphere */}
        <mesh position={[0.22, 0.05, 0]}>
          <boxGeometry args={[0.38, 0.5, 0.65]} />
          <meshStandardMaterial color="#c084fc" metalness={0.7} roughness={0.2} wireframe />
        </mesh>
        {/* Cerebellum Base */}
        <mesh position={[0, -0.28, -0.1]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color="#34d399" wireframe />
        </mesh>
      </group>
    </group>
  )
}

/* ── Orbiting Holographic Synapse Rings ── */
function SynapseHoloRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!)
  const ring2Ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ring1Ref.current.rotation.x = t * 0.6
    ring1Ref.current.rotation.y = t * 0.4

    ring2Ref.current.rotation.y = -t * 0.5
    ring2Ref.current.rotation.z = t * 0.3
  })

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.98, 0.012, 16, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.12, 0.012, 16, 64]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.5} />
      </mesh>
    </>
  )
}

/* ── Floating Synapse Spark Particles ── */
function SynapseSparks() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = 30

  const { positions, scales, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    const off = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.85 + Math.random() * 0.35

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      scl[i] = 0.015 + Math.random() * 0.02
      off[i] = Math.random() * Math.PI * 2
    }
    return { positions: pos, scales: scl, offsets: off }
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.7
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]
      const s = scales[i]
      const o = offsets[i]

      dummy.position.set(
        x + Math.sin(t + o) * 0.04,
        y + Math.cos(t * 0.8 + o) * 0.05,
        z + Math.sin(t * 0.6 + o) * 0.04
      )
      dummy.scale.setScalar(s * (0.7 + Math.sin(t * 2 + o) * 0.3))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#c084fc" transparent opacity={0.8} />
    </instancedMesh>
  )
}

function ChatScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-2, -2, 2]} intensity={0.8} color="#a855f7" />
      <pointLight position={[2, 2, -2]} intensity={0.6} color="#34d399" />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <BrainNodeMesh />
        <SynapseHoloRings />
        <SynapseSparks />
      </Float>
    </>
  )
}

export default function ChatOrbCanvas() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <ChatScene />
      </Canvas>
    </div>
  )
}
