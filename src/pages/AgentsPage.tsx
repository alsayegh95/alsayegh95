import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

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
    consecutiveErrors?: number;
    runCount?: number;
  };
}

const agents = [
  {
    id: "main",
    name: "Claw",
    emoji: "🧠",
    role: "CEO — Master Orchestrator",
    model: "claude-opus-4-6",
    location: "CEO CORNER",
    isCeo: true,
    description: "Central command agent. Orchestrates all sub-agents, monitors fleet health, reports status.",
    schedule: "On-demand + 9AM / 10PM check-ins",
    channels: ["Telegram (default)", "Webchat"],
  },
  {
    id: "khalid",
    name: "Khalid",
    emoji: "📋",
    role: "Job Application Agent",
    model: "gpt-5.3-codex",
    location: "JOB BAY",
    isCeo: false,
    description: "Applies to jobs from Job_Application.xlsx. Uses Playwright for browser automation.",
    schedule: "On-demand",
    channels: ["Telegram (default)"],
  },
  {
    id: "sarah",
    name: "Sarah",
    emoji: "☀️",
    role: "Daily Intelligence Briefing",
    model: "gpt-5.3-codex",
    location: "INTEL DESK",
    isCeo: false,
    description: "Delivers morning briefing — weather, stocks, AI news, credit card updates.",
    schedule: "Daily 8:30 AM",
    channels: ["Telegram (sarah)"],
  },
  {
    id: "yazed-jr",
    name: "Yazed JR",
    emoji: "🏡",
    role: "Villa Finder",
    model: "gpt-5.3-codex",
    location: "RECON POST",
    isCeo: false,
    description: "Searches Aqar.fm for villas in Riyadh. Budget: 700K–1.2M SAR, 4+ BR.",
    schedule: "Daily 4:00 PM",
    channels: ["Telegram (yazed-jr)"],
  },
  {
    id: "mohammed-jr",
    name: "Mohammed JR",
    emoji: "🏢",
    role: "Apartment Finder",
    model: "gpt-5.3-codex",
    location: "APARTMENT OPS",
    isCeo: false,
    description: "Searches Aqar.fm for furnished apartments. Budget: 1,500–4,000 SAR/month, 1 BR.",
    schedule: "Daily 5:30 PM",
    channels: ["Telegram (mohammed-jr)"],
  },
  {
    id: "rima",
    name: "Rima",
    emoji: "🩺",
    role: "Health Monitoring Nurse",
    model: "gpt-5.3-codex",
    location: "HEALTH WARD",
    isCeo: false,
    description: "Health monitoring — weight tracking, supplement adherence, Mounjaro injection reminders, weekly health reports.",
    schedule: "Daily 8AM / 8PM + Sunday reminders",
    channels: ["Telegram (rima)"],
  },
];

async function fetchCronJobs(): Promise<CronJob[]> {
  const res = await fetch("/api/cron/jobs");
  if (!res.ok) return [];
  return res.json();
}

function formatTimeAgo(ms: number) {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function getActivityCount(cronJobs: CronJob[] | undefined, agentId: string): number {
  if (!cronJobs) return 0;
  const agentJobs = cronJobs.filter((j) => j.agentId === agentId);
  return agentJobs.reduce((sum, j) => sum + (j.state?.runCount ?? (j.state?.lastRunAtMs ? 1 : 0)), 0);
}

function getLatestActivity(cronJobs: CronJob[] | undefined): { agentName: string; time: string; status: string } | null {
  if (!cronJobs || cronJobs.length === 0) return null;
  let latest: CronJob | null = null;
  for (const j of cronJobs) {
    if (j.state?.lastRunAtMs) {
      if (!latest || (j.state.lastRunAtMs > (latest.state?.lastRunAtMs ?? 0))) {
        latest = j;
      }
    }
  }
  if (!latest || !latest.state?.lastRunAtMs) return null;
  const agent = agents.find((a) => a.id === latest!.agentId);
  return {
    agentName: agent?.name ?? latest.agentId,
    time: formatTimeAgo(latest.state.lastRunAtMs),
    status: latest.state.lastRunStatus ?? "unknown",
  };
}

function getLastRunInfo(cronJobs: CronJob[] | undefined, agentId: string) {
  if (!cronJobs) return null;
  const agentJobs = cronJobs.filter((j) => j.agentId === agentId && j.state?.lastRunAtMs);
  if (agentJobs.length === 0) return null;
  const latest = agentJobs.reduce((a, b) =>
    (b.state?.lastRunAtMs ?? 0) > (a.state?.lastRunAtMs ?? 0) ? b : a
  );
  return {
    time: formatTimeAgo(latest.state!.lastRunAtMs!),
    status: latest.state?.lastRunStatus ?? "unknown",
  };
}

function getNextRunInfo(cronJobs: CronJob[] | undefined, agentId: string) {
  if (!cronJobs) return null;
  const agentJobs = cronJobs.filter((j) => j.agentId === agentId && j.enabled && j.state?.nextRunAtMs);
  if (agentJobs.length === 0) return null;
  const next = agentJobs.reduce((a, b) =>
    (a.state?.nextRunAtMs ?? Infinity) < (b.state?.nextRunAtMs ?? Infinity) ? a : b
  );
  const diff = (next.state!.nextRunAtMs! - Date.now());
  if (diff < 0) return null;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `in ${mins}m`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hours < 24) return `in ${hours}h ${remMins}m`;
  return `in ${Math.floor(hours / 24)}d`;
}

