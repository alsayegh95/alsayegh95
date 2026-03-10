import { DashboardLayout } from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

interface CronJob {
  id: string;
  name: string;
  agentId?: string;
  enabled: boolean;
  schedule: { kind: string; expr: string; tz: string };
  state?: { lastRunStatus?: string; nextRunAtMs?: number; lastRunAtMs?: number };
}

const agentNames: Record<string, string> = {
  sarah: "Sarah", "yazed-jr": "Yazed JR", "mohammed-jr": "Mohammed JR", main: "Claw", khalid: "Khalid",
};

const agentColors: Record<string, string> = {
  sarah: "bg-violet-500", "yazed-jr": "bg-amber-500", "mohammed-jr": "bg-sky-500", main: "bg-emerald-500", khalid: "bg-rose-500",
};
const agentBorders: Record<string, string> = {
  sarah: "border-violet-500/40 bg-violet-500/10 text-violet-300", "yazed-jr": "border-amber-500/40 bg-amber-500/10 text-amber-300", "mohammed-jr": "border-sky-500/40 bg-sky-500/10 text-sky-300",
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, i) => i);

function fmt12(h: number) {
  if (h === 0) return "12 AM";
  if (h < 12) return h + " AM";
  if (h === 12) return "12 PM";
  return (h - 12) + " PM";
}

/** Parse a 5-field cron expr and return which hours & days it fires */
function parseCron(expr: string): { hours: number[]; days: number[] } {
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5) return { hours: [], days: [] };
  const [min, hour, , , dow] = parts;

  const parseField = (field: string, max: number): number[] => {
    if (field === "*") return Array.from({ length: max }, (_, i) => i);
    const result: number[] = [];
    for (const part of field.split(",")) {
      if (part.includes("/")) {
        const [range, step] = part.split("/");
        const s = parseInt(step);
        const start = range === "*" ? 0 : parseInt(range);
        for (let i = start; i < max; i += s) result.push(i);
      } else if (part.includes("-")) {
        const [a, b] = part.split("-").map(Number);
        for (let i = a; i <= b; i++) result.push(i);
      } else {
        result.push(parseInt(part));
      }
    }
    return result.filter((n) => !isNaN(n));
  };

  const hrs = parseField(hour, 24);
  let daysOfWeek = parseField(dow, 7);
  // cron: 0=Sun, convert to Mon=0..Sun=6
  if (dow === "*") {
    daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  } else {
    daysOfWeek = daysOfWeek.map((d) => (d === 0 ? 6 : d - 1));
  }
  return { hours: hrs, days: daysOfWeek };
}

async function fetchCronJobs(): Promise<CronJob[]> {
  const res = await fetch("/api/cron/jobs");
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export default function CalendarPage() {
  const { data: jobs } = useQuery({
    queryKey: ["cronJobsCal"],
    queryFn: fetchCronJobs,
    refetchInterval: 60000,
  });

  const cronJobs = jobs || [];

  // Build a grid lookup: key = "dayIdx-hour" -> job entries
  const grid: Record<string, { name: string; agentId: string; expr: string }[]> = {};
  for (const job of cronJobs) {
    if (!job.enabled || job.schedule.kind !== "cron") continue;
    const { hours: hrs, days: dys } = parseCron(job.schedule.expr);
    for (const d of dys) {
      for (const h of hrs) {
        const key = `${d}-${h}`;
        if (!grid[key]) grid[key] = [];
        grid[key].push({ name: job.name, agentId: job.agentId || "main", expr: job.schedule.expr });
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Calendar</h1>
        </div>

        {/* Cron Jobs List */}
        <div className="rounded-xl border border-border bg-card p-5 card-hover">
          <h2 className="text-sm font-semibold text-foreground mb-4">Scheduled Jobs</h2>
          <div className="space-y-2">
            {cronJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-3 card-hover"
              >
                <div className={cn(
                  "h-2.5 w-2.5 rounded-full shrink-0",
                  job.enabled
                    ? (job.state?.lastRunStatus === "ok" ? "bg-success" : job.state?.lastRunStatus === "error" ? "bg-destructive" : "bg-muted-foreground")
                    : "bg-muted-foreground"
                )} />
                <div className={cn("h-3 w-3 rounded-sm shrink-0", agentColors[job.agentId || "main"] || "bg-muted")} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{job.name}</p>
                  <p className="text-xs text-muted-foreground">{agentNames[job.agentId || ""] || job.agentId || "main"} &middot; {job.schedule.tz}</p>
                </div>
                <code className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {job.schedule.expr}
                </code>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px]",
                    job.enabled ? "border-success/30 text-success" : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {job.enabled ? "Active" : "Paused"}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekly Grid */}
        <div className="rounded-xl border border-border bg-card p-5 card-hover overflow-x-auto">
          <h2 className="text-sm font-semibold text-foreground mb-4">Weekly View</h2>
          <div className="grid grid-cols-8 gap-px min-w-[700px]">
            <div />
            {days.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground pb-2">{d}</div>
            ))}
            {hours.map((h) => (
              <div key={`row-${h}`} className="contents">
                <div className="text-[10px] font-mono text-muted-foreground text-right pr-2 py-1 flex items-start justify-end">
                  {fmt12(h)}
                </div>
                {days.map((_, di) => {
                  const key = `${di}-${h}`;
                  const entries = grid[key];
                  return (
                    <div
                      key={`${di}-${h}`}
                      className={cn(
                        "border border-border/20 rounded-sm min-h-[32px] p-0.5 transition-colors",
                        entries ? "bg-muted/30" : "hover:bg-muted/10"
                      )}
                    >
                      {entries?.map((e, ei) => (
                        <div
                          key={ei}
                          className={cn(
                            "text-[9px] font-medium px-1 py-0.5 rounded border mb-0.5 truncate",
                            agentBorders[e.agentId] || "border-muted bg-muted/30 text-muted-foreground"
                          )}
                          title={`${e.name} (${agentNames[e.agentId] || e.agentId})`}
                        >
                          {e.name.length > 14 ? e.name.slice(0, 12) + ".." : e.name}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
