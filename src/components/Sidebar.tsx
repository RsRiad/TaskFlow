'use client';

import React from 'react';
import { 
  OverviewIcon, 
  MyTasksIcon, 
  TaskBoardIcon, 
  ProjectsIcon, 
  TeamIcon, 
  ChatIcon, 
  PlusIcon,
  TaskFlowLogoIcon
} from '@/components/icons/Index';

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
  const navItems = [
    { id: 'overview', label: 'Overview', icon: OverviewIcon },
    { id: 'my-tasks', label: 'My tasks', icon: MyTasksIcon },
    { id: 'task-board', label: 'Task board', icon: TaskBoardIcon },
    { id: 'projects', label: 'Projects', icon: ProjectsIcon },
    { id: 'team', label: 'Team', icon: TeamIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={`fixed top-0 left-0 bottom-0 w-56 bg-[var(--bg-sidebar)] text-slate-300 flex flex-col justify-between p-4 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="space-y-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 px-2 pt-1">
            <TaskFlowLogoIcon className="w-7 h-7" />
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              TaskFlow
            </span>
          </div>

          {/* Nav List */}
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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA Banner Box */}
        <div className="bg-[var(--bg-sidebar-card)] border border-slate-800/80 rounded-xl p-3.5 space-y-2.5 shadow-md">
          <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300">
            <ChatIcon className="w-4 h-4" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-white tracking-tight">No tasks yet?</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              Create a task to get things moving.
            </p>
          </div>

          <button
            onClick={() => {
              onOpenNewTaskModal();
              if (setIsMobileOpen) setIsMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-sm shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <PlusIcon className="w-3.5 h-3.5" />
            <span>New task</span>
          </button>
        </div>
      </aside>
    </>
  );
};
