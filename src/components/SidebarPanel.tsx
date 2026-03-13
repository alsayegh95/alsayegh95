import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Calendar,
  Brain,
  Search,
  Users,
  Zap,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SidebarPanelProps {
  open: boolean;
}

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Agents", path: "/agents", icon: Users },
  { label: "Activity", path: "/feed", icon: Activity },
  { label: "Calendar", path: "/calendar", icon: Calendar },
  { label: "Memory", path: "/memory", icon: Brain },
  { label: "Search", path: "/search", icon: Search },
];

interface AgentTokenData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  today: number;
  week: number;
  model: string;
}

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  violet:  { border: "border-violet-500/20",  bg: "bg-violet-500/5",  text: "text-violet-300",  dot: "bg-violet-500" },
  blue:    { border: "border-blue-500/20",    bg: "bg-blue-500/5",    text: "text-blue-300",    dot: "bg-blue-500" },
  amber:   { border: "border-amber-500/20",   bg: "bg-amber-500/5",   text: "text-amber-300",   dot: "bg-amber-500" },
  rose:    { border: "border-rose-500/20",    bg: "bg-rose-500/5",    text: "text-rose-300",    dot: "bg-rose-500" },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-300", dot: "bg-emerald-500" },
  orange:  { border: "border-orange-500/20",  bg: "bg-orange-500/5",  text: "text-orange-300",  dot: "bg-orange-500" },
  cyan:    { border: "border-cyan-500/20",    bg: "bg-cyan-500/5",    text: "text-cyan-300",    dot: "bg-cyan-500" },
};

async function fetchAgentTokens(): Promise<AgentTokenData[]> {
  const res = await fetch("/api/tokens/agents");
  if (!res.ok) return [];
  return res.json();
}

function fmtK(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

export function SidebarPanel({ open }: SidebarPanelProps) {
  const location = useLocation();

  const { data: agentTokens } = useQuery({
    queryKey: ["agentTokenUsage"],
    queryFn: fetchAgentTokens,
    refetchInterval: 60000,
  });

  const agents = agentTokens || [];
  const totalWeek = agents.reduce((s, a) => s + a.week, 0);
  const totalToday = agents.reduce((s, a) => s + a.today, 0);

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 bottom-0 z-40 border-r border-border bg-sidebar overflow-y-auto transition-all duration-300",
        open ? "w-64" : "w-0"
      )}
    >
      <div className="p-4 space-y-6 min-w-[256px]">
        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Agent Token Usage */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Token Usage by Agent
          </h3>

          {agents.map((agent) => {
            const colors = colorMap[agent.color] || colorMap.violet;
            const maxWeek = agents.length > 0 ? Math.max(...agents.map(a => a.week), 1) : 1;
            const barPct = Math.max((agent.week / maxWeek) * 100, 2);

            return (
              <div
                key={agent.id}
                className={cn("rounded-lg border p-3 space-y-2", colors.border, colors.bg)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-2 w-2 rounded-full inline-block", colors.dot)} />
                    <span className="text-sm">{agent.emoji}</span>
                    <span className={cn("text-xs font-semibold", colors.text)}>{agent.name}</span>
                  </div>
                  {agent.model && (
                    <span className="text-[9px] font-mono text-muted-foreground truncate max-w-[90px]" title={agent.model}>
                      {agent.model}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={cn("text-sm font-bold font-mono", colors.text)}>{fmtK(agent.today)}</div>
                    <div className="text-[10px] text-muted-foreground">Today</div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-sm font-bold font-mono", colors.text)}>{fmtK(agent.week)}</div>
                    <div className="text-[10px] text-muted-foreground">This Week</div>
                  </div>
                </div>
                {/* Usage bar */}
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", colors.dot)}
                    style={{ width: `${barPct}%`, opacity: 0.6 }}
                  />
                </div>
              </div>
            );
          })}

          {/* Combined totals */}
          <div className="rounded-lg bg-muted/50 p-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-warning" />
              <span className="text-xs font-semibold text-muted-foreground">All Agents</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold font-mono text-foreground">{fmtK(totalToday)}</div>
                <div className="text-[10px] text-muted-foreground">Today</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono text-foreground">{fmtK(totalWeek)}</div>
                <div className="text-[10px] text-muted-foreground">This Week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
