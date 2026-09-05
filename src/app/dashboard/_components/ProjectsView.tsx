'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project, TaskItem, UserAvatar } from '@/types';
import { Button } from '@/components/Button';
import { CustomSelect } from '@/components/CustomSelect';
import { DatePicker } from '@/components/DatePicker';
import {
  PlusIcon,
  SearchIcon,
  LaptopIcon,
  SmartphoneIcon,
  MegaphoneIcon,
  ArrowRightIcon,
  CloseIcon,
  CheckIcon,
} from '@/components/Icon';

interface ProjectsViewProps {
  projects: Project[];
  tasks: TaskItem[];
  teamAvatars: UserAvatar[];
  onSelectProjectFilter: (projectTitle: string) => void;
  onAddNewProject: (newProject: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  tasks,
  teamAvatars,
  onSelectProjectFilter,
  onAddNewProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'laptop' | 'smartphone' | 'megaphone'>('all');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // New Project Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [iconType, setIconType] = useState<'laptop' | 'smartphone' | 'megaphone'>('laptop');
  const [selectedOwnerIds, setSelectedOwnerIds] = useState<string[]>([teamAvatars[0]?.id || '']);

  // Filter projects by search and category
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.iconType === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate project statistics
  const totalProjects = projects.length;
  const avgProgress = totalProjects > 0
    ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / totalProjects)
    : 0;

