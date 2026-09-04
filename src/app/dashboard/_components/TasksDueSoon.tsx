'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/types';
import { ArrowRightIcon, ChevronDownIcon } from '@/components/icons/Index';
import Image from 'next/image';

interface TasksDueSoonProps {
  tasks: TaskItem[];
  onToggleTaskCompletion: (taskId: string) => void;
  onViewTaskBoard?: () => void;
}

export const TasksDueSoon: React.FC<TasksDueSoonProps> = ({
  tasks,
  onToggleTaskCompletion,
  onViewTaskBoard,
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleTasks = showAll ? tasks : tasks.slice(0, 5);
  const hiddenCount = Math.max(0, tasks.length - 5);

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Tasks due soon</h2>
          <button
            onClick={onViewTaskBoard}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
          >
            <span>View all tasks</span>
            <ArrowRightIcon className="w-3 h-3" />
          </button>
        </div>

        {/* Task Items List */}
        <div className="divide-y divide-slate-100">
          {visibleTasks.map((task) => (
            <div
              key={task.id}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2.5 group transition-colors"
            >
              {/* Left: Radio/Check toggle & Task details */}
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <button
                  onClick={() => onToggleTaskCompletion(task.id)}
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${task.completed
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 group-hover:border-indigo-500'
                    }`}
                  aria-label={`Toggle task ${task.title}`}
                >
                  {task.completed && (
                    <svg className="w-2.5 h-2.5 fill-current stroke-current" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div className="min-w-0">
                  <h4
                    onClick={() => onToggleTaskCompletion(task.id)}
                    className={`text-xs font-semibold cursor-pointer transition-colors truncate ${task.completed
                        ? 'line-through text-slate-400 font-normal'
                        : 'text-slate-900 hover:text-indigo-600'
                      }`}
                  >
                    {task.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {task.projectName}
                  </span>
                </div>
              </div>

              {/* Right: Assignee Avatar & Due Date */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div
                  className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-slate-200"
                  title={task.assignee.name}
                >
                  <Image
                    src={task.assignee.avatarUrl}
                    alt={task.assignee.name}
                    fill
                    className="object-cover"
                    sizes="20px"
                  />
                </div>

                <div className="text-right min-w-[55px]">
                  <span className="text-[11px] font-semibold text-slate-700 block">
                    {task.dueDate}
                  </span>
                  <span
                    className={`text-[10px] font-medium block ${task.isUrgent ? 'text-amber-600 font-semibold' : 'text-slate-400'
                      }`}
                  >
                    {task.dueStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expand / Collapse Button */}
      {tasks.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-3 pt-2.5 border-t border-slate-100 text-slate-500 hover:text-indigo-600 font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
        >
          <span>{showAll ? 'Show less tasks' : `Show ${hiddenCount} more tasks`}</span>
          <ChevronDownIcon className={`w-3 h-3 transition-transform duration-150 ${showAll ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
};
