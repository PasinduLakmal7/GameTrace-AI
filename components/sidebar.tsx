"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, Play, Code, Box, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800/60 h-screen sticky top-0 flex flex-col text-zinc-300 z-50">
      <div className="p-5 flex items-center gap-3">
        <div className="w-7 h-7 rounded bg-orange-500 flex items-center justify-center">
          <Box className="w-4 h-4 text-zinc-950" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">GameTrace <span className="text-orange-500">AI</span></span>
      </div>
      
      <div className="px-5 mt-4 mb-2">
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Workspace</div>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        <Link 
          href="/dashboard" 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
            pathname === "/dashboard" 
              ? "bg-zinc-900 text-white" 
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          )}
        >
          <LayoutDashboard className={cn("w-4 h-4", pathname === "/dashboard" ? "text-orange-500" : "text-zinc-500")} />
          Dashboard
        </Link>
        
        <Link 
          href="/dashboard/events" 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
            pathname === "/dashboard/events" 
              ? "bg-zinc-900 text-white" 
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          )}
        >
          <List className={cn("w-4 h-4", pathname === "/dashboard/events" ? "text-orange-500" : "text-zinc-500")} />
          Events
        </Link>
        
        <Link 
          href="/replay/sess_8f3a21c9" 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
            pathname.startsWith("/replay") 
              ? "bg-zinc-900 text-white" 
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          )}
        >
          <Play className={cn("w-4 h-4", pathname.startsWith("/replay") ? "text-orange-500" : "text-zinc-500")} />
          Replay Viewer
        </Link>

        <Link 
          href="/dashboard/ai/sess_8f3a21c9" 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
            pathname.startsWith("/dashboard/ai") 
              ? "bg-zinc-900 text-white" 
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          )}
        >
          <Sparkles className={cn("w-4 h-4", pathname.startsWith("/dashboard/ai") ? "text-orange-500" : "text-zinc-500")} />
          AI Reports
        </Link>

        <Link 
          href="/dashboard/sdk" 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
            pathname === "/dashboard/sdk" 
              ? "bg-zinc-900 text-white" 
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          )}
        >
          <Code className={cn("w-4 h-4", pathname === "/dashboard/sdk" ? "text-orange-500" : "text-zinc-500")} />
          SDK Setup
        </Link>
      </nav>

      <div className="p-4">
        <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-800/50">
          <p className="text-sm font-bold text-zinc-200">Shooter Demo</p>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">proj_traceforge_demo</p>
        </div>
      </div>
    </div>
  );
}
