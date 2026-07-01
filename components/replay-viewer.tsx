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
      <div className="flex-1 flex overflow-hidden rounded-t-2xl border-b border-zinc-800/60 bg-[#090b10] relative group">

        {/* eSports HUD OVERLAYS */}
        {/* Score Overlay */}
        <div className="absolute top-4 right-4 z-20 bg-[#0b0e14]/80 backdrop-blur-md border border-zinc-800/60 px-5 py-2.5 rounded-xl flex flex-col items-end shadow-2xl pointer-events-none transition-all">
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-0.5">Match Score</span>
          <span className="text-white font-mono text-2xl leading-none font-bold tracking-tight">{currentScoreEvent.score}</span>
        </div>

        {/* Position Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#0b0e14]/80 backdrop-blur-md border border-zinc-800/60 px-6 py-2 rounded-full flex items-center gap-4 shadow-xl pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Vector Pos</span>
          </div>
          <span className="text-cyan-400 font-mono text-sm tracking-wider font-medium">{currentPosEvent.x.toFixed(1)}, {currentPosEvent.y.toFixed(1)}, {currentPosEvent.z.toFixed(1)}</span>
        </div>
        
        {/* Left: 3D Data Replay */}
        <div className="w-1/2 relative border-r border-zinc-800/60 bg-black/50">
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-[#0b0e14]/80 border border-zinc-800/60 rounded-lg text-[10px] font-bold text-cyan-400 flex items-center gap-2 backdrop-blur-md uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            3D Data Replay
          </div>
          <TraceForge3DCanvas gameData={{...session, events}} currentTime={currentTime} />
          
          {/* Legend */}
          <div className="absolute bottom-5 left-5 flex gap-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-[#0b0e14]/80 px-3 py-2 rounded-lg border border-zinc-800/60 backdrop-blur-md">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div> PLAYER</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400"></div> HIT</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-400"></div> SHOOT</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div> ENEMY</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> KILL</div>
          </div>
        </div>

        {/* Right: Real Snapshot View */}
        <div className="w-1/2 relative bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-[#0b0e14]/80 border border-zinc-800/60 rounded-lg text-[10px] font-bold text-orange-400 flex items-center gap-2 backdrop-blur-md uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            Real Game View
          </div>
          
          {currentFrame ? (
            <img 
              src={currentFrame.screenshotUrl} 
              alt="Unity Snapshot" 
              className="w-full h-full object-contain animate-in fade-in duration-300"
            />
          ) : (
            <div className="text-zinc-600 flex flex-col items-center gap-3">
              <ImageIcon className="w-10 h-10 opacity-20" />
              <p className="text-xs font-semibold uppercase tracking-widest opacity-60">No snapshot available</p>
            </div>
          )}
        </div>
        
      </div>

      {/* Sleek Modern Media Player Controls */}
      <div className="bg-[#0b0e14] rounded-b-2xl p-5 flex flex-col gap-5 relative">
        
        {/* Timeline Slider - Full Width */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono font-medium text-zinc-400 w-12 text-right">{currentTime.toFixed(1)}s</span>
          <div className="flex-1 relative group/slider cursor-pointer h-5 flex items-center">
            <input 
              type="range" 
              min={0} max={maxTime} step={0.1}
              value={currentTime}
              onChange={handleScrubberChange}
              className="absolute inset-0 w-full opacity-0 z-10 cursor-pointer"
            />
            {/* Custom Track */}
            <div className="w-full h-1.5 bg-[#1a212e] rounded-full overflow-hidden transition-all group-hover/slider:h-2">
               <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(currentTime / maxTime) * 100}%` }}></div>
            </div>
            {/* Custom Thumb */}
            <div 
               className="absolute h-3.5 w-3.5 bg-white rounded-full shadow-[0_0_12px_rgba(6,182,212,1)] opacity-0 group-hover/slider:opacity-100 group-hover/slider:scale-125 transition-all pointer-events-none" 
               style={{ left: `calc(${(currentTime / maxTime) * 100}% - 7px)` }}
            ></div>
          </div>
          <span className="text-xs font-mono font-medium text-zinc-600 w-12">{maxTime.toFixed(1)}s</span>
        </div>

        {/* Bottom Playback Bar */}
        <div className="flex items-center justify-between px-1">
          
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={togglePlay}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-black hover:bg-cyan-400 hover:scale-105 transition-all shadow-md"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <button 
              onClick={restart}
              className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center bg-[#131821] rounded-lg border border-zinc-800/60 p-1">
            {[0.5, 1, 2].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                  speed === s ? "bg-zinc-700 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                )}
              >
                {s}x
              </button>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
