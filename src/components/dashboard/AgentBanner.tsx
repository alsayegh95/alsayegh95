import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
              OpenClaw Prime
              <span className="ml-2 text-xs font-mono text-muted-foreground">v2.4.1</span>
              <Badge variant="outline" className="ml-2 text-[10px] border-success text-success">
                Up to date
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
              <span className="text-muted-foreground">Model: </span>
              <span className="font-mono text-foreground">GPT-4o-mini</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Context: </span>
              <Progress value={62} className="w-24 h-2" />
              <span className="font-mono text-foreground text-xs">62%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Sessions: </span>
              <span className="font-mono text-foreground">3 active</span>
            </div>
            <div>
              <span className="text-muted-foreground">Mode: </span>
              <span className="font-mono text-success">Autonomous</span>
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
            <span>Operator: <span className="text-foreground">Abdullah</span></span>
            <span>GitHub: <span className="text-foreground font-mono">@abdullah</span></span>
            <span>Workspace: <span className="text-foreground font-mono">~/openclaw</span></span>
          </div>
        </div>
      )}
    </div>
  );
}
