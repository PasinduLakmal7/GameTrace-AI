import { UnitySession } from "@/lib/mock-data";
import { Monitor, Cpu, HardDrive } from "lucide-react";

export function DeviceInfoCard({ session }: { session: UnitySession }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm h-full">
      <h3 className="text-lg font-medium text-white mb-6">Device Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400 shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">{session.deviceName} ({session.deviceModel})</p>
            <p className="text-xs text-zinc-500 mt-1">{session.operatingSystem} • {session.platform}</p>
            <p className="text-xs text-zinc-500 mt-1">Resolution: {session.screenResolution}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">{session.processorType}</p>
            <p className="text-xs text-zinc-500 mt-1">{session.processorCount} logical processors</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400 shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">{session.graphicsDeviceName}</p>
            <p className="text-xs text-zinc-500 mt-1">GPU Memory: {session.graphicsMemorySize} MB</p>
            <p className="text-xs text-zinc-500 mt-1">System RAM: {session.systemMemorySize} MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
