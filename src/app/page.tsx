export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-6xl font-bold font-[family-name:var(--font-fraunces)] text-studio-accent">
          InvitaWeb
        </h1>
        <p className="text-lg text-center sm:text-left text-studio-text-dim">
          La evolución de las invitaciones digitales.
        </p>
      </main>
    </div>
  );
}
