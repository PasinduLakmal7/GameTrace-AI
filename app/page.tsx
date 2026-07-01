import Link from "next/link";
import { Play, Sparkles, MonitorPlay, List, CircuitBoard, SplitSquareHorizontal, FileText, ArrowRight, Upload, Box } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
      
      {/* Background Grid (Subtle) */}
      <div className="fixed inset-0 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)',
             backgroundSize: '100px 100px',
             opacity: 0.5
           }}>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <Box className="w-5 h-5 text-zinc-950" />
          </div>
          <span className="text-xl font-bold tracking-tight">GameTrace <span className="text-orange-500">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</Link>
          <Link href="/dashboard/sdk" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">SDK</Link>
          <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-lg bg-orange-500 text-zinc-950 font-bold text-sm hover:bg-orange-400 hover:scale-105 transition-all shadow-lg">
            Open Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-20 flex flex-col items-center text-center z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-orange-500/20 text-xs font-semibold text-orange-500 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Unity Observability & Replay Debugging
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl text-balance text-white leading-[1.1]">
          Replay and debug <br className="hidden md:block"/> your Unity game from <br className="hidden md:block"/> real player sessions
        </h1>
        
        <p className="text-base md:text-lg text-zinc-400 mb-10 max-w-2xl text-balance">
          Capture Unity gameplay as event data, reconstruct sessions in the browser, and generate AI debugging reports.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-24">
          <Link href="/dashboard" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2">
            View Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/replay/sess_1a2b3c4d5e6f" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold border border-zinc-800 transition-all flex items-center justify-center gap-2">
            <Play className="w-4 h-4 text-sky-400" /> View Sample Replay
          </Link>
        </div>

        {/* Mock Session Card */}
        <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden text-left mb-10 transform hover:scale-[1.02] transition-transform duration-500">
          {/* Mac-style header */}
          <div className="px-4 py-3 border-b border-zinc-800/80 flex items-center gap-2 bg-zinc-950/50">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs font-mono text-zinc-500">replay / sess_8f3a21c9</span>
          </div>
          {/* Card Body */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <List className="w-3 h-3 text-sky-400" /> Events
              </div>
              <div className="text-3xl font-black text-white">20</div>
            </div>
            <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50 flex flex-col justify-between">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <CircuitBoard className="w-3 h-3 text-sky-400" /> Player Hits
              </div>
              <div className="text-3xl font-black text-white">4</div>
            </div>
            <div className="bg-zinc-950/50 p-5 rounded-xl border border-red-500/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/5"></div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5 relative z-10">
                Status
              </div>
              <div className="text-sm font-bold text-red-500 mt-3 relative z-10">PLAYER_DEAD</div>
            </div>
          </div>
        </div>

      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 px-4 py-24 bg-zinc-950 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">Everything you need to debug from a replay</h2>
            <p className="text-zinc-400 text-lg">From raw Unity events to a reproducible bug report.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors">
                <Upload className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Unity EXE Capture</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">A lightweight SDK records gameplay as structured event streams and uploads them from your Windows build.</p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors">
                <MonitorPlay className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Browser Replay</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Reconstruct any session as a top-down 2D replay directly in the browser — no game install required.</p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors">
                <List className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Event Timeline</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Scrub through every shoot, hit, kill and score change with a fully filterable event timeline.</p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors">
                <Sparkles className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">AI Bug Report</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Generate structured bug reports with likely root causes from the captured event data.</p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors">
                <SplitSquareHorizontal className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Reproduction Steps</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Get ready-to-paste reproduction steps and debug scenarios derived from the actual session.</p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-colors">
                <CircuitBoard className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Device Context</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Capture CPU, GPU, memory, OS and resolution so you can reproduce issues on the right hardware.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA / Footer */}
      <footer className="relative z-10 bg-zinc-950 border-t border-zinc-800/50 py-24 text-center flex flex-col items-center">
        <div className="mb-6">
          <FileText className="w-8 h-8 text-orange-500 mx-auto" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Turn a crash into a fix</h2>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">
          Open a session, watch the replay, and let GameTrace AI draft the bug report and reproduction steps for your team.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-20">
          <Link href="/dashboard" className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold transition-all shadow-lg flex items-center justify-center gap-2">
            View Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard/ai/sess_1a2b3c4d5e6f" className="px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold border border-zinc-800 transition-all flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> See AI Report
          </Link>
        </div>

        <p className="text-xs text-zinc-600 font-medium">
          GameTrace AI — Unity gameplay observability.
        </p>
      </footer>
    </div>
  );
}
