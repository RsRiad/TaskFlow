'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Project, TaskItem, TaskStatus, UserAvatar } from '@/types';
import { PlusIcon, SearchIcon, DragGripIcon, DotsHorizontalIcon } from '@/components/Icon';
import { CustomSelect } from '@/components/CustomSelect';
import { Button } from '@/components/Button';

interface TaskBoardProps {
    tasks: TaskItem[];
    projects: Project[];
    teamAvatars: UserAvatar[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onStatusChange: (taskId: string, status: TaskStatus) => void;
    onCreateTask: (status?: TaskStatus) => void;
    onEditTask: (task: TaskItem) => void;
    selectedProjectFilter?: string;
    onProjectFilterChange?: (project: string) => void;
}

const boardColumns: Array<{
    status: TaskStatus;
    title: string;
}> = [
        { status: 'To Do', title: 'To Do' },
        { status: 'In Progress', title: 'In Progress' },
        { status: 'Done', title: 'Done' },
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
    selectedProjectFilter = 'all',
    onProjectFilterChange,
}) => {
    const [projectFilter, setProjectFilter] = useState(selectedProjectFilter);
    const [assigneeFilter, setAssigneeFilter] = useState('all');

    React.useEffect(() => {
        setProjectFilter(selectedProjectFilter);
    }, [selectedProjectFilter]);

    const handleProjectChange = (val: string) => {
        setProjectFilter(val);
        if (onProjectFilterChange) onProjectFilterChange(val);
    };

    // Drag & Drop state
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);
    const [activeMenuTaskId, setActiveMenuTaskId] = useState<string | null>(null);

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

    const handleClearFilters = () => {
        onSearchChange('');
        setProjectFilter('all');
        if (onProjectFilterChange) onProjectFilterChange('all');
        setAssigneeFilter('all');
    };


    const isFiltered = searchQuery !== '' || projectFilter !== 'all' || assigneeFilter !== 'all';

    // Drag and Drop
    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData('text/plain', taskId);
        e.dataTransfer.effectAllowed = 'move';
        setDraggedTaskId(taskId);
    };

    const handleDragEnd = () => {
        setDraggedTaskId(null);
        setDragOverColumn(null);
    };

    const handleDragOver = (e: React.DragEvent, columnStatus: TaskStatus) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverColumn !== columnStatus) {
            setDragOverColumn(columnStatus);
        }
    };

    const handleDragLeave = (e: React.DragEvent, columnStatus: TaskStatus) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX >= rect.right ||
            e.clientY < rect.top ||
            e.clientY >= rect.bottom
        ) {
            if (dragOverColumn === columnStatus) {
                setDragOverColumn(null);
            }
        }
    };

    const handleDrop = (e: React.DragEvent, columnStatus: TaskStatus) => {
        e.preventDefault();
        e.stopPropagation();
        const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
        if (taskId) {
            onStatusChange(taskId, columnStatus);
        }
        setDraggedTaskId(null);
        setDragOverColumn(null);
    };

    return (
        <section className="w-full space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center border border-gray-200 rounded-[24px] p-3.5 bg-white">
                {/* Search */}
                <div className="relative flex-1 min-w-[180px]">
                    <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search tasks"
                        className="w-full rounded-full border border-gray-200 bg-white py-1.5 pl-9 pr-3 text-[13px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
                    />
                </div>


                {/* Project Filter */}
                <div className="w-[150px]">
                    <CustomSelect
                        options={[
                            { value: 'all', label: 'All Projects' },
                            ...projects.map((p) => ({ value: p.title, label: p.title })),
                        ]}
                        value={projectFilter}
                        onChange={handleProjectChange}
                        size="sm"

                    />
                </div>

                {/* Assignee Filter */}
                <div className="w-[150px]">
                    <CustomSelect
                        options={[
                            { value: 'all', label: 'All Assignees' },
                            ...teamAvatars.map((u) => ({ value: u.id, label: u.name, avatarUrl: u.avatarUrl })),
                        ]}
                        value={assigneeFilter}
                        onChange={setAssigneeFilter}
                        size="sm"
                    />
                </div>


                {/* Clear */}
                {isFiltered && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        Clear
                    </Button>
                )}

                
            </div>


            {/* Kanban Columns */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-start">
                {boardColumns.map((column) => {
                    const columnTasks = filteredTasks.filter((task) => task.status === column.status);
                    const isDragTarget = dragOverColumn === column.status;

                    return (
                        <div
                            key={column.status}
                            onDragOver={(e) => handleDragOver(e, column.status)}
                            onDragLeave={(e) => handleDragLeave(e, column.status)}
                            onDrop={(e) => handleDrop(e, column.status)}
                            className={`min-h-[500px] rounded-[24px] border p-3.5 transition-all duration-200 ${isDragTarget
                                    ? 'border-gray-400 bg-gray-50'
                                    : 'border-gray-200 bg-gray-50/50'
                                }`}
                        >
                            {/* Column Header */}
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-[13px] font-semibold text-gray-900">{column.title}</h2>
                                    <span className="text-[11px] font-medium text-gray-500 bg-gray-200/60 rounded-full px-2 py-0.5">
                                        {columnTasks.length}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onCreateTask(column.status)}
                                    className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                                >
                                    <PlusIcon className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {/* Cards */}
                            <div className="space-y-2.5">
                                {columnTasks.length === 0 ? (
                                    <div
                                        className={`rounded-[16px] border border-dashed p-6 text-center text-[12px] text-gray-400 ${isDragTarget ? 'border-gray-400 bg-white' : 'border-gray-200'
                                            }`}
                                    >
                                        {isDragTarget ? 'Drop here' : 'No tasks'}
                                    </div>
                                ) : (
                                    columnTasks.map((task) => {
                                        const isBeingDragged = draggedTaskId === task.id;

                                        return (
                                            <div
                                                key={task.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, task.id)}
                                                onDragEnd={handleDragEnd}
                                                className={`group rounded-[24px] border border-gray-200 bg-white p-3.5 transition-all select-none cursor-grab active:cursor-grabbing hover:border-gray-300 hover:shadow-sm ${
                                                    isBeingDragged ? 'opacity-40 border-dashed border-gray-400 bg-gray-50' : 'opacity-100'
                                                }`}
                                            >

                                                {/* Card header */}
                                                <div className="flex items-start gap-1.5">
                                                    <div className="mt-0.5 text-gray-300 group-hover:text-gray-400 shrink-0 transition-colors">
                                                        <DragGripIcon className="h-3.5 w-3.5" />
                                                    </div>

                                                    <h3 className="flex-1 text-[13px] font-medium leading-snug text-gray-900">
                                                        {task.title}
                                                    </h3>

                                                    <div className="relative shrink-0">
                                                        <button
                                                            type="button"
                                                            onMouseDown={(e) => e.stopPropagation()}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveMenuTaskId(
                                                                    activeMenuTaskId === task.id ? null : task.id
                                                                );
                                                            }}
                                                            className="rounded p-0.5 text-gray-300 hover:bg-gray-100 hover:text-gray-500 transition-colors"
                                                        >
                                                            <DotsHorizontalIcon className="h-3.5 w-3.5" />
                                                        </button>

                                                        {/* Dropdown */}
                                                        {activeMenuTaskId === task.id && (
                                                            <>
                                                                <div
                                                                    className="fixed inset-0 z-10"
                                                                    onClick={() => setActiveMenuTaskId(null)}
                                                                />
                                                                <div className="absolute right-0 top-6 z-20 w-32 rounded-md border border-gray-200 bg-white py-1 shadow-md animate-fade-in">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setActiveMenuTaskId(null);
                                                                            onEditTask(task);
                                                                        }}
                                                                        className="w-full text-left px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <div className="my-0.5 border-t border-gray-100" />
                                                                    <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                                                        Move to
                                                                    </p>
                                                                    {boardColumns
                                                                        .filter((col) => col.status !== task.status)
                                                                        .map((col) => (
                                                                            <button
                                                                                key={col.status}
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setActiveMenuTaskId(null);
                                                                                    onStatusChange(task.id, col.status);
                                                                                }}
                                                                                className="w-full text-left px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50"
                                                                            >
                                                                                {col.title}
                                                                            </button>
                                                                        ))}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Project name */}
                                                <p className="ml-5 mt-1 text-[11px] text-gray-400">
                                                    {task.projectName}
                                                </p>

                                                {/* Card footer */}
                                                <div className="ml-5 mt-2.5 flex items-center justify-between pt-2 border-t border-gray-100">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-gray-200">
                                                            <Image
                                                                src={task.assignee.avatarUrl}
                                                                alt={task.assignee.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="20px"
                                                            />
                                                        </div>
                                                        <span className="text-[11px] font-medium text-gray-700">
                                                            {task.assignee.name}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5">
                                                        {task.isUrgent && !task.completed && (
                                                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-red-50 text-red-600 border border-red-200 shrink-0">
                                                                Overdue
                                                            </span>
                                                        )}
                                                        <span className={`text-[11px] ${task.isUrgent && !task.completed ? 'font-medium text-red-600' : 'text-gray-400'}`}>
                                                            {task.dueDate}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
