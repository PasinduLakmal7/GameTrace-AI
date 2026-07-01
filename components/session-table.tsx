import Link from "next/link";
import { UnitySession } from "@/lib/mock-data";
import { Play, Sparkles, ChevronRight, Skull, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function SessionTable({ sessions }: { sessions: UnitySession[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-zinc-400 font-semibold border-b border-zinc-800/60">
          <tr>
            <th className="px-4 py-3 font-medium">Session ID</th>
            <th className="px-4 py-3 font-medium">Player</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Score</th>
            <th className="px-4 py-3 font-medium">Duration</th>
            <th className="px-4 py-3 font-medium">Platform</th>
            <th className="px-4 py-3 font-medium">Version</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/30">
          {sessions.map((session) => (
            <tr key={session.sessionId} className="hover:bg-zinc-800/20 transition-colors group">
              <td className="px-4 py-4 font-mono text-cyan-400 text-xs">
                <Link href={`/replay/${session.sessionId}`} className="hover:underline">
                  {session.sessionId}
                </Link>
              </td>
              <td className="px-4 py-4 font-medium text-zinc-200">{session.playerName}</td>
              <td className="px-4 py-4">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                  session.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                  session.status === "Player Dead" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : 
                  "bg-amber-500/10 text-amber-400 border-amber-500/20" // Crashed
                )}>
                  {session.status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
                  {session.status === "Player Dead" && <Skull className="w-3 h-3" />}
                  {session.status === "Crashed" && <AlertTriangle className="w-3 h-3" />}
                  {session.status}
                </span>
              </td>
              <td className="px-4 py-4 text-zinc-100 font-semibold">{session.finalScore.toLocaleString()}</td>
              <td className="px-4 py-4 text-zinc-400 font-mono text-xs">{session.duration}s</td>
              <td className="px-4 py-4 text-zinc-400 text-xs">{session.platform}</td>
              <td className="px-4 py-4 text-zinc-500 font-mono text-xs">{session.gameVersion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
