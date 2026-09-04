export interface UserAvatar {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface StatCardData {
  id: string;
  title: string;
  count: number | string;
  subtitle: string;
  subtitleColor?: string;
  iconBgColor: string;
  iconColor: string;
  type: 'active-projects' | 'total-tasks' | 'overdue' | 'completed';
  linkText?: string;
  hasArrow?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  progress: number;
  iconType: 'laptop' | 'smartphone' | 'megaphone';
  iconBgColor: string;
  iconColor: string;
  progressBarColor: string;
  owners: UserAvatar[];
  extraOwnersCount?: number;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface TaskAttachment {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf' | 'code' | 'zip' | 'file';
  url?: string;
}

export interface TaskChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  projectName: string;
  assignee: UserAvatar;
  dueDate: string;
  dueStatus: string;
  isUrgent?: boolean;
  completed: boolean;
  status: TaskStatus;
  description?: string;
  priority?: TaskPriority;
  attachments?: TaskAttachment[];
  tags?: string[];
  estimatedHours?: number;
  checklist?: TaskChecklistItem[];
}

export interface ActivityItem {
  id: string;
  actor: string;
  actorAvatar: string;
  actionText: string;
  targetText: string;
  projectName: string;
  timeAgo: string;
  badgeType: 'check' | 'comment' | 'file' | 'calendar';
}
