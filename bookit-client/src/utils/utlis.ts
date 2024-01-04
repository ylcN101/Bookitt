import moment from 'moment-timezone';

export const getMinutesSinceMidnight = (date: Date) =>
  date.getHours() * 60 + date.getMinutes();
export const formattedHour = (hour: number) => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(0);

  // Convert the date to a string in the Hebrew (Israel) locale
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jerusalem',
    hour12: false,
  };
  return date.toLocaleString('he-IL', options);
};

export const convertToTimeZone = (date: string, timeZone: string) => {
  return moment.utc(date).tz(timeZone).subtract(2, 'hours');
};
