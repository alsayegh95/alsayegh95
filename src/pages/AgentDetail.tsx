import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Cpu, FileText, Wrench, Brain, Radio, CalendarClock, LayoutDashboard, Activity, CheckCircle2, XCircle, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface RunEntry {
  ts: number;
  jobId: string;
  jobName: string;
  agentId: string | null;
  status: string;
  summary: string;
  durationMs: number;
  model: string;
  delivered: boolean;
}

interface CronJob {
  id: string;
  name: string;
  agentId: string;
  enabled: boolean;
  schedule: { kind: string; expr: string; tz: string };
  state?: {
    nextRunAtMs?: number;
    lastRunAtMs?: number;
    lastRunStatus?: string;
    lastDurationMs?: number;
    consecutiveErrors?: number;
    lastDelivered?: boolean;
  };
}

const agentInfo: Record<string, {
  name: string;
  emoji: string;
  model: string;
  description: string;
  workspace: string;
  files: string[];
  tools: string[];
  skills: string[];
  channels: { name: string; connected: boolean }[];
}> = {
  main: {
    name: "Claw",
    emoji: "🧠",
    model: "claude-opus-4-6",
    description: "CEO — Master Orchestrator. Coordinates all sub-agents, monitors fleet health, reports status to Abdullah.",
    workspace: "C:\\Users\\mrhea\\Usersmrhea.openclawworkspace",
    files: ["AGENTS.md", "SOUL.md", "USER.md", "MEMORY.md", "TOOLS.md", "IDENTITY.md", "HEARTBEAT.md", "BOOTSTRAP.md"],
    tools: ["exec", "browser", "read", "write", "edit", "web_search", "web_fetch", "message", "memory_search", "memory_get", "image", "tts", "sessions_spawn", "subagents"],
    skills: ["clawhub", "coding-agent", "healthcheck", "mcporter", "openai-image-gen", "openai-whisper-api", "skill-creator", "weather"],
    channels: [{ name: "Telegram (default)", connected: true }, { name: "Webchat", connected: true }],
  },
  khalid: {
    name: "Khalid",
    emoji: "📋",
    model: "gpt-5.3-codex",
    description: "Job application executor — applies to jobs from Job_Application.xlsx on behalf of Abdullah.",
    workspace: "C:\\Users\\mrhea\\Agents\\khalid",
    files: ["AGENTS.md", "SOUL.md", "MEMORY.md", "TOOLS.md", "IDENTITY.md", "HEARTBEAT.md", "Job Application.xlsx", "alsayegh_CV2.pdf"],
    tools: ["exec", "browser", "read", "write", "edit", "web_search", "web_fetch", "message", "memory_search", "memory_get"],
    skills: ["playwright-mcp"],
    channels: [{ name: "Telegram (default)", connected: true }],
  },
  sarah: {
    name: "Sarah",
    emoji: "☀️",
    model: "gpt-5.3-codex",
    description: "Daily intelligence briefing — weather, stocks, AI news, credit card updates every morning at 8:30 AM.",
    workspace: "C:\\Users\\mrhea\\Agents\\sarah",
    files: ["AGENTS.md", "SOUL.md", "IDENTITY.md", "HEARTBEAT.md", "daily_briefing.py", "requirements.txt"],
    tools: ["exec", "read", "write", "message", "web_fetch"],
    skills: ["weather"],
    channels: [{ name: "Telegram (sarah)", connected: true }],
  },
  "yazed-jr": {
    name: "Yazed JR",
    emoji: "🏡",
    model: "gpt-5.3-codex",
    description: "Villa finder — searches Aqar.fm daily for villas in Riyadh. Budget: 700K–1.2M SAR, 4+ BR.",
    workspace: "C:\\Users\\mrhea\\Agents\\yazed-jr",
    files: ["AGENTS.md", "SOUL.md", "IDENTITY.md", "HEARTBEAT.md", "MEMORY.md", "WORKFLOW.md", "today_top3.json", "today_run_summary.json"],
    tools: ["exec", "browser", "read", "write", "web_search", "web_fetch", "message"],
    skills: [],
    channels: [{ name: "Telegram (yazed-jr)", connected: true }],
  },
  "mohammed-jr": {
    name: "Mohammed JR",
    emoji: "🏢",
    model: "gpt-5.3-codex",
    description: "Furnished apartment finder — searches Aqar.fm daily for furnished 1BR apartments in North Riyadh. Budget: 1,500–4,000 SAR/month.",
    workspace: "C:\\Users\\mrhea\\Agents\\mohammed-jr",
    files: ["AGENTS.md", "SOUL.md", "IDENTITY.md", "HEARTBEAT.md", "MEMORY.md", "search_params.json", "sent_history.json", "run_log.json"],
    tools: ["exec", "browser", "read", "write", "web_search", "web_fetch", "message"],
    skills: [],
    channels: [{ name: "Telegram (mohammed-jr)", connected: true }],
  },
  rima: {
    name: "Rima",
    emoji: "🩺",
    model: "gpt-5.3-codex",
    description: "Health monitoring nurse — weight tracking, supplement adherence, Mounjaro injection reminders, weekly health reports.",
    workspace: "C:\\Users\\mrhea\\Agents\\Rima",
    files: ["AGENT.md", "AGENTS.md", "SOUL.md", "IDENTITY.md", "USER.md", "TOOLS.md", "MEMORY.md", "HEARTBEAT.md", "BOOTSTRAP.md"],
    tools: ["exec", "read", "write", "message", "memory_search", "memory_get"],
    skills: [],
    channels: [{ name: "Telegram (rima)", connected: true }],
  },
};

