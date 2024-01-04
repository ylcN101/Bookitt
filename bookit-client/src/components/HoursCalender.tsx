import React from 'react';

interface HoursCalendarProps {
  handleHourPick: (hour: string) => void;
}
const HoursCalendar: React.FC<HoursCalendarProps> = ({ handleHourPick }) => {
  const generateAvailableHours = (): string[] => {
    const currentHour = new Date().getHours();
    const allHours = Array.from({ length: 11 }, (_, index) =>
      index + 10 < 10 ? `0${index + 10}:00` : `${index + 10}:00`
    );

    const filteredHours = allHours.slice(currentHour - 10);

    for (let i = filteredHours.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredHours[i], filteredHours[j]] = [
        filteredHours[j],
        filteredHours[i],
      ];
    }
    const numberOfHours = Math.floor(Math.random() * 3) + 2;

    return filteredHours.slice(0, numberOfHours);
  };

  const availableHours = generateAvailableHours();

  return (
    <div className="mt-8 w-full">
      <div className="grid grid-cols-3 gap-4 py-2 px-[18px] md:gap-6">
        {availableHours.map((hour, index) => (
          <div
            key={index}
            onClick={() => handleHourPick(hour)}
            className="bg-white border-1 border-gray-300 rounded-md shadow-md p-2 cursor-pointer md:p-6"
          >
            <p className="text-center font-bold text-[#3C3744]">{hour}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoursCalendar;
