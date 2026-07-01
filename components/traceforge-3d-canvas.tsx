"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
      const targetY = currentEvent.y + (isDead ? 0.2 : 0.8);
      meshRef.current.position.lerp(
        new THREE.Vector3(currentEvent.x, targetY, currentEvent.z), 
        0.2
      );
    }
  });

    return (
      <group ref={meshRef as any} rotation={isDead ? [Math.PI/2, 0, 0] : [0, 0, 0]} scale={[3.5, 3.5, 3.5]}>
        {/* Core Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
          <meshStandardMaterial color={isDead ? "#4b5563" : "#38bdf8"} emissive={isDead ? "#000000" : "#0284c7"} emissiveIntensity={isDead ? 0 : 0.8} metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Glowing Visor / Engine */}
        <mesh position={[0, 0.3, 0.15]}>
          <boxGeometry args={[0.25, 0.1, 0.1]} />
          <meshStandardMaterial color={isDead ? "#1f2937" : "#bae6fd"} emissive={isDead ? "#000000" : "#38bdf8"} emissiveIntensity={isDead ? 0 : 2} />
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
          color={isDead ? "#22c55e" : "#ef4444"} // Green (KILL) if dead, Red (ENEMY) if alive
          emissive={isDead ? "#166534" : "#991b1b"} 
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

    if (ev.type === 'PLAYER_SHOOT') {
      return (
        <mesh key={i} position={[ev.x, ev.y + 0.5, ev.z]} scale={[scale, scale, scale]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={opacity} />
        </mesh>
      );
    }

    if (ev.type === 'ENEMY_SHOOT') {
      return (
        <mesh key={i} position={[ev.x, ev.y + 0.5, ev.z]} scale={[scale, scale, scale]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={opacity} />
        </mesh>
      );
    }

    if (ev.type === 'PLAYER_HIT' || ev.type === 'ENEMY_HIT') {
      return (
        <mesh key={i} position={[ev.x, ev.y + 0.5, ev.z]} scale={[scale, scale, scale]}>
          <torusGeometry args={[0.5, 0.1, 8, 24]} />
          <meshBasicMaterial color="#f97316" transparent opacity={opacity} />
        </mesh>
      );
    }

    if (ev.type === 'ENEMY_DIE' || ev.type === 'PLAYER_DEAD') {
      return (
        <mesh key={i} position={[ev.x, ev.y + 0.1, ev.z]} rotation={[-Math.PI/2, 0, 0]} scale={[scale, scale, scale]}>
          <ringGeometry args={[0.2, 0.8, 16]} />
          <meshBasicMaterial color={ev.type === 'PLAYER_DEAD' ? "#ef4444" : "#22c55e"} transparent opacity={opacity} side={THREE.DoubleSide} />
        </mesh>
      );
    }

    return null;
  });
}

// 🎥 5. Cinematic Camera Tracker
// 🎥 5. Auto-Tracking Orbit Controls
function PlayerTracker({ gameData, currentTime }: { gameData: UnitySession, currentTime: number }) {
  const { controls } = useThree();
  const posEvents = gameData.events.filter(e => e.type === "POSITION" || e.type === "SESSION_START");
  
  useFrame(() => {
    if (!controls) return;
    const currentEvent = posEvents.reduce((prev, curr) => (curr.time <= currentTime) ? curr : prev, posEvents[0]);
    if (currentEvent && currentEvent.x !== undefined && currentEvent.y !== undefined && currentEvent.z !== undefined) {
      const targetLook = new THREE.Vector3(currentEvent.x, currentEvent.y, currentEvent.z);
      (controls as any).target.lerp(targetLook, 0.05);
      (controls as any).update();
    }
  });
  return null;
}

// 🌌 Main Replayer Canvas
export default function TraceForge3DCanvas({ gameData, currentTime }: { gameData: UnitySession, currentTime: number }) {
  // Find current player position based on time
  const posEvents = gameData.events.filter(e => e.type === "POSITION" || e.type === "SESSION_START");
  const currentEvent = posEvents.reduce((prev, curr) => (curr.time <= currentTime) ? curr : prev, posEvents[0]);
  
  const deathEvent = gameData.events.find(e => e.type === "PLAYER_DEAD");
  const isDead = deathEvent && currentTime >= deathEvent.time;

  const currentX = currentEvent?.x !== undefined ? currentEvent.x.toFixed(2) : "0.00";
  const currentY = currentEvent?.y !== undefined ? currentEvent.y.toFixed(2) : "0.00";
  const currentZ = currentEvent?.z !== undefined ? currentEvent.z.toFixed(2) : "0.00";

  return (
    <div className="w-full h-full bg-zinc-950 relative font-sans">
      {/* 🚀 Real-time HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800/60 rounded-xl p-4 min-w-[200px] shadow-lg">
        <h3 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-3">Live Telemetry</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500">Status</span>
            {isDead ? (
              <span className="text-red-500 font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> DEAD</span>
            ) : (
              <span className="text-green-500 font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> ALIVE</span>
            )}
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500">Time</span>
            <span className="text-zinc-300 font-mono">{currentTime.toFixed(2)}s</span>
          </div>

          <div className="pt-2 border-t border-zinc-800/60">
            <div className="text-[10px] text-zinc-500 mb-1">Coordinates (X, Y, Z)</div>
            <div className="flex gap-2 font-mono text-xs">
              <div className="bg-zinc-900 px-2 py-1 rounded text-sky-400 border border-zinc-800 flex-1 text-center">{currentX}</div>
              <div className="bg-zinc-900 px-2 py-1 rounded text-green-400 border border-zinc-800 flex-1 text-center">{currentY}</div>
              <div className="bg-zinc-900 px-2 py-1 rounded text-orange-400 border border-zinc-800 flex-1 text-center">{currentZ}</div>
            </div>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
        <color attach="background" args={['#09090b']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[30, 40, 30]} intensity={2} color="#38bdf8" />
        <pointLight position={[-10, 20, -10]} intensity={0.5} color="#ef4444" />

        <Grid 
          position={[0, 0, 0]} 
          args={[100, 100]} 
          infiniteGrid
          cellColor="#27272a" 
          sectionColor="#38bdf8" 
          sectionThickness={1}
          fadeDistance={100} 
        />

        <Center>


          {/* Player Vector Space Controller */}
          <PlayerDrone3D gameData={gameData} currentTime={currentTime} />

          {/* Dynamic Red Enemy Cylinders */}
          <EnemyEntities3D events={gameData.events} currentTime={currentTime} />

          {/* Flash rings and lasers */}
          <CombatEffects3D events={gameData.events} currentTime={currentTime} />
        </Center>
        
        {/* Cinematic Auto-Tracking Controls */}
        <PlayerTracker gameData={gameData} currentTime={currentTime} />
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2.1} minDistance={2} maxDistance={40} />
      </Canvas>
    </div>
  );
}
