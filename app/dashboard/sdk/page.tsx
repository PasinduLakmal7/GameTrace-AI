import { Terminal, ShieldAlert, Link as LinkIcon, ChevronRight } from "lucide-react";

export default function SdkPage() {
  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Code Integration */}
        <div className="xl:col-span-2 space-y-6">
          
          <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-cyan-400" />
              Install & Configure
            </h3>
            <p className="text-sm text-zinc-400 mb-4 ml-7">
              Drop the SDK into your Unity project and configure it once at startup.
            </p>
            
            <div className="bg-[#131821] rounded-xl border border-zinc-800/60 overflow-hidden">
              <div className="px-4 py-2 border-b border-zinc-800/60 flex justify-between items-center bg-[#0d121a]">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">CSHARP</span>
                <button className="text-zinc-500 hover:text-zinc-300"><Terminal className="w-4 h-4" /></button>
              </div>
              <div className="p-5 overflow-x-auto text-sm font-mono leading-relaxed">
                <pre>
<span className="text-zinc-500">// 1. Add the TraceForge SDK to your Unity project (Assets/Plugins)</span>
<span className="text-zinc-500">// 2. Initialize once at game start (e.g. in a bootstrap MonoBehaviour)</span>

<span className="text-pink-400">using</span> TraceForge;

<span className="text-pink-400">void</span> <span className="text-cyan-400">Start</span>()
{'{'}
    TraceForge.<span className="text-cyan-400">Configure</span>(
        endpoint: <span className="text-emerald-400">"https://api.traceforge.ai/v1/sessions"</span>,
        apiKey: TF_API_KEY,        <span className="text-zinc-500">// injected from a secure config, never hardcoded</span>
        projectId: <span className="text-emerald-400">"proj_traceforge_demo"</span>
    );
{'}'}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-cyan-400" />
              Track Gameplay
            </h3>
            <p className="text-sm text-zinc-400 mb-4 ml-7">
              Core API for sessions, events, score and damage.
            </p>
            
            <div className="bg-[#131821] rounded-xl border border-zinc-800/60 overflow-hidden">
              <div className="px-4 py-2 border-b border-zinc-800/60 flex justify-between items-center bg-[#0d121a]">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">CSHARP</span>
                <button className="text-zinc-500 hover:text-zinc-300"><Terminal className="w-4 h-4" /></button>
              </div>
              <div className="p-5 overflow-x-auto text-sm font-mono leading-relaxed">
                <pre>
<span className="text-zinc-500">// Start a session when gameplay begins</span>
TraceForge.<span className="text-cyan-400">StartSession</span>(playerName);

<span className="text-zinc-500">// Track gameplay events as they happen</span>
TraceForge.<span className="text-cyan-400">TrackEvent</span>(<span className="text-emerald-400">"PLAYER_SHOOT"</span>);
TraceForge.<span className="text-cyan-400">TrackEvent</span>(<span className="text-emerald-400">"ENEMY_HIT"</span>);

<span className="text-zinc-500">// Track score and damage</span>
TraceForge.<span className="text-cyan-400">TrackScore</span>(score);
TraceForge.<span className="text-cyan-400">TrackDamage</span>(<span className="text-purple-400">25</span>);

<span className="text-zinc-500">// Finish and upload the session JSON to the backend</span>
TraceForge.<span className="text-cyan-400">EndSessionAndUpload</span>();
                </pre>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Connection & Security */}
        <div className="space-y-6">
          <div className="bg-[#0b0e14] border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-cyan-400" /> Connection
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><LinkIcon className="w-3 h-3"/> API Endpoint</label>
                <div className="bg-[#131821] border border-zinc-800/60 rounded-xl px-4 py-2.5 text-zinc-300 font-mono text-sm">
                  https://api.traceforge.ai/v1/sessions
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Terminal className="w-3 h-3"/> Project ID</label>
                <div className="bg-[#131821] border border-zinc-800/60 rounded-xl px-4 py-2.5 text-zinc-300 font-mono text-sm">
                  proj_traceforge_demo
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Terminal className="w-3 h-3"/> API Key</label>
                <div className="flex bg-[#131821] border border-zinc-800/60 rounded-xl overflow-hidden">
                  <div className="flex-1 px-4 py-2.5 text-zinc-300 font-mono text-sm truncate">
                    tf_live_.........................3a...
                  </div>
                  <div className="px-3 py-2 bg-zinc-800/50 flex items-center justify-center text-xs font-bold text-zinc-400 border-l border-zinc-800/60">
                    secret
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a0e14] border border-rose-900/50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-rose-500 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Security Warning
            </h3>
            <h4 className="font-bold text-white mb-2 leading-snug">Never put AWS credentials inside your Unity game.</h4>
            <p className="text-xs text-rose-100/70 leading-relaxed">
              A shipped Unity EXE can be decompiled. The game should only call your TraceForge backend API with a scoped, revocable key. All cloud storage and AWS access must happen server-side — never from the client build.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
