import { mockSession, mockSessionsList } from "@/lib/mock-data";
import { AiReportCard } from "@/components/ai-report-card";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { sessions, events } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export default async function AiReportPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  
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
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      <div className="flex items-center gap-2 mb-4">
        <Link 
          href={`/dashboard/sessions/${session.sessionId}`}
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to session
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-orange-500" />
            AI Debugging Report
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {session.playerName} · <span className="font-mono">{session.sessionId}</span>
          </p>
        </div>
        <Link href={`/replay/${session.sessionId}`} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 border border-orange-500 text-white font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-orange-500/20">
          <Play className="w-4 h-4" /> Watch Replay
        </Link>
      </div>

      <AiReportCard session={session} />

    </div>
  );
}
