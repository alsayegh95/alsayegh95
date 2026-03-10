import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";

interface DayUsage {
  day: string;
  date: string;
  opus: number;
  codex: number;
}

async function fetchTokens(): Promise<DayUsage[]> {
  const res = await fetch("/api/tokens/7d");
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

function fmtK(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid hsl(40, 15%, 88%)",
  borderRadius: 12,
  fontSize: 12,
  color: "#1a1a1a",
};

export function TokenUsageChart() {
  const { data } = useQuery({
    queryKey: ["tokenUsage7d"],
    queryFn: fetchTokens,
    refetchInterval: 30000,
  });

  const usage = data || [];
  const totalOpus = usage.reduce((s, d) => s + d.opus, 0);
  const totalCodex = usage.reduce((s, d) => s + d.codex, 0);

  return (
    <div className="rounded-2xl border border-border bg-white p-5 h-full shadow-sm card-hover">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">Token Usage (7d)</h2>
        <span className="text-xs font-mono text-muted-foreground">{fmtK(totalOpus + totalCodex)} total</span>
      </div>

      {/* Opus */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
          <span className="text-[11px] font-medium text-amber-600">Opus</span>
          <span className="text-[10px] font-mono text-muted-foreground ml-auto">{fmtK(totalOpus)}</span>
        </div>
        <div className="h-[72px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usage}>
              <defs>
                <linearGradient id="opusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "hsl(0, 0%, 45%)", fontSize: 10 }} axisLine={false} tickLine={false} height={16} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#1a1a1a" }} formatter={(v: number) => [fmtK(v) + " tokens", "Opus"]} />
              <Area type="monotone" dataKey="opus" stroke="#f59e0b" fill="url(#opusGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Codex */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-yellow-500 inline-block" />
          <span className="text-[11px] font-medium text-yellow-600">Codex</span>
          <span className="text-[10px] font-mono text-muted-foreground ml-auto">{fmtK(totalCodex)}</span>
        </div>
        <div className="h-[72px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usage}>
              <defs>
                <linearGradient id="codexGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "hsl(0, 0%, 45%)", fontSize: 10 }} axisLine={false} tickLine={false} height={16} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#1a1a1a" }} formatter={(v: number) => [fmtK(v) + " tokens", "Codex"]} />
              <Area type="monotone" dataKey="codex" stroke="#eab308" fill="url(#codexGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
