"use client";
import { Search, Bell, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";

export function Topbar() {
  const pathname = usePathname();
  
  let title = "Dashboard";
  let subtitle = "Overview of captured Unity sessions";
  if (pathname === "/dashboard/events") {
    title = "Event Explorer";
    subtitle = "39 events across all sessions";
  } else if (pathname === "/dashboard/sdk") {
    title = "SDK Setup";
    subtitle = "Integrate the TraceForge SDK into your Unity build";
  } else if (pathname.startsWith("/replay")) {
    title = "Replay Viewer";
    subtitle = "NovaStriker · sess_8f3a21c9";
  } else if (pathname.startsWith("/dashboard/ai")) {
    // Hide standard topbar title if in AI report, it has its own back button header
    return null; 
  }

  return (
    <header className="h-20 border-b border-zinc-800/60 bg-[#0b0e14] flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            SDK Connected
          </div>
        </div>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4 text-zinc-400">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search sessions..." 
            className="bg-[#131821] border border-zinc-800/60 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 outline-none focus:border-cyan-500/50 text-zinc-200 placeholder:text-zinc-600 transition-colors"
          />
        </div>
        <button className="hover:text-white transition-colors relative w-8 h-8 flex items-center justify-center">
          <Bell className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
          <ExternalLink className="w-3.5 h-3.5" />
          SDK Docs
        </button>
      </div>
    </header>
  );
}
