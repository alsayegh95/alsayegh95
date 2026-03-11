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

interface TokenDay {
  day: string;
  date: string;
  opus: number;
  codex: number;
}

async function fetchTokens(): Promise<TokenDay[]> {
  const res = await fetch("/api/tokens/7d");
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

  const { data: tokenData } = useQuery({
    queryKey: ["sidebarTokens"],
    queryFn: fetchTokens,
    refetchInterval: 60000,
  });

  const today = tokenData && tokenData.length > 0 ? tokenData[tokenData.length - 1] : null;
  const todayOpus = today?.opus ?? 0;
  const todayCodex = today?.codex ?? 0;
  const weekOpus = tokenData ? tokenData.reduce((s, d) => s + d.opus, 0) : 0;
  const weekCodex = tokenData ? tokenData.reduce((s, d) => s + d.codex, 0) : 0;

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 bottom-0 z-40 border-r border-border bg-white overflow-y-auto transition-all duration-300",
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-yellow-400/20 text-yellow-700 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-yellow-50"
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

        {/* Quick Stats */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Stats
          </h3>

          {/* Opus */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
              <span className="text-xs font-semibold text-amber-700">Opus</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold font-mono text-amber-800">{fmtK(todayOpus)}</div>
                <div className="text-[10px] text-muted-foreground">Today</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono text-amber-800">{fmtK(weekOpus)}</div>
                <div className="text-[10px] text-muted-foreground">This Week</div>
              </div>
            </div>
          </div>

          {/* Codex */}
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-yellow-500 inline-block" />
              <span className="text-xs font-semibold text-yellow-700">Codex</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold font-mono text-yellow-800">{fmtK(todayCodex)}</div>
                <div className="text-[10px] text-muted-foreground">Today</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono text-yellow-800">{fmtK(weekCodex)}</div>
                <div className="text-[10px] text-muted-foreground">This Week</div>
              </div>
            </div>
          </div>

          {/* Combined total */}
          <div className="rounded-xl bg-stone-100 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-[11px] text-muted-foreground">Total This Week</span>
            </div>
            <span className="text-sm font-bold font-mono text-foreground">{fmtK(weekOpus + weekCodex)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
