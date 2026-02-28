import { DashboardLayout } from "@/components/DashboardLayout";
import { mockMemories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const categoryColors = {
  preference: "border-primary/30 text-primary bg-primary/5",
  fact: "border-success/30 text-success bg-success/5",
  task: "border-warning/30 text-warning bg-warning/5",
  insight: "border-secondary/30 text-secondary bg-secondary/5",
  conversation: "border-muted-foreground/30 text-muted-foreground",
};

function daysAgo(ts: number) {
  const d = Math.floor((Date.now() - ts) / 86400000);
  return d === 0 ? "Today" : `${d}d ago`;
}

export default function MemoryPage() {
  const [search, setSearch] = useState("");
  const filtered = mockMemories.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Memory</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{mockMemories.length} memories</span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search memories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted/30 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((mem, i) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-4 space-y-2 card-hover cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-foreground">{mem.title}</h3>
                <Badge variant="outline" className={cn("text-[9px] shrink-0 capitalize", categoryColors[mem.category])}>
                  {mem.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3">{mem.content}</p>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{mem.source}</span>
                <span>{daysAgo(mem.createdAt)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
