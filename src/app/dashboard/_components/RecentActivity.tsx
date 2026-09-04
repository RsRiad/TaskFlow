'use client';

import React from 'react';
import { ActivityItem } from '@/types';
import {
  CheckCircleIcon,
  CommentBadgeIcon,
  FileIcon,
  CalendarBadgeIcon,
  ArrowRightIcon
} from '@/components/icons/Index';
import Image from 'next/image';

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const renderBadge = (type: ActivityItem['badgeType']) => {
    switch (type) {
      case 'check':
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white">
            <CheckCircleIcon className="w-2 h-2 stroke-[3]" />
          </div>
        );
      case 'comment':
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-indigo-500 text-white flex items-center justify-center ring-2 ring-white">
            <CommentBadgeIcon className="w-2 h-2 stroke-[2.5]" />
          </div>
        );
      case 'file':
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-teal-500 text-white flex items-center justify-center ring-2 ring-white">
            <FileIcon className="w-2 h-2 stroke-[2.5]" />
          </div>
        );
      case 'calendar':
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white flex items-center justify-center ring-2 ring-white">
            <CalendarBadgeIcon className="w-2 h-2 stroke-[2.5]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent activity</h2>
        <button className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline">
          <span>View all activity</span>
          <ArrowRightIcon className="w-3 h-3" />
        </button>
      </div>

      {/* Activity Cards Horizontal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:shadow-2xs transition-all bg-slate-50/50"
          >
            {/* Avatar with Badge */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-200">
              <Image
                src={act.actorAvatar}
                alt={act.actor}
                fill
                className="object-cover"
                sizes="32px"
              />
              {renderBadge(act.badgeType)}
            </div>

            {/* Activity Text */}
            <div className="flex-1 min-w-0" >
              <p className="text-[11px] text-slate-600 leading-snug">
                <span className="font-semibold text-slate-900">{act.actor}</span>{' '}
                {act.actionText} in{' '}
                <span className="font-semibold text-slate-800">{act.targetText}</span>
              </p>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                {act.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
