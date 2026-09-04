'use client';

import React, { useState, useRef } from 'react';
import { TaskItem, UserAvatar, Project, TaskStatus, TaskPriority, TaskAttachment } from '@/types';
import { CloseIcon, FileIcon } from '@/components/Icon';
import { CustomSelect } from '@/components/CustomSelect';
import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/Button';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<TaskItem, 'id' | 'completed'>) => void;
  projects: Project[];
  teamAvatars: UserAvatar[];
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  projects,
  teamAvatars,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [selectedAssigneeId, setSelectedAssigneeId] = useState(teamAvatars[0]?.id || '');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<TaskStatus>('To Do');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);

  if (!isOpen) return null;

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newAttachments: TaskAttachment[] = files.map((file) => {
        let type: TaskAttachment['type'] = 'file';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type.includes('pdf')) type = 'pdf';
        else if (file.name.endsWith('.zip')) type = 'zip';
        else if (file.name.endsWith('.ts') || file.name.endsWith('.js')) type = 'code';
        const formattedSize = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;
        return {
          id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          name: file.name, size: formattedSize, type,
        };
      });
      setAttachments((prev) => [...prev, ...newAttachments]);
    }
  };

  const handleRemoveAttachment = (id: string) => setAttachments((prev) => prev.filter((a) => a.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const project = projects.find((p) => p.id === selectedProjectId) || projects[0];
    const assignee = teamAvatars.find((u) => u.id === selectedAssigneeId) || teamAvatars[0];
    const isUrgent = priority === 'Urgent' || priority === 'High';

    onAddTask({
      title, projectName: project.title, assignee,
      dueDate: dueDate || 'May 29', dueStatus: isUrgent ? 'Tomorrow' : 'In 5 days',
      isUrgent, status, description, priority, attachments,
    });

    setTitle(''); setDescription(''); setDueDate(''); setPriority('Medium'); setAttachments([]); setStatus('To Do');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] max-w-lg w-full p-6 border border-gray-200 max-h-[90vh] overflow-y-auto shadow-xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-gray-900">New Task</h3>
          <button onClick={onClose} className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Title <span className="text-red-400">*</span></label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Design hero section"
              className="w-full border border-gray-200 rounded-[20px] px-3.5 py-2 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors" />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
            <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add task notes..."
              className="w-full border border-gray-200 rounded-[20px] px-3.5 py-2 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none" />
          </div>

          {/* Files */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Files ({attachments.length})</label>
              <button type="button" onClick={() => fileInputRef.current?.click()}
                className="text-gray-500 hover:text-gray-700 text-[12px] font-medium flex items-center gap-1">
                <FileIcon className="w-3.5 h-3.5" /> Upload
              </button>
            </div>
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInputChange} />
            {attachments.length > 0 && (
              <div className="space-y-1.5 mt-1.5">
                {attachments.map((att) => (
                  <div key={att.id} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-[20px] text-[12px]">
                    <span className="truncate font-medium text-gray-700">{att.name}</span>
                    <button type="button" onClick={() => handleRemoveAttachment(att.id)} className="text-gray-400 hover:text-red-500 p-0.5">
                      <CloseIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Priority</label>
            <div className="grid grid-cols-4 gap-1.5">
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

          {/* Project & Assignee */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Project</label>
            <CustomSelect
              options={projects.map((p) => ({ value: p.id, label: p.title }))}
              value={selectedProjectId}
              onChange={setSelectedProjectId}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Assignee</label>
              <CustomSelect
                options={teamAvatars.map((u) => ({ value: u.id, label: u.name, avatarUrl: u.avatarUrl }))}
                value={selectedAssigneeId}
                onChange={setSelectedAssigneeId}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Due Date</label>
              <DatePicker value={dueDate} onChange={setDueDate} placeholder="Select due date..." />
            </div>

          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
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

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
            <Button type="button" variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Create
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
