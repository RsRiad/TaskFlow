'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UserAvatar, TaskItem } from '@/types';
import { Button } from '@/components/Button';
import {
  PlusIcon,
  SearchIcon,
  CloseIcon,
  ArrowRightIcon,
  CheckIcon,
} from '@/components/Icon';

interface TeamViewProps {
  teamAvatars: UserAvatar[];
  tasks: TaskItem[];
  onSelectMemberFilter: (memberId: string) => void;
  onAddTeamMember: (newMember: UserAvatar) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  teamAvatars,
  tasks,
  onSelectMemberFilter,
  onAddTeamMember,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'designer' | 'developer' | 'lead' | 'marketing'>('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Invite Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  // Filter members
  const filteredMembers = teamAvatars.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.role && m.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesRole = true;
    if (roleFilter === 'designer') matchesRole = !!(m.role && m.role.toLowerCase().includes('design'));
    if (roleFilter === 'developer') matchesRole = !!(m.role && (m.role.toLowerCase().includes('dev') || m.role.toLowerCase().includes('engineer')));
    if (roleFilter === 'lead') matchesRole = !!(m.role && m.role.toLowerCase().includes('lead'));
    if (roleFilter === 'marketing') matchesRole = !!(m.role && m.role.toLowerCase().includes('marketing'));

    return matchesSearch && matchesRole;
  });

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Pick a random pleasant Unsplash avatar
    const sampleAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ];
    const randomAvatar = sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)];

    const newMember: UserAvatar = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Team Member',
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@taskflow.app`,
      avatarUrl: randomAvatar,
    };

    onAddTeamMember(newMember);
    setName('');
    setRole('');
    setEmail('');
    setIsInviteModalOpen(false);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-900">Team Members</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Manage team roles and view individual task assignments
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<PlusIcon className="w-3.5 h-3.5" />}
          onClick={() => setIsInviteModalOpen(true)}
        >
          Invite member
        </Button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-[24px] p-5 bg-white">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Team Members
          </p>
          <h3 className="text-2xl font-bold text-gray-900">{teamAvatars.length}</h3>
          <p className="text-[12px] text-gray-400 mt-1">Active contributors in workspace</p>
        </div>

        <div className="border border-gray-200 rounded-[24px] p-5 bg-white">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Total Assigned Tasks
          </p>
          <h3 className="text-2xl font-bold text-gray-900">{tasks.length}</h3>
          <p className="text-[12px] text-gray-400 mt-1">Distributed across team</p>
        </div>

        <div className="border border-gray-200 rounded-[24px] p-5 bg-white">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Pending Tasks
          </p>
          <h3 className="text-2xl font-bold text-gray-900">
            {tasks.filter((t) => !t.completed).length}
          </h3>
          <p className="text-[12px] text-gray-400 mt-1">Across all team members</p>
        </div>
      </div>

      {/* Search & Role Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-gray-200 rounded-[24px] p-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <SearchIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member by name, role, email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full text-[12px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Role Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Team' },
            { id: 'lead', label: 'Leads' },
            { id: 'designer', label: 'Designers' },
            { id: 'developer', label: 'Developers' },
            { id: 'marketing', label: 'Marketing' },
          ].map((roleItem) => {
            const isActive = roleFilter === roleItem.id;
            return (
              <button
                key={roleItem.id}
                type="button"
                onClick={() => setRoleFilter(roleItem.id as typeof roleFilter)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors shrink-0 ${isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {roleItem.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredMembers.map((member) => {
          // Tasks assigned to this member
          const memberTasks = tasks.filter(
            (t) => t.assignee.id === member.id || t.assignee.name === member.name
          );
          const activeCount = memberTasks.filter((t) => !t.completed).length;
          const overdueCount = memberTasks.filter((t) => t.isUrgent && !t.completed).length;

          return (
            <div
              key={member.id}
              className="border border-gray-200 rounded-[24px] p-6 bg-white flex flex-col justify-between space-y-5 hover:border-gray-300 shadow-sm transition-all group"
            >
              <div className="space-y-4">
                {/* Avatar */}
                <div className="relative inline-block">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
                    <Image
                      src={member.avatarUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  {/* Active dot */}
                  <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white absolute bottom-0 right-0" />
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[12px] font-medium text-gray-500 mt-0.5">
                    {member.role || 'Team Contributor'}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 truncate">
                    {member.email || `${member.name.toLowerCase().replace(/\s+/g, '.')}@taskflow.app`}
                  </p>
                </div>

                {/* Tasks Overview Stats */}
                <div className="p-3.5 bg-gray-50/80 border border-gray-200/80 rounded-[20px] space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500">Active tasks</span>
                    <span className="font-semibold text-gray-900">{activeCount}</span>
                  </div>
                  {overdueCount > 0 && (
                    <div className="flex items-center justify-between text-[11px] text-red-600 font-medium">
                      <span>Overdue items</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-red-100 text-red-700 font-bold">{overdueCount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-gray-100">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ArrowRightIcon className="w-3 h-3" />}
                  iconPosition="right"
                  className="w-full justify-center"
                  onClick={() => onSelectMemberFilter(member.id)}
                >
                  View Tasks
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 transition-opacity"
          onClick={() => setIsInviteModalOpen(false)}
        >
          <div
            className="bg-white rounded-[24px] max-w-md w-full p-6 border border-gray-200 shadow-xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-[15px] font-semibold text-gray-900">Invite Team Member</h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  className="w-full border border-gray-200 rounded-[20px] px-3.5 py-2 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. UI/UX Designer or Backend Engineer"
                  className="w-full border border-gray-200 rounded-[20px] px-3.5 py-2 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jordan@taskflow.app"
                  className="w-full border border-gray-200 rounded-[20px] px-3.5 py-2 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <Button type="button" variant="secondary" size="md" onClick={() => setIsInviteModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Send Invite
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
