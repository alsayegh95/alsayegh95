import { mockTokenUsage } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function TokenUsageChart() {
  const totalCost = mockTokenUsage.reduce((sum, d) => sum + d.cost, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full card-hover">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Token Usage (7d)</h2>
        <span className="text-xs font-mono text-warning">${totalCost.toFixed(2)} total</span>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockTokenUsage}>
            <defs>
              <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 92%, 68%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 92%, 68%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "hsl(240, 20%, 10%)",
                border: "1px solid hsl(240, 15%, 20%)",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "hsl(213, 31%, 95%)" }}
              formatter={(value: number) => [`${(value / 1000).toFixed(1)}k tokens`, "Usage"]}
            />
            <Area
              type="monotone"
              dataKey="tokens"
              stroke="hsl(217, 92%, 68%)"
              fill="url(#tokenGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
