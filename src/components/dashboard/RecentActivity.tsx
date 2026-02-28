import { cn } from "@/lib/utils";
import { mockActivity } from "@/lib/mock-data";
import { Link } from "react-router-dom";

const typeColors = {
  tool: "bg-primary",
  assistant: "bg-secondary",
  user: "bg-success",
  system: "bg-warning",
};

function formatTimeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full card-hover">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
        <Link to="/feed" className="text-xs text-primary hover:underline">View all</Link>
      </div>
      <div className="space-y-3">
        {mockActivity.slice(0, 6).map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", typeColors[item.type])} />
            <div className="min-w-0">
              <p className="text-sm text-foreground truncate">{item.description}</p>
              <p className="text-[10px] text-muted-foreground">
                {item.agent} · {formatTimeAgo(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
