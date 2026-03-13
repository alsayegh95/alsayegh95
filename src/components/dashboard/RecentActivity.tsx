import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface RunEntry {
  ts: number;
  jobId: string;
  jobName: string;
  agentId: string | null;
  status: string;
  summary: string;
  durationMs: number;
  model: string;
  delivered: boolean;
}

const agentNames: Record<string, string> = {
  sarah: "Sarah",
  "yazed-jr": "Yazed JR",
  "mohammed-jr": "Mohammed JR",
  main: "Claw",
  khalid: "Khalid",
  rima: "Rima",
  abeer: "Abeer",
  codex: "Codex",
};

function formatTimeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatDuration(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function summaryOneLiner(summary: string): string {
  // Get first meaningful line
  const lines = summary.split("\n").filter(l => l.trim() && !l.startsWith("[WARN]"));
  const line = lines[0] || summary.split("\n")[0] || "";
  return line.length > 80 ? line.slice(0, 77) + "..." : line;
}

async function fetchActivity(): Promise<RunEntry[]> {
  const res = await fetch("/api/activity/recent");
  if (!res.ok) throw new Error("Failed to fetch activity");
  return res.json();
}

export function RecentActivity() {
  const { data: runs } = useQuery({
    queryKey: ["recentActivity"],
    queryFn: fetchActivity,
    refetchInterval: 30000,
  });

  const items = runs || [];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 h-full shadow-sm card-hover">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
        <Link to="/feed" className="text-xs text-primary hover:underline">View all</Link>
      </div>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-xs text-muted-foreground">No recent activity</p>
        )}
        {items.slice(0, 8).map((item, i) => {
          const isOk = item.status === "ok";
          const agent = item.agentId ? (agentNames[item.agentId] || item.agentId) : "Unknown";
          return (
            <div key={`${item.jobId}-${item.ts}-${i}`} className="flex items-start gap-3">
              {isOk ? (
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-success" />
              ) : (
                <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground truncate">
                  {item.jobName}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {summaryOneLiner(item.summary)}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-0.5">
                  <span>{agent}</span>
                  <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{formatDuration(item.durationMs)}</span>
                  <span>{formatTimeAgo(item.ts)}</span>
                  {item.delivered && <span className="text-success">? delivered</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
