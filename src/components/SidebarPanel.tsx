import { cn } from "@/lib/utils";
import { mockAgents } from "@/lib/mock-data";
import { Cpu, Zap, Clock } from "lucide-react";

interface SidebarPanelProps {
  open: boolean;
}

function formatTimeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

export function SidebarPanel({ open }: SidebarPanelProps) {
  const activeSessions = mockAgents.filter((a) => a.status === "active").length;
  const totalTokens = mockAgents.reduce((sum, a) => sum + a.tokenCount, 0);

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 bottom-0 z-40 border-r border-border bg-sidebar overflow-y-auto transition-all duration-300",
        open ? "w-64" : "w-0"
      )}
    >
      <div className="p-4 space-y-6 min-w-[256px]">
        {/* Quick Stats */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="text-lg font-bold text-foreground">{activeSessions}</div>
              <div className="text-[10px] text-muted-foreground">Active Sessions</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="text-lg font-bold text-foreground">7</div>
              <div className="text-[10px] text-muted-foreground">Tasks Today</div>
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-warning" />
            <div>
              <div className="text-sm font-bold text-foreground">
                {(totalTokens / 1000).toFixed(1)}k
              </div>
              <div className="text-[10px] text-muted-foreground">Tokens Used Today</div>
            </div>
          </div>
        </div>

        {/* Sub-Agents */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sub-Agents
          </h3>
          <div className="space-y-2">
            {mockAgents.map((agent) => {
              const isAlive = Date.now() - agent.lastHeartbeat < 120000;
              return (
                <div
                  key={agent.id}
                  className="rounded-lg border border-border bg-card p-3 space-y-1.5 card-hover"
                >
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      isAlive ? "bg-success" : "bg-muted-foreground"
                    )} />
                    <span className="text-sm font-medium text-foreground truncate">
                      {agent.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Cpu className="h-3 w-3" />
                    {agent.model}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(agent.lastHeartbeat)}
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {agent.currentTask}
                  </p>
                  <div className="text-[10px] font-mono text-primary">
                    {(agent.tokenCount / 1000).toFixed(1)}k tokens
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
