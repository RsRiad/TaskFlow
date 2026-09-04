'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TaskItem, UserAvatar, TaskStatus, Project } from '@/types';
import { CustomSelect } from '@/components/CustomSelect';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';

interface MyTasksViewProps {
  tasks: TaskItem[];
  teamAvatars: UserAvatar[];
  projects: Project[];
  onToggleTaskCompletion: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onCreateTask: () => void;
  onEditTask: (task: TaskItem) => void;
}

export const MyTasksView: React.FC<MyTasksViewProps> = ({
  tasks,
  teamAvatars,
  projects,
  onToggleTaskCompletion,
  onStatusChange,
  onCreateTask,
  onEditTask,
}) => {
  const [selectedAssigneeId, setSelectedAssigneeId] = useState(teamAvatars[0]?.id || '');
  const [filterTab, setFilterTab] = useState<'all' | 'todo' | 'in-progress' | 'done' | 'overdue'>('all');

  const selectedAssignee = teamAvatars.find((u) => u.id === selectedAssigneeId) || teamAvatars[0];

  // Filter tasks for this assignee
  const assigneeTasks = tasks.filter((t) => t.assignee.id === selectedAssigneeId || t.assignee.name === selectedAssignee?.name);

  // Apply tab filter
  const filteredTasks = assigneeTasks.filter((task) => {
    if (filterTab === 'todo') return task.status === 'To Do';
    if (filterTab === 'in-progress') return task.status === 'In Progress';
    if (filterTab === 'done') return task.status === 'Done';
    if (filterTab === 'overdue') return task.isUrgent && !task.completed;
    return true;
  });

  const counts = {
    all: assigneeTasks.length,
    todo: assigneeTasks.filter((t) => t.status === 'To Do').length,
    inProgress: assigneeTasks.filter((t) => t.status === 'In Progress').length,
    done: assigneeTasks.filter((t) => t.status === 'Done').length,
    overdue: assigneeTasks.filter((t) => t.isUrgent && !t.completed).length,
  };

  return (
    <div className="w-full space-y-5 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900">My Tasks</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Personal workload and action items for <span className="font-medium text-gray-700">{selectedAssignee?.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* User selector */}
          <div className="w-48">
            <CustomSelect
              options={teamAvatars.map((u) => ({ value: u.id, label: u.name, avatarUrl: u.avatarUrl }))}
              value={selectedAssigneeId}
              onChange={setSelectedAssigneeId}
              size="sm"
            />
          </div>

          {/* Create Task Button */}
          <Button
            variant="primary"
            size="md"
            icon={<PlusIcon className="w-3.5 h-3.5" />}
            onClick={onCreateTask}
          >
            New task
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-gray-200 pb-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All Tasks', count: counts.all },
          { id: 'todo', label: 'To Do', count: counts.todo },
          { id: 'in-progress', label: 'In Progress', count: counts.inProgress },
          { id: 'done', label: 'Completed', count: counts.done },
          { id: 'overdue', label: 'Overdue', count: counts.overdue, isAlert: counts.overdue > 0 },
        ].map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTab(tab.id as typeof filterTab)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : tab.isAlert
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-semibold ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : tab.isAlert
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-200/70 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tasks List */}
      <div className="border border-gray-200 rounded-[24px] bg-white overflow-hidden divide-y divide-gray-100">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-[13px]">
            No tasks found in this view.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-3.5 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors"
            >
              {/* Left: Checkbox & Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => onToggleTaskCompletion(task.id)}
                  className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-colors shrink-0 ${
                    task.completed
                      ? 'bg-gray-900 border-gray-900 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-2.5 h-2.5 fill-current stroke-current" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      onClick={() => onToggleTaskCompletion(task.id)}
                      className={`text-[13px] font-medium cursor-pointer truncate ${
                        task.completed ? 'line-through text-gray-400' : 'text-gray-900 hover:text-gray-600'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.isUrgent && !task.completed && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-red-50 text-red-600 border border-red-200 shrink-0">
                        Overdue
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-400">
                    <span>{task.projectName}</span>
                    <span>•</span>
                    <span>Due {task.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Right: Status selector & Edit */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-28">
                  <CustomSelect
                    options={[
                      { value: 'To Do', label: 'To Do' },
                      { value: 'In Progress', label: 'In Progress' },
                      { value: 'Done', label: 'Done' },
                    ]}
                    value={task.status}
                    onChange={(v) => onStatusChange(task.id, v as TaskStatus)}
                    size="sm"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditTask(task)}
                  className="text-gray-400 hover:text-gray-700"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
