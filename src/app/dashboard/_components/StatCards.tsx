import React from 'react';

interface StatCardsProps {
  activeProjectsCount: number;
  totalTasksCount: number;
  overdueTasksCount: number;
  completedTasksCount: number;
}

export const StatCards: React.FC<StatCardsProps> = ({
  activeProjectsCount,
  totalTasksCount,
  overdueTasksCount,
  completedTasksCount,
}) => {
  const stats = [
    {
      label: 'Active projects',
      value: activeProjectsCount,
      subtitle: `${activeProjectsCount} currently active`,
    },
    {
      label: 'Total tasks',
      value: totalTasksCount,
      subtitle: 'Across all projects',
    },
    {
      label: 'Overdue',
      value: overdueTasksCount,
      subtitle: overdueTasksCount > 0 ? 'Need attention' : 'All on track',
    },
    {
      label: 'Completed',
      value: completedTasksCount,
      subtitle: 'Tasks finished',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-gray-200 rounded-[24px] p-5 bg-white transition-all hover:border-gray-300"
        >

          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {stat.label}
          </p>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            {stat.value}
          </h3>
          <p className="text-[12px] text-gray-400 mt-1">
            {stat.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
};
