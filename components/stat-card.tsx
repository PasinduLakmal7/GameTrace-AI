import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  iconColorClass?: string;
  className?: string;
}

export function StatCard({ title, value, description, icon, iconColorClass = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", className }: StatCardProps) {
  return (
    <div className={cn("bg-[#0b0e14] border border-zinc-800/60 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px]", className)}>
      <div className="flex justify-between items-start">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{title}</h3>
        <div className={cn("p-1.5 rounded-lg border", iconColorClass)}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-white tracking-tight leading-none">{value}</div>
        {description && (
          <div className="mt-2 text-xs font-medium text-zinc-500">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
