import Link from 'next/link';
import { TaskFlowLogoIcon, ArrowRightIcon } from '@/components/Icon';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-gray-50/50 p-6 text-gray-900 animate-fade-in font-sans">
      <section className="w-full max-w-md rounded-[24px] border border-gray-200 bg-white p-8 text-center shadow-xl space-y-5">
        {/* Logo Badge */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-[16px] bg-gray-900 flex items-center justify-center p-2 shadow-sm">
            <TaskFlowLogoIcon className="w-8 h-8" />
          </div>
          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">TaskFlow</span>
        </div>

        {/* 404 Pill Badge */}
        <div className="inline-block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-full bg-orange-50 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
            404 • Page Not Found
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Looking for something?</h1>
          <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs mx-auto">
            The page you requested could not be found or may have been moved to another view.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[13px] font-medium rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-sm"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