  const handleToggleOwner = (id: string) => {
    setSelectedOwnerIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((oId) => oId !== id) : prev) : [...prev, id]
    );
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const chosenOwners = teamAvatars.filter((u) => selectedOwnerIds.includes(u.id));

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'No description provided.',
      dueDate: dueDate || 'Jul 30, 2025',
      progress: 0,
      iconType,
      iconBgColor: 'bg-slate-100 text-slate-700',
      iconColor: '#475569',
      progressBarColor: 'bg-indigo-600',
      owners: chosenOwners.length > 0 ? chosenOwners : [teamAvatars[0]],
      extraOwnersCount: 0,
    };

    onAddNewProject(newProject);
    setTitle('');
    setDescription('');
    setDueDate('');
    setIsNewProjectModalOpen(false);
  };

  const renderProjectIcon = (type: Project['iconType']) => {
    switch (type) {
      case 'laptop':
        return <LaptopIcon className="w-5 h-5 text-gray-700" />;
      case 'smartphone':
        return <SmartphoneIcon className="w-5 h-5 text-gray-700" />;
      case 'megaphone':
        return <MegaphoneIcon className="w-5 h-5 text-gray-700" />;
      default:
        return <LaptopIcon className="w-5 h-5 text-gray-700" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900">Projects</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Active workspace initiatives, progress tracking, and client deliverables
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<PlusIcon className="w-3.5 h-3.5" />}
          onClick={() => setIsNewProjectModalOpen(true)}
        >
          New project
        </Button>
      </div>

      {/* Top Metric Quick Stats (Single row on mobile view) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="border border-gray-200 rounded-[18px] sm:rounded-[24px] p-2.5 sm:p-5 bg-white min-w-0 flex flex-col justify-between">
          <p className="text-[9px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1 truncate">
            Active Projects
          </p>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{totalProjects}</h3>
          <p className="text-[10px] sm:text-[12px] text-gray-400 mt-0.5 sm:mt-1 truncate hidden sm:block">
            Tracked in workspace
          </p>
        </div>

        <div className="border border-gray-200 rounded-[18px] sm:rounded-[24px] p-2.5 sm:p-5 bg-white min-w-0 flex flex-col justify-between">
          <p className="text-[9px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1 truncate">
            Completion Rate
          </p>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{avgProgress}%</h3>
          <div className="w-full bg-gray-100 h-1 sm:h-1.5 rounded-full mt-1 overflow-hidden hidden sm:block">
            <div className="bg-gray-900 h-full rounded-full transition-all" style={{ width: `${avgProgress}%` }} />
          </div>
        </div>

        <div className="border border-gray-200 rounded-[18px] sm:rounded-[24px] p-2.5 sm:p-5 bg-white min-w-0 flex flex-col justify-between">
          <p className="text-[9px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1 truncate">
            Team Assignees
          </p>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{teamAvatars.length}</h3>
          <p className="text-[10px] sm:text-[12px] text-gray-400 mt-0.5 sm:mt-1 truncate hidden sm:block">
            Across active projects
          </p>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-gray-200 rounded-[24px] p-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <SearchIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full text-[12px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'laptop', label: 'Web & Tech' },
            { id: 'smartphone', label: 'Mobile Apps' },
            { id: 'megaphone', label: 'Marketing' },
          ].map((cat) => {
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id as typeof categoryFilter)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors shrink-0 ${isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => {
          // Calculate tasks for this project
          const projectTasks = tasks.filter((t) => t.projectName === project.title);
          const completedCount = projectTasks.filter((t) => t.completed).length;

          return (
            <div
              key={project.id}
              className="border border-gray-200 rounded-[24px] p-6 bg-white flex flex-col justify-between space-y-5 hover:border-gray-300 shadow-sm transition-all group"
            >
              <div className="space-y-4">
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-[18px] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    {renderProjectIcon(project.iconType)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-semibold uppercase tracking-wider">
                    {project.iconType === 'laptop'
                      ? 'Web'
                      : project.iconType === 'smartphone'
                        ? 'Mobile'
                        : 'Campaign'}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-[16px] font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-gray-500 uppercase tracking-wider">Progress</span>
                    <span className="font-bold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gray-900 h-full rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Meta details: Tasks & Due Date */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[12px] text-gray-500">
                  <div>
                    <span className="font-semibold text-gray-900">{completedCount}</span> / {projectTasks.length || 0} tasks
                  </div>
                  <div>Due {project.dueDate}</div>
                </div>
              </div>

              {/* Bottom: Team Avatars & Action */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                {/* Owners */}
                <div className="flex items-center -space-x-1.5">
                  {project.owners.map((u, i) => (
                    <div
                      key={u.id || i}
                      className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white shrink-0"
                    >
                      <Image src={u.avatarUrl} alt={u.name} fill className="object-cover" sizes="24px" />
                    </div>
                  ))}
                  {project.extraOwnersCount ? (
                    <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-gray-600">
                      +{project.extraOwnersCount}
                    </div>
                  ) : null}
                </div>

                {/* View Task Board Button */}
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ArrowRightIcon className="w-3 h-3 text-white" />}
                  iconPosition="right"
                  onClick={() => onSelectProjectFilter(project.title)}
                >
                  Board
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/20 transition-opacity overflow-y-auto"
          onClick={() => setIsNewProjectModalOpen(false)}
        >
          <div
            className="bg-white rounded-[24px] max-w-md w-full p-4 sm:p-6 border border-gray-200 shadow-xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-[15px] font-semibold text-gray-900">New Project</h3>
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Project Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Brand Identity Overhaul"
                  className="w-full border border-gray-200 rounded-[20px] px-3.5 py-2 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline key project deliverables..."
                  className="w-full border border-gray-200 rounded-[20px] px-3.5 py-2 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Category Icon
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'laptop', label: 'Web Tech' },
                    { id: 'smartphone', label: 'Mobile App' },
                    { id: 'megaphone', label: 'Marketing' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setIconType(cat.id as typeof iconType)}
                      className={`p-2.5 rounded-[14px] border text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors ${iconType === cat.id
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Due Date
                </label>
                <DatePicker value={dueDate} onChange={setDueDate} placeholder="Select target due date..." />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Team Members
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {teamAvatars.map((u) => {
                    const isSelected = selectedOwnerIds.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleToggleOwner(u.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border transition-colors ${isSelected
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                          <Image src={u.avatarUrl} alt={u.name} fill className="object-cover" sizes="16px" />
                        </div>
                        <span>{u.name}</span>
                        {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <Button type="button" variant="secondary" size="md" onClick={() => setIsNewProjectModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Create project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
