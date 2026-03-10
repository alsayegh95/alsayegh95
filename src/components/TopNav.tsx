import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopNavProps {
  onToggleSidebar: () => void;
}

export function TopNav({ onToggleSidebar }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-white/80 backdrop-blur-xl flex items-center px-4 gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className="shrink-0 text-muted-foreground hover:text-foreground"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2.5">
        <span className="h-7 w-7 rounded-lg bg-yellow-400 flex items-center justify-center text-sm font-bold text-black">D</span>
        <span className="font-bold text-foreground tracking-tight text-lg">
          Dashboard
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
          </span>
          <span className="text-muted-foreground hidden sm:inline">Online</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-black">
          AA
        </div>
      </div>
    </header>
  );
}
