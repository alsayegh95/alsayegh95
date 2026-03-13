import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { mockConnectedServices, mockCapabilities } from "@/lib/mock-data";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function AgentBanner() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-border bg-card p-5 card-hover">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦀</span>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Abdullah Mission Control
              <span className="ml-2 text-xs font-mono text-muted-foreground">v1.1.3</span>
              <Badge variant="outline" className="ml-2 text-[10px] border-success text-success">
                7 Agents Online
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
              <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="font-mono text-success text-xs">Connected</span>
            </div>
            <div>
              <span className="text-muted-foreground">Agents: </span>
              <span className="font-mono text-foreground">7 registered</span>
            </div>
            <div>
              <span className="text-muted-foreground">Cron Jobs: </span>
              <span className="font-mono text-foreground">12 active</span>
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
                    "text-[10px] font-mono",
                    svc.connected
                      ? "border-success/30 text-success bg-success/5"
                      : "border-border text-muted-foreground"
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
                <Badge key={cap} className="text-[10px] bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
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
