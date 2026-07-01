import { StatCard } from "@/components/stat-card";
import { SessionTable } from "@/components/session-table";
import { MiniChart } from "@/components/mini-chart";
import { Activity, AlertTriangle, Clock, Trophy, List, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { sessions } from "@/lib/db/schema";
import { desc, count } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  
  // Fetch real sessions from database
  const dbSessions = await db.select().from(sessions).orderBy(desc(sessions.createdAt));

  // Dummy chart data for visual aesthetics (Score Over Time)
  const scoreData = [ 
    { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 }, 
    { v: 100 }, { v: 100 }, { v: 200 }, { v: 200 }, { v: 200 }, 
    { v: 200 }, { v: 200 }, { v: 300 }, { v: 300 } 
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-4 animate-in fade-in duration-500">

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard 
          title="Total Sessions" 
          value={dbSessions.length.toString()} 
          icon={<Activity className="w-4 h-4" />} 
          iconColorClass="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        />
        <StatCard 
          title="Failed Sessions" 
          value="3" 
          description="PLAYER_DEAD + CRASHED"
          icon={<AlertTriangle className="w-4 h-4" />} 
          iconColorClass="bg-rose-500/10 text-rose-400 border-rose-500/20"
        />
        <StatCard 
          title="Avg Duration" 
          value="1m 39s" 
          icon={<Clock className="w-4 h-4" />} 
          iconColorClass="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        />
        <StatCard 
          title="Highest Score" 
          value="1,540" 
          icon={<Trophy className="w-4 h-4" />} 
          iconColorClass="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />
        <StatCard 
          title="AI Reports" 
          value="3" 
          icon={<FileText className="w-4 h-4" />} 
          iconColorClass="bg-amber-500/10 text-amber-400 border-amber-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Event Type Distribution & Player Damage Events (Left Column) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-white mb-6">Event Type Distribution</h3>
            <div className="space-y-4">
              {[
                { type: 'SESSION_START', count: 6 },
                { type: 'PLAYER_HIT', count: 6 },
                { type: 'PLAYER_SHOOT', count: 5 },
                { type: 'SCORE_CHANGE', count: 5 },
                { type: 'GAME_OVER', count: 5 },
                { type: 'POSITION', count: 4 },
                { type: 'ENEMY_HIT', count: 3 },
                { type: 'ENEMY_DIE', count: 3 },
                { type: 'PLAYER_DIE', count: 2 },
              ].map((item, i) => (
                <div key={item.type} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-bold text-zinc-400">
                    <span>{item.type}</span>
                    <span className="text-white">{item.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" 
                      style={{ width: `${(item.count / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-white mb-6">Player Damage Events</h3>
            <div className="space-y-4">
              {[
                { player: 'NovaStriker', count: 4 },
                { player: 'PixelQueen', count: 0 },
                { player: 'GhostByte', count: 1 },
                { player: 'AcePilot', count: 0 },
                { player: 'ShadowFox', count: 1 },
              ].map((item, i) => (
                <div key={item.player} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-bold text-zinc-400">
                    <span>{item.player}</span>
                    <span className="text-white">{item.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", i === 0 ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" : "bg-zinc-700")} 
                      style={{ width: `${item.count === 0 ? 0 : (item.count / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts & Table (Right Column) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Score Over Time */}
          <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-2xl p-5 shadow-sm h-[320px] flex flex-col">
            <h3 className="text-sm font-semibold text-white mb-1">
              Score Over Time <span className="text-zinc-500 font-normal">· NovaStriker</span>
            </h3>
            <div className="flex-1 mt-4 relative">
              <MiniChart data={scoreData} dataKey="v" color="#06b6d4" />
            </div>
          </div>

          {/* Recent Sessions Table */}
          <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-2xl p-5 shadow-sm flex-1">
            <h3 className="text-sm font-semibold text-white mb-4">Recent Sessions</h3>
            <SessionTable sessions={dbSessions as any} />
          </div>

        </div>
      </div>

    </div>
  );
}
