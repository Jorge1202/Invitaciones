import { StudioSidebar } from "@/components/studio/sidebar";
import { StudioHeader } from "@/components/studio/header";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-studio-bg text-studio-text flex">
      {/* Reseller Sidebar */}
      <StudioSidebar />

      <div className="flex-1 flex flex-col">
        {/* Reseller Header */}
        <StudioHeader />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