function InfoRow({ icon, children, className }: { icon: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-[10px] text-gray-400 leading-tight", className)}>
      <span className="text-[10px] w-3 text-center shrink-0 opacity-60">{icon}</span>
      <span className="truncate">{children}</span>
    </div>
  );
}

function AgentCard({
  agent,
  activityCount,
  hasErrors,
  index,
  cronJobs,
}: {
  agent: (typeof agents)[0];
  activityCount: number;
  hasErrors: boolean;
  index: number;
  cronJobs: CronJob[] | undefined;
}) {
  const isCeo = agent.isCeo;
  const glowClass = hasErrors
    ? "border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
    : "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]";

  const lastRun = getLastRunInfo(cronJobs, agent.id);
  const nextRun = getNextRunInfo(cronJobs, agent.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
    >
      <Link to={`/agent/${agent.id}`} className="block w-full group">
        <div
          className={cn(
            "relative rounded-xl border bg-[#141414] transition-all duration-300 h-full",
            "hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]",
            glowClass,
            isCeo ? "p-4" : "px-3 py-3"
          )}
        >
          {/* Activity count badge */}
          {activityCount > 0 && (
            <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-black text-[9px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-0.5 font-mono z-10">
              {activityCount}
            </div>
          )}

          {/* Header: emoji + name/role + status dot */}
          <div className={cn("flex items-start gap-2", isCeo ? "mb-2.5" : "mb-1.5")}>
            <span className={cn(isCeo ? "text-3xl" : "text-2xl", "drop-shadow-lg shrink-0")}>
              {agent.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={cn("font-bold text-gray-100 truncate", isCeo ? "text-sm" : "text-xs")}>
                  {agent.name}
                </span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full shrink-0",
                    hasErrors
                      ? "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]"
                      : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                  )}
                />
              </div>
              <p className={cn("text-gray-500 truncate", isCeo ? "text-[10px]" : "text-[9px]")}>{agent.role}</p>
            </div>
          </div>

          {/* Description */}
          <p className={cn("text-gray-400 leading-snug mb-2 line-clamp-2", isCeo ? "text-[11px]" : "text-[10px]")}>
            {agent.description}
          </p>

          {/* Info rows */}
          <div className={cn("space-y-1 border-t border-white/5", isCeo ? "pt-2.5" : "pt-2")}>
            <InfoRow icon="⚙">
              <span className="font-mono text-[9px] text-cyan-400/80">{agent.model}</span>
            </InfoRow>
            <InfoRow icon="📅">{agent.schedule}</InfoRow>
            {lastRun && (
              <InfoRow icon="⏱">
                {lastRun.time}{" "}
                <span
                  className={cn(
                    "font-mono text-[9px]",
                    lastRun.status === "ok" || lastRun.status === "success"
                      ? "text-emerald-400"
                      : lastRun.status === "error"
                      ? "text-red-400"
                      : "text-gray-500"
                  )}
                >
                  ({lastRun.status})
                </span>
              </InfoRow>
            )}
            {nextRun && (
              <InfoRow icon="→">{nextRun}</InfoRow>
            )}
            <InfoRow icon="📡">
              {agent.channels.join(", ")}
            </InfoRow>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AgentsPage() {
  const { data: cronJobs } = useQuery({
    queryKey: ["agentsCron"],
    queryFn: fetchCronJobs,
    refetchInterval: 30000,
  });

  const ceoAgent = agents.find((a) => a.isCeo)!;
  const subAgents = agents.filter((a) => !a.isCeo);

  function hasAgentErrors(agentId: string): boolean {
    if (!cronJobs) return false;
    return cronJobs.some(
      (j) => j.agentId === agentId && (j.state?.consecutiveErrors ?? 0) > 0
    );
  }

  const latestActivity = getLatestActivity(cronJobs);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0a0a0a] -m-6 p-6 md:p-8 lg:p-10">
        <div className="max-w-[1300px] mx-auto space-y-8">
          {/* Top Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#141414] border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-gray-300 uppercase">
                🦞 Claw HQ · Agent Floor 🦞
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
            </div>
          </motion.div>

          {/* Agent count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="flex justify-end"
          >
            <span className="text-xs font-mono text-emerald-500/60 tracking-wide">
              {agents.length} agents registered
            </span>
          </motion.div>

          {/* CEO Card — centered, wider */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <AgentCard
                agent={ceoAgent}
                activityCount={getActivityCount(cronJobs, ceoAgent.id)}
                hasErrors={hasAgentErrors(ceoAgent.id)}
                index={0}
                cronJobs={cronJobs}
              />
            </div>
          </div>

          {/* Connector line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex justify-center"
          >
            <div className="w-px h-8 bg-gradient-to-b from-emerald-500/30 to-transparent" />
          </motion.div>

          {/* Sub-agent Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {subAgents.map((agent, i) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                activityCount={getActivityCount(cronJobs, agent.id)}
                hasErrors={hasAgentErrors(agent.id)}
                index={i + 1}
                cronJobs={cronJobs}
              />
            ))}
          </div>

          {/* Bottom Activity Feed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-6"
          >
            <div className="flex items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-[#111111] border border-white/5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
              <span className="text-[10px] font-mono text-gray-500 tracking-wide">
                {latestActivity
                  ? `LAST ACTIVITY: ${latestActivity.agentName.toUpperCase()} — ${latestActivity.status.toUpperCase()} — ${latestActivity.time}`
                  : "SYSTEM IDLE — AWAITING ACTIVITY"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
