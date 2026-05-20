export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-command-surface-hi rounded-lg"></div>
          <div className="h-4 w-48 bg-command-surface-hi rounded-lg"></div>
        </div>
        <div className="h-10 w-32 bg-command-surface-hi rounded-lg"></div>
      </header>

      <div className="bg-command-surface border border-command-border rounded-xl overflow-hidden">
        <div className="h-16 bg-command-bg/50 border-b border-command-border"></div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-command-surface-hi rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
