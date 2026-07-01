import { UnitySession } from "@/lib/mock-data";
import { Sparkles, FileText, AlertTriangle, ListOrdered, Search, FlaskConical, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiReportCard({ session }: { session: UnitySession }) {
  const { playerName, gameVersion, status, finalScore, events = [] } = session;

  const playerShots = events.filter(e => e.type === 'PLAYER_SHOOT').length;
  const playerHits = events.filter(e => e.type === 'PLAYER_HIT').length;
  const enemyHits = events.filter(e => e.type === 'ENEMY_HIT').length;
  const kills = events.filter(e => e.type === 'ENEMY_DIE').length;

  return (
    <div className="space-y-4">
      
      {/* Model Info Pill */}
      <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-800/60 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
        <span className="flex items-center gap-1.5 text-orange-500"><Sparkles className="w-3.5 h-3.5" /> AI-generated analysis</span>
        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
        <span>Model: gametrace-debug-v1</span>
        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
        <span className="text-zinc-300">{playerHits} player hits · {kills} kills · {playerShots} shots</span>
      </div>

      {/* Top Row: Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Replay Summary */}
        <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            AI Replay Summary
          </h3>
          <div className="text-sm text-zinc-300 leading-relaxed space-y-4">
            <p>
              Player <strong className="text-white">{playerName}</strong> started the {gameVersion} build and advanced forward through the level, engaging enemies near the recorded combat area. The player fired <strong className="text-white">{playerShots} shots</strong>, landing <strong className="text-white">{enemyHits} enemy hits</strong> and scoring <strong className="text-white">{kills} kill(s)</strong>. The session ended with status <span className={cn("font-bold", status === "Player Dead" ? "text-red-500" : "text-green-500")}>{status.toUpperCase()}</span> at a final score of <strong className="text-white">{finalScore}</strong>.
            </p>
          </div>
        </div>

        {/* Possible Root Cause */}
        <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            Possible Root Cause
          </h3>
          <div className="text-sm text-zinc-300 leading-relaxed">
            <p className="mb-4">
              The player appears to have died after a rapid sequence of repeated damage events. 4 PLAYER_HIT events fired in just 2.4s, which suggests damage may be applied more often than intended.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400">
              <li>Enemy damage timing / attack rate may be too aggressive.</li>
              <li>Hitbox or collider size could be larger than the visual model.</li>
              <li>Missing or too-short damage cooldown allows multi-frame hits.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Row: Bug Report Draft */}
      <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
          <FileText className="w-4 h-4 text-red-400" />
          Bug Report Draft
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Title</div>
            <div className="text-base font-semibold text-white">Player receives repeated damage and dies during combat session</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Steps to reproduce</div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300 font-medium">
              <li>Start the Unity shooter demo</li>
              <li>Move forward through the level</li>
              <li>Engage enemy near recorded combat area</li>
              <li>Fire multiple shots</li>
              <li>Observe enemy hit and enemy die events</li>
              <li>Observe repeated player hit events and final death state</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-950/20 border border-green-900/50 rounded-xl p-4">
              <div className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-2">Expected</div>
              <p className="text-sm text-green-100/70">
                Player should only receive damage when an enemy attack or collision is valid.
              </p>
            </div>
            <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4">
              <div className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-2">Actual</div>
              <p className="text-sm text-red-100/70">
                Session contains repeated PLAYER_HIT events and a final PLAYER_DEAD status.
              </p>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Evidence — Key Events & Timestamps</div>
            <div className="bg-zinc-800 border border-zinc-800/60 rounded-xl overflow-hidden">
              <div className="divide-y divide-zinc-800/30">
                <div className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500 w-12">t=5.5s</span>
                    <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold flex items-center gap-1.5"><div className="w-3 h-3 flex items-center justify-center">💀</div> ENEMY_DIE</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">enemy_01</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500 w-12">t=7.0s</span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold flex items-center gap-1.5"><div className="w-3 h-3 flex items-center justify-center">⚠️</div> PLAYER_HIT</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">enemy_02 dmg:25</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500 w-12">t=7.6s</span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold flex items-center gap-1.5"><div className="w-3 h-3 flex items-center justify-center">⚠️</div> PLAYER_HIT</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">enemy_02 dmg:25</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500 w-12">t=8.9s</span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold flex items-center gap-1.5"><div className="w-3 h-3 flex items-center justify-center">⚠️</div> PLAYER_HIT</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">enemy_02 dmg:25</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500 w-12">t=9.4s</span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold flex items-center gap-1.5"><div className="w-3 h-3 flex items-center justify-center">⚠️</div> PLAYER_HIT</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">enemy_02 dmg:25</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500 w-12">t=10.3s</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold flex items-center gap-1.5"><div className="w-3 h-3 flex items-center justify-center">🛡️</div> PLAYER_DIE</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">health:0</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Grid for Steps and Checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Reproduction Steps */}
        <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-orange-500" />
            Reproduction Steps
          </h3>
          <ol className="list-decimal list-inside space-y-2.5 text-sm text-zinc-300">
            <li>Load the 0.4.2 build on a WindowsPlayer target.</li>
            <li>Navigate to map coordinates near x≈5.1, z≈8.2 where combat begins.</li>
            <li>Trigger the enemy encounter and remain in melee/contact range.</li>
            <li>Observe the PLAYER_HIT cadence — expect ~4 hits across 2.4s.</li>
            <li>Confirm the session transitions to PLAYER_DEAD at health 0.</li>
          </ol>
        </div>

        {/* Suggested Developer Checks */}
        <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Search className="w-4 h-4 text-green-500" />
            Suggested Developer Checks
          </h3>
          <ul className="space-y-2.5 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <Search className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              Inspect enemy damage timing and attack cooldown values.
            </li>
            <li className="flex items-start gap-2">
              <Search className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              Verify hitbox / collider size matches the enemy visual model.
            </li>
            <li className="flex items-start gap-2">
              <Search className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              Add a per-hit invulnerability window (i-frames) after damage.
            </li>
            <li className="flex items-start gap-2">
              <Search className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              Log applied damage with source + timestamp to detect duplicates.
            </li>
            <li className="flex items-start gap-2">
              <Search className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              Confirm OnTriggerStay is not applying damage every physics frame.
            </li>
          </ul>
        </div>
        
      </div>

      {/* Generated Test Case */}
      <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-orange-500" />
          Generated Test Case / Debug Scenario
        </h3>
        <p className="text-sm text-zinc-400 mb-4">
          A suggested Unity play-mode test that reproduces the repeated-damage condition and asserts the damage cooldown is respected.
        </p>
        
        <div className="bg-zinc-800 rounded-xl border border-zinc-800/60 overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-800/60 flex justify-between items-center bg-zinc-950">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">CSHARP</span>
            <button className="text-zinc-500 hover:text-zinc-300"><Terminal className="w-4 h-4" /></button>
          </div>
          <div className="p-5 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre">
            <div><span className="text-zinc-400">[UnityTest]</span></div>
            <div><span className="text-pink-400">public</span> <span className="text-orange-500">IEnumerator</span> <span className="text-yellow-200">Player_TakesDamage_RespectsCooldown</span>()</div>
            <div>{'{'}</div>
            <div>    <span className="text-pink-400">var</span> player = <span className="text-orange-500">SpawnPlayer</span>(health: <span className="text-purple-400">100</span>);</div>
            <div>    <span className="text-pink-400">var</span> enemy = <span className="text-orange-500">SpawnEnemy</span>(damage: <span className="text-purple-400">25</span>, attackRate: <span className="text-purple-400">0.5f</span>);</div>
            <br />
            <div>    <span className="text-zinc-500">// Force continuous contact for 2 seconds.</span></div>
            <div>    <span className="text-orange-500">PlaceInContact</span>(player, enemy);</div>
            <div>    <span className="text-pink-400">yield return new</span> <span className="text-orange-500">WaitForSeconds</span>(<span className="text-purple-400">2f</span>);</div>
            <br />
            <div>    <span className="text-zinc-500">// With a 0.5s cooldown, expect at most ~4 hits, not one-per-frame.</span></div>
            <div>    <span className="text-orange-500">Assert</span>.<span className="text-orange-500">LessOrEqual</span>(player.HitCount, <span className="text-purple-400">4</span>, </div>
            <div>        <span className="text-green-400">"PLAYER_HIT fired too often — damage cooldown not respected."</span>);</div>
            <div>    <span className="text-orange-500">Assert</span>.<span className="text-orange-500">Greater</span>(player.Health, <span className="text-purple-400">0</span>, </div>
            <div>        <span className="text-green-400">"Player died from rapid repeated damage (regression)."</span>);</div>
            <div>{'}'}</div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pb-4">
        <p className="text-xs text-zinc-600 font-medium tracking-wide">
          Generated from {events.length} events · This is an AI generated summary for demonstration.
        </p>
      </div>

    </div>
  );
}
