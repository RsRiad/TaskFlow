import React from 'react';

export interface IconProps {
  name: string;
  className?: string;
}

/**
 * Universal Icon Component
 * Loads SVG icons from /public/icons/*.svg using CSS mask-image so icon colors
 * match text color classes (e.g. text-gray-900, text-white, text-red-500).
 */
export const Icon: React.FC<IconProps> = ({ name, className = 'w-4 h-4' }) => {
  const iconFileName = name.endsWith('.svg') ? name : `${name}.svg`;
  const iconPath = `/icons/${iconFileName}`;

  if (name === 'TaskFlowLogoIcon' || name === 'TaskFlowLogoIcon.svg') {
    return (
      <img
        src={iconPath}
        alt=""
        className={`shrink-0 inline-block object-contain ${className}`}
      />
    );
  }

  return (
    <span
      className={`shrink-0 inline-block bg-current ${className}`}
      style={{
        maskImage: `url(${iconPath})`,
        WebkitMaskImage: `url(${iconPath})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
      aria-hidden="true"
    />
  );
};

// Named Icon exports for convenience & full backward compatibility
export const AlertIcon: React.FC<{ className?: string }> = (props) => <Icon name="AlertIcon" {...props} />;
export const ArrowRightIcon: React.FC<{ className?: string }> = (props) => <Icon name="ArrowRightIcon" {...props} />;
export const CalendarBadgeIcon: React.FC<{ className?: string }> = (props) => <Icon name="CalendarBadgeIcon" {...props} />;
export const CalendarIcon: React.FC<{ className?: string }> = (props) => <Icon name="CalendarIcon" {...props} />;
export const ChatIcon: React.FC<{ className?: string }> = (props) => <Icon name="ChatIcon" {...props} />;
export const CheckCircleIcon: React.FC<{ className?: string }> = (props) => <Icon name="CheckCircleIcon" {...props} />;
export const CheckIcon: React.FC<{ className?: string }> = (props) => <Icon name="CheckIcon" {...props} />;
export const ChevronDownIcon: React.FC<{ className?: string }> = (props) => <Icon name="ChevronDownIcon" {...props} />;
export const CloseIcon: React.FC<{ className?: string }> = (props) => <Icon name="CloseIcon" {...props} />;
export const CommentBadgeIcon: React.FC<{ className?: string }> = (props) => <Icon name="CommentBadgeIcon" {...props} />;
export const DotsHorizontalIcon: React.FC<{ className?: string }> = (props) => <Icon name="DotsHorizontalIcon" {...props} />;
export const DragGripIcon: React.FC<{ className?: string }> = (props) => <Icon name="DragGripIcon" {...props} />;
export const FileIcon: React.FC<{ className?: string }> = (props) => <Icon name="FileIcon" {...props} />;
export const FolderIcon: React.FC<{ className?: string }> = (props) => <Icon name="FolderIcon" {...props} />;
export const LaptopIcon: React.FC<{ className?: string }> = (props) => <Icon name="LaptopIcon" {...props} />;
export const LogoutIcon: React.FC<{ className?: string }> = (props) => <Icon name="LogoutIcon" {...props} />;
export const MegaphoneIcon: React.FC<{ className?: string }> = (props) => <Icon name="MegaphoneIcon" {...props} />;
export const MyTasksIcon: React.FC<{ className?: string }> = (props) => <Icon name="MyTasksIcon" {...props} />;
export const OverviewIcon: React.FC<{ className?: string }> = (props) => <Icon name="OverviewIcon" {...props} />;
export const PlusIcon: React.FC<{ className?: string }> = (props) => <Icon name="PlusIcon" {...props} />;
export const ProjectsIcon: React.FC<{ className?: string }> = (props) => <Icon name="ProjectsIcon" {...props} />;
export const SearchIcon: React.FC<{ className?: string }> = (props) => <Icon name="SearchIcon" {...props} />;
export const SettingsIcon: React.FC<{ className?: string }> = (props) => <Icon name="SettingsIcon" {...props} />;
export const SmartphoneIcon: React.FC<{ className?: string }> = (props) => <Icon name="SmartphoneIcon" {...props} />;
export const SunIcon: React.FC<{ className?: string }> = (props) => <Icon name="SunIcon" {...props} />;
export const TaskBoardIcon: React.FC<{ className?: string }> = (props) => <Icon name="TaskBoardIcon" {...props} />;
export const TaskFlowLogoIcon: React.FC<{ className?: string }> = (props) => <Icon name="TaskFlowLogoIcon" {...props} />;
export const TeamIcon: React.FC<{ className?: string }> = (props) => <Icon name="TeamIcon" {...props} />;
export const WorkflowIcon: React.FC<{ className?: string }> = (props) => <Icon name="WorkflowIcon" {...props} />;

