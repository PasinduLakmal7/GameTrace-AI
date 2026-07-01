import { mockSession, mockSessionsList } from "@/lib/mock-data";
import { DeviceInfoCard } from "@/components/device-info-card";
import { EventTimeline } from "@/components/event-timeline";
import { EventBadge } from "@/components/event-badge";
import { Play, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { sessions, events } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export default async function SessionDetailsPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  
  // Try to fetch from real database
  const sessionRecords = await db.select().from(sessions).where(eq(sessions.sessionId, sessionId));
  const dbSession = sessionRecords[0];
  
  let session = mockSessionsList.find(s => s.sessionId === sessionId);
  
  if (dbSession) {
    const dbEvents = await db.select().from(events).where(eq(events.sessionId, sessionId)).orderBy(asc(events.eventTime));
    
    session = {
      projectId: dbSession.projectId,
      playerName: dbSession.playerName,
      sessionId: dbSession.sessionId,
      status: dbSession.status,
      gameVersion: dbSession.gameVersion || "",
      platform: dbSession.platform || "",
      deviceModel: dbSession.deviceModel || "",
      deviceName: dbSession.deviceName || "",
      operatingSystem: dbSession.operatingSystem || "",
      processorType: dbSession.processorType || "",
      processorCount: dbSession.processorCount || 0,
      systemMemorySize: dbSession.systemMemorySize || 0,
      graphicsDeviceName: dbSession.graphicsDeviceName || "",
      graphicsMemorySize: dbSession.graphicsMemorySize || 0,
      screenResolution: dbSession.screenResolution || "",
      finalScore: dbSession.finalScore,
      duration: dbSession.duration,
      events: dbEvents.map(e => ({
        time: e.eventTime,
        type: e.eventType,
        x: e.x,
        y: e.y,
        z: e.z,
        score: e.score,
        value: e.value || "",
        screenshotUrl: e.screenshotUrl
      }))
    };
  } else if (!session) {
    session = mockSession; // ultimate fallback
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Back button */}
      <div>
        <Link 
          href="/dashboard"
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 inline-flex"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">{session.playerName}</h1>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border",
              session.status === "COMPLETED" ? "bg-green-500/10 text-green-500 border-green-500/20" : 
              session.status === "PLAYER_DEAD" ? "bg-red-500/10 text-red-500 border-red-500/20" : 
              "bg-zinc-800 text-zinc-400 border-zinc-700"
            )}>
              {session.status}
            </span>
          </div>
          <p className="text-zinc-400 font-mono text-sm">Session ID: {session.sessionId}</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/dashboard/ai/${session.sessionId}`} className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-sm text-zinc-300 flex items-center gap-2 transition-colors">
            <Sparkles className="w-4 h-4 text-orange-500" /> View AI Report
          </Link>
          <Link href={`/replay/${session.sessionId}`} className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-sm text-white font-medium flex items-center gap-2 transition-colors shadow-lg shadow-orange-500/20">
            <Play className="w-4 h-4" /> Watch Replay
          </Link>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Final Score</div>
          <div className="text-2xl font-bold text-white font-mono">{session.finalScore.toLocaleString()}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Duration</div>
          <div className="text-2xl font-bold text-white font-mono">{session.duration}s</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Events Recorded</div>
          <div className="text-2xl font-bold text-white font-mono">{session.events.length}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Game Version</div>
          <div className="text-2xl font-bold text-white font-mono text-lg">{session.gameVersion}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <DeviceInfoCard session={session} />
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-white mb-4">Event Summary</h3>
            <div className="space-y-3">
              {(() => {
                const types = ['PLAYER_HIT', 'PLAYER_SHOOT', 'ENEMY_HIT', 'ENEMY_DIE'];
                const counts = types.map(type => ({
                  type,
                  count: session.events.filter(e => e.type === type).length
                })).filter(t => t.count > 0);

                if (counts.length === 0) {
                  return <div className="text-sm text-zinc-500">No combat events recorded in this session.</div>;
                }

                return counts.map(({ type, count }) => (
                  <div key={type} className="flex justify-between items-center">
                    <EventBadge type={type} showIcon={false} />
                    <span className="text-zinc-300 font-mono text-sm">{count}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 h-[700px]">
          <EventTimeline events={session.events} />
        </div>
      </div>

    </div>
  );
}
