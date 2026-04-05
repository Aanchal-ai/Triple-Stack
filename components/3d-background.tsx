"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

function WavyGrid() {
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  // Animate the grid vertices to create a wavy effect
  useFrame(({ clock }) => {
    if (!geomRef.current) return;
    const time = clock.getElapsedTime();
    const position = geomRef.current.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      // Calculate a wave pattern
      const z = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.5 + time) * 0.5;
      position.setZ(i, z);
    }
    
    position.needsUpdate = true;
  });

  return (
    <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
      <mesh>
        <planeGeometry ref={geomRef} args={[30, 30, 60, 60]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function FloatingShapes() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={[2, 1, -2]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial color="#6366f1" wireframe opacity={0.3} transparent />
      </mesh>
      <mesh position={[-3, 2, -3]}>
        <icosahedronGeometry args={[0.8]} />
        <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.3} transparent />
      </mesh>
      <mesh position={[4, -1, -4]}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color="#ec4899" wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  );
}

export function ThreeDBackground() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#0a0a0a', 2, 15]} />
        <ambientLight intensity={0.5} />
        
        {/* Floating space particles */}
        <Stars radius={10} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.2} color="#c084fc" />
        
        {/* Wavy bottom grid */}
        <WavyGrid />
        
        {/* 3D floating abstract shapes */}
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
