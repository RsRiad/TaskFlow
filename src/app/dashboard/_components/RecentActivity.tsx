import React from 'react';
import { ActivityItem } from '@/types';
import { ArrowRightIcon } from '@/components/Icon';
import { Button } from '@/components/Button';
import Image from 'next/image';

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="border border-gray-200 rounded-[24px] p-5 bg-white">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-gray-900">Recent activity</h2>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowRightIcon className="w-3 h-3" />}
          iconPosition="right"
          className="text-gray-400 hover:text-gray-600"
        >
          View all
        </Button>
      </div>


      {/* Activity List */}
      <div className="divide-y divide-gray-100">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            {/* Avatar */}
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
              <Image
                src={act.actorAvatar}
                alt={act.actor}
                fill
                className="object-cover"
                sizes="28px"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-gray-500 leading-relaxed truncate">
                <span className="font-semibold text-gray-900">{act.actor}</span>{' '}
                {act.actionText} in{' '}
                <span className="font-medium text-gray-700">{act.targetText}</span>
              </p>
            </div>

            {/* Time */}
            <span className="text-[11px] text-gray-400 shrink-0">
              {act.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
