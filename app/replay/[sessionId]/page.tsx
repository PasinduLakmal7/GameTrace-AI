import { db } from "@/lib/db";
import { sessions, events, snapshots } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { ReplayViewer } from "@/components/replay-viewer";
import { EventTimeline } from "@/components/event-timeline";
import { LiveSidebarStats } from "@/components/live-sidebar-stats";
import { ArrowLeft, Search, Sparkles, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ReplayPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const sessionRecords = await db.select().from(sessions).where(eq(sessions.sessionId, sessionId));
  
  if (sessionRecords.length === 0) {
    return notFound();
  }
  
  const session = sessionRecords[0];

  const dbEvents = await db.select().from(events).where(eq(events.sessionId, sessionId)).orderBy(asc(events.eventTime));
  const mappedEvents = dbEvents.map(e => ({
    ...e,
    time: e.eventTime,
    type: e.eventType,
    value: e.value || ""
  }));

  const dbSnapshots = await db.select().from(snapshots).where(eq(snapshots.sessionId, sessionId)).orderBy(asc(snapshots.frameTime));

  const eventSnapshots = mappedEvents
    .filter(e => e.screenshotUrl)
    .map((e, index) => ({
      frameTime: e.time,
      frameIndex: index,
      screenshotUrl: e.screenshotUrl,
      x: e.x,
      y: e.y,
      z: e.z,
      score: e.score
    }));

  const finalSnapshots = dbSnapshots.length > 0 ? dbSnapshots : eventSnapshots;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col selection:bg-orange-500/30 animate-in fade-in duration-500 overflow-hidden">
      
      {/* Top Navbar */}
      <header className="h-16 border-b border-zinc-800/60 bg-zinc-950 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link 
            href={`/dashboard/sessions/${session.sessionId}`}
            className="p-1.5 rounded-lg hover:bg-zinc-800/50 text-zinc-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">Replay Viewer</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[11px] text-zinc-500">{session.playerName} · {session.sessionId}</p>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            SDK Connected
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search sessions..." 
              className="bg-zinc-900 border border-zinc-800/60 rounded-lg pl-9 pr-4 py-1.5 text-xs w-48 outline-none focus:border-sky-400/50 text-zinc-200 transition-colors"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 flex gap-5 overflow-hidden bg-zinc-950">
        
        {/* Left Column: Replay Area & Timeline */}
        <div className="flex-1 flex flex-col gap-5 overflow-hidden">
          
          <div className="flex items-center justify-between px-2">
            <button className="flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Session Details
            </button>
            <div className="flex gap-2">
              <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Player Dead
              </div>
              <Link href={`/dashboard/ai/${session.sessionId}`} className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold flex items-center gap-1.5 hover:bg-orange-500/20 transition-colors">
                <Sparkles className="w-3.5 h-3.5" /> AI Report
              </Link>
            </div>
          </div>

          <div className="shrink-0 h-[650px]">
            {/* Unified 3D & Snapshot Viewer */}
            <div className="border border-zinc-800/60 rounded-2xl flex flex-col shadow-sm h-full bg-zinc-900">
              <ReplayViewer session={session} events={mappedEvents} snapshots={finalSnapshots as any} />
            </div>
          </div>

          <div className="flex-1 min-h-0 border border-zinc-800/60 rounded-2xl flex flex-col shadow-sm bg-zinc-900">
            <div className="px-4 py-3 border-b border-zinc-800/60">
              <h2 className="text-sm font-bold text-white">Event Timeline</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <EventTimeline events={mappedEvents} />
            </div>
          </div>
        </div>

        {/* Right Sidebar: Details & Instructions */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-5 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Player</span>
                <span className="text-white font-bold">{session.playerName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Session</span>
                <span className="text-zinc-300 font-mono">{session.sessionId}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Game Version</span>
                <span className="text-zinc-300 font-mono">{session.gameVersion}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Platform</span>
                <span className="text-zinc-300">{session.platform}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Duration</span>
                <span className="text-zinc-300 font-mono">{session.duration}s</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Final Score</span>
                <span className="text-white font-bold">{session.finalScore}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Events</span>
                <span className="text-white font-bold">{mappedEvents.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Snapshots</span>
                <span className="text-white font-bold">{finalSnapshots.length}</span>
              </div>
            </div>
            
            <LiveSidebarStats events={mappedEvents} />
            
          </div>

          <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-5 shadow-sm border-t-orange-500/30">
            <h3 className="text-sm font-bold text-white mb-2">How to read the map</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The 3D volumetric viewport is reconstructed dynamically. Use the controls below it to navigate the timeline. The snapshot frame player on the right synchronizes with the game's actual screen recordings.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
