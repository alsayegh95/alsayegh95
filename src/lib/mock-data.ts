export const mockAgents = [
  { id: "main", name: "Claw", model: "claude-opus-4-6", status: "active" as const, lastHeartbeat: Date.now() - 30000, tokenCount: 245000, currentTask: "Orchestrating agents & answering Abdullah" },
  { id: "khalid", name: "Khalid", model: "gpt-5.3-codex", status: "idle" as const, lastHeartbeat: Date.now() - 1800000, tokenCount: 89200, currentTask: "Idle — awaiting job application session" },
  { id: "sarah", name: "Sarah", model: "gpt-5.3-codex", status: "active" as const, lastHeartbeat: Date.now() - 60000, tokenCount: 62400, currentTask: "Daily briefing delivered" },
  { id: "yazed-jr", name: "Yazed JR", model: "gpt-5.3-codex", status: "idle" as const, lastHeartbeat: Date.now() - 3600000, tokenCount: 31500, currentTask: "Idle — next run at 16:00" },
  { id: "mohammed-jr", name: "Mohammed JR", model: "gpt-5.3-codex", status: "idle" as const, lastHeartbeat: Date.now() - 3600000, tokenCount: 18700, currentTask: "Idle — next run at 17:30" },
  { id: "rima", name: "Rima", model: "gpt-5.3-codex", status: "active" as const, lastHeartbeat: Date.now() - 60000, tokenCount: 11800, currentTask: "Morning weight check-in delivered" },
  { id: "abeer", name: "Abeer", model: "gpt-5.3-codex", status: "idle" as const, lastHeartbeat: Date.now() - 7200000, tokenCount: 8400, currentTask: "Credit card tracker — awaiting next sync" },
];

export const mockSchedule = [
  { time: "8:00 AM", name: "Morning Weight Check-in (Rima)", status: "completed" as const },
  { time: "8:30 AM", name: "Daily Briefing (Sarah)", status: "completed" as const },
  { time: "9:00 AM", name: "Morning Check-in (Claw)", status: "completed" as const },
  { time: "4:00 PM", name: "Villa Finder Daily (Yazed JR)", status: "upcoming" as const },
  { time: "5:30 PM", name: "Apartment Finder Daily (Mohammed JR)", status: "upcoming" as const },
  { time: "8:00 PM", name: "Evening Supplement Check-in (Rima)", status: "upcoming" as const },
  { time: "10:00 PM", name: "Evening Wrap-up (Claw)", status: "upcoming" as const },
];

export const mockActivity = [
  { id: "1", type: "tool" as const, agent: "Claw", description: "Model routing updated — all agents switched to Codex 5.3", timestamp: Date.now() - 60000, details: "Khalid, Sarah, Rima, yazed-jr, mohammed-jr → openai-codex/gpt-5.3-codex" },
  { id: "2", type: "tool" as const, agent: "Sarah", description: "Daily briefing delivered (manual push)", timestamp: Date.now() - 300000, details: "Riyadh partly cloudy 12-18°C. Portfolio SAR 9,435 / USD 808. Lucid +6.4%" },
  { id: "3", type: "tool" as const, agent: "Rima", description: "Morning weight check-in delivered (manual push)", timestamp: Date.now() - 360000, details: "Weigh-in prompt sent to Abdullah via Telegram" },
  { id: "4", type: "tool" as const, agent: "Claw", description: "Morning fleet status report delivered", timestamp: Date.now() - 420000, details: "9 cron jobs checked — 3 healthy, 4 errors, 2 pending first run" },
  { id: "5", type: "system" as const, agent: "Claw", description: "Fixed workspace path bug — was resolving to System32", timestamp: Date.now() - 600000, details: "Config had missing backslashes in workspace path" },
  { id: "6", type: "system" as const, agent: "Claw", description: "Fixed Sarah & Rima fallback model — claude-haiku-3.5 doesn't exist", timestamp: Date.now() - 900000, details: "Changed fallback to openai-codex/gpt-5.3-codex" },
  { id: "7", type: "tool" as const, agent: "Yazed JR", description: "Villa Finder Daily — top 3 villas delivered", timestamp: Date.now() - 86400000, details: "3 villas in Riyadh sent to Abdullah via Telegram" },
  { id: "8", type: "tool" as const, agent: "Mohammed JR", description: "Apartment Finder Daily — top 3 apartments delivered", timestamp: Date.now() - 86400000, details: "Furnished apartments in North Riyadh from Aqar.fm" },
  { id: "9", type: "tool" as const, agent: "Rima", description: "Evening supplement check-in delivered", timestamp: Date.now() - 86400000, details: "Supplement checklist sent to Abdullah via Telegram" },
  { id: "10", type: "system" as const, agent: "Claw", description: "Mission Control dashboard deployed", timestamp: Date.now() - 172800000, details: "React + Vite app with live cron data, hosted on port 4000" },
];

export const mockTokenUsage = [
  { day: "Mon", tokens: 45200, cost: 0.68 },
  { day: "Tue", tokens: 62100, cost: 0.93 },
  { day: "Wed", tokens: 38900, cost: 0.58 },
  { day: "Thu", tokens: 71300, cost: 1.07 },
  { day: "Fri", tokens: 55600, cost: 0.83 },
  { day: "Sat", tokens: 29800, cost: 0.45 },
  { day: "Sun", tokens: 48200, cost: 0.72 },
];

