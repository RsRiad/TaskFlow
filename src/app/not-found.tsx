export default function NotFound() {
    return (
        <main className="grid min-h-screen place-items-center bg-slate-50 px-6 text-slate-900">
            <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">TaskFlow</p>
                <h1 className="mt-2 text-2xl font-black tracking-tight">Page not found</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    The screen you requested is not available in this in-browser demo.
                </p>
                <a
                    href="/"
                    className="mt-5 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
                >
                    Back to dashboard
                </a>
            </section>
        </main>
    );
}
