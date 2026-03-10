import { Button } from "@/components/ui/button";
import { Plus, FileText, Brain, ScrollText, Clock, Terminal, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockAgents, mockTasks, mockCronJobs, mockTokenUsage, mockMemories, mockActivity } from "@/lib/mock-data";

const agents = ["Claw", "Khalid", "Sarah", "Yazed JR", "Mohammed JR"];
const priorities = ["high", "medium", "low"];
const statuses = ["backlog", "in-progress", "done"];

function generateReport() {
  const now = new Date();
  const timeStr = now.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, month: "short", day: "numeric", year: "numeric" });
  const activeAgents = mockAgents.filter(a => a.status === "active").length;
  const idleAgents = mockAgents.filter(a => a.status === "idle").length;
  const totalTokens = mockAgents.reduce((sum, a) => sum + a.tokenCount, 0);
  const tasksByStatus = {
    backlog: mockTasks.filter(t => t.status === "backlog").length,
    inProgress: mockTasks.filter(t => t.status === "in-progress").length,
    done: mockTasks.filter(t => t.status === "done").length,
  };
  const cronHealthy = mockCronJobs.filter(j => j.enabled && j.lastStatus === "success").length;
  const cronFailing = mockCronJobs.filter(j => j.enabled && j.lastStatus !== "success").length;
  const weekCost = mockTokenUsage.reduce((sum, d) => sum + d.cost, 0);
  const weekTokens = mockTokenUsage.reduce((sum, d) => sum + d.tokens, 0);
  return { timeStr, activeAgents, idleAgents, totalTokens, tasksByStatus, cronHealthy, cronFailing, weekCost, weekTokens };
}

