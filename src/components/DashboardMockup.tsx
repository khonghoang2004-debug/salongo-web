export function DashboardMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] ${className}`}
      style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(236,72,153,0.06)" }}
    >
      <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-4">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-neutral-300" />
          <span className="size-3 rounded-full bg-neutral-300" />
          <span className="size-3 rounded-full bg-neutral-300" />
        </div>
        <div className="ml-4 h-2 w-24 rounded bg-neutral-100" />
      </div>
      <div className="grid grid-cols-3 gap-4 p-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl bg-neutral-50 p-4">
            <div className="h-2 w-3/4 rounded bg-neutral-200" />
            <div className="mt-3 h-8 w-full rounded bg-gradient-to-r from-pink-100 to-violet-100" />
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-100 p-5">
        <div className="flex gap-3">
          <div className="h-20 flex-1 rounded-lg bg-gradient-to-br from-pink-50 to-violet-50" />
          <div className="h-20 flex-1 rounded-lg bg-neutral-50" />
          <div className="h-20 flex-1 rounded-lg bg-neutral-50" />
        </div>
      </div>
    </div>
  );
}
