'use client';

import React from 'react';
import {
  ProjectsIcon,
  MyTasksIcon,
  AlertIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@/components/icons/Index';

interface StatCardsProps {
  activeProjectsCount: number;
  totalTasksCount: number;
  overdueTasksCount: number;
  completedTasksCount: number;
}

export const StatCards: React.FC<StatCardsProps> = ({
  activeProjectsCount,
  totalTasksCount,
  overdueTasksCount,
  completedTasksCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
      {/* 1. Active Projects Card */}
      <div className="bg-gradient-to-br from-white via-white to-indigo-50/30 border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-indigo-300/80 transition-all duration-200 flex flex-col justify-between group">
        <div>
          {/* Top Header: Label & Icon */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Active projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shadow-2xs group-hover:scale-105 transition-transform">
              <ProjectsIcon className="w-4.5 h-4.5 stroke-[2]" />
            </div>
          </div>

          {/* Middle: Big Metric Value & Badge */}
          <div className="flex items-baseline justify-between mt-3 mb-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeProjectsCount}
            </h3>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {activeProjectsCount} active
            </span>
          </div>
        </div>

        {/* Bottom Link Action */}
        <div className="pt-2.5 border-t border-slate-100/90 flex items-center justify-between mt-1">
          <button className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 transition-all">
            <span>View all projects</span>
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2. Total Tasks Card */}
      <div className="bg-gradient-to-br from-white via-white to-teal-50/20 border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-teal-300/80 transition-all duration-200 flex flex-col justify-between group">
        <div>
          {/* Top Header: Label & Icon */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              Total tasks
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-teal-600 shadow-2xs group-hover:scale-105 transition-transform">
              <MyTasksIcon className="w-4.5 h-4.5 stroke-[2]" />
            </div>
          </div>

          {/* Middle: Big Metric Value & Trend Badge */}
          <div className="flex items-baseline justify-between mt-3 mb-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {totalTasksCount}
            </h3>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              Live count
            </span>
          </div>
        </div>

        {/* Bottom Subtitle */}
        <div className="pt-2.5 border-t border-slate-100/90 flex items-center justify-between mt-1">
          <span className="text-[11px] text-slate-500 font-medium">Across all projects</span>
          <div className="w-14 bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full w-3/4 rounded-full" />
          </div>
        </div>
      </div>

      {/* 3. Overdue Card (Attention Alert) */}
      <div className="bg-gradient-to-br from-white via-white to-rose-50/40 border border-rose-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-200 flex flex-col justify-between group">
        <div>
          {/* Top Header: Label & Icon */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Overdue
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100/80 flex items-center justify-center text-rose-500 shadow-2xs group-hover:scale-105 transition-transform">
              <AlertIcon className="w-4.5 h-4.5 stroke-[2]" />
            </div>
          </div>

          {/* Middle: Big Metric Value & Urgent Badge */}
          <div className="flex items-baseline justify-between mt-3 mb-2">
            <h3 className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
              {overdueTasksCount}
            </h3>
            <span className="bg-rose-100/80 text-rose-700 border border-rose-200/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
              High priority
            </span>
          </div>
        </div>

        {/* Bottom Alert Link */}
        <div className="pt-2.5 border-t border-slate-100/90 flex items-center justify-between mt-1">
          <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
            Requires attention
          </span>
          <ArrowRightIcon className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 4. Completed Card */}
      <div className="bg-gradient-to-br from-white via-white to-emerald-50/30 border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-emerald-300/80 transition-all duration-200 flex flex-col justify-between group">
        <div>
          {/* Top Header: Label & Icon */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Completed
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-teal-600 shadow-2xs group-hover:scale-105 transition-transform">
              <CheckCircleIcon className="w-4.5 h-4.5 stroke-[2]" />
            </div>
          </div>

          {/* Middle: Big Metric Value & Target Badge */}
          <div className="flex items-baseline justify-between mt-3 mb-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {completedTasksCount}
            </h3>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Done
            </span>
          </div>
        </div>

        {/* Bottom Subtitle */}
        <div className="pt-2.5 border-t border-slate-100/90 flex items-center justify-between mt-1">
          <span className="text-[11px] text-slate-500 font-medium">Across all projects</span>
          <span className="text-[10px] font-bold text-emerald-600">Updated now</span>
        </div>
      </div>
    </div>
  );
};
