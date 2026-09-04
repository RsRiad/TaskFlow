'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Project, TaskItem, TaskStatus, TaskPriority, TaskAttachment, TaskChecklistItem, UserAvatar } from '@/types';
import { ChevronDownIcon, FileIcon, CloseIcon, PlusIcon, ArrowRightIcon } from '@/components/Icon';
import { CustomSelect, CustomSelectOption } from '@/components/CustomSelect';
import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/Button';

interface CreateTaskViewProps {
    projects: Project[];
    teamAvatars: UserAvatar[];
    onBack: () => void;
    onAddTask: (task: Omit<TaskItem, 'id' | 'completed'>) => void;
    onUpdateTask?: (task: TaskItem) => void;
    initialTask?: TaskItem | null;
}

const DEFAULT_PRESET_TAGS = ['Marketing', 'Design', 'Strategy', 'Development', 'Client Review', 'Operations', 'Finance', 'Review'];

export const CreateTaskView: React.FC<CreateTaskViewProps> = ({
    projects,
    teamAvatars,
    onBack,
    onAddTask,
    onUpdateTask,
    initialTask,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [title, setTitle] = useState(initialTask?.title || '');
    const [description, setDescription] = useState(initialTask?.description || '');
    const [selectedProjectId, setSelectedProjectId] = useState(
        projects.find((p) => p.title === initialTask?.projectName)?.id || projects[0]?.id || ''
    );
    const [selectedAssigneeId, setSelectedAssigneeId] = useState(
        initialTask?.assignee.id || teamAvatars[0]?.id || ''
    );
    const [dueDate, setDueDate] = useState(initialTask?.dueDate || '');
    const [status, setStatus] = useState<TaskStatus>(initialTask?.status || 'To Do');
    const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority || 'Medium');
    const [estimatedHours, setEstimatedHours] = useState<number | ''>(initialTask?.estimatedHours || '');

    // Attachments
    const [attachments, setAttachments] = useState<TaskAttachment[]>(initialTask?.attachments || []);
    const [isDragging, setIsDragging] = useState(false);

    // Tags
    const [availableTags, setAvailableTags] = useState<string[]>(() => {
        const merged = new Set([...DEFAULT_PRESET_TAGS, ...(initialTask?.tags || [])]);
        return Array.from(merged);
    });
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTask?.tags || []);
    const [customTagInput, setCustomTagInput] = useState('');

    const handleAddCustomTag = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const cleanTag = customTagInput.trim();
        if (!cleanTag) return;
        if (!availableTags.includes(cleanTag)) setAvailableTags((prev) => [...prev, cleanTag]);
        if (!selectedTags.includes(cleanTag)) setSelectedTags((prev) => [...prev, cleanTag]);
        setCustomTagInput('');
    };

    // Checklist
    const [checklist, setChecklist] = useState<TaskChecklistItem[]>(initialTask?.checklist || []);
    const [newChecklistText, setNewChecklistText] = useState('');

    const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
    const selectedAssignee = teamAvatars.find((u) => u.id === selectedAssigneeId) || teamAvatars[0];

    // File handlers
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processFiles(Array.from(e.dataTransfer.files));
    };
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) processFiles(Array.from(e.target.files));
    };

    const processFiles = (files: File[]) => {
        const newAttachments: TaskAttachment[] = files.map((file) => {
            let type: TaskAttachment['type'] = 'file';
            if (file.type.startsWith('image/')) type = 'image';
            else if (file.type.includes('pdf')) type = 'pdf';
            else if (file.name.endsWith('.zip') || file.name.endsWith('.tar')) type = 'zip';
            else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.js') || file.name.endsWith('.json')) type = 'code';
            const formattedSize = file.size > 1024 * 1024
                ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                : `${Math.round(file.size / 1024)} KB`;
            return {
                id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
                name: file.name, size: formattedSize, type,
            };
        });
        setAttachments((prev) => [...prev, ...newAttachments]);
    };

    const handleRemoveAttachment = (id: string) => setAttachments((prev) => prev.filter((a) => a.id !== id));
    const handleToggleTag = (tag: string) => setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

    // Checklist handlers
    const handleAddChecklistItem = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newChecklistText.trim()) return;
        setChecklist((prev) => [...prev, { id: `chk-${Date.now()}`, text: newChecklistText.trim(), completed: false }]);
        setNewChecklistText('');
    };
    const handleToggleChecklistItem = (id: string) => setChecklist((prev) => prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c)));
    const handleRemoveChecklistItem = (id: string) => setChecklist((prev) => prev.filter((c) => c.id !== id));

    // Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        const isUrgent = priority === 'Urgent' || priority === 'High';
        const taskPayload = {
            title: title.trim(),
            projectName: selectedProject ? selectedProject.title : 'Website redesign',
            assignee: selectedAssignee || teamAvatars[0],
            dueDate: dueDate || 'Jun 12, 2025',
            dueStatus: isUrgent ? 'Tomorrow' : 'In 5 days',
            isUrgent, status, description, priority, attachments,
            tags: selectedTags,
            estimatedHours: typeof estimatedHours === 'number' ? estimatedHours : undefined,
            checklist,
        };

        if (initialTask && onUpdateTask) {
            onUpdateTask({ ...initialTask, ...taskPayload, completed: status === 'Done' });
        } else {
            onAddTask(taskPayload);
        }
        onBack();
    };

    const getFileIcon = (type: TaskAttachment['type']) => {
        switch (type) {
            case 'image': return '🖼️';
            case 'pdf': return '📄';
            case 'code': return '💻';
            case 'zip': return '📦';
            default: return '📎';
        }
    };

    return (
        <div className="w-full space-y-4 animate-fade-in">
            {/* Page Title & Back Action */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-semibold text-gray-900">
                        {initialTask ? 'Edit task' : 'Create a new task'}
                    </h1>
                    <p className="text-[13px] text-gray-400 mt-0.5">
                        {initialTask ? 'Update task details and settings.' : 'Fill in the details to create a new task.'}
                    </p>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon={<ArrowRightIcon className="w-3.5 h-3.5 rotate-180" />}
                    onClick={onBack}
                >
                    Back
                </Button>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Left: Form */}
                <div className="lg:col-span-8 border border-gray-200 rounded-[24px] p-6 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Task title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Design responsive homepage component"
                                className="w-full border border-gray-200 rounded-[16px] px-3.5 py-2.5 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add specifications, requirements, or instructions..."
                                className="w-full border border-gray-200 rounded-[16px] p-3.5 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-y"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                    Attachments ({attachments.length})
                                </label>
                                <span className="text-[11px] text-gray-400">PNG, JPG, PDF, ZIP up to 25MB</span>
                            </div>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border border-dashed rounded-[20px] p-5 text-center cursor-pointer transition-colors ${

                                    isDragging ? 'border-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInputChange} />
                                <div className="flex flex-col items-center gap-1">
                                    <FileIcon className="w-5 h-5 text-gray-400" />
                                    <p className="text-[13px] text-gray-500">
                                        Drop files here or <span className="font-medium text-gray-700">browse</span>
                                    </p>
                                </div>
                            </div>

                            {attachments.length > 0 && (
                                <div className="mt-2 space-y-1.5">
                                    {attachments.map((att) => (
                                        <div key={att.id} className="flex items-center justify-between p-2 rounded-[14px] border border-gray-200">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="text-sm shrink-0">{getFileIcon(att.type)}</span>
                                                <div className="min-w-0">
                                                    <p className="text-[12px] font-medium text-gray-800 truncate">{att.name}</p>
                                                    <span className="text-[10px] text-gray-400">{att.size}</span>
                                                </div>
                                            </div>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); handleRemoveAttachment(att.id); }}
                                                className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                                                <CloseIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Priority
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {(['Low', 'Medium', 'High', 'Urgent'] as TaskPriority[]).map((p) => (
                                    <Button
                                        key={p}
                                        type="button"
                                        variant={priority === p ? 'primary' : 'secondary'}
                                        size="sm"
                                        onClick={() => setPriority(p)}
                                        className="w-full justify-center"
                                    >
                                        {p}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {availableTags.map((tag) => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <Button
                                            key={tag}
                                            type="button"
                                            variant={isSelected ? 'primary' : 'secondary'}
                                            size="sm"
                                            onClick={() => handleToggleTag(tag)}
                                        >
                                            {isSelected && <span className="mr-1">✓</span>}
                                            {tag}
                                        </Button>
                                    );
                                })}
                            </div>
                            <div className="flex items-center gap-2 max-w-md">
                                <input
                                    type="text"
                                    value={customTagInput}
                                    onChange={(e) => setCustomTagInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomTag(); } }}
                                    placeholder="Add custom tag..."
                                    className="flex-1 border border-gray-200 rounded-[14px] px-3 py-1.5 text-[12px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    icon={<PlusIcon className="w-3 h-3" />}
                                    onClick={handleAddCustomTag}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                Checklist ({checklist.filter(c => c.completed).length}/{checklist.length})
                            </label>
                            <div className="space-y-1.5 mb-2">
                                {checklist.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-2 rounded-[14px] border border-gray-200">
                                        <label className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1">
                                            <input type="checkbox" checked={item.completed} onChange={() => handleToggleChecklistItem(item.id)}
                                                className="w-3.5 h-3.5 rounded border-gray-300 text-gray-900 focus:ring-gray-400" />
                                            <span className={`text-[12px] ${item.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                                {item.text}
                                            </span>
                                        </label>
                                        <button type="button" onClick={() => handleRemoveChecklistItem(item.id)}
                                            className="text-gray-400 hover:text-red-500 p-0.5 transition-colors">
                                            <CloseIcon className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={newChecklistText}
                                    onChange={(e) => setNewChecklistText(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddChecklistItem(); } }}
                                    placeholder="Add checklist item..."
                                    className="flex-1 border border-gray-200 rounded-[14px] px-3 py-1.5 text-[12px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    icon={<PlusIcon className="w-3 h-3" />}
                                    onClick={handleAddChecklistItem}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        {/* Meta Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Project</label>
                                <CustomSelect
                                    options={projects.map((p) => ({ value: p.id, label: p.title }))}
                                    value={selectedProjectId}
                                    onChange={setSelectedProjectId}
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Assignee</label>
                                <CustomSelect
                                    options={teamAvatars.map((u) => ({ value: u.id, label: u.name, avatarUrl: u.avatarUrl }))}
                                    value={selectedAssigneeId}
                                    onChange={setSelectedAssigneeId}
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Due date</label>
                                <DatePicker value={dueDate} onChange={setDueDate} placeholder="Select due date..." />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
                                <CustomSelect
                                    options={[
                                        { value: 'To Do', label: 'To Do' },
                                        { value: 'In Progress', label: 'In Progress' },
                                        { value: 'Done', label: 'Done' },
                                    ]}
                                    value={status}
                                    onChange={(v) => setStatus(v as TaskStatus)}
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Est. hours</label>
                                <input type="number" min={1} max={100} value={estimatedHours}
                                    onChange={(e) => setEstimatedHours(e.target.value === '' ? '' : (parseInt(e.target.value) || 0))}
                                    placeholder="e.g. 4"
                                    className="w-full border border-gray-200 rounded-[16px] py-2 px-3 text-[13px] text-gray-800 focus:outline-none focus:border-gray-400 transition-colors" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
                            <Button type="button" variant="secondary" size="md" onClick={onBack}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" size="md">
                                {initialTask ? 'Save changes' : 'Create task'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Right: Summary */}
                <div className="lg:col-span-4 space-y-3">
                    <div className="border border-gray-200 rounded-[24px] bg-white p-5 space-y-3">
                        <h3 className="text-[13px] font-semibold text-gray-900">Summary</h3>

                        <div className="pt-2 border-t border-gray-100 space-y-2.5">
                            <div>
                                <span className="text-[11px] text-gray-400 block mb-0.5">Project</span>
                                <span className="text-[13px] font-medium text-gray-900">{selectedProject?.title || '—'}</span>
                            </div>
                            <div>
                                <span className="text-[11px] text-gray-400 block mb-0.5">Assignee</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                                        <Image src={selectedAssignee?.avatarUrl || teamAvatars[0].avatarUrl} alt={selectedAssignee?.name || 'Assignee'} fill className="object-cover" sizes="16px" />
                                    </div>
                                    <span className="text-[13px] font-medium text-gray-900">{selectedAssignee?.name || '—'}</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-[11px] text-gray-400 block mb-0.5">Due date</span>
                                <span className="text-[13px] font-medium text-gray-900">{dueDate || 'Not set'}</span>
                            </div>
                            <div>
                                <span className="text-[11px] text-gray-400 block mb-0.5">Priority</span>
                                <span className="text-[13px] font-medium text-gray-900">{priority}</span>
                            </div>
                            <div>
                                <span className="text-[11px] text-gray-400 block mb-0.5">Files</span>
                                <span className="text-[13px] font-medium text-gray-900">{attachments.length} file{attachments.length === 1 ? '' : 's'}</span>
                            </div>
                        </div>

                        {selectedTags.length > 0 && (
                            <div className="pt-2 border-t border-gray-100">
                                <span className="text-[11px] text-gray-400 block mb-1">Tags</span>
                                <div className="flex flex-wrap gap-1">
                                    {selectedTags.map((tag) => (
                                        <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2.5 py-0.5 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
