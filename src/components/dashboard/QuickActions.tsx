import { Button } from "@/components/ui/button";
import { Plus, FileText, Brain, ScrollText, Clock, Terminal } from "lucide-react";

const actions = [
  { label: "New Task", icon: Plus },
  { label: "Run Report", icon: FileText },
  { label: "Search Memories", icon: Brain },
  { label: "View Logs", icon: ScrollText },
  { label: "Trigger Cron", icon: Clock },
  { label: "Terminal", icon: Terminal },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 card-hover">
      <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto py-4 flex-col gap-2 border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
          >
            <action.icon className="h-5 w-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
