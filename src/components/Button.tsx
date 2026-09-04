import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-900',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 border border-transparent',
  danger: 'bg-white hover:bg-red-50 text-red-600 border border-gray-200 hover:border-red-200',
  outline: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-300',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-[11px] rounded-full gap-1',
  md: 'px-4 py-1.5 text-[13px] rounded-full gap-1.5',
  lg: 'px-5 py-2 text-[14px] rounded-full gap-2',
};


export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
