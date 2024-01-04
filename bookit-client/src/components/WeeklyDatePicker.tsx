import React from 'react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import 'dayjs/locale/he';

interface WeeklyDatePickerProps {
  initialValue: Date;
  onClick: (date: Date) => void;
}

export const WeeklyDatePicker: React.FC<WeeklyDatePickerProps> = ({
  initialValue,
  onClick,
}) => {
  const [activeDate, setActiveDate] = useState(initialValue);
  const [firstDayInWeek, setFirstDayInWeek] = useState(initialValue);

  useEffect(() => {
    const date = new Date(initialValue);
    const firstDayInWeek = dayjs(date).startOf('week').toDate();
    setFirstDayInWeek(firstDayInWeek);
  }, [initialValue]);

  return (
    <div className="flex flex-row gap-1 mt-2 justify-between font-bold text-[#3C3744] text-xl">
      {new Array(7).fill(0).map((_, i) => {
        const date = new Date(initialValue);
        const formattedDate = dayjs(date).add(i, 'day').toDate();

        return (
          <div
            key={i}
            className={`flex items-center px-1 justify-center cursor-pointer mt-2 rounded-md w-full h-14 border border-[#E2E8F0] ${
              dayjs(formattedDate).isSame(activeDate, 'day') ||
              dayjs(formattedDate).isSame(firstDayInWeek, 'day')
                ? 'active-date'
                : ''
            }`}
            onClick={() => {
              setFirstDayInWeek(formattedDate);
              setActiveDate(formattedDate);
              onClick(formattedDate);
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm text-[#3C3744]">
                {dayjs(formattedDate).locale('he').format('ddd')}
              </span>
              <span className="text-sm text-[#3c374489]">
                {dayjs(formattedDate).format('DD/MM')}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
