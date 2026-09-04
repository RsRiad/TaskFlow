'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/types';
import { ArrowRightIcon, ChevronDownIcon } from '@/components/Icon';
import { Button } from '@/components/Button';
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
    <div className="border border-gray-200 rounded-[24px] p-5 bg-white h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-gray-900">Tasks due soon</h2>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowRightIcon className="w-3 h-3" />}
          iconPosition="right"
          onClick={onViewTaskBoard}
          className="text-gray-400 hover:text-gray-600"
        >
          View all
        </Button>
      </div>


      {/* Task List */}
      <div className="flex-1">
        {visibleTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 group"
          >
            {/* Left: Checkbox & Task */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <button
                onClick={() => onToggleTaskCompletion(task.id)}
                className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-colors shrink-0 ${
                  task.completed
                    ? 'bg-gray-900 border-gray-900 text-white'
                    : 'border-gray-300 group-hover:border-gray-400'
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
                <p
                  onClick={() => onToggleTaskCompletion(task.id)}
                  className={`text-[13px] cursor-pointer transition-colors truncate ${
                    task.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-900 font-medium hover:text-gray-600'
                  }`}
                >
                  {task.title}
                </p>
                <span className="text-[11px] text-gray-400">{task.projectName}</span>
              </div>
            </div>

            {/* Right: Avatar & Date */}
            <div className="flex items-center gap-2 shrink-0">
              {task.isUrgent && !task.completed && (
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-red-50 text-red-600 border border-red-200 shrink-0">
                  Overdue
                </span>
              )}
              <div
                className="relative w-5 h-5 rounded-full overflow-hidden border border-gray-200"
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
              <span className={`text-[12px] font-medium min-w-[50px] text-right ${task.isUrgent && !task.completed ? 'text-red-600' : 'text-gray-400'}`}>
                {task.dueDate}
              </span>
            </div>
          </div>

        ))}
      </div>

      {/* Show More / Less */}
      {tasks.length > 5 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          icon={<ChevronDownIcon className={`w-3 h-3 transition-transform duration-150 ${showAll ? 'rotate-180' : ''}`} />}
          iconPosition="right"
          className="w-full mt-3 pt-2 border-t border-gray-100 text-gray-400 hover:text-gray-600 justify-center"
        >
          {showAll ? 'Show less' : `Show ${hiddenCount} more`}
        </Button>
      )}

    </div>
  );
};
