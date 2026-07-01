import { StatCard } from "@/components/stat-card";
import { SessionTable } from "@/components/session-table";
import { MiniChart } from "@/components/mini-chart";
import { Activity, AlertTriangle, Clock, Trophy, List, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { sessions, events } from "@/lib/db/schema";
import { desc, count, eq, asc, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  
  // Fetch real sessions from database
  const dbSessions = await db.select().from(sessions).orderBy(desc(sessions.createdAt));

  // Event Type Distribution
  const eventTypesData = await db
    .select({
      type: events.eventType,
      count: count(),
    })
    .from(events)
    .groupBy(events.eventType)
    .orderBy(desc(count()))
    .limit(10);
    
  const maxEventCount = eventTypesData.length > 0 ? Math.max(...eventTypesData.map(e => Number(e.count))) : 1;

  // Player Damage Events
  const playerDamageData = await db
    .select({
      player: sessions.playerName,
      count: count(),
    })
    .from(events)
    .innerJoin(sessions, eq(events.sessionId, sessions.sessionId))
    .where(sql`${events.eventType} IN ('PLAYER_HIT', 'PLAYER_DEAD')`)
    .groupBy(sessions.playerName)
    .orderBy(desc(count()))
    .limit(5);

  const maxDamageCount = playerDamageData.length > 0 ? Math.max(...playerDamageData.map(e => Number(e.count))) : 1;

  // Score Over Time for most recent session
  const recentSession = dbSessions[0];
  let scoreData: { v: number }[] = [];
  if (recentSession) {
    const recentEvents = await db
      .select({ score: events.score })
      .from(events)
      .where(eq(events.sessionId, recentSession.sessionId))
      .orderBy(asc(events.eventTime));
    
    scoreData = recentEvents.map(e => ({ v: e.score }));
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-4 animate-in fade-in duration-500">

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard 
          title="Total Sessions" 
          value={dbSessions.length.toString()} 
          icon={<Activity className="w-4 h-4" />} 
          iconColorClass="bg-orange-500/10 text-orange-500 border-orange-500/20"
        />
        <StatCard 
          title="Failed Sessions" 
          value="3" 
          description="PLAYER_DEAD + CRASHED"
          icon={<AlertTriangle className="w-4 h-4" />} 
          iconColorClass="bg-red-500/10 text-red-500 border-red-500/20"
        />
        <StatCard 
          title="Avg Duration" 
          value="1m 39s" 
          icon={<Clock className="w-4 h-4" />} 
          iconColorClass="bg-sky-500/10 text-sky-400 border-sky-500/20"
        />
        <StatCard 
          title="Highest Score" 
          value="1,540" 
          icon={<Trophy className="w-4 h-4" />} 
          iconColorClass="bg-green-500/10 text-green-500 border-green-500/20"
        />
        <StatCard 
          title="AI Reports" 
          value="3" 
          icon={<FileText className="w-4 h-4" />} 
          iconColorClass="bg-sky-500/10 text-sky-400 border-sky-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Event Type Distribution & Player Damage Events (Left Column) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-white mb-6">Event Type Distribution</h3>
            <div className="space-y-4">
              {eventTypesData.length > 0 ? eventTypesData.map((item, i) => (
                <div key={item.type} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-bold text-zinc-400">
                    <span>{item.type}</span>
                    <span className="text-white">{item.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]" 
                      style={{ width: `${(Number(item.count) / maxEventCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )) : (
                <div className="text-sm text-zinc-500">No events found.</div>
              )}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-white mb-6">Player Damage Events</h3>
            <div className="space-y-4">
              {playerDamageData.length > 0 ? playerDamageData.map((item, i) => (
                <div key={item.player} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-bold text-zinc-400">
                    <span>{item.player}</span>
                    <span className="text-white">{item.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", i === 0 ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" : "bg-zinc-700")} 
                      style={{ width: `${Number(item.count) === 0 ? 0 : (Number(item.count) / maxDamageCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )) : (
                <div className="text-sm text-zinc-500">No damage events found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Charts & Table (Right Column) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Score Over Time */}
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-5 shadow-sm h-[320px] flex flex-col">
            <h3 className="text-sm font-semibold text-white mb-1">
              Score Over Time {recentSession && <span className="text-zinc-500 font-normal">· {recentSession.playerName}</span>}
            </h3>
            <div className="flex-1 mt-4 relative">
              {scoreData.length > 0 ? (
                <MiniChart data={scoreData} dataKey="v" color="#38bdf8" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500">No score data available</div>
              )}
            </div>
          </div>

          {/* Recent Sessions Table */}
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-5 shadow-sm flex-1">
            <h3 className="text-sm font-semibold text-white mb-4">Recent Sessions</h3>
            <SessionTable sessions={dbSessions as any} />
          </div>

        </div>
      </div>

    </div>
  );
}
