import Link from "next/link";
import { Play, Sparkles, MonitorPlay, List, CircuitBoard, SplitSquareHorizontal, FileText, ArrowRight, Upload, Box } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-50 font-sans selection:bg-cyan-500/30">
      
      {/* Background Grid (Subtle) */}
      <div className="fixed inset-0 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
             backgroundSize: '100px 100px',
             opacity: 0.15
           }}>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-400 flex items-center justify-center">
            <Box className="w-5 h-5 text-[#090b10]" />
          </div>
          <span className="text-xl font-bold tracking-tight">TraceForge <span className="text-cyan-400">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</Link>
          <Link href="/dashboard/sdk" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">SDK</Link>
          <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="px-5 py-2 rounded-lg bg-cyan-400 text-[#090b10] font-semibold text-sm hover:bg-cyan-300 transition-colors">
            Open Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-20 flex flex-col items-center text-center z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d1219] border border-cyan-900/50 text-xs font-medium text-cyan-400 mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          Unity Observability & Replay Debugging
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-balance text-white leading-tight">
          Replay and debug <br className="hidden md:block"/> your Unity game from <br className="hidden md:block"/> real player sessions
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-3xl text-balance">
          Capture Unity gameplay as event data, reconstruct sessions in the browser, and generate AI debugging reports.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-20">
          <Link href="/dashboard" className="w-full sm:w-auto px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-[#090b10] font-semibold transition-all flex items-center justify-center gap-2">
            View Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/replay/sess_1a2b3c4d5e6f" className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#141923] hover:bg-[#1c2331] text-zinc-200 font-semibold border border-zinc-800 transition-all flex items-center justify-center gap-2">
            <Play className="w-4 h-4" /> View Sample Replay
          </Link>
        </div>

        {/* Mock Session Card */}
        <div className="w-full max-w-3xl bg-[#0f141d] rounded-2xl border border-zinc-800/80 shadow-2xl overflow-hidden text-left mb-10">
          {/* Mac-style header */}
          <div className="px-4 py-3 border-b border-zinc-800/80 flex items-center gap-2 bg-[#0a0d14]">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-xs font-mono text-zinc-500">replay / sess_8f3a21c9</span>
          </div>
          {/* Card Body */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#151a24] p-4 rounded-xl border border-zinc-800/50">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Events</div>
              <div className="text-2xl font-bold text-white">20</div>
            </div>
            <div className="bg-[#151a24] p-4 rounded-xl border border-zinc-800/50">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Player Hits</div>
              <div className="text-2xl font-bold text-white">4</div>
            </div>
            <div className="bg-[#151a24] p-4 rounded-xl border border-zinc-800/50">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Status</div>
              <div className="text-sm font-bold text-rose-500 mt-3">PLAYER_DEAD</div>
            </div>
          </div>
        </div>

      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 px-4 py-24 bg-[#0a0d14] border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">Everything you need to debug from a replay</h2>
            <p className="text-zinc-400">From raw Unity events to a reproducible bug report.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-8 rounded-2xl bg-[#0f141d] border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#141a24] border border-zinc-700/50 flex items-center justify-center mb-6">
                <Upload className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Unity EXE Session Capture</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">A lightweight SDK records gameplay as structured event streams and uploads them from your Windows build.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0f141d] border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#141a24] border border-zinc-700/50 flex items-center justify-center mb-6">
                <MonitorPlay className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Browser Replay Reconstruction</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Reconstruct any session as a top-down 2D replay directly in the browser — no game install required.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0f141d] border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#141a24] border border-zinc-700/50 flex items-center justify-center mb-6">
                <List className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Event Timeline</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Scrub through every shoot, hit, kill and score change with a fully filterable event timeline.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0f141d] border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#141a24] border border-zinc-700/50 flex items-center justify-center mb-6">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">AI Bug Report</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Generate structured bug reports with likely root causes from the captured event data.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0f141d] border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#141a24] border border-zinc-700/50 flex items-center justify-center mb-6">
                <SplitSquareHorizontal className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Reproduction Steps</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Get ready-to-paste reproduction steps and debug scenarios derived from the actual session.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0f141d] border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#141a24] border border-zinc-700/50 flex items-center justify-center mb-6">
                <CircuitBoard className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Device & Performance Context</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Capture CPU, GPU, memory, OS and resolution so you can reproduce issues on the right hardware.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA / Footer */}
      <footer className="relative z-10 bg-[#090b10] border-t border-zinc-800/50 py-24 text-center flex flex-col items-center">
        <div className="mb-6">
          <FileText className="w-8 h-8 text-cyan-400 mx-auto" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Turn a crash into a fix</h2>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">
          Open a session, watch the replay, and let TraceForge AI draft the bug report and reproduction steps for your team.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-20">
          <Link href="/dashboard" className="px-6 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-[#090b10] font-semibold transition-all flex items-center justify-center gap-2">
            View Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard/ai/sess_1a2b3c4d5e6f" className="px-6 py-2.5 rounded-lg bg-[#141923] hover:bg-[#1c2331] text-zinc-200 font-semibold border border-zinc-800 transition-all flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> See AI Report
          </Link>
        </div>

        <p className="text-xs text-zinc-600">
          TraceForge AI — Unity gameplay observability. Demo UI with mock data.
        </p>
      </footer>
    </div>
  );
}
