'use client';

import React from 'react';
import { SearchIcon, ArrowRightIcon } from '@/components/Icon';
import { Button } from '@/components/Button';

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
  searchQuery,
  setSearchQuery,
  onToggleMobileSidebar,
  backLink,
}) => {
  return (
    <header className="fixed top-0 left-0 lg:left-56 right-0 h-14 z-30 bg-white border-b border-gray-200 px-5 flex items-center justify-between">
      {/* Left: Back Link OR Mobile Menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="Toggle Navigation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {backLink && (
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowRightIcon className="w-3.5 h-3.5 rotate-180" />}
            onClick={backLink.onBack}
          >
            {backLink.label}
          </Button>
        )}
      </div>


      {/* Right: Search */}
      <div className="relative w-48 sm:w-64">
        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors bg-white"
        />
      </div>
    </header>
  );
};
