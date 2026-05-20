import Link from "next/link";
import { 
  LayoutDashboard, 
  Building2, 
  LayoutTemplate, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert 
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/command" },
  { icon: Building2, label: "Tenants", href: "/command/tenants" },
  { icon: LayoutTemplate, label: "Templates", href: "/command/templates" },
  { icon: Sparkles, label: "AI Config", href: "/command/ai" },
  { icon: TrendingUp, label: "Global Stats", href: "/command/stats" },
  { icon: ShieldAlert, label: "System Logs", href: "/command/logs" },
];

export function CommandSidebar() {
  return (
    <aside className="w-16 hover:w-64 transition-all duration-300 bg-command-surface border-r border-command-border flex flex-col items-center py-6 overflow-hidden group">
      <div className="mb-10">
        {/* Isotipo IW */}
        <div className="w-10 h-10 bg-command-accent rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">IW</span>
        </div>
      </div>

      <nav className="flex-1 w-full px-3 space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 p-2 rounded-lg text-command-text-dim hover:text-command-accent hover:bg-command-surface-hi transition-colors"
          >
            <item.icon size={24} strokeWidth={1.5} />
            <span className="hidden group-hover:block whitespace-nowrap font-medium">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
