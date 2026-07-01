import { UnityEvent } from "@/lib/mock-data";
import { EventBadge } from "./event-badge";
import { Search, ChevronDown } from "lucide-react";

export function EventTimeline({ events }: { events: UnityEvent[] }) {
  if (!events || events.length === 0) {
    return <div className="p-8 text-center text-zinc-500 bg-[#0b0e14] rounded-2xl border border-zinc-800/60">No events found for this session.</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#0b0e14]">
      <div className="p-3 border-b border-zinc-800/60 flex items-center gap-2 bg-[#0b0e14]">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search event value..."
            className="w-full bg-[#131821] border border-zinc-800/60 rounded-lg pl-8 pr-4 py-1.5 text-xs text-zinc-200 outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <button className="px-3 py-1.5 bg-[#131821] border border-zinc-800/60 rounded-lg text-xs text-zinc-300 flex items-center gap-2 hover:bg-zinc-800/50 transition-colors">
          ALL <ChevronDown className="w-3 h-3 text-zinc-500" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left">
          <tbody className="divide-y divide-zinc-800/30">
            {events.map((event, i) => (
              <tr key={i} className="hover:bg-zinc-800/20 transition-colors border-b border-zinc-800/30 last:border-0">
                <td className="px-4 py-3 w-16 align-middle">
                  <span className="text-[11px] font-mono text-zinc-400 block">{event.time.toFixed(1)}s</span>
                </td>
                <td className="px-4 py-3 w-36 align-middle">
                  <EventBadge type={event.type} />
                </td>
                <td className="px-4 py-3 text-xs text-zinc-400 align-middle">
                  {event.value}
                </td>
                <td className="px-4 py-3 align-middle">
                  {event.screenshotUrl ? (
                    <img
                      src={event.screenshotUrl}
                      alt="Snapshot"
                      className="h-12 w-20 rounded-md border border-zinc-700 object-cover"
                    />
                  ) : (
                    <span className="text-xs text-zinc-600">No snapshot</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-500 text-right align-middle font-mono">
                  {event.score > 0 ? `${event.score}pts` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
