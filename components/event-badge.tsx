import { cn } from "@/lib/utils";
import { Skull, Target, HeartPulse, Crosshair, Flag, Activity, Trophy, ShieldAlert, XCircle } from "lucide-react";

interface EventBadgeProps {
  type: string;
  className?: string;
  showIcon?: boolean;
}

export function EventBadge({ type, className, showIcon = true }: EventBadgeProps) {
  let badgeColor = "bg-zinc-800 text-zinc-300 border-zinc-700/50";
  let Icon = Activity;

  switch (type) {
    case "SESSION_START":
      badgeColor = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      Icon = Flag;
      break;
    case "POSITION":
      badgeColor = "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      Icon = Activity;
      break;
    case "PLAYER_HIT":
      badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
      Icon = HeartPulse;
      break;
    case "PLAYER_SHOOT":
      badgeColor = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      Icon = Crosshair;
      break;
    case "ENEMY_HIT":
      badgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
      Icon = Target;
      break;
    case "ENEMY_DIE":
      badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      Icon = Skull;
      break;
    case "SCORE_CHANGE":
      badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      Icon = Trophy;
      break;
    case "PLAYER_DIE":
    case "PLAYER_DEAD":
    case "GAME_OVER":
      badgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
      Icon = ShieldAlert;
      break;
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", badgeColor, className)}>
      {showIcon && <Icon className="w-3 h-3" />}
      {type}
    </span>
  );
}
