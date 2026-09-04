'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Project, TaskItem, TaskStatus, UserAvatar } from '@/types';
import { CalendarIcon, PlusIcon, SearchIcon } from '@/components/icons/Index';

interface TaskBoardProps {
    tasks: TaskItem[];
    projects: Project[];
    teamAvatars: UserAvatar[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onStatusChange: (taskId: string, status: TaskStatus) => void;
    onCreateTask: () => void;
    onEditTask: (task: TaskItem) => void;
}

const boardColumns: Array<{
    status: TaskStatus;
    title: string;
    helper: string;
    accentClass: string;
}> = [
        {
            status: 'To Do',
            title: 'To Do',
            helper: 'Planned work that needs an owner or start date.',
            accentClass: 'bg-slate-500',
        },
        {
            status: 'In Progress',
            title: 'In Progress',
            helper: 'Tasks the team is actively working on now.',
            accentClass: 'bg-blue-500',
        },
        {
            status: 'Done',
            title: 'Done',
            helper: 'Completed work that no longer needs action.',
            accentClass: 'bg-emerald-500',
        },
    ];

export const TaskBoard: React.FC<TaskBoardProps> = ({
    tasks,
    projects,
    teamAvatars,
    searchQuery,
    onSearchChange,
    onStatusChange,
    onCreateTask,
    onEditTask,
}) => {
    const [projectFilter, setProjectFilter] = useState('all');
    const [assigneeFilter, setAssigneeFilter] = useState('all');

    const filteredTasks = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return tasks.filter((task) => {
            const matchesSearch =
                !normalizedQuery ||
                task.title.toLowerCase().includes(normalizedQuery) ||
                task.projectName.toLowerCase().includes(normalizedQuery) ||
                task.assignee.name.toLowerCase().includes(normalizedQuery);
            const matchesProject = projectFilter === 'all' || task.projectName === projectFilter;
            const matchesAssignee = assigneeFilter === 'all' || task.assignee.id === assigneeFilter;

            return matchesSearch && matchesProject && matchesAssignee;
        });
    }, [assigneeFilter, projectFilter, searchQuery, tasks]);

    return (
        <section className="w-full space-y-4 animate-fade-in">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                        Task board
                    </p>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                        See every task by status
                    </h1>
                    <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-500">
                        Search or filter by project and assignee, then move work forward with the status menu on each card.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCreateTask}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 active:scale-[0.99]"
                >
                    <PlusIcon className="h-4 w-4 stroke-[2.4]" />
                    New task
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs lg:grid-cols-12">
                <label className="relative lg:col-span-6">
                    <span className="sr-only">Search tasks by title, project, or assignee</span>
                    <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search by task, project, or assignee"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                </label>

                <label className="lg:col-span-3">
                    <span className="sr-only">Filter by project</span>
                    <select
                        value={projectFilter}
                        onChange={(e) => setProjectFilter(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    >
                        <option value="all">All projects</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.title}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="lg:col-span-3">
                    <span className="sr-only">Filter by assignee</span>
                    <select
                        value={assigneeFilter}
                        onChange={(e) => setAssigneeFilter(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    >
                        <option value="all">All assignees</option>
                        {teamAvatars.map((assignee) => (
                            <option key={assignee.id} value={assignee.id}>
                                {assignee.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                {boardColumns.map((column) => {
                    const columnTasks = filteredTasks.filter((task) => task.status === column.status);

                    return (
                        <section
                            key={column.status}
                            className="min-h-[280px] rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 shadow-xs"
                        >
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${column.accentClass}`} />
                                        <h2 className="text-sm font-black text-slate-900">{column.title}</h2>
                                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                                            {columnTasks.length}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                                        {column.helper}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {columnTasks.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-4 text-center text-xs font-medium text-slate-500">
                                        No tasks match this column and filter.
                                    </div>
                                ) : (
                                    columnTasks.map((task) => (
                                        <article
                                            key={task.id}
                                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-indigo-200 hover:shadow-md"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-sm font-bold leading-snug text-slate-900">
                                                        {task.title}
                                                    </h3>
                                                    <p className="mt-1 text-[11px] font-semibold text-indigo-600">
                                                        {task.projectName}
                                                    </p>
                                                </div>
                                                {task.isUrgent && task.status !== 'Done' ? (
                                                    <span className="shrink-0 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 ring-1 ring-rose-100">
                                                        Overdue
                                                    </span>
                                                ) : null}
                                            </div>

                                            {task.description ? (
                                                <p className="mt-2 max-h-10 overflow-hidden text-xs leading-relaxed text-slate-500">
                                                    {task.description}
                                                </p>
                                            ) : null}

                                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-slate-200">
                                                        <Image
                                                            src={task.assignee.avatarUrl}
                                                            alt={task.assignee.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="28px"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-bold text-slate-800">{task.assignee.name}</p>
                                                        <p className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                                                            <CalendarIcon className="h-3 w-3" />
                                                            {task.dueDate}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => onEditTask(task)}
                                                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <label>
                                                        <span className="sr-only">Change status for {task.title}</span>
                                                        <select
                                                            value={task.status}
                                                            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                                                            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                                        >
                                                            <option value="To Do">To Do</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Done">Done</option>
                                                        </select>
                                                    </label>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>
                        </section>
                    );
                })}
            </div>
        </section>
    );
};