export function QuickActions() {
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [memorySearch, setMemorySearch] = useState("");
  const [logsOpen, setLogsOpen] = useState(false);
  const [logsFilter, setLogsFilter] = useState("all");
  const [cronOpen, setCronOpen] = useState(false);
  const [cronRunning, setCronRunning] = useState<string | null>(null);
  const [cronResults, setCronResults] = useState<Record<string, string>>({});
  const [termOpen, setTermOpen] = useState(false);
  const [termInput, setTermInput] = useState("");
  const [termHistory, setTermHistory] = useState<Array<{type: "input" | "output"; text: string}>>([
    { type: "output", text: "Abdullah Mission Control Terminal v1.0.0" },
    { type: "output", text: "Connected to OpenClaw Gateway at ws://127.0.0.1:18789" },
    { type: "output", text: "Type \u0027help\u0027 for available commands.\n" },
  ]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskAgent, setTaskAgent] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskStatus, setTaskStatus] = useState("backlog");
  const [createdTasks, setCreatedTasks] = useState<Array<{title: string; agent: string; priority: string; status: string}>>([]);

  const report = reportOpen ? generateReport() : null;

  const handleCreateTask = () => {
    if (!taskTitle.trim()) return;
    setCreatedTasks(prev => [...prev, { title: taskTitle, agent: taskAgent, priority: taskPriority, status: taskStatus }]);
    setTaskTitle("");
    setTaskAgent("");
    setTaskPriority("medium");
    setTaskStatus("backlog");
    setNewTaskOpen(false);
  };

  const handleTermSubmit = () => {
    if (!termInput.trim()) return;
    const cmd = termInput.trim();
    setTermHistory(prev => [...prev, { type: "input", text: cmd }]);
    setTermInput("");
    let output = "";
    const parts = cmd.toLowerCase().split(/\s+/);
    if (parts[0] === "help") {
      output = "Available commands:\n  agents        List all registered agents\n  status        Show system status\n  cron          List cron jobs\n  tasks         Show active tasks\n  uptime        Show gateway uptime\n  whoami        Show current operator\n  clear         Clear terminal\n  help          Show this help";
    } else if (parts[0] === "agents") {
      output = mockAgents.map(a => (a.status === "active" ? "\u25cf" : "\u25cb") + " " + a.name.padEnd(16) + a.model.padEnd(22) + a.status).join("\n");
    } else if (parts[0] === "status") {
      const active = mockAgents.filter(a => a.status === "active").length;
      const idle = mockAgents.filter(a => a.status === "idle").length;
      output = "Gateway:    ONLINE\nAgents:     " + active + " active, " + idle + " idle\nCron Jobs:  " + mockCronJobs.filter(j => j.enabled).length + " active\nTasks:      " + mockTasks.length + " total\nModel:      claude-opus-4-6\nLocation:   Riyadh, Saudi Arabia";
    } else if (parts[0] === "cron") {
      output = mockCronJobs.map(j => (j.lastStatus === "success" ? "\u2713" : "\u2717") + " " + j.name.padEnd(24) + j.expr.padEnd(16) + j.tz).join("\n");
    } else if (parts[0] === "tasks") {
      output = mockTasks.map(t => "[" + t.status.padEnd(11) + "] " + t.title.padEnd(40) + "(" + t.agent + ")").join("\n");
    } else if (parts[0] === "uptime") {
      output = "Gateway uptime: 6h 42m\nLast restart: Feb 28, 2026 at 2:17 PM";
    } else if (parts[0] === "whoami") {
      output = "Operator: Abdullah Alsayegh\nGitHub:   @alsayegh95\nTimezone: Asia/Riyadh (UTC+3)";
    } else if (parts[0] === "clear") {
      setTermHistory([{ type: "output", text: "Terminal cleared.\n" }]);
      return;
    } else {
      output = "Unknown command: " + cmd + "\nType 'help' for available commands.";
    }
    setTimeout(() => {
      setTermHistory(prev => [...prev, { type: "output", text: output }]);
    }, 150);
  };
  const actions = [
    { label: "New Task", icon: Plus, onClick: () => setNewTaskOpen(true) },
    { label: "Run Report", icon: FileText, onClick: () => setReportOpen(true) },
    { label: "Search Memories", icon: Brain, onClick: () => { setMemorySearch(""); setMemoryOpen(true); } },
    { label: "View Logs", icon: ScrollText, onClick: () => { setLogsFilter("all"); setLogsOpen(true); } },
    { label: "Trigger Cron", icon: Clock, onClick: () => { setCronRunning(null); setCronResults({}); setCronOpen(true); } },
    { label: "Terminal", icon: Terminal, onClick: () => setTermOpen(true) },
  ];

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm card-hover">
      <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            onClick={action.onClick}
            className="h-auto py-4 flex-col gap-2 border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
          >
            <action.icon className="h-5 w-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>

      {createdTasks.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-muted-foreground">Recently Created</p>
          {createdTasks.map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-xs p-2 rounded-md bg-muted/20 border border-border">
              <span className="text-foreground flex-1 truncate">{t.title}</span>
              <span className="text-muted-foreground">{t.agent}</span>
              <Badge variant="outline" className={
                t.priority === "high" ? "text-destructive border-destructive/30 text-[10px]" :
                t.priority === "medium" ? "text-warning border-warning/30 text-[10px]" :
                "text-muted-foreground border-border text-[10px]"
              }>{t.priority}</Badge>
            </div>
          ))}
        </div>
      )}

      {/* New Task Dialog */}
      <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Title</label>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Task description..."
                className="bg-muted/20 border-border"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Assign to Agent</label>
              <Select value={taskAgent} onValueChange={setTaskAgent}>
                <SelectTrigger className="bg-muted/20 border-border">
                  <SelectValue placeholder="Select agent..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {agents.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
                <Select value={taskPriority} onValueChange={setTaskPriority}>
                  <SelectTrigger className="bg-muted/20 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {priorities.map(p => (
                      <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                <Select value={taskStatus} onValueChange={setTaskStatus}>
                  <SelectTrigger className="bg-muted/20 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {statuses.map(s => (
                      <SelectItem key={s} value={s}>{s === "in-progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTaskOpen(false)} className="border-border text-muted-foreground">Cancel</Button>
            <Button onClick={handleCreateTask} disabled={!taskTitle.trim()} className="bg-primary text-primary-foreground">Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Terminal Dialog */}
      <Dialog open={termOpen} onOpenChange={setTermOpen}>
        <DialogContent className="bg-[#0d1117] border-border max-w-2xl max-h-[85vh] p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2">openclaw-terminal</span>
            </div>
            <button onClick={() => setTermOpen(false)} className="text-muted-foreground hover:text-foreground">
              <span className="text-xs">x</span>
            </button>
          </div>
          <div className="p-4 font-mono text-xs space-y-0 max-h-[60vh] overflow-y-auto" id="term-output">
            {termHistory.map((line, i) => (
              <div key={i} className={line.type === "input" ? "text-green-400" : "text-gray-300"}>
                {line.type === "input" ? (
                  <span><span className="text-cyan-400">abdullah@openclaw</span><span className="text-muted-foreground">:</span><span className="text-blue-400">~</span><span className="text-muted-foreground">$ </span>{line.text}</span>
                ) : (
                  <pre className="whitespace-pre-wrap leading-relaxed m-0">{line.text}</pre>
                )}
              </div>
            ))}
          </div>
          <div className="px-4 pb-4 pt-1">
            <div className="flex items-center gap-0 font-mono text-xs">
              <span className="text-cyan-400">abdullah@openclaw</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-muted-foreground">$ </span>
              <input
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleTermSubmit(); }}
                className="flex-1 bg-transparent text-green-400 outline-none border-none ml-1 font-mono text-xs"
                autoFocus
                spellCheck={false}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trigger Cron Dialog */}
      <Dialog open={cronOpen} onOpenChange={setCronOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Trigger Cron Job
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Select a cron job to trigger manually. This will run the job immediately.</p>
            {mockCronJobs.map(job => (
              <div key={job.id} className="rounded-lg border border-border bg-muted/10 p-4 space-y-3 hover:border-primary/20 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={"h-2 w-2 rounded-full shrink-0 " + (job.lastStatus === "success" ? "bg-success" : "bg-destructive")} />
                      <h4 className="text-sm font-medium text-foreground">{job.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{job.description}</p>
                  </div>
                  <Badge variant="outline" className={"text-[10px] shrink-0 " + (job.enabled ? "border-success/30 text-success" : "border-border text-muted-foreground")}>
                    {job.enabled ? "Active" : "Paused"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">{job.expr}</code>
                    <span>{job.tz}</span>
                    <span>Last: {job.lastStatus === "success" ? "OK" : "FAIL"}</span>
                  </div>
                  <Button
                    size="sm"
                    variant={cronResults[job.id] ? "outline" : "default"}
                    disabled={cronRunning === job.id}
                    onClick={() => {
                      setCronRunning(job.id);
                      setTimeout(() => {
                        setCronRunning(null);
                        setCronResults(prev => ({ ...prev, [job.id]: job.lastStatus === "success" ? "Triggered successfully" : "Triggered - check logs" }));
                      }, 2000);
                    }}
                    className={"text-xs h-7 " + (cronResults[job.id] ? "border-success/30 text-success" : "")}
                  >
                    {cronRunning === job.id ? (
                      <span className="flex items-center gap-1.5">
                        <span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Running...
                      </span>
                    ) : cronResults[job.id] ? (
                      cronResults[job.id]
                    ) : (
                      "Run Now"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <Link to="/calendar" onClick={() => setCronOpen(false)} className="text-xs text-primary hover:underline">View all scheduled jobs</Link>
            <Button variant="outline" onClick={() => setCronOpen(false)} className="border-border text-muted-foreground">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Logs Dialog */}
      <Dialog open={logsOpen} onOpenChange={setLogsOpen}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-primary" />
              System Logs
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-1.5 flex-wrap">
              {["all", ...agents].map(f => (
                <button
                  key={f}
                  onClick={() => setLogsFilter(f)}
                  className={"px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors " + (logsFilter === f ? "bg-primary/20 text-primary" : "bg-muted/20 text-muted-foreground hover:text-foreground")}
                >
                  {f === "all" ? "All Agents" : f}
                </button>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-[#0d1117] p-3 font-mono text-xs space-y-1.5 max-h-[55vh] overflow-y-auto">
              {mockActivity
                .filter(a => logsFilter === "all" || a.agent === logsFilter)
                .map(entry => {
                  const time = new Date(entry.timestamp).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, month: "short", day: "numeric" });
                  const typeColor = entry.type === "tool" ? "text-blue-400" : entry.type === "assistant" ? "text-purple-400" : entry.type === "user" ? "text-green-400" : "text-yellow-400";
                  const typeLabel = entry.type.toUpperCase().padEnd(9);
                  return (
                    <div key={entry.id} className="flex gap-2 leading-relaxed hover:bg-white/5 rounded px-1 -mx-1">
                      <span className="text-muted-foreground shrink-0 w-32">{time}</span>
                      <span className={"shrink-0 w-20 " + typeColor}>{typeLabel}</span>
                      <span className="text-cyan-400 shrink-0 w-28 truncate">[{entry.agent}]</span>
                      <span className="text-gray-300 flex-1">{entry.description}</span>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <Link to="/feed" onClick={() => setLogsOpen(false)} className="text-xs text-primary hover:underline">Full activity feed</Link>
            <Button variant="outline" onClick={() => setLogsOpen(false)} className="border-border text-muted-foreground">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



      {/* Search Memories Dialog */}
      <Dialog open={memoryOpen} onOpenChange={setMemoryOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Search Memories
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={memorySearch}
                onChange={(e) => setMemorySearch(e.target.value)}
                placeholder="Search memories..."
                className="bg-muted/20 border-border pl-10"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {mockMemories
                .filter(m =>
                  !memorySearch.trim() ||
                  m.title.toLowerCase().includes(memorySearch.toLowerCase()) ||
                  m.content.toLowerCase().includes(memorySearch.toLowerCase())
                )
                .map(mem => (
                  <div key={mem.id} className="rounded-lg border border-border bg-muted/10 p-3 space-y-1.5 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-foreground">{mem.title}</h4>
                      <Badge variant="outline" className={"text-[9px] shrink-0 capitalize " + (
                        mem.category === "preference" ? "border-primary/30 text-primary bg-primary/5" :
                        mem.category === "fact" ? "border-success/30 text-success bg-success/5" :
                        mem.category === "task" ? "border-warning/30 text-warning bg-warning/5" :
                        "border-secondary/30 text-secondary bg-secondary/5"
                      )}>{mem.category}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{mem.content}</p>
                    <p className="text-[10px] text-muted-foreground">{mem.source}</p>
                  </div>
                ))
              }
              {mockMemories.filter(m =>
                memorySearch.trim() &&
                !m.title.toLowerCase().includes(memorySearch.toLowerCase()) &&
                !m.content.toLowerCase().includes(memorySearch.toLowerCase())
              ).length === mockMemories.length && memorySearch.trim() && (
                <p className="text-sm text-muted-foreground text-center py-4">No memories found for "{memorySearch}"</p>
              )}
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <Link to="/memory" onClick={() => setMemoryOpen(false)} className="text-xs text-primary hover:underline">View all memories</Link>
            <Button variant="outline" onClick={() => setMemoryOpen(false)} className="border-border text-muted-foreground">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Run Report Dialog */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              System Status Report
            </DialogTitle>
          </DialogHeader>
          {report && (
            <div className="space-y-4 text-sm">
              <p className="text-xs text-muted-foreground">Generated: {report.timeStr}</p>

              {/* Agents */}
              <div className="rounded-lg border border-border bg-muted/10 p-3 space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agents</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{report.activeAgents}</p>
                    <p className="text-[10px] text-muted-foreground">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-muted-foreground">{report.idleAgents}</p>
                    <p className="text-[10px] text-muted-foreground">Idle</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{(report.totalTokens / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] text-muted-foreground">Total Tokens</p>
                  </div>
                </div>
                <div className="space-y-1 pt-1">
                  {mockAgents.map(a => (
                    <div key={a.id} className="flex items-center gap-2 text-xs">
                      <span className={"h-1.5 w-1.5 rounded-full shrink-0 " + (a.status === "active" ? "bg-success" : "bg-muted-foreground")} />
                      <span className="text-foreground font-medium w-28 truncate">{a.name}</span>
                      <span className="text-muted-foreground font-mono text-[10px] flex-1 truncate">{a.model}</span>
                      <Badge variant="outline" className={"text-[10px] " + (a.status === "active" ? "border-success/30 text-success" : "border-border text-muted-foreground")}>{a.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div className="rounded-lg border border-border bg-muted/10 p-3 space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tasks</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-muted-foreground">{report.tasksByStatus.backlog}</p>
                    <p className="text-[10px] text-muted-foreground">Backlog</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{report.tasksByStatus.inProgress}</p>
                    <p className="text-[10px] text-muted-foreground">In Progress</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{report.tasksByStatus.done}</p>
                    <p className="text-[10px] text-muted-foreground">Done</p>
                  </div>
                </div>
              </div>

              {/* Cron Jobs */}
              <div className="rounded-lg border border-border bg-muted/10 p-3 space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cron Jobs</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{report.cronHealthy}</p>
                    <p className="text-[10px] text-muted-foreground">Healthy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-destructive">{report.cronFailing}</p>
                    <p className="text-[10px] text-muted-foreground">Failing</p>
                  </div>
                </div>
                <div className="space-y-1 pt-1">
                  {mockCronJobs.map(j => (
                    <div key={j.id} className="flex items-center gap-2 text-xs">
                      <span className={"h-1.5 w-1.5 rounded-full shrink-0 " + (j.lastStatus === "success" ? "bg-success" : "bg-destructive")} />
                      <span className="text-foreground flex-1 truncate">{j.name}</span>
                      <code className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">{j.expr}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div className="rounded-lg border border-border bg-muted/10 p-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">7-Day Cost</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{(report.weekTokens / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] text-muted-foreground">Tokens Used</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">${report.weekCost.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground">Total Cost</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportOpen(false)} className="border-border text-muted-foreground">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}