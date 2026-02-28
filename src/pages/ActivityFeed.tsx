import { DashboardLayout } from "@/components/DashboardLayout";
import { mockActivity } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Bot, User, Settings, X } from "lucide-react";

const typeConfig = {
  tool: { color: "bg-primary", textColor: "text-primary", icon: Wrench, label: "Tool" },
  assistant: { color: "bg-secondary", textColor: "text-secondary", icon: Bot, label: "Assistant" },
  user: { color: "bg-success", textColor: "text-success", icon: User, label: "User" },
  system: { color: "bg-warning", textColor: "text-warning", icon: Settings, label: "System" },
};

const filters = ["all", "tool", "assistant", "user", "system"] as const;

function formatTime(timestamp: number) {
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatTimeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function ActivityFeed() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === "all" ? mockActivity : mockActivity.filter((a) => a.type === filter);
  const selected = mockActivity.find((a) => a.id === selectedId);

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Activity Feed</h1>
          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors",
                  filter === f
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-1">
            {filtered.map((item, i) => {
              const cfg = typeConfig[item.type];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelectedId(item.id)}
                  className="relative flex items-start gap-4 pl-10 py-3 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <div className={cn("absolute left-3 top-4 h-3 w-3 rounded-full", cfg.color)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon className={cn("h-3.5 w-3.5", cfg.textColor)} />
                      <span className="text-xs font-medium text-muted-foreground">{cfg.label}</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{item.agent}</span>
                    </div>
                    <p className="text-sm text-foreground">{item.description}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {formatTime(item.timestamp)} · {formatTimeAgo(item.timestamp)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="fixed bottom-4 right-4 w-96 rounded-xl border border-border bg-card p-5 shadow-2xl z-50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={cn("text-sm font-semibold", typeConfig[selected.type].textColor)}>
                  {typeConfig[selected.type].label} Event
                </span>
                <button onClick={() => setSelectedId(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-foreground mb-2">{selected.description}</p>
              <p className="text-xs text-muted-foreground mb-3">{selected.details}</p>
              <div className="text-[10px] text-muted-foreground font-mono">
                {selected.agent} · {new Date(selected.timestamp).toLocaleString()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
