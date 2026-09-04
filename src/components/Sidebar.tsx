'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  OverviewIcon,
  MyTasksIcon,
  TaskBoardIcon,
  ProjectsIcon,
  TeamIcon,
  SettingsIcon,
  LogoutIcon,
  ChevronDownIcon,
  TaskFlowLogoIcon,
} from '@/components/Icon';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewTaskModal: () => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewTaskModal,
  isMobileOpen = false,
  setIsMobileOpen,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: OverviewIcon },
    { id: 'my-tasks', label: 'My tasks', icon: MyTasksIcon },
    { id: 'task-board', label: 'Task board', icon: TaskBoardIcon },
    { id: 'projects', label: 'Projects', icon: ProjectsIcon },
    { id: 'team', label: 'Team', icon: TeamIcon },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-56 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Logo & Navigation */}
        <div className="space-y-8">
          {/* Logo with Workflow icon */}
          <div className="px-3 flex items-center gap-2.5">
            <TaskFlowLogoIcon className="w-7 h-7 shrink-0" />
            <h1 className="text-lg font-bold text-gray-900 tracking-wide uppercase">
              TaskFlow
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (setIsMobileOpen) setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-[13px] font-medium transition-colors relative ${
                    isActive
                      ? 'text-gray-900 bg-gray-100 font-semibold'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {/* Active indicator — left accent bar */}
                  {isActive && (
                    <span className="absolute left-1.5 top-2 bottom-2 w-[3px] rounded-full bg-orange-700" />
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: User Profile with Popover */}
        <div ref={profileRef} className="relative px-1 pt-4 border-t border-gray-100">
          {/* Profile Button */}
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-2.5 p-2 rounded-full hover:bg-gray-50 transition-colors text-left group border border-transparent hover:border-gray-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Maya"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-gray-900 truncate">Maya</p>
                <p className="text-[11px] text-gray-400 truncate">Product Lead</p>
              </div>
            </div>
            <ChevronDownIcon
              className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 group-hover:text-gray-600 ${
                isProfileMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Profile Menu Popover */}
          {isProfileMenuOpen && (
            <div className="absolute bottom-16 left-0 right-0 z-50 bg-white border border-gray-200 rounded-[20px] shadow-xl p-1.5 animate-fade-in text-[13px]">
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  alert('Settings clicked');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-[12px] transition-colors"
              >
                <SettingsIcon className="w-4 h-4 text-gray-500" />
                <span>Settings</span>
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  alert('Logged out successfully');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-[12px] transition-colors font-medium"
              >
                <LogoutIcon className="w-4 h-4 text-red-500" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
