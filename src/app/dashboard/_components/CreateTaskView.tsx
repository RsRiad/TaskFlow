'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project, TaskItem, TaskStatus, UserAvatar } from '@/types';
import {
    CalendarIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ProjectsIcon,
    TeamIcon,
} from '@/components/icons/Index';

interface CreateTaskViewProps {
    projects: Project[];
    teamAvatars: UserAvatar[];
    onBack: () => void;
    onAddTask: (task: Omit<TaskItem, 'id' | 'completed'>) => void;
    onUpdateTask?: (task: TaskItem) => void;
    initialTask?: TaskItem | null;
}

export const CreateTaskView: React.FC<CreateTaskViewProps> = ({
    projects,
    teamAvatars,
    onBack,
    onAddTask,
    onUpdateTask,
    initialTask,
}) => {
    const [title, setTitle] = useState(initialTask?.title || 'Prepare launch presentation');
    const [description, setDescription] = useState(
        initialTask?.description || 'Add presentation slides and speaker notes for the client review.'
    );
    const [selectedProjectId, setSelectedProjectId] = useState(
        projects.find((p) => p.title === initialTask?.projectName)?.id ||
        projects.find((p) => p.title.toLowerCase().includes('mobile'))?.id ||
        projects[0]?.id ||
        ''
    );
    const [selectedAssigneeId, setSelectedAssigneeId] = useState(
        initialTask?.assignee.id || teamAvatars[0]?.id || ''
    );
    const [dueDate, setDueDate] = useState(initialTask?.dueDate || 'Jun 12, 2025');
    const [status, setStatus] = useState<TaskStatus>(initialTask?.status || 'To Do');

    const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
    const selectedAssignee = teamAvatars.find((u) => u.id === selectedAssigneeId) || teamAvatars[0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const taskPayload = {
            title: title.trim(),
            projectName: selectedProject ? selectedProject.title : 'Mobile app launch',
            assignee: selectedAssignee || teamAvatars[0],
            dueDate: dueDate || 'Jun 12, 2025',
            dueStatus: initialTask?.dueStatus || 'In 5 days',
            isUrgent: initialTask?.isUrgent || false,
            status,
            description,
        };

        if (initialTask && onUpdateTask) {
            onUpdateTask({
                ...initialTask,
                ...taskPayload,
                completed: status === 'Done',
            });
        } else {
            onAddTask(taskPayload);
        }

        onBack();
    };

    return (
        <div className="w-full space-y-4 animate-fade-in">
            <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {initialTask ? 'Edit task' : 'Create a new task'}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                    {initialTask
                        ? 'Update the project, owner, date, or status for this task.'
                        : 'Add the details your team needs to get started.'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Task title <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Prepare launch presentation"
                                className="w-full bg-white border-2 border-indigo-600 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none ring-2 ring-indigo-500/20 transition-all shadow-2xs font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add presentation slides and speaker notes for the client review."
                                className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-2xs resize-y"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                    Project <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <ProjectsIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none stroke-[1.8]" />
                                    <select
                                        value={selectedProjectId}
                                        onChange={(e) => setSelectedProjectId(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-8 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all appearance-none shadow-2xs"
                                    >
                                        {projects.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.title}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                    Assignee <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full overflow-hidden pointer-events-none border border-slate-200">
                                        <Image
                                            src={selectedAssignee?.avatarUrl || teamAvatars[0].avatarUrl}
                                            alt={selectedAssignee?.name || 'Assignee'}
                                            fill
                                            className="object-cover"
                                            sizes="20px"
                                        />
                                    </div>
                                    <select
                                        value={selectedAssigneeId}
                                        onChange={(e) => setSelectedAssigneeId(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-8 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all appearance-none shadow-2xs"
                                    >
                                        {teamAvatars.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                    Due date <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none stroke-[1.8]" />
                                    <input
                                        type="text"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        placeholder="Jun 12, 2025"
                                        className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-8 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-2xs"
                                    />
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                    Status <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600 pointer-events-none" />
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as TaskStatus)}
                                        className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-8 pr-8 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all appearance-none shadow-2xs"
                                    >
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-4">
                            <button
                                type="button"
                                onClick={onBack}
                                className="px-4 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 bg-white border border-slate-200/90 rounded-lg transition-all shadow-2xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {initialTask ? 'Save changes' : 'Create task'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-4 space-y-3.5">
                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3.5">
                        <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                            Task summary
                        </h3>

                        <div className="flex items-start gap-3 pt-2.5 border-t border-slate-100">
                            <div className="w-4 h-4 text-slate-400 shrink-0 mt-0.5">
                                <ProjectsIcon className="w-4 h-4 stroke-[1.8]" />
                            </div>
                            <div>
                                <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Project</span>
                                <span className="text-xs font-bold text-slate-900">
                                    {selectedProject ? selectedProject.title : 'Mobile app launch'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 pt-2.5 border-t border-slate-100">
                            <div className="w-4 h-4 text-slate-400 shrink-0 mt-0.5">
                                <TeamIcon className="w-4 h-4 stroke-[1.8]" />
                            </div>
                            <div className="flex-1">
                                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Assignee</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-200 shrink-0">
                                        <Image
                                            src={selectedAssignee?.avatarUrl || teamAvatars[0].avatarUrl}
                                            alt={selectedAssignee?.name || 'Assignee'}
                                            fill
                                            className="object-cover"
                                            sizes="20px"
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-slate-900">
                                        {selectedAssignee ? selectedAssignee.name : 'Priya Shah'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 pt-2.5 border-t border-slate-100">
                            <div className="w-4 h-4 text-slate-400 shrink-0 mt-0.5">
                                <CalendarIcon className="w-4 h-4 stroke-[1.8]" />
                            </div>
                            <div>
                                <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Due date</span>
                                <span className="text-xs font-bold text-slate-900">{dueDate}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 pt-2.5 border-t border-slate-100">
                            <div className="w-4 h-4 shrink-0 flex items-center justify-center mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-blue-600" />
                            </div>
                            <div>
                                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Status</span>
                                <span className="inline-block bg-slate-100 text-slate-800 font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                                    {status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-50/50 border border-emerald-100/90 rounded-xl p-3 flex items-center gap-2.5 text-emerald-900 shadow-2xs">
                        <div className="w-7 h-7 rounded-full border border-teal-200/80 bg-white text-teal-600 flex items-center justify-center shrink-0 shadow-2xs">
                            <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2]" />
                        </div>
                        <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                            {initialTask ? 'Saved changes update the board immediately.' : 'New tasks appear on the board immediately.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