export const mockTasks = [
  { id: "1", title: "Fix cron queue jam — stale manual runs blocking", status: "in-progress" as const, priority: "high" as const, agent: "Claw" },
  { id: "2", title: "Complete Outlook MCP local installation", status: "backlog" as const, priority: "high" as const, agent: "Claw" },
  { id: "3", title: "Connect Outlook MCP to OpenClaw", status: "backlog" as const, priority: "high" as const, agent: "Claw" },
  { id: "4", title: "Daily briefing delivered (manual)", status: "done" as const, priority: "medium" as const, agent: "Sarah" },
  { id: "5", title: "Morning weight check-in delivered (manual)", status: "done" as const, priority: "medium" as const, agent: "Rima" },
  { id: "6", title: "Morning fleet status delivered", status: "done" as const, priority: "medium" as const, agent: "Claw" },
  { id: "7", title: "Evaluate Qwen 2.5 for Arabic/English workflows", status: "backlog" as const, priority: "medium" as const, agent: "Claw" },
  { id: "8", title: "Review EasyApplyJobsBot features for Khalid", status: "backlog" as const, priority: "low" as const, agent: "Claw" },
];

export const mockConnectedServices = [
  { name: "Anthropic", connected: true },
  { name: "OpenAI Codex", connected: true },
  { name: "Telegram (6 bots)", connected: true },
  { name: "GitHub", connected: true },
  { name: "Google", connected: true },
  { name: "Tailscale", connected: true },
  { name: "Yahoo Finance", connected: true },
  { name: "wttr.in / Open-Meteo", connected: true },
  { name: "Aqar.fm", connected: true },
  { name: "Discord", connected: false },
  { name: "Slack", connected: false },
];

export const mockCapabilities = [
  "Web Browse", "Shell Exec", "File System", "Code Execution", "Memory", "Scheduling", "Image Gen", "TTS", "PDF Analysis"
];

export const mockMemories = [
  { id: "1", title: "Daily briefing at 08:30 via Sarah", content: "Abdullah receives daily intelligence at 08:30 Riyadh time via Sarah Telegram bot. Includes weather, Saudi and US stock portfolio.", category: "preference" as const, source: "Sarah AGENTS.md", createdAt: Date.now() - 86400000 * 2 },
  { id: "2", title: "Job application targets", content: "Target roles: Technical Account Manager, Product Manager, Project Manager, Telecom Engineer, Localization Manager. Industries: Telecom, Manufacturing, Infrastructure, Gov Tech. Location: Riyadh. Min salary: 12000 SAR.", category: "fact" as const, source: "USER.md Section 6", createdAt: Date.now() - 86400000 * 5 },
  { id: "3", title: "Rima health monitoring setup", content: "Rima handles: daily weight check-in (8AM), evening supplement check-in (8PM), weekly Mounjaro injection reminder (Sun 8PM), weekly health report (Sun 10PM).", category: "task" as const, source: "Rima HEARTBEAT.md", createdAt: Date.now() - 86400000 * 3 },
  { id: "4", title: "Yazed JR searches villas on Aqar.fm", content: "Daily at 16:00, Yazed JR searches Aqar.fm for villas in Riyadh, filters and ranks, sends top 3 to Abdullah via Telegram.", category: "task" as const, source: "Cron job config", createdAt: Date.now() - 86400000 * 3 },
  { id: "5", title: "Mohammed JR finds apartments for Mohammed", content: "Daily at 17:30, Mohammed JR searches Aqar.fm for furnished apartments in North Riyadh, sends top 3 to Mohammed via Telegram.", category: "task" as const, source: "Cron job config", createdAt: Date.now() - 86400000 * 3 },
  { id: "6", title: "Platform notes for job applications", content: "Workday requires login. Google Forms cant upload CV. SmartRecruiters hard to automate. careers-page.com and Rippling work well. B and W has CAPTCHA.", category: "insight" as const, source: "MEMORY.md Section 5", createdAt: Date.now() - 86400000 * 2 },
];

export const mockContentPipeline: Array<{id: string; title: string; description: string; stage: string; priority: string; assignedTo: string; createdAt: number}> = [];

export const mockCronJobs = [
  { id: "4290d73a", name: "Morning Weight Check-in", expr: "0 8 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 3600000, lastStatus: "success" as const, description: "Rima sends weight check-in prompt to Abdullah via Telegram" },
  { id: "4884894f", name: "Daily Briefing", expr: "30 8 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 3600000, lastStatus: "success" as const, description: "Sarah runs daily_briefing.py — weather, stocks, portfolio via Telegram" },
  { id: "11617415", name: "Claw Morning Check-in", expr: "0 9 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 3600000, lastStatus: "success" as const, description: "Claw checks all agent cron states, sends fleet status to Abdullah" },
  { id: "2c3fc9c4", name: "Villa Finder Daily", expr: "0 16 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 86400000, lastStatus: "success" as const, description: "Yazed JR searches Aqar.fm for villas, sends top 3 to Abdullah" },
  { id: "8e11031d", name: "Apartment Finder Daily", expr: "30 17 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 86400000, lastStatus: "success" as const, description: "Mohammed JR searches Aqar.fm for apartments, sends top 3 to Mohammed" },
  { id: "70ca9c82", name: "Evening Supplement Check-in", expr: "0 20 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 86400000, lastStatus: "success" as const, description: "Rima sends supplement checklist to Abdullah via Telegram" },
  { id: "3b87c91b", name: "Mounjaro Injection Reminder", expr: "0 20 * * 0", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 604800000, lastStatus: "success" as const, description: "Rima reminds Abdullah about weekly Mounjaro injection (Sundays)" },
  { id: "fc81328d", name: "Weekly Health Report", expr: "0 22 * * 0", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 604800000, lastStatus: "success" as const, description: "Rima generates weekly health summary — weight trend, supplements, Mounjaro" },
  { id: "42ab4f8d", name: "Claw Evening Wrap-up", expr: "0 22 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 86400000, lastStatus: "error" as const, description: "Claw summarizes today's runs, builds tomorrow's queue, sends report" },
];
