import { auth } from "@/auth";
import { CommandSidebar } from "@/components/command/sidebar";
import { CommandHeader } from "@/components/command/header";

export default async function CommandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth();

  return (
    <div className="min-h-screen bg-command-bg text-command-text flex">
      <CommandSidebar />
      <div className="flex-1 flex flex-col">
        <CommandHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
