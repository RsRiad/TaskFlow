'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { NewTaskModal } from '@/components/NewTaskModal';
import { Button } from '@/components/Button';
import { PlusIcon, TaskFlowLogoIcon } from '@/components/Icon';

import { StatCards } from './StatCards';
import { ActiveProjects } from './ActiveProjects';
import { TasksDueSoon } from './TasksDueSoon';
import { RecentActivity } from './RecentActivity';
import { CreateTaskView } from './CreateTaskView';
import { TaskBoard } from './TaskBoard';
import { MyTasksView } from './MyTasksView';

import {
  initialProjects,
  initialTasks,
  initialActivities,
  teamAvatars
} from './data';
import { TaskItem, Project, TaskStatus } from '@/types';

export function DashboardClient() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeView, setActiveView] = useState<'overview' | 'task-board' | 'task-form' | 'my-tasks'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('all');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [returnAfterForm, setReturnAfterForm] = useState<'overview' | 'task-board' | 'my-tasks'>('overview');

  const [projects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [activities] = useState(initialActivities);

  // Task Completion Handler
  const handleToggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId
          ? {
            ...t,
            completed: !t.completed,
            status: !t.completed ? 'Done' : 'To Do',
          }
          : t
      )
    );
  };

  // Add Task Handler
  const handleAddTask = (newTaskData: Omit<TaskItem, 'id' | 'completed'>) => {
    const newTask: TaskItem = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      completed: newTaskData.status === 'Done',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (updatedTask: TaskItem) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? { ...updatedTask, completed: updatedTask.status === 'Done' }
          : task
      )
    );
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status, completed: status === 'Done' }
          : task
      )
    );
  };

  const openTaskForm = (task?: TaskItem, initialStatus?: TaskStatus) => {
    if (task) {
      setEditingTask(task);
    } else if (initialStatus) {
      setEditingTask({
        id: '',
        title: '',
        projectName: 'Website redesign',
        assignee: teamAvatars[0],
        dueDate: 'Jun 12, 2025',
        dueStatus: 'In 5 days',
        isUrgent: false,
        status: initialStatus,
        completed: initialStatus === 'Done',
      } as TaskItem);
    } else {
      setEditingTask(null);
    }
    setReturnAfterForm(task || activeView === 'task-board' ? 'task-board' : activeView === 'my-tasks' ? 'my-tasks' : 'overview');
    setActiveView('task-form');
    setActiveTab('create-task');
  };

  const closeTaskForm = () => {
    const nextView = returnAfterForm;
    setEditingTask(null);
    setActiveView(nextView);
    setActiveTab(nextView === 'task-board' ? 'task-board' : nextView === 'my-tasks' ? 'my-tasks' : 'overview');
  };

  // Navigation tab change handler
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'task-board') {
      setActiveView('task-board');
    } else if (tab === 'my-tasks') {
      setActiveView('my-tasks');
    } else if (tab === 'create-task') {
      openTaskForm();
    } else {
      setSelectedProjectFilter('all');
      setSearchQuery('');
      setActiveView('overview');
    }
  };

  // Live Filtered Tasks & Projects based on search query
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic Stat Calculations
  const completedTasksCount = tasks.filter((t) => t.status === 'Done').length;
  const overdueTasksCount = tasks.filter((t) => t.isUrgent && !t.completed).length;

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenNewTaskModal={() => openTaskForm()}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content */}
      <main className="lg:pl-56 min-h-screen w-full">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Toggle Navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <TaskFlowLogoIcon className="w-6 h-6 shrink-0" />
            <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">TaskFlow</span>
          </div>
        </div>

        <div className="w-full px-5 py-5 lg:px-8 lg:py-6 space-y-5">
          {/* Page Title */}
          {activeView === 'overview' && (
            <div className="flex items-center justify-between mb-1">
              <div>
                <h1 className="text-[20px] font-semibold text-gray-900">Dashboard</h1>
                <p className="text-[13px] text-gray-400 mt-0.5">Overview of activity</p>
              </div>
              <Button
                variant="primary"
                size="md"
                icon={<PlusIcon className="w-3.5 h-3.5" />}
                onClick={() => openTaskForm()}
              >
                New task
              </Button>
            </div>
          )}

          {activeView === 'task-board' && (
            <div className="flex items-center justify-between mb-1">
              <div>
                <h1 className="text-[20px] font-semibold text-gray-900">Task Board</h1>
                <p className="text-[13px] text-gray-400 mt-0.5">Manage and organize your tasks</p>
              </div>
              <Button
                variant="primary"
                size="md"
                icon={<PlusIcon className="w-3.5 h-3.5" />}
                onClick={() => openTaskForm()}
              >
                New task
              </Button>
            </div>
          )}

          {activeView === 'task-form' ? (
            <CreateTaskView
              projects={projects}
              teamAvatars={teamAvatars}
              onBack={closeTaskForm}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              initialTask={editingTask}
            />
          ) : activeView === 'task-board' ? (
            <TaskBoard
              tasks={tasks}
              projects={projects}
              teamAvatars={teamAvatars}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onStatusChange={handleStatusChange}
              onCreateTask={(status) => openTaskForm(undefined, status)}
              onEditTask={openTaskForm}
              selectedProjectFilter={selectedProjectFilter}
              onProjectFilterChange={setSelectedProjectFilter}
            />
          ) : activeView === 'my-tasks' ? (
            <MyTasksView
              tasks={tasks}
              teamAvatars={teamAvatars}
              projects={projects}
              onToggleTaskCompletion={handleToggleTaskCompletion}
              onStatusChange={handleStatusChange}
              onCreateTask={() => openTaskForm()}
              onEditTask={openTaskForm}
            />
          ) : (
            <>
              {/* Key Metrics / Stat Cards */}
              <StatCards
                activeProjectsCount={projects.length}
                totalTasksCount={tasks.length}
                overdueTasksCount={overdueTasksCount}
                completedTasksCount={completedTasksCount}
              />

              {/* Middle Layout Grid: Active Projects & Tasks Due Soon */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                <div className="lg:col-span-7">
                  <ActiveProjects
                    projects={filteredProjects}
                    onViewTaskBoard={() => {
                      setSelectedProjectFilter('all');
                      setSearchQuery('');
                      setActiveView('task-board');
                      setActiveTab('task-board');
                    }}
                    onSelectProject={(projectTitle) => {
                      setSelectedProjectFilter(projectTitle);
                      setSearchQuery('');
                      setActiveView('task-board');
                      setActiveTab('task-board');
                    }}
                  />
                </div>

                <div className="lg:col-span-5">
                  <TasksDueSoon
                    tasks={filteredTasks}
                    onToggleTaskCompletion={handleToggleTaskCompletion}
                    onViewTaskBoard={() => {
                      setActiveView('task-board');
                      setActiveTab('task-board');
                    }}
                  />
                </div>
              </div>

              {/* Bottom Stream: Recent Activity */}
              <RecentActivity activities={activities} />
            </>
          )}
        </div>
      </main>

      {/* Interactive Modal: New Task Quick Access */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onAddTask={handleAddTask}
        projects={projects}
        teamAvatars={teamAvatars}
      />
    </div>
  );
}
