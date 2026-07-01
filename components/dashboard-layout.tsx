import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-zinc-50 font-sans selection:bg-cyan-500/30">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-x-hidden bg-[#131821]">
        <Topbar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
