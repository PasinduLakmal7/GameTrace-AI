import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-x-hidden bg-zinc-950">
        <Topbar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
