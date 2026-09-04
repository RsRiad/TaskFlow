import { Project } from '@/types';
import { teamAvatars } from './team';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Website redesign',
    description: 'Redesign our marketing website for better UX and performance.',
    dueDate: 'May 30, 2025',
    progress: 68,
    iconType: 'laptop',
    iconBgColor: 'bg-slate-100 text-slate-700',
    iconColor: '#475569',
    progressBarColor: 'bg-indigo-600',
    owners: [teamAvatars[0], teamAvatars[1]],
    extraOwnersCount: 1,
  },
  {
    id: 'proj-2',
    title: 'Mobile app launch',
    description: 'Launch our new mobile app on iOS and Android.',
    dueDate: 'Jun 15, 2025',
    progress: 42,
    iconType: 'smartphone',
    iconBgColor: 'bg-slate-100 text-slate-700',
    iconColor: '#475569',
    progressBarColor: 'bg-indigo-600',
    owners: [teamAvatars[2], teamAvatars[3]],
    extraOwnersCount: 2,
  },
  {
    id: 'proj-3',
    title: 'Q3 campaign',
    description: 'Plan and execute our Q3 marketing campaign.',
    dueDate: 'Jul 10, 2025',
    progress: 25,
    iconType: 'megaphone',
    iconBgColor: 'bg-slate-100 text-slate-700',
    iconColor: '#475569',
    progressBarColor: 'bg-indigo-600',
    owners: [teamAvatars[0], teamAvatars[1]],
    extraOwnersCount: 1,
  },
];
