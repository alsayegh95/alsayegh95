import { DashboardLayout } from "@/components/DashboardLayout";
import { mockCronJobs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, i) => i * 2);

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Calendar</h1>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">Week</button>
            <button className="px-3 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground">Month</button>
          </div>
        </div>

        {/* Cron Jobs List */}
        <div className="rounded-xl border border-border bg-card p-5 card-hover">
          <h2 className="text-sm font-semibold text-foreground mb-4">Scheduled Jobs</h2>
          <div className="space-y-2">
            {mockCronJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-3 card-hover"
              >
                <div className={cn(
                  "h-2.5 w-2.5 rounded-full shrink-0",
                  job.enabled
                    ? job.lastStatus === "success" ? "bg-success" : "bg-destructive"
                    : "bg-muted-foreground"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{job.name}</p>
                  <p className="text-xs text-muted-foreground">{job.description}</p>
                </div>
                <code className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {job.expr}
                </code>
                <span className="text-[10px] text-muted-foreground shrink-0">{job.tz}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px]",
                    job.enabled ? "border-success/30 text-success" : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {job.enabled ? "Active" : "Paused"}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekly Grid */}
        <div className="rounded-xl border border-border bg-card p-5 card-hover overflow-x-auto">
          <h2 className="text-sm font-semibold text-foreground mb-4">Weekly View</h2>
          <div className="grid grid-cols-8 gap-px min-w-[600px]">
            <div />
            {days.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground pb-2">{d}</div>
            ))}
            {hours.map((h) => (
              <>
                <div key={`h-${h}`} className="text-[10px] font-mono text-muted-foreground text-right pr-2 py-2">
                  {h.toString().padStart(2, "0")}:00
                </div>
                {days.map((d) => (
                  <div key={`${d}-${h}`} className="border border-border/30 rounded-sm h-8 hover:bg-muted/20 transition-colors" />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
