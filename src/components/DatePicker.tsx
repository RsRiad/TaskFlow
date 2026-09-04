'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronDownIcon } from '@/components/Icon';

interface DatePickerProps {
  value: string;
  onChange: (dateStr: string) => void;
  placeholder?: string;
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value date or default to today
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (!value) return today;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? today : parsed;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Days calculation
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(year, month, day);
    // Format: "MMM D, YYYY" e.g., "Jun 12, 2025"
    const formatted = `${MONTH_SHORT[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handlePreset = (type: 'today' | 'tomorrow' | 'nextWeek') => {
    const target = new Date();
    if (type === 'tomorrow') target.setDate(target.getDate() + 1);
    if (type === 'nextWeek') target.setDate(target.getDate() + 7);
    
    const formatted = `${MONTH_SHORT[target.getMonth()]} ${target.getDate()}, ${target.getFullYear()}`;
    onChange(formatted);
    setViewDate(target);
    setIsOpen(false);
  };

  // Check if a cell date is currently selected
  const isSelected = (day: number) => {
    if (!value) return false;
    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) return false;
    return (
      parsed.getFullYear() === year &&
      parsed.getMonth() === month &&
      parsed.getDate() === day
    );
  };

  const isTodayDay = (day: number) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input Trigger */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between border border-gray-200 bg-white rounded-[16px] py-2 px-3.5 cursor-pointer transition-colors hover:border-gray-300 focus-within:border-gray-400"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-[13px] text-gray-800 placeholder-gray-400 outline-none cursor-pointer"
          />
        </div>
        <ChevronDownIcon
          className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-gray-600' : ''
          }`}
        />
      </div>

      {/* Calendar Popover */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 bg-white border border-gray-200 rounded-[24px] shadow-xl p-4 w-68 animate-fade-in select-none">
          {/* Calendar Header: Month/Year Nav */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors text-xs font-semibold w-7 h-7 flex items-center justify-center"
            >
              ‹
            </button>
            <span className="text-[13px] font-semibold text-gray-900">
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors text-xs font-semibold w-7 h-7 flex items-center justify-center"
            >
              ›
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAY_LABELS.map((day) => (
              <span key={day} className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty offset cells */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-7 w-7" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const selected = isSelected(dayNum);
              const isToday = isTodayDay(dayNum);

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => handleSelectDay(dayNum)}
                  className={`h-7 w-7 text-[12px] rounded-full flex items-center justify-center transition-colors font-medium ${
                    selected
                      ? 'bg-gray-900 text-white font-semibold'
                      : isToday
                      ? 'border border-gray-900 text-gray-900 hover:bg-gray-100'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Quick Presets */}
          <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handlePreset('today')}
              className="text-[11px] font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 rounded-full hover:bg-gray-50"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handlePreset('tomorrow')}
              className="text-[11px] font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 rounded-full hover:bg-gray-50"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => handlePreset('nextWeek')}
              className="text-[11px] font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 rounded-full hover:bg-gray-50"
            >
              Next week
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
