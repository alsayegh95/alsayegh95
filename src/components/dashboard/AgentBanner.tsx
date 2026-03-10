import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { mockConnectedServices, mockCapabilities } from "@/lib/mock-data";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function AgentBanner() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-6 shadow-sm card-hover">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-yellow-400 flex items-center justify-center text-xl font-bold text-black shadow-sm">⚡</span>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Dashboard
              <span className="ml-2 text-xs font-mono text-muted-foreground">v1.0.0</span>
              <Badge variant="outline" className="ml-2 text-[10px] border-emerald-400 text-emerald-600 bg-emerald-50">
                6 Agents Online
              </Badge>
            </h1>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {expanded && (
        <div className="space-y-4 animate-fade-in">
          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Primary Model: </span>
              <span className="font-mono text-foreground">claude-opus-4-6</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Gateway: </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-emerald-600 text-xs">Connected</span>
            </div>
            <div>
              <span className="text-muted-foreground">Agents: </span>
              <span className="font-mono text-foreground">6 registered</span>
            </div>
            <div>
              <span className="text-muted-foreground">Cron Jobs: </span>
              <span className="font-mono text-foreground">9 active</span>
            </div>
          </div>

          {/* Connected Services */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Connected Resources</p>
            <div className="flex flex-wrap gap-1.5">
              {mockConnectedServices.map((svc) => (
                <Badge
                  key={svc.name}
                  variant="outline"
                  className={cn(
                    "text-[10px] font-mono rounded-lg",
                    svc.connected
                      ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                      : "border-stone-300 text-muted-foreground bg-stone-50"
                  )}
                >
                  {svc.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Capabilities</p>
            <div className="flex flex-wrap gap-1.5">
              {mockCapabilities.map((cap) => (
                <Badge key={cap} className="text-[10px] bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 rounded-lg">
                  {cap}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
            <span>Operator: <span className="text-foreground font-medium">Abdullah Alsayegh</span></span>
            <span>GitHub: <span className="text-foreground font-mono">@alsayegh95</span></span>
            <span>Location: <span className="text-foreground">Riyadh, Saudi Arabia</span></span>
            <span>Workspace: <span className="text-foreground font-mono">~/.openclaw</span></span>
          </div>
        </div>
      )}
    </div>
  );
}
