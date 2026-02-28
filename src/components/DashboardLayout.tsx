import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { SidebarPanel } from "@/components/SidebarPanel";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <TopNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SidebarPanel open={sidebarOpen} />
      <main
        className={cn(
          "transition-all duration-300 pt-4 pb-8 px-4 lg:px-6",
          sidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {children}
      </main>
    </div>
  );
}
