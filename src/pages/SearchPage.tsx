import { DashboardLayout } from "@/components/DashboardLayout";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { mockMemories, mockActivity, mockContentPipeline, mockCronJobs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();
  const memResults = q ? mockMemories.filter((m) => m.title.toLowerCase().includes(q) || m.content.toLowerCase().includes(q)) : [];
  const actResults = q ? mockActivity.filter((a) => a.description.toLowerCase().includes(q)) : [];
  const contentResults = q ? mockContentPipeline.filter((c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) : [];
  const cronResults = q ? mockCronJobs.filter((j) => j.name.toLowerCase().includes(q)) : [];
  const totalResults = memResults.length + actResults.length + contentResults.length + cronResults.length;

  return (
    <DashboardLayout>
      <div className="max-w-[800px] mx-auto space-y-6">
        <h1 className="text-xl font-bold text-foreground">Search</h1>

        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            autoFocus
            placeholder="Search across memories, activity, content, tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted/30 pl-12 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        {q && (
          <p className="text-xs text-muted-foreground">{totalResults} results found</p>
        )}

        {memResults.length > 0 && (
          <Section title="Memories" count={memResults.length}>
            {memResults.map((m, i) => (
              <ResultItem key={m.id} index={i} title={m.title} snippet={m.content} meta={m.source} />
            ))}
          </Section>
        )}

        {actResults.length > 0 && (
          <Section title="Activity" count={actResults.length}>
            {actResults.map((a, i) => (
              <ResultItem key={a.id} index={i} title={a.description} snippet={a.details} meta={a.agent} />
            ))}
          </Section>
        )}

        {contentResults.length > 0 && (
          <Section title="Content" count={contentResults.length}>
            {contentResults.map((c, i) => (
              <ResultItem key={c.id} index={i} title={c.title} snippet={c.description} meta={c.stage} />
            ))}
          </Section>
        )}

        {cronResults.length > 0 && (
          <Section title="Scheduled Jobs" count={cronResults.length}>
            {cronResults.map((j, i) => (
              <ResultItem key={j.id} index={i} title={j.name} snippet={j.description} meta={j.expr} />
            ))}
          </Section>
        )}

        {q && totalResults === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No results found for "{query}"
          </div>
        )}

        {!q && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Start typing to search across all agent data
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-1.5">{count}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ResultItem({ title, snippet, meta, index }: { title: string; snippet: string; meta: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="rounded-lg border border-border bg-card p-3 card-hover cursor-pointer"
    >
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{snippet}</p>
      <p className="text-[10px] text-muted-foreground mt-1 font-mono">{meta}</p>
    </motion.div>
  );
}
