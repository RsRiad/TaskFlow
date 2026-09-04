import { ActivityItem } from '@/types';
import { teamAvatars } from './team';

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    actor: 'Alex',
    actorAvatar: teamAvatars[1].avatarUrl,
    actionText: 'completed "Design system updates"',
    targetText: 'Website redesign',
    projectName: 'Website redesign',
    timeAgo: '2 hours ago',
    badgeType: 'check',
  },
  {
    id: 'act-2',
    actor: 'Jamie',
    actorAvatar: teamAvatars[2].avatarUrl,
    actionText: 'commented on "Homepage layout v2"',
    targetText: 'Website redesign',
    projectName: 'Website redesign',
    timeAgo: '4 hours ago',
    badgeType: 'comment',
  },
  {
    id: 'act-3',
    actor: 'Priya',
    actorAvatar: teamAvatars[0].avatarUrl,
    actionText: 'uploaded "Campaign brief.pdf"',
    targetText: 'Q3 campaign',
    projectName: 'Q3 campaign',
    timeAgo: 'Yesterday',
    badgeType: 'file',
  },
  {
    id: 'act-4',
    actor: 'You',
    actorAvatar: teamAvatars[3].avatarUrl,
    actionText: 'created task "Review analytics setup"',
    targetText: 'Mobile app launch',
    projectName: 'Mobile app launch',
    timeAgo: 'Yesterday',
    badgeType: 'calendar',
  },
];
