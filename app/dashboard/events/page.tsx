import { mockSession } from "@/lib/mock-data";
import { EventBadge } from "@/components/event-badge";
import { Search, ChevronDown, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EventsExplorerPage() {
  const events = mockSession.events;

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* Search and Filters */}
      <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-t-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-b-0">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search value or player..."
            className="w-full bg-[#131821] border border-zinc-800/60 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-200 outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        
        <div className="flex gap-4 items-center">
          <button className="px-4 py-2 bg-[#131821] border border-zinc-800/60 rounded-xl text-sm text-zinc-300 flex items-center justify-between gap-2 hover:bg-zinc-800/50 transition-colors w-32">
            ALL <ChevronDown className="w-4 h-4 text-zinc-500" />
          </button>
          <button className="px-4 py-2 bg-[#131821] border border-zinc-800/60 rounded-xl text-sm text-zinc-300 flex items-center justify-between gap-2 hover:bg-zinc-800/50 transition-colors w-32">
            ALL <ChevronDown className="w-4 h-4 text-zinc-500" />
          </button>
          <button className="px-4 py-2 text-sm text-zinc-300 flex items-center gap-2 hover:text-white transition-colors">
            <ArrowDownUp className="w-4 h-4 text-zinc-500" /> Time Asc
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-b-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-800/60 bg-[#0b0e14]">
              <tr>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Player</th>
                <th className="px-6 py-4">X</th>
                <th className="px-6 py-4">Y</th>
                <th className="px-6 py-4">Z</th>
                <th className="px-6 py-4 text-right">Score</th>
                <th className="px-6 py-4">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              {events.map((event, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-6 py-3 font-mono text-zinc-400 text-xs">{event.time.toFixed(1)}s</td>
                  <td className="px-6 py-3"><EventBadge type={event.type} /></td>
                  <td className="px-6 py-3 text-zinc-200 text-xs font-medium">{mockSession.playerName}</td>
                  <td className="px-6 py-3 font-mono text-zinc-400 text-xs">{event.x !== undefined ? event.x.toFixed(1) : '-'}</td>
                  <td className="px-6 py-3 font-mono text-zinc-400 text-xs">{event.y !== undefined ? event.y.toFixed(1) : '-'}</td>
                  <td className="px-6 py-3 font-mono text-zinc-400 text-xs">{event.z !== undefined ? event.z.toFixed(1) : '-'}</td>
                  <td className="px-6 py-3 font-mono text-zinc-100 text-xs text-right font-semibold">{event.score > 0 ? event.score : '-'}</td>
                  <td className="px-6 py-3 text-zinc-400 text-xs">
                    {event.value ? <span className="flex items-center gap-2"><span className="text-zinc-600">—</span> {event.value}</span> : <span className="text-zinc-600">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
