import React from 'react';
import { IEvent } from '../types/types';
import { formattedHour, getMinutesSinceMidnight } from '../utils/utlis';
import { colors } from '../constants/index';

const HOUR_HEIGHT = 80;

const getDailyEventPositionStyle = (event: IEvent) => {
  const startMinutes = getMinutesSinceMidnight(event.start);
  const endMinutes = getMinutesSinceMidnight(event.end);

  const top = (startMinutes / 60) * HOUR_HEIGHT;
  const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;

  return {
    top: `${top}px`,
    height: `${height}px`,
  };
};

export const DayView = ({
  events,
  onPressEvent,
}: {
  events: IEvent[];
  onPressEvent: (event: IEvent) => void;
}) => {
  const hours = [...Array(24).keys()];

  return (
    <div className="grid grid-cols-[100px,auto] relative ">
      {hours.map(hour => (
        <React.Fragment key={hour}>
          <div className="border border-gray-200 w-24 text-center bg-gray-100">
            {formattedHour(hour)}
          </div>
          <div className={`border border-gray-200 flex-grow h-[80px]`} />
        </React.Fragment>
      ))}
      {events.map((event, index) => {
        const color = colors[index % colors.length];
        const prevColor =
          index > 0 ? colors[(index - 1) % colors.length] : null;
        const nextColor =
          color === prevColor ? colors[(index + 1) % colors.length] : color;
        return (
          <div
            key={event._id}
            className={`absolute left-[100px] bg-blue-200 border border-gray-200 ${nextColor}`}
            style={getDailyEventPositionStyle(event)}
            onClick={() => onPressEvent(event)}
          >
            {event.title}
          </div>
        );
      })}
    </div>
  );
};
