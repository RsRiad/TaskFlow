'use client';

import React from 'react';
import { SunIcon, SearchIcon, PlusIcon, ArrowRightIcon } from '@/components/icons/Index';

interface HeaderProps {
  userName?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNewTaskModal: () => void;
  onToggleMobileSidebar?: () => void;
  backLink?: {
    label: string;
    onBack: () => void;
  };
}

export const Header: React.FC<HeaderProps> = ({
  userName = 'Maya',
  searchQuery,
  setSearchQuery,
  onOpenNewTaskModal,
  onToggleMobileSidebar,
  backLink,
}) => {
  return (
    <header className="fixed top-0 left-0 lg:left-56 right-0 h-14 z-30 bg-[var(--bg-main)]/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between transition-none shadow-2xs">
      {/* Left: Back Link OR Greeting & Mobile Menu Trigger */}
      <div className="flex items-center gap-2.5">
        <button 
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          aria-label="Toggle Navigation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {backLink ? (
          <button
            onClick={backLink.onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180 text-indigo-600 stroke-[2.2]" />
            <span>{backLink.label}</span>
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-500 shadow-xs shrink-0">
              <SunIcon className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Good morning, {userName}
            </h1>
          </div>
        )}
      </div>

      {/* Right Side: Search & New Task Button */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Search Bar */}
        <div className="relative w-48 sm:w-64 md:w-80">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, projects, people..."
            className="w-full bg-white border border-slate-200 rounded-lg py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
          />
        </div>

        {/* Primary "+ New task" CTA */}
        <button
          onClick={onOpenNewTaskModal}
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition-all hover:shadow-sm active:scale-[0.99] shrink-0"
        >
          <PlusIcon className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">New task</span>
          <span className="sm:hidden">Task</span>
        </button>
      </div>
    </header>
  );
};
