'use client';

import React from 'react';
import { Project } from '@/types';
import { 
  LaptopIcon, 
  SmartphoneIcon, 
  MegaphoneIcon, 
  CalendarIcon, 
  TaskBoardIcon, 
  ArrowRightIcon 
} from '@/components/icons/Index';
import Image from 'next/image';

interface ActiveProjectsProps {
  projects: Project[];
  onViewTaskBoard?: () => void;
}

export const ActiveProjects: React.FC<ActiveProjectsProps> = ({
  projects,
  onViewTaskBoard,
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
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Active projects</h2>
          <button className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline">
            <span>View all projects</span>
            <ArrowRightIcon className="w-3 h-3" />
          </button>
        </div>

        {/* List of Project Cards */}
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-slate-200/80 rounded-xl p-3 sm:p-3.5 hover:border-slate-300 hover:shadow-2xs transition-all duration-150 bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Left: Icon & Project Meta */}
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-9 h-9 rounded-xl ${project.iconBgColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {getProjectIcon(project.iconType)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-normal max-w-sm">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right: Owner, Due Date, Progress */}
                <div className="grid grid-cols-3 md:flex items-center gap-3 sm:gap-5 pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                  {/* Owner Column */}
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1">Owner</span>
                    <div className="flex items-center -space-x-1.5">
                      {project.owners.map((owner) => (
                        <div
                          key={owner.id}
                          className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden shadow-xs ring-1 ring-slate-100"
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
                      {project.extraOwnersCount && (
                        <div className="relative w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600 shadow-xs ring-1 ring-slate-100">
                          +{project.extraOwnersCount}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Due Date Column */}
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1">Due date</span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                      <CalendarIcon className="w-3 h-3 text-slate-400" />
                      <span>{project.dueDate}</span>
                    </div>
                  </div>

                  {/* Progress Column */}
                  <div className="min-w-[90px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-[10px] font-semibold text-slate-400">Progress</span>
                      <span className="font-bold text-indigo-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${project.progressBarColor}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <button
        onClick={onViewTaskBoard}
        className="w-full mt-3.5 py-2.5 px-3 bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 rounded-lg text-indigo-600 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
      >
        <TaskBoardIcon className="w-3.5 h-3.5 text-indigo-600 stroke-[2]" />
        <span>View task board</span>
      </button>
    </div>
  );
};
