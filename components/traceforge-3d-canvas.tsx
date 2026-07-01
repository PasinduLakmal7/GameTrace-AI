"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Center } from '@react-three/drei';
import * as THREE from 'three';
import { UnitySession, UnityEvent } from "@/lib/mock-data";



// 🏃‍♂️ 2. Active Player Entity with Holographic Thrusters
function PlayerDrone3D({ gameData, currentTime }: { gameData: UnitySession, currentTime: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const posEvents = gameData.events.filter(e => e.type === "POSITION" || e.type === "SESSION_START");
  
  // Check if player is dead at current time
  const deathEvent = gameData.events.find(e => e.type === "PLAYER_DEAD");
  const isDead = deathEvent && currentTime >= deathEvent.time;

  useFrame(() => {
    if (!meshRef.current) return;
    const currentEvent = posEvents.reduce((prev, curr) => (curr.time <= currentTime) ? curr : prev, posEvents[0]);
    
    if (currentEvent && currentEvent.x !== undefined && currentEvent.y !== undefined && currentEvent.z !== undefined) {
      meshRef.current.position.lerp(
        new THREE.Vector3(currentEvent.x, currentEvent.y, currentEvent.z), 
        0.2
      );
    }
  });

    return (
      <group ref={meshRef} rotation={isDead ? [Math.PI/2, 0, 0] : [0, 0, 0]} position={[0, isDead ? 0.2 : 0.8, 0]} scale={[2, 2, 2]}>
        {/* Core Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
          <meshStandardMaterial color={isDead ? "#4b5563" : "#0f172a"} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Glowing Visor / Engine */}
        <mesh position={[0, 0.3, 0.15]}>
          <boxGeometry args={[0.25, 0.1, 0.1]} />
          <meshStandardMaterial color={isDead ? "#1f2937" : "#22d3ee"} emissive={isDead ? "#000000" : "#06b6d4"} emissiveIntensity={isDead ? 0 : 2} />
        </mesh>
        {/* Left Thruster Wing */}
        <mesh position={[-0.3, -0.2, 0]} rotation={[0, 0, Math.PI/6]}>
          <boxGeometry args={[0.4, 0.1, 0.3]} />
          <meshStandardMaterial color={isDead ? "#374151" : "#1e293b"} />
        </mesh>
        {/* Right Thruster Wing */}
        <mesh position={[0.3, -0.2, 0]} rotation={[0, 0, -Math.PI/6]}>
          <boxGeometry args={[0.4, 0.1, 0.3]} />
          <meshStandardMaterial color={isDead ? "#374151" : "#1e293b"} />
        </mesh>
      </group>
    );
}

// 👾 3. Dynamic Enemy Spawners (සතුරන් සිටින ස්ථාන)
function EnemyEntities3D({ events, currentTime }: { events: UnityEvent[], currentTime: number }) {
  // Find all unique enemy IDs (from the value field) for events starting with ENEMY_
  const enemyEvents = events.filter(e => e.type.startsWith("ENEMY_") && e.value);
  const uniqueEnemyIds = Array.from(new Set(enemyEvents.map(e => e.value)));

  return uniqueEnemyIds.map((enemyId, i) => {
    // Get all events for this specific enemy up to currentTime
    const eventsUpToNow = enemyEvents.filter(e => e.value === enemyId && e.time <= currentTime);
    
    if (eventsUpToNow.length === 0) return null; // Enemy hasn't appeared yet

    // Get the latest event to know the current state and position
    const latestEvent = eventsUpToNow[eventsUpToNow.length - 1];

    if (latestEvent.x === undefined || latestEvent.y === undefined || latestEvent.z === undefined) return null;

    const isDead = latestEvent.type === "ENEMY_DIE";

    return (
      <mesh 
        key={i} 
        position={[latestEvent.x, isDead ? 0.05 : latestEvent.y + 0.5, latestEvent.z]}
      >
        <cylinderGeometry args={[0.4, 0.4, isDead ? 0.1 : 1.2, 8]} />
        <meshStandardMaterial 
          color={isDead ? "#10b981" : "#f43f5e"} // Emerald (KILL) if dead, Rose (ENEMY) if alive
          emissive={isDead ? "#047857" : "#be123c"} 
          emissiveIntensity={isDead ? 0.5 : 1} 
        />
      </mesh>
    );
  });
}

// 💥 4. Combat Special Effects (Projectiles and Hit Markers)
function CombatEffects3D({ events, currentTime }: { events: UnityEvent[], currentTime: number }) {
  return events.map((ev, i) => {
    if (ev.x === undefined || ev.y === undefined || ev.z === undefined) return null;

    // Show effect for 0.8 seconds after the event
    const isVisible = currentTime >= ev.time && currentTime <= ev.time + 0.8;
    if (!isVisible) return null;

    const scale = 1 + (currentTime - ev.time) * 2; // Simple expand animation
    const opacity = 1 - (currentTime - ev.time) / 0.8; // Fade out

    if (ev.type === 'PLAYER_SHOOT' || ev.type === 'ENEMY_SHOOT') {
      return (
        <mesh key={i} position={[ev.x, ev.y + 0.5, ev.z]} scale={[scale, scale, scale]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={opacity} />
        </mesh>
      );
    }

    if (ev.type === 'PLAYER_HIT' || ev.type === 'ENEMY_HIT') {
      return (
        <mesh key={i} position={[ev.x, ev.y + 0.5, ev.z]} scale={[scale, scale, scale]}>
          <torusGeometry args={[0.5, 0.1, 8, 24]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={opacity} />
        </mesh>
      );
    }

    if (ev.type === 'ENEMY_DIE' || ev.type === 'PLAYER_DEAD') {
      return (
        <mesh key={i} position={[ev.x, ev.y + 0.1, ev.z]} rotation={[-Math.PI/2, 0, 0]} scale={[scale, scale, scale]}>
          <ringGeometry args={[0.2, 0.8, 16]} />
          <meshBasicMaterial color="#10b981" transparent opacity={opacity} side={THREE.DoubleSide} />
        </mesh>
      );
    }

    return null;
  });
}

// 🌌 Main Replayer Canvas
export default function TraceForge3DCanvas({ gameData, currentTime }: { gameData: UnitySession, currentTime: number }) {
  return (
    <div className="w-full h-full bg-[#030712] relative">

      <Canvas camera={{ position: [15, 12, 15], fov: 50 }}>
        <color attach="background" args={['#030712']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[30, 40, 30]} intensity={2} color="#06b6d4" />
        <pointLight position={[-10, 20, -10]} intensity={0.5} color="#f43f5e" />

        <Grid 
          position={[0, 0, 0]} 
          args={[40, 40]} 
          cellColor="#1e293b" 
          sectionColor="#06b6d4" 
          sectionThickness={1}
          fadeDistance={30} 
        />

        <Center>


          {/* Player Vector Space Controller */}
          <PlayerDrone3D gameData={gameData} currentTime={currentTime} />

          {/* Dynamic Red Enemy Cylinders */}
          <EnemyEntities3D events={gameData.events} currentTime={currentTime} />

          {/* Flash rings and lasers */}
          <CombatEffects3D events={gameData.events} currentTime={currentTime} />
        </Center>

        <OrbitControls enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2.1} minDistance={5} maxDistance={40} />
      </Canvas>
    </div>
  );
}
