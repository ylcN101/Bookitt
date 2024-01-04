import React, { useMemo } from 'react';
import { IEvent, IWorkingHours } from '../types/types';
import { formattedHour, convertToTimeZone } from '../utils/utlis';
import { colors } from '../constants/index';
import moment from 'moment-timezone';
import 'moment/locale/he';

export const WeekView = ({
  events,
  workingHours,
  onPressEvent,
  isFirstHalf = true,
  day = new Date(),
}: {
  events: IEvent[];
  workingHours: IWorkingHours[];
  onPressEvent: (event: IEvent) => void;
  isFirstHalf?: boolean;
  day?: Date;
}) => {
  const CELL_HEIGHT = 100;
  const hours = useMemo(() => {
    const firstHour = workingHours.reduce(
      (hour: number, currentEvent: IWorkingHours) => {
        if (currentEvent.workingHours[0].start.getHours() < hour) {
          return currentEvent.workingHours[0].start.getHours();
        }
        return hour;
      },
      23
    );

    const lastHour = workingHours.reduce(
      (hour: number, currentEvent: IWorkingHours) => {
        if (
          currentEvent.workingHours[workingHours.length - 1].end.getHours() >
          hour
        ) {
          return currentEvent.workingHours[
            workingHours.length - 1
          ].end.getHours();
        }
        return hour;
      },
      0
    );

    const keys = [];
    for (let i = firstHour; i <= lastHour; i++) keys.push(i);
    return keys;
  }, [events]);

  const days = [...Array(3).keys()];

  const isEventOnCurrentDay = (event: IEvent, selectedDay: Date) => {
    const eventDate = moment
      .utc(event.date)
      .tz('Asia/Jerusalem')
      .startOf('day');
    const currentDay = moment(selectedDay).tz('Asia/Jerusalem').startOf('day');

    console.log(
      `Event Date: ${eventDate.format()}, Selected Day: ${currentDay.format()}`
    );

    return eventDate.isSame(currentDay, 'day');
  };

  const isEventInTimeSlot = (
    event: IEvent,
    selectedDay: Date,
    hour: number
  ) => {
    const localEventStartDate = convertToTimeZone(event.date, 'Asia/Jerusalem');

    return (
      isEventOnCurrentDay(event, selectedDay) &&
      localEventStartDate.hour() === hour
    );
  };

  const getEventPositionStyle = (event: IEvent) => {
    const localEventStartDate = moment.utc(event.date).tz('Asia/Jerusalem');
    const localEventEndDate = moment.utc(event.endDate).tz('Asia/Jerusalem');
    const duration = moment.duration(
      localEventEndDate.diff(localEventStartDate)
    );
    const height = (duration.asMinutes() / 60) * CELL_HEIGHT;
    console.log('height:', height);

    return {
      height: `${height}px`,
    };
  };

  const getColorForEvent = (eventId: string) => {
    const colorIndex =
      events.findIndex(event => event._id === eventId) % colors.length;
    console.log(colorIndex);
    return colors[colorIndex];
  };

  const dayNames = isFirstHalf
    ? ['ראשון', 'שני', 'שלישי']
    : ['Wednesday', 'Thursday', 'Friday'];

  return (
    <div className={`grid grid-cols-4 relative h-screen`}>
      <div
        className={`border border-gray-200 text-center bg-gray-100 col-span-1`}
      ></div>
      {days.map(day => (
        <div
          key={day}
          className={`flex items-center justify-center border border-gray-200 text-center bg-gray-100`}
        >
          {dayNames[day]}
        </div>
      ))}
      {hours.map(hour => (
        <React.Fragment key={hour}>
          <div
            className={`flex items-center justify-center border border-gray-200 text-center bg-gray-100 `}
          >
            {formattedHour(hour)}
          </div>
          {days.map(day => (
            <div
              key={day}
              //height should be as CELL_HEIGHT
              className={`relative border border-gray-200 h-[100px]`}
            >
              {events &&
                events
                  .filter(event => isEventInTimeSlot(event, day, hour))
                  .map(event => {
                    const color = getColorForEvent(event._id);

                    return (
                      <div
                        key={event._id}
                        className={`absolute bg-blue-200 border ${color} z-10 w-full rounded-md flex items-center justify-center`}
                        style={getEventPositionStyle(event)}
                        onClick={() => onPressEvent(event)}
                      >
                        {event.serviceId.name}
                      </div>
                    );
                  })}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
