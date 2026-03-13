import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { mockTasks } from "@/lib/mock-data";

const priorityColors = {
  high: "border-destructive/30 text-destructive",
  medium: "border-warning/30 text-warning",
  low: "border-muted-foreground/30 text-muted-foreground",
};

const columns = [
  { key: "backlog" as const, label: "Backlog" },
  { key: "in-progress" as const, label: "In Progress" },
  { key: "done" as const, label: "Done" },
];

export function ActiveTasks() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm card-hover">
      <h2 className="text-sm font-semibold text-foreground mb-4">Active Tasks</h2>
      <div className="grid grid-cols-3 gap-3">
        {columns.map((col) => (
          <div key={col.key}>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              {col.label}
            </p>
            <div className="space-y-2">
              {mockTasks
                .filter((t) => t.status === col.key)
                .map((task) => (
                  <div key={task.id} className="rounded-lg border border-border bg-muted/30 p-2.5 space-y-1.5">
                    <p className="text-xs font-medium text-foreground">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{task.agent}</span>
                      <Badge variant="outline" className={cn("text-[9px] px-1.5", priorityColors[task.priority])}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
