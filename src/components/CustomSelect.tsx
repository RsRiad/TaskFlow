'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon, CheckIcon } from '@/components/Icon';

export interface CustomSelectOption {
  value: string;
  label: string;
  avatarUrl?: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  const isSmall = size === 'sm';

  return (
    <div ref={containerRef} className={`relative inline-block w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 border border-gray-200 bg-white text-left transition-colors hover:border-gray-300 focus:outline-none focus:border-gray-400 ${
          isSmall ? 'py-1.5 px-3 text-[12px] rounded-full' : 'py-2 px-3.5 text-[13px] rounded-[16px]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {selectedOption?.avatarUrl && (
            <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-gray-200">
              <Image
                src={selectedOption.avatarUrl}
                alt={selectedOption.label}
                fill
                className="object-cover"
                sizes="20px"
              />
            </div>
          )}
          {selectedOption?.icon && (
            <span className="shrink-0 text-gray-500">{selectedOption.icon}</span>
          )}
          <span className={`truncate ${selectedOption ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDownIcon
          className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-gray-600' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-gray-200 rounded-[20px] shadow-xl p-1.5 max-h-56 overflow-y-auto animate-fade-in">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-[13px] rounded-[12px] transition-colors ${
                  isSelected
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {option.avatarUrl && (
                    <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-gray-200">
                      <Image
                        src={option.avatarUrl}
                        alt={option.label}
                        fill
                        className="object-cover"
                        sizes="20px"
                      />
                    </div>
                  )}
                  {option.icon && (
                    <span className="shrink-0 text-gray-500">{option.icon}</span>
                  )}
                  <span className="truncate">{option.label}</span>
                </div>
                {isSelected && (
                  <CheckIcon className="w-3.5 h-3.5 text-gray-900 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
