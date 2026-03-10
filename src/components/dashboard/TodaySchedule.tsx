import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CronJob {
  id: string;
  name: string;
  agentId?: string;
  schedule: { expr: string; tz: string };
  state?: {
    lastRunAtMs?: number;
    lastRunStatus?: string;
    nextRunAtMs?: number;
  };
}

interface ScheduleItem {
  name: string;
  time: string;
  sortMs: number;
  status: "completed" | "upcoming" | "error";
}

function formatTime(ms: number, tz: string): string {
  try {
    return new Date(ms).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: tz,
    });
  } catch {
    return new Date(ms).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
}

function isSameDay(ms: number, tz: string): boolean {
  try {
    const d = new Date(ms);
    const now = new Date();
    const fmt = (dt: Date) => dt.toLocaleDateString("en-CA", { timeZone: tz });
    return fmt(d) === fmt(now);
  } catch {
    return new Date(ms).toDateString() === new Date().toDateString();
  }
}

const agentNames: Record<string, string> = {
  sarah: "Sarah",
  "yazed-jr": "Yazed JR",
  "mohammed-jr": "Mohammed JR",
  main: "Claw",
  khalid: "Khalid",
  rima: "Rima",
};

async function fetchCronJobs(): Promise<CronJob[]> {
  const res = await fetch("/api/cron/jobs");
  if (!res.ok) throw new Error("Failed to fetch cron jobs");
  return res.json();
}

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-success" },
  upcoming: { icon: Circle, color: "text-muted-foreground" },
  error: { icon: AlertCircle, color: "text-destructive" },
};

export function TodaySchedule() {
  const { data: jobs } = useQuery({
    queryKey: ["cronJobs"],
    queryFn: fetchCronJobs,
    refetchInterval: 60000,
  });

  const items: ScheduleItem[] = [];

  if (jobs) {
    for (const job of jobs) {
      const tz = job.schedule?.tz || "Asia/Riyadh";
      const agentLabel = job.agentId ? agentNames[job.agentId] || job.agentId : "";
      const label = agentLabel ? `${job.name} (${agentLabel})` : job.name;

      // If it ran today, show completed/error with actual run time
      if (job.state?.lastRunAtMs && isSameDay(job.state.lastRunAtMs, tz)) {
        items.push({
          name: label,
          time: formatTime(job.state.lastRunAtMs, tz),
          sortMs: job.state.lastRunAtMs,
          status: job.state.lastRunStatus === "ok" ? "completed" : "error",
        });
      }

      // If next run is today, show upcoming
      if (job.state?.nextRunAtMs && isSameDay(job.state.nextRunAtMs, tz)) {
        // Don't show upcoming if it already ran at this slot today
        const alreadyRan = job.state?.lastRunAtMs && isSameDay(job.state.lastRunAtMs, tz);
        if (!alreadyRan || job.state.nextRunAtMs > Date.now()) {
          items.push({
            name: label,
            time: formatTime(job.state.nextRunAtMs, tz),
            sortMs: job.state.nextRunAtMs,
            status: "upcoming",
          });
        }
      }
    }
  }

  items.sort((a, b) => a.sortMs - b.sortMs);

  return (
    <div className="rounded-2xl border border-border bg-white p-5 h-full shadow-sm card-hover">
      <h2 className="text-sm font-semibold text-foreground mb-4">Today's Schedule</h2>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-xs text-muted-foreground">No scheduled tasks today</p>
        )}
        {items.map((item, i) => {
          const cfg = statusConfig[item.status];
          const Icon = cfg.icon;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">
                {item.time}
              </span>
              <Icon className={cn("h-4 w-4 shrink-0", cfg.color)} />
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
