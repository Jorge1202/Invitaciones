import { auth, signOut } from "@/auth";

export async function CommandHeader() {
  const session = await auth();

  return (
    <header className="h-16 border-b border-command-border flex items-center justify-between px-6 bg-command-surface/50 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <h2 className="text-lg font-semibold font-fraunces">Command Center</h2>
        
        {/* Quick Metrics */}
        <div className="flex gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-command-text-dim">MRR:</span>
            <span className="text-green-400">$24,500 MXN</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-command-text-dim">TENANTS:</span>
            <span className="text-command-accent">42</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="px-2 py-1 rounded bg-command-accent/10 border border-command-accent/20 text-[10px] text-command-accent font-bold uppercase tracking-wider">
          Super Admin
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-command-text-dim hidden sm:inline-block">
            {session?.user?.email}
          </span>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/command/auth" });
          }}>
            <button 
              type="submit"
              className="text-xs bg-command-surface-hi border border-command-border px-3 py-1.5 rounded-lg hover:bg-command-surface transition-colors"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
