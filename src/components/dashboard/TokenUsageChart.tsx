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
  background: "hsl(240, 20%, 10%)",
  border: "1px solid hsl(240, 15%, 20%)",
  borderRadius: 12,
  fontSize: 12,
  color: "hsl(213, 31%, 95%)",
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
    <div className="rounded-xl border border-border bg-card p-5 h-full card-hover">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">Token Usage (7d)</h2>
        <span className="text-xs font-mono text-muted-foreground">{fmtK(totalOpus + totalCodex)} total</span>
      </div>

      {/* Opus */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-violet-500 inline-block" />
          <span className="text-[11px] font-medium text-violet-400">Opus</span>
          <span className="text-[10px] font-mono text-muted-foreground ml-auto">{fmtK(totalOpus)}</span>
        </div>
        <div className="h-[72px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usage}>
              <defs>
                <linearGradient id="opusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 10 }} axisLine={false} tickLine={false} height={16} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(213, 31%, 95%)" }} formatter={(v: number) => [fmtK(v) + " tokens", "Opus"]} />
              <Area type="monotone" dataKey="opus" stroke="#8b5cf6" fill="url(#opusGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Codex */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-sky-500 inline-block" />
          <span className="text-[11px] font-medium text-sky-400">Codex</span>
          <span className="text-[10px] font-mono text-muted-foreground ml-auto">{fmtK(totalCodex)}</span>
        </div>
        <div className="h-[72px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usage}>
              <defs>
                <linearGradient id="codexGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 10 }} axisLine={false} tickLine={false} height={16} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(213, 31%, 95%)" }} formatter={(v: number) => [fmtK(v) + " tokens", "Codex"]} />
              <Area type="monotone" dataKey="codex" stroke="#0ea5e9" fill="url(#codexGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
