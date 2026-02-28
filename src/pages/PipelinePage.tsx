import { DashboardLayout } from "@/components/DashboardLayout";
import { mockContentPipeline } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const stages = [
  { key: "ideas", label: "💡 Ideas", color: "border-warning/30" },
  { key: "script", label: "📝 Script", color: "border-primary/30" },
  { key: "thumbnail", label: "🎨 Thumbnail", color: "border-secondary/30" },
  { key: "filming", label: "🎬 Filming", color: "border-success/30" },
  { key: "editing", label: "✂️ Editing", color: "border-primary/30" },
  { key: "publishing", label: "📤 Publishing", color: "border-warning/30" },
  { key: "published", label: "✅ Published", color: "border-success/30" },
];

const priorityColors = {
  high: "border-destructive/30 text-destructive",
  medium: "border-warning/30 text-warning",
  low: "border-muted-foreground/30 text-muted-foreground",
};

function daysAgo(ts: number) {
  return `${Math.floor((Date.now() - ts) / 86400000)}d ago`;
}

export default function PipelinePage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-foreground">Content Pipeline</h1>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const items = mockContentPipeline.filter((item) => item.stage === stage.key);
            return (
              <div key={stage.key} className="min-w-[220px] flex-shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-foreground">{stage.label}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-1.5">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn("rounded-lg border bg-card p-3 space-y-2 card-hover cursor-pointer", stage.color)}
                    >
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{item.assignedTo}</span>
                        <Badge variant="outline" className={cn("text-[9px] px-1.5", priorityColors[item.priority])}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-[9px] text-muted-foreground">{daysAgo(item.createdAt)}</p>
                    </motion.div>
                  ))}
                  {items.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                      No items
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
