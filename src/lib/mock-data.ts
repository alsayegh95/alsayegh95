export const mockAgents = [
  { id: "1", name: "OpenClaw Prime", model: "GPT-4o-mini", status: "active" as const, lastHeartbeat: Date.now() - 30000, tokenCount: 142850, currentTask: "Processing daily intelligence report" },
  { id: "2", name: "ContentBot", model: "Claude 3.5", status: "active" as const, lastHeartbeat: Date.now() - 90000, tokenCount: 58200, currentTask: "Generating thumbnail for video #12" },
  { id: "3", name: "SearchAgent", model: "GPT-4o", status: "idle" as const, lastHeartbeat: Date.now() - 300000, tokenCount: 23100, currentTask: "Idle" },
  { id: "4", name: "SchedulerBot", model: "GPT-4o-mini", status: "active" as const, lastHeartbeat: Date.now() - 45000, tokenCount: 8900, currentTask: "Monitoring cron jobs" },
];

export const mockSchedule = [
  { time: "05:00", name: "Daily Intelligence Report", status: "completed" as const },
  { time: "08:30", name: "Telegram Briefing", status: "completed" as const },
  { time: "10:00", name: "Job Application Scan", status: "running" as const },
  { time: "12:00", name: "News Digest", status: "upcoming" as const },
  { time: "15:00", name: "Stock Portfolio Check", status: "upcoming" as const },
  { time: "18:00", name: "Content Pipeline Review", status: "upcoming" as const },
  { time: "22:00", name: "Daily Summary", status: "upcoming" as const },
];

export const mockActivity = [
  { id: "1", type: "tool" as const, agent: "OpenClaw Prime", description: "Called OpenWeatherMap API for Riyadh forecast", timestamp: Date.now() - 120000, details: "Temperature: 34°C, Humidity: 15%" },
  { id: "2", type: "assistant" as const, agent: "OpenClaw Prime", description: "Generated daily intelligence report with weather, stocks, and news", timestamp: Date.now() - 180000, details: "Report includes 5 news items, 3 stock updates, weather forecast" },
  { id: "3", type: "user" as const, agent: "OpenClaw Prime", description: "User requested portfolio analysis for AAPL, MSFT, GOOGL", timestamp: Date.now() - 600000, details: "Analyzing 3 stocks with historical data" },
  { id: "4", type: "tool" as const, agent: "ContentBot", description: "Generated thumbnail using DALL-E for 'AI Agent Tutorial'", timestamp: Date.now() - 900000, details: "1024x1024 image generated, stored in /assets/thumbnails/" },
  { id: "5", type: "system" as const, agent: "SchedulerBot", description: "Cron job triggered: Morning Telegram briefing", timestamp: Date.now() - 3600000, details: "Delivering to chat ID: ****" },
  { id: "6", type: "assistant" as const, agent: "SearchAgent", description: "Indexed 45 new memory entries from yesterday's sessions", timestamp: Date.now() - 7200000, details: "Categories: 12 facts, 18 conversations, 15 insights" },
  { id: "7", type: "tool" as const, agent: "OpenClaw Prime", description: "Executed shell command: git pull origin main", timestamp: Date.now() - 10800000, details: "Updated 3 files, 0 conflicts" },
  { id: "8", type: "user" as const, agent: "OpenClaw Prime", description: "User updated content pipeline: moved 'React Tutorial' to Editing", timestamp: Date.now() - 14400000, details: "Stage change: Filming → Editing" },
  { id: "9", type: "system" as const, agent: "SchedulerBot", description: "System health check completed — all services operational", timestamp: Date.now() - 18000000, details: "4/4 agents healthy, 12/12 APIs connected" },
  { id: "10", type: "assistant" as const, agent: "ContentBot", description: "Auto-generated script for 'Building AI Agents from Scratch'", timestamp: Date.now() - 21600000, details: "2,400 words, 8 sections, estimated 12min video" },
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
  { id: "1", title: "Process job applications", status: "in-progress" as const, priority: "high" as const, agent: "OpenClaw Prime" },
  { id: "2", title: "Generate weekly report", status: "backlog" as const, priority: "medium" as const, agent: "ContentBot" },
  { id: "3", title: "Update memory index", status: "done" as const, priority: "low" as const, agent: "SearchAgent" },
  { id: "4", title: "Configure new API key", status: "backlog" as const, priority: "high" as const, agent: "OpenClaw Prime" },
  { id: "5", title: "Optimize prompt templates", status: "in-progress" as const, priority: "medium" as const, agent: "ContentBot" },
  { id: "6", title: "Backup memory database", status: "done" as const, priority: "low" as const, agent: "SchedulerBot" },
];

export const mockConnectedServices = [
  { name: "OpenAI", connected: true },
  { name: "Telegram", connected: true },
  { name: "GitHub", connected: true },
  { name: "Google", connected: true },
  { name: "OpenWeatherMap", connected: true },
  { name: "Yahoo Finance", connected: true },
  { name: "Alpha Vantage", connected: true },
  { name: "NewsAPI", connected: true },
  { name: "Tailscale", connected: true },
  { name: "Stripe", connected: false },
  { name: "Discord", connected: false },
];

