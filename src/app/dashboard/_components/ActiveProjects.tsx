'use client';

import React from 'react';
import { Project } from '@/types';
import {
  LaptopIcon,
  SmartphoneIcon,
  MegaphoneIcon,
  ArrowRightIcon,
} from '@/components/Icon';
import { Button } from '@/components/Button';
import Image from 'next/image';

interface ActiveProjectsProps {
  projects: Project[];
  onViewTaskBoard?: () => void;
  onSelectProject?: (projectTitle: string) => void;
}

export const ActiveProjects: React.FC<ActiveProjectsProps> = ({
  projects,
  onViewTaskBoard,
  onSelectProject,
}) => {
  const getProjectIcon = (type: Project['iconType']) => {
    switch (type) {
      case 'laptop':
        return <LaptopIcon className="w-4 h-4" />;
      case 'smartphone':
        return <SmartphoneIcon className="w-4 h-4" />;
      case 'megaphone':
        return <MegaphoneIcon className="w-4 h-4" />;
      default:
        return <LaptopIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-[24px] p-5 bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-gray-900">Active projects</h2>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowRightIcon className="w-3 h-3" />}
          iconPosition="right"
          onClick={onViewTaskBoard}
          className="text-gray-400 hover:text-gray-600"
        >
          View all
        </Button>
      </div>

      {/* Project List */}
      <div className="space-y-1 flex-1">
        {projects.map((project) => {
          const isAtRisk = project.progress < 40;
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject && onSelectProject(project.title)}
              className="flex items-center justify-between py-2.5 px-3 rounded-[16px] hover:bg-gray-50 border border-transparent hover:border-gray-200 cursor-pointer transition-all group"
            >
              {/* Left: Icon & Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-[12px] bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-gray-200 transition-colors">
                  {getProjectIcon(project.iconType)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-semibold text-gray-900 truncate group-hover:text-gray-700">
                      {project.title}
                    </h3>
                    <span
                      className={`px-1.5 py-0.2 text-[10px] font-semibold rounded border ${
                        isAtRisk
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {isAtRisk ? 'At Risk' : 'On Track'}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    Due {project.dueDate}
                  </p>
                </div>
              </div>

              {/* Right: Owners & Progress */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Owners */}
                <div className="flex items-center -space-x-1.5">
                  {project.owners.map((owner) => (
                    <div
                      key={owner.id}
                      className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                      title={owner.name}
                    >
                      <Image
                        src={owner.avatarUrl}
                        alt={owner.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 min-w-[80px]">
                  <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gray-900 transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 w-7 text-right">
                    {project.progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