async function fetchAgentActivity(agentId: string): Promise<RunEntry[]> {
  const res = await fetch(`/api/activity/agent/${agentId}`);
  if (!res.ok) return [];
  return res.json();
}

async function fetchCronJobs(): Promise<CronJob[]> {
  const res = await fetch("/api/cron/jobs");
  if (!res.ok) return [];
  return res.json();
}

function formatTimeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatDuration(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function formatDateTime(ts: number) {
  return new Date(ts).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
  });
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function StatCard({ label, value, color, small }: { label: string; value: string; color: string; small?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={cn(small ? "text-sm" : "text-lg font-bold", color)}>{value}</div>
    </div>
  );
}

export default function AgentDetail() {
  const { agentId } = useParams<{ agentId: string }>();
  const meta = agentId ? agentInfo[agentId] : undefined;
  const [expandedRun, setExpandedRun] = useState<number | null>(null);

  const { data: activity } = useQuery({
    queryKey: ["agentActivity", agentId],
    queryFn: () => fetchAgentActivity(agentId || ""),
    enabled: !!agentId,
    refetchInterval: 30000,
  });

  const { data: cronJobs } = useQuery({
    queryKey: ["agentCron"],
    queryFn: fetchCronJobs,
    refetchInterval: 30000,
  });

  const agentCronJobs = cronJobs?.filter((j) => j.agentId === agentId) || [];
  const runs = activity || [];

  if (!meta) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <h1 className="text-2xl font-bold text-foreground">Agent not found</h1>
          <Link to="/agents" className="text-primary hover:underline">Back to Agents</Link>
        </div>
      </DashboardLayout>
    );
  }

  const lastRun = runs.length > 0 ? runs[0] : null;

  return (
    <DashboardLayout>
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[1100px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/agents" className="rounded-lg p-2 hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <span className="text-3xl">{meta.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{meta.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">{agentId}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Cpu className="h-4 w-4" /> {meta.model}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{meta.description}</p>

        {/* Tabs */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="w-full justify-start bg-muted/50 border border-border rounded-lg p-1 gap-1">
            <TabsTrigger value="activity" className="gap-1.5 text-xs"><Activity className="h-3.5 w-3.5" />Activity</TabsTrigger>
            <TabsTrigger value="overview" className="gap-1.5 text-xs"><LayoutDashboard className="h-3.5 w-3.5" />Overview</TabsTrigger>
            <TabsTrigger value="files" className="gap-1.5 text-xs"><FileText className="h-3.5 w-3.5" />Files</TabsTrigger>
            <TabsTrigger value="tools" className="gap-1.5 text-xs"><Wrench className="h-3.5 w-3.5" />Tools</TabsTrigger>
            <TabsTrigger value="skills" className="gap-1.5 text-xs"><Brain className="h-3.5 w-3.5" />Skills</TabsTrigger>
            <TabsTrigger value="channels" className="gap-1.5 text-xs"><Radio className="h-3.5 w-3.5" />Channels</TabsTrigger>
            <TabsTrigger value="cron" className="gap-1.5 text-xs"><CalendarClock className="h-3.5 w-3.5" />Cron</TabsTrigger>
          </TabsList>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-4 space-y-3">
            {runs.length === 0 && (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-sm text-muted-foreground">No activity recorded yet</p>
              </div>
            )}
            {runs.map((run, i) => {
              const isOk = run.status === "ok";
              const isExpanded = expandedRun === i;
              return (
                <motion.div
                  key={`${run.jobId}-${run.ts}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setExpandedRun(isExpanded ? null : i)}
                  className={cn(
                    "rounded-lg border bg-card cursor-pointer transition-all duration-200 hover:border-primary/30",
                    isExpanded ? "border-primary/50 ring-1 ring-primary/20" : "border-border"
                  )}
                >
                  {/* Run header */}
                  <div className="flex items-center gap-3 p-4">
                    {isOk
                      ? <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      : <XCircle className="h-4 w-4 text-destructive shrink-0" />
                    }
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-foreground">{run.jobName}</span>
                        {run.delivered && (
                          <span className="text-success flex items-center gap-0.5 text-[10px]">
                            <Truck className="h-2.5 w-2.5" />delivered
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{formatDateTime(run.ts)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{formatDuration(run.durationMs)}</span>
                        <span>{formatTimeAgo(run.ts)}</span>
                        {run.model && <span className="font-mono">{run.model}</span>}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{isExpanded ? "▲" : "▼"}</span>
                  </div>

                  {/* Expanded summary */}
                  {isExpanded && (
                    <div className="border-t border-border px-4 py-3 bg-muted/20">
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Output / Summary</p>
                      <pre className="text-xs text-foreground whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto font-sans">
                        {run.summary || "No summary available"}
                      </pre>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                label="Last Run"
                value={lastRun ? formatTimeAgo(lastRun.ts) : "No runs"}
                color={lastRun?.status === "ok" ? "text-success" : "text-muted-foreground"}
              />
              <StatCard
                label="Last Status"
                value={lastRun ? lastRun.status.toUpperCase() : "—"}
                color={lastRun?.status === "ok" ? "text-success" : "text-destructive"}
              />
              <StatCard
                label="Last Duration"
                value={lastRun ? formatDuration(lastRun.durationMs) : "—"}
                color="text-primary"
              />
            </div>
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <div className="text-xs text-muted-foreground mb-1">Workspace</div>
              <code className="text-sm text-foreground font-mono">{meta.workspace}</code>
            </div>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="mt-4">
            <div className="rounded-lg border border-border bg-card divide-y divide-border">
              {meta.files.map((f) => (
                <div key={f} className="flex items-center gap-3 px-4 py-3">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-mono text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="mt-4">
            <div className="flex flex-wrap gap-2">
              {meta.tools.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs font-mono text-foreground border border-border">
                  <Wrench className="h-3 w-3 text-muted-foreground" />{t}
                </span>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-4">
            <div className="flex flex-wrap gap-2">
              {meta.skills.length ? meta.skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary border border-primary/20">
                  <Brain className="h-3 w-3" />{s}
                </span>
              )) : <div className="text-sm text-muted-foreground">No skills installed</div>}
            </div>
          </TabsContent>

          {/* Channels Tab */}
          <TabsContent value="channels" className="mt-4">
            <div className="rounded-lg border border-border bg-card divide-y divide-border">
              {meta.channels.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Radio className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{ch.name}</span>
                  </div>
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", ch.connected ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                    {ch.connected ? "Connected" : "Disconnected"}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Cron Tab */}
          <TabsContent value="cron" className="mt-4">
            <div className="rounded-lg border border-border bg-card divide-y divide-border">
              {agentCronJobs.length ? agentCronJobs.map((job) => (
                <div key={job.id} className="px-4 py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{job.name}</span>
                    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", job.enabled ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                      {job.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-mono">{job.schedule.expr}</span>
                    <span>{job.schedule.tz}</span>
                  </div>
                  {job.state && (
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      {job.state.lastRunAtMs && (
                        <span>Last run: {formatTimeAgo(job.state.lastRunAtMs)}
                          <span className={cn("ml-1", job.state.lastRunStatus === "ok" ? "text-success" : "text-destructive")}>
                            ({job.state.lastRunStatus})
                          </span>
                        </span>
                      )}
                      {job.state.lastDurationMs && (
                        <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{formatDuration(job.state.lastDurationMs)}</span>
                      )}
                      {job.state.nextRunAtMs && (
                        <span>Next: {new Date(job.state.nextRunAtMs).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, month: "short", day: "numeric" })}</span>
                      )}
                      {job.state.lastDelivered && <span className="text-success">✓ delivered</span>}
                    </div>
                  )}
                </div>
              )) : (
                <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                  {agentId === "khalid" ? "On-demand — no scheduled jobs" : "No cron jobs assigned"}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
}