export const mockCapabilities = [
  "Web Browse", "Shell Exec", "File System", "Code Execution", "Memory", "Scheduling", "Image Gen", "Data Analysis"
];

export const mockMemories = [
  { id: "1", title: "User prefers morning briefings at 8:30 AM", content: "Abdullah prefers receiving daily intelligence reports at 8:30 AM Riyadh time via Telegram. Reports should include weather, stock updates, and top news.", category: "preference" as const, source: "Conversation #42", createdAt: Date.now() - 86400000 * 2 },
  { id: "2", title: "AAPL stock analysis methodology", content: "When analyzing Apple stock, user wants both technical indicators (RSI, MACD) and fundamental analysis (P/E ratio, revenue growth). Compare against NASDAQ index.", category: "fact" as const, source: "Conversation #38", createdAt: Date.now() - 86400000 * 5 },
  { id: "3", title: "Content creation workflow preferences", content: "Videos should follow: Idea → Script (AI draft) → Human review → Thumbnail → Film → Edit → Publish pipeline. Scripts should be conversational tone, 10-15 min target length.", category: "preference" as const, source: "Task #15", createdAt: Date.now() - 86400000 * 3 },
  { id: "4", title: "Job application automation rules", content: "Process Excel spreadsheets from Downloads folder. Filter for remote positions, Software Engineering roles, minimum $120k salary. Auto-apply to matching positions with customized cover letter.", category: "task" as const, source: "Conversation #45", createdAt: Date.now() - 86400000 },
  { id: "5", title: "Hybrid AI architecture decision", content: "Use GPT-4o-mini for routine execution tasks (API calls, data processing). Use Claude 3.5 or GPT-4o for complex reasoning, planning, and content generation. This reduces costs by ~60%.", category: "insight" as const, source: "System Config", createdAt: Date.now() - 86400000 * 7 },
  { id: "6", title: "Riyadh timezone handling", content: "All scheduled tasks use Asia/Riyadh (UTC+3) timezone. Cron expressions should be written in UTC and converted. Summer time is not observed in Saudi Arabia.", category: "fact" as const, source: "Conversation #30", createdAt: Date.now() - 86400000 * 10 },
];

export const mockContentPipeline = [
  { id: "1", title: "Building AI Agents from Scratch", description: "Complete tutorial on building autonomous AI agents", stage: "script" as const, priority: "high" as const, assignedTo: "ContentBot", createdAt: Date.now() - 86400000 * 3 },
  { id: "2", title: "OpenClaw Dashboard Tour", description: "Walkthrough of the mission control dashboard", stage: "ideas" as const, priority: "medium" as const, assignedTo: "Unassigned", createdAt: Date.now() - 86400000 },
  { id: "3", title: "React Server Components Deep Dive", description: "Advanced RSC patterns and performance", stage: "thumbnail" as const, priority: "medium" as const, assignedTo: "ContentBot", createdAt: Date.now() - 86400000 * 5 },
  { id: "4", title: "Automating Job Applications with AI", description: "How I automated my job search", stage: "filming" as const, priority: "high" as const, assignedTo: "OpenClaw Prime", createdAt: Date.now() - 86400000 * 7 },
  { id: "5", title: "LLM Cost Optimization Guide", description: "Reducing API costs with hybrid architecture", stage: "editing" as const, priority: "low" as const, assignedTo: "ContentBot", createdAt: Date.now() - 86400000 * 10 },
  { id: "6", title: "Telegram Bot Development", description: "Building bots with Node.js", stage: "published" as const, priority: "medium" as const, assignedTo: "ContentBot", createdAt: Date.now() - 86400000 * 14 },
];

export const mockCronJobs = [
  { id: "1", name: "Daily Intelligence Report", expr: "0 5 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 3600000, lastStatus: "success" as const, description: "Generate and deliver daily briefing via Telegram" },
  { id: "2", name: "Telegram Morning Briefing", expr: "30 5 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 3600000, lastStatus: "success" as const, description: "Send weather, stocks, and news to Telegram" },
  { id: "3", name: "Job Application Scan", expr: "0 7 * * 1-5", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 86400000, lastStatus: "success" as const, description: "Scan for new job postings matching criteria" },
  { id: "4", name: "Content Pipeline Review", expr: "0 15 * * *", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 86400000, lastStatus: "success" as const, description: "Review and advance content pipeline items" },
  { id: "5", name: "Memory Backup", expr: "0 2 * * 0", tz: "Asia/Riyadh", enabled: true, lastRun: Date.now() - 86400000 * 3, lastStatus: "success" as const, description: "Backup all memory entries to cloud storage" },
  { id: "6", name: "Stock Portfolio Alert", expr: "0 9,15 * * 1-5", tz: "Asia/Riyadh", enabled: false, lastRun: Date.now() - 86400000 * 7, lastStatus: "failed" as const, description: "Check portfolio for significant price movements" },
];
