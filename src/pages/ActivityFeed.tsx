import { DashboardLayout } from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, X, Truck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
};

const agentFilters = ["all", "sarah", "yazed-jr", "mohammed-jr"] as const;

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDuration(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function formatTimeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

async function fetchActivity(): Promise<RunEntry[]> {
  const res = await fetch("/api/activity/recent");
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export default function ActivityFeed() {
  const [filter, setFilter] = useState<(typeof agentFilters)[number]>("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const { data: runs } = useQuery({
    queryKey: ["activityFeed"],
    queryFn: fetchActivity,
    refetchInterval: 30000,
  });

  const items = runs || [];
  const filtered = filter === "all" ? items : items.filter((r) => r.agentId === filter);
  const selected = selectedIdx !== null ? filtered[selectedIdx] : null;

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Activity Feed</h1>
          <div className="flex gap-1">
            {agentFilters.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setSelectedIdx(null); }}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors",
                  filter === f
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {f === "all" ? "All" : agentNames[f] || f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-1">
            {filtered.length === 0 && (
              <p className="pl-10 py-6 text-sm text-muted-foreground">No activity to show</p>
            )}
            {filtered.map((item, i) => {
              const isOk = item.status === "ok";
              const agent = item.agentId ? (agentNames[item.agentId] || item.agentId) : "Unknown";
              return (
                <motion.div
                  key={`${item.jobId}-${item.ts}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelectedIdx(i)}
                  className={cn(
                    "relative flex items-start gap-4 pl-10 py-3 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors",
                    selectedIdx === i && "bg-muted/40 ring-1 ring-primary/30"
                  )}
                >
                  <div className={cn("absolute left-3 top-4 h-3 w-3 rounded-full", isOk ? "bg-success" : "bg-destructive")} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {isOk ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
                      <span className="text-xs font-medium text-muted-foreground">{agent}</span>
                      <span className="text-[10px] text-muted-foreground">&middot;</span>
                      <span className="text-xs text-muted-foreground font-mono">{item.model}</span>
                    </div>
                    <p className="text-sm text-foreground">{item.jobName}</p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-0.5">
                      <span>{formatTime(item.ts)} &middot; {formatDate(item.ts)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{formatDuration(item.durationMs)}</span>
                      <span>{formatTimeAgo(item.ts)}</span>
                      {item.delivered && <span className="text-success flex items-center gap-0.5"><Truck className="h-2.5 w-2.5" />delivered</span>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel — full summary, scrollable */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="fixed bottom-4 right-4 w-[460px] max-h-[80vh] rounded-xl border border-border bg-card shadow-2xl z-50 flex flex-col"
            >
              {/* Header — sticky */}
              <div className="flex items-center justify-between p-4 pb-2 border-b border-border shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  {selected.status === "ok"
                    ? <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    : <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  }
                  <span className={cn("text-sm font-semibold truncate", selected.status === "ok" ? "text-success" : "text-destructive")}>
                    {selected.jobName}
                  </span>
                </div>
                <button onClick={() => setSelectedIdx(null)} className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted transition-colors shrink-0">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Summary — scrollable */}
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed">{selected.summary}</p>
              </div>

              {/* Footer — sticky */}
              <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground font-mono p-4 pt-2 border-t border-border shrink-0">
                <span>{agentNames[selected.agentId || ""] || selected.agentId}</span>
                <span>{selected.model}</span>
                <span>{formatDuration(selected.durationMs)}</span>
                <span>{new Date(selected.ts).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, month: "short", day: "numeric" })}</span>
                {selected.delivered && <span className="text-success">delivered</span>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
