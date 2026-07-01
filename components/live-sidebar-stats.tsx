"use client";

import { useState, useEffect } from "react";
import { UnityEvent } from "@/lib/mock-data";

export function LiveSidebarStats({ events }: { events: UnityEvent[] }) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = (e: any) => setCurrentTime(e.detail);
    window.addEventListener('traceforge:timeupdate', handleTimeUpdate);
    return () => window.removeEventListener('traceforge:timeupdate', handleTimeUpdate);
  }, []);

  const currentPosEvent = events.filter(e => e.time <= currentTime && e.type === "POSITION").pop() || { x: 0, y: 0, z: 0 };
  const currentScoreEvent = events.filter(e => e.time <= currentTime).pop() || { score: 0 };

  return (
    <div className="mt-6 pt-4 border-t border-zinc-800/60 space-y-4">
      <div className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
        Live Playback Stats
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-500 font-medium">Time</span>
        <span className="text-white font-mono">{currentTime.toFixed(2)}s</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-500 font-medium">Position</span>
        <span className="text-white font-mono text-xs">
          X:{currentPosEvent.x.toFixed(1)} Y:{currentPosEvent.y.toFixed(1)} Z:{currentPosEvent.z.toFixed(1)}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-500 font-medium">Score</span>
        <span className="text-white font-mono font-bold">{currentScoreEvent.score}</span>
      </div>
    </div>
  );
}
