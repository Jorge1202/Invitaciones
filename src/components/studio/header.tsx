import { auth, signOut } from "@/auth";
import { getCurrentTenant } from "@/actions/studio-actions";
import { BadgeCheck, LogOut, Bell, Search } from "lucide-react";

export async function StudioHeader() {
  const session = await auth();
  const tenant = await getCurrentTenant();

  return (
    <header className="h-24 bg-white/40 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-10">
      <div className="flex items-center gap-12">
        {/* Search Bar - Stylized */}
        <div className="relative group hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-studio-text-dim group-focus-within:text-studio-accent transition-colors" size={16} />
          <input 
            placeholder="Buscar eventos, invitados..." 
            className="bg-studio-bg/50 border border-studio-border/50 rounded-full py-2.5 pl-12 pr-6 text-sm outline-none focus:ring-2 focus:ring-studio-accent/20 focus:bg-white transition-all w-80 placeholder:italic"
          />
        </div>

        {/* Brand/Tenant Identity */}
        <div className="flex items-center gap-4 border-l border-studio-border pl-12 h-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-fraunces font-bold text-xl text-studio-text tracking-tight">
                {tenant?.name}
              </h2>
              {tenant?.plan === 'vip' && (
                <BadgeCheck size={18} className="text-studio-accent fill-studio-accent/10" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Actions */}
        <div className="flex items-center gap-3">
           <button className="w-10 h-10 rounded-full flex items-center justify-center text-studio-text-dim hover:bg-studio-bg hover:text-studio-accent transition-all relative">
              <Bell size={20} strokeWidth={1.5} />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-studio-accent rounded-full border-2 border-white" />
           </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4 pl-8 border-l border-studio-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-studio-text leading-tight">{session?.user?.name}</p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-studio-accent bg-studio-accent-soft px-2 py-0.5 rounded-full">
              {tenant?.plan} Admin
            </span>
          </div>
          
          <div className="group relative">
            <div className="w-12 h-12 rounded-full bg-studio-bg border-2 border-studio-border flex items-center justify-center text-studio-accent font-bold shadow-soft overflow-hidden cursor-pointer group-hover:border-studio-accent transition-all">
               {session?.user?.name?.charAt(0) || "U"}
            </div>
            
            {/* Simple Dropdown on hover logic can be client-side, but let's keep it clean */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-studio-border rounded-2xl shadow-premium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 z-50">
               <form action={async () => {
                 "use server";
                 await signOut({ redirectTo: "/studio/auth" });
               }}>
                 <button 
                   type="submit"
                   className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
                 >
                   <LogOut size={16} />
                   Cerrar Sesión
                 </button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
