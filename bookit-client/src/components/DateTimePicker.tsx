import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import 'dayjs/locale/he';

interface DateTimePickerProps {
  dateValue: Date;
  setDateValue: (date: Date) => void;
  timeSelected: Dayjs;
  setTimeSelected: (date: Dayjs) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  dateValue,
  setDateValue,
  timeSelected,
  setTimeSelected,
}) => {
  return (
    <div className="flex flex-col mt-8">
      <div className="flex gap-2 justify-end">
        <div className="flex justify-center items-center">
          <span className="flex order-2">
            <AiOutlineClockCircle size={22} />
          </span>
          <div className=" bg-white flex order-1">
            <Datetime
              value={dateValue}
              onChange={e => setDateValue(e)}
              dateFormat={dayjs(dateValue)
                .locale('he')
                .format('DD/MM/YYYY dddd')}
              timeFormat={false}
              inputProps={{
                readOnly: true,
                className:
                  'text-[#3C3744] font-bold text-center w-[10em] cursor-pointer',
              }}
              closeOnClickOutside={true}
              closeOnSelect={true}
            />
          </div>
          <div className="w-[7em] h-[2.2em]">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['MobileTimePicker']}>
                <MobileTimePicker
                  ampm={false}
                  value={timeSelected}
                  onChange={e => setTimeSelected(e)}
                  closeOnSelect={true}
                  minTime={dayjs().hour(8).minute(0)}
                  maxTime={dayjs().hour(20).minute(0)}
                  minutesStep={10}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 mt-1 w-full"></div>
    </div>
  );
};

export default DateTimePicker;
