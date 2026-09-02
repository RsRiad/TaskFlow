export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#090d16] text-slate-100 font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Fresh Next.js Starter Ready
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Ready for Your Design
        </h1>

        <p className="mt-3 text-sm text-slate-400 leading-relaxed font-normal">
          Next.js 16 + Tailwind CSS v4 + Google Roboto Font are fully configured. Share your design instructions and I will build it!
        </p>
      </div>
    </main>
  );
}
