'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { NewTaskModal } from '@/components/NewTaskModal';

import { StatCards } from './_components/StatCards';
import { ActiveProjects } from './_components/ActiveProjects';
import { TasksDueSoon } from './_components/TasksDueSoon';
import { RecentActivity } from './_components/RecentActivity';
import { CreateTaskView } from './_components/CreateTaskView';
import { TaskBoard } from './_components/TaskBoard';

import {
  initialProjects,
  initialTasks,
  initialActivities,
  teamAvatars
} from './_components/data';
import { TaskItem, Project, TaskStatus } from '@/types';

export default function DashboardHome() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeView, setActiveView] = useState<'overview' | 'task-board' | 'task-form'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [returnAfterForm, setReturnAfterForm] = useState<'overview' | 'task-board'>('overview');

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

  const openTaskForm = (task?: TaskItem) => {
    setEditingTask(task || null);
    setReturnAfterForm(task || activeView === 'task-board' ? 'task-board' : 'overview');
    setActiveView('task-form');
    setActiveTab('create-task');
  };

  const closeTaskForm = () => {
    const nextView = returnAfterForm;
    setEditingTask(null);
    setActiveView(nextView);
    setActiveTab(nextView === 'task-board' ? 'task-board' : 'overview');
  };

  // Navigation tab change handler
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'task-board') {
      setActiveView('task-board');
    } else if (tab === 'create-task') {
      openTaskForm();
    } else {
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
    <div className="min-h-screen bg-[var(--bg-main)] font-sans antialiased text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenNewTaskModal={() => openTaskForm()}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Rock-Solid Fixed Top Navigation Header */}
      <Header
        userName="Maya"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewTaskModal={() => openTaskForm()}
        onToggleMobileSidebar={() => setIsMobileOpen(true)}
        backLink={
          activeView === 'task-form'
            ? {
              label: returnAfterForm === 'task-board' ? 'Back to task board' : 'Back to dashboard',
              onBack: closeTaskForm,
            }
            : undefined
        }
      />

      {/* Main Content Workspace (With pt-16 offset for fixed top bar) */}
      <main className="lg:pl-56 min-h-screen w-full pt-16 transition-all duration-300">
        <div className="w-full p-3 sm:p-5 lg:p-6 space-y-4">
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

              {/* Middle Layout Grid: Active Projects (Left 7 Cols) & Tasks Due Soon (Right 5 Cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                <div className="lg:col-span-7">
                  <ActiveProjects
                    projects={filteredProjects}
                    onViewTaskBoard={() => {
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
