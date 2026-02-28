import { cn } from "@/lib/utils";
import { mockSchedule } from "@/lib/mock-data";
import { CheckCircle2, Loader2, Circle } from "lucide-react";

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-success" },
  running: { icon: Loader2, color: "text-primary" },
  upcoming: { icon: Circle, color: "text-muted-foreground" },
};

export function TodaySchedule() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full card-hover">
      <h2 className="text-sm font-semibold text-foreground mb-4">Today's Schedule</h2>
      <div className="space-y-3">
        {mockSchedule.map((item, i) => {
          const cfg = statusConfig[item.status];
          const Icon = cfg.icon;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground w-12 shrink-0">
                {item.time}
              </span>
              <Icon className={cn("h-4 w-4 shrink-0", cfg.color, item.status === "running" && "animate-spin")} />
              <span className={cn(
                "text-sm truncate",
                item.status === "completed" ? "text-muted-foreground" : "text-foreground"
              )}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
