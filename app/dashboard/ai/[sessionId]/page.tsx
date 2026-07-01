import { mockSession } from "@/lib/mock-data";
import { AiReportCard } from "@/components/ai-report-card";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";

export default function AiReportPage({ params }: { params: { sessionId: string } }) {
  const session = mockSession;

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
            <Sparkles className="w-6 h-6 text-cyan-400" />
            AI Debugging Report
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {session.playerName} · <span className="font-mono">{session.sessionId}</span>
          </p>
        </div>
        <Link href={`/replay/${session.sessionId}`} className="px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 font-bold text-sm flex items-center gap-2 transition-colors">
          <Play className="w-4 h-4" /> Watch Replay
        </Link>
      </div>

      <AiReportCard session={session} />

    </div>
  );
}

// Just importing Sparkles icon here since it's used in the title
import { Sparkles } from "lucide-react";
