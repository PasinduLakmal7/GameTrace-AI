"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { UnitySession, UnityEvent } from "@/lib/mock-data";
import { Play, Pause, RotateCcw, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const TraceForge3DCanvas = dynamic(() => import("./traceforge-3d-canvas"), { ssr: false });

export function ReplayViewer({ session, events, snapshots = [] }: { session: any, events: UnityEvent[], snapshots?: any[] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const maxTime = session.duration || 10.5;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const previousTimeRef = useRef<number>(null);

  // Dispatch time update event for sidebar syncing
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('traceforge:timeupdate', { detail: currentTime }));
  }, [currentTime]);

  // Render the canvas
  useEffect(() => {
    // 3D Canvas handles its own rendering and animations
  }, [currentTime, events]);

  // Handle animation
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined && previousTimeRef.current !== null) {
      const deltaTime = (time - previousTimeRef.current) / 1000;
      setCurrentTime(prevTime => {
        const nextTime = prevTime + deltaTime * speed;
        if (nextTime >= maxTime) {
          setIsPlaying(false);
          return maxTime;
        }
        return nextTime;
      });
    }
    previousTimeRef.current = time;
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = null;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const restart = () => {
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const currentPosEvent = events.filter(e => e.time <= currentTime && e.type === "POSITION").pop() || { x: 0, y: 0, z: 0 };
  const currentScoreEvent = events.filter(e => e.time <= currentTime).pop() || { score: 0 };



  const currentFrame = useMemo(() => {
    if (!snapshots || snapshots.length === 0) return null;
    let nearest = snapshots[0];
    for (const frame of snapshots) {
      const frameTime = frame.frameTime ?? frame.time ?? 0;
      const currentDiff = Math.abs(frameTime - currentTime);
      const nearestTime = nearest.frameTime ?? nearest.time ?? 0;
      const nearestDiff = Math.abs(nearestTime - currentTime);
      if (currentDiff < nearestDiff) {
        nearest = frame;
      }
    }
    return nearest;
  }, [snapshots, currentTime]);

  return (
    <div className="flex flex-col h-full">
      
      {/* Viewports Area */}
      <div className="flex-1 flex overflow-hidden rounded-t-2xl border-b border-zinc-800/60 bg-zinc-950 relative group">

        {/* eSports HUD OVERLAYS */}
        {/* Score Overlay */}
        <div className="absolute top-4 right-4 z-20 bg-zinc-900/80 backdrop-blur-md border border-zinc-800/60 px-5 py-2.5 rounded-xl flex flex-col items-end shadow-2xl pointer-events-none transition-all">
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-0.5">Match Score</span>
          <span className="text-white font-mono text-2xl leading-none font-bold tracking-tight">{currentScoreEvent.score}</span>
        </div>

        {/* Position Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-zinc-900/80 backdrop-blur-md border border-zinc-800/60 px-6 py-2 rounded-full flex items-center gap-4 shadow-xl pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Vector Pos</span>
          </div>
          <span className="text-sky-400 font-mono text-sm tracking-wider font-medium">{currentPosEvent.x.toFixed(1)}, {currentPosEvent.y.toFixed(1)}, {currentPosEvent.z.toFixed(1)}</span>
        </div>
        
        {/* Left: 3D Data Replay */}
        <div className="w-1/2 relative border-r border-zinc-800/60 bg-black/50">
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-zinc-900/80 border border-zinc-800/60 rounded-lg text-[10px] font-bold text-sky-400 flex items-center gap-2 backdrop-blur-md uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
            3D Data Replay
          </div>
          <TraceForge3DCanvas gameData={{...session, events}} currentTime={currentTime} />
          
          {/* Legend */}
          <div className="absolute bottom-5 left-5 flex gap-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900/80 px-3 py-2 rounded-lg border border-zinc-800/60 backdrop-blur-md">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div> PLAYER</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400"></div> HIT</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> SHOOT</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div> ENEMY</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> KILL</div>
          </div>
        </div>

        {/* Right: Real Snapshot View */}
        <div className="w-1/2 relative bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-zinc-900/80 border border-zinc-800/60 rounded-lg text-[10px] font-bold text-orange-500 flex items-center gap-2 backdrop-blur-md uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            Real Game View
          </div>
          
          {currentFrame ? (
            <div className="relative w-full h-full flex items-center justify-center bg-zinc-950">
              <img 
                src={currentFrame.screenshotUrl} 
                alt="Unity Snapshot" 
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded border border-zinc-800 text-[10px] font-mono text-zinc-400">
                SNAPSHOT TAKEN AT: <span className="text-white font-bold">{(currentFrame.frameTime ?? currentFrame.time ?? 0).toFixed(2)}s</span>
              </div>
            </div>
          ) : (
            <div className="text-zinc-600 flex flex-col items-center gap-3">
              <ImageIcon className="w-10 h-10 opacity-20" />
              <p className="text-xs font-semibold uppercase tracking-widest opacity-60">No snapshot available</p>
            </div>
          )}
        </div>
        
      </div>

      {/* Sleek Modern Media Player Controls */}
      <div className="bg-zinc-950 p-5 flex flex-col gap-4 relative shrink-0 z-20 border-t border-zinc-800/60">
        
        {/* Top Playback Bar & Speed Controls */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-600 text-white hover:bg-orange-500 hover:scale-105 transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)]"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>
            <button 
              onClick={restart}
              className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-6 w-px bg-zinc-800 mx-2"></div>
            <span className="text-2xl font-mono font-bold text-white tracking-tighter">
              {currentTime.toFixed(2)}<span className="text-zinc-500 text-lg ml-1">/ {maxTime.toFixed(2)}s</span>
            </span>
          </div>

          <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-1">
            {[0.5, 1, 2].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                  speed === s ? "bg-orange-500/20 text-orange-500 border border-orange-500/30" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 border border-transparent"
                )}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Tactical HUD Timeline Slider */}
        <div className="relative group/slider cursor-pointer h-10 flex items-center w-full px-2 mt-2">
          <input 
            type="range" 
            min={0} max={maxTime} step={0.1}
            value={currentTime}
            onChange={handleScrubberChange}
            className="absolute inset-0 w-full opacity-0 z-30 cursor-pointer"
          />
          
          {/* Custom Track Background */}
          <div className="w-full h-3 bg-zinc-900 border border-zinc-800/60 rounded-full relative overflow-hidden transition-all group-hover/slider:h-4">
             {/* Progress Fill */}
             <div className="h-full bg-gradient-to-r from-orange-600/50 to-orange-500 rounded-full relative" style={{ width: `${(currentTime / maxTime) * 100}%` }}>
                <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30"></div>
             </div>
          </div>

          {/* Event Markers Overlay */}
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-3 pointer-events-none z-10 transition-all group-hover/slider:h-4">
            {events.filter(e => e.type === 'PLAYER_DEAD' || e.type === 'ENEMY_DIE' || e.type.includes('HIT') || e.type.includes('SHOOT')).map((ev, i) => {
              const percent = (ev.time / maxTime) * 100;
              let color = "bg-zinc-500 w-0.5 h-full opacity-30"; // Default
              
              if (ev.type === 'PLAYER_DEAD') color = "bg-red-500 w-1.5 h-full z-20 shadow-[0_0_8px_rgba(239,68,68,1)]";
              else if (ev.type === 'ENEMY_DIE') color = "bg-green-500 w-1 h-full z-20";
              else if (ev.type === 'PLAYER_HIT') color = "bg-orange-500 w-1 h-full opacity-80 z-10";
              else if (ev.type === 'ENEMY_HIT') color = "bg-amber-400 w-0.5 h-full opacity-60";
              else if (ev.type === 'PLAYER_SHOOT') color = "bg-purple-500 w-[1px] h-full opacity-70";
              
              return (
                <div key={i} className={cn("absolute top-0 bottom-0 -ml-[1px]", color)} style={{ left: `${percent}%` }}></div>
              )
            })}
          </div>

          {/* Custom HUD Thumb */}
          <div 
             className="absolute h-6 w-1.5 bg-white shadow-[0_0_12px_rgba(255,255,255,1)] pointer-events-none z-20 transition-transform flex items-center justify-center -mt-1 group-hover/slider:scale-110" 
             style={{ left: `calc(${(currentTime / maxTime) * 100}% + 5px)` }}
          >
             <div className="w-4 h-8 border border-white/20 absolute rounded-sm opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
