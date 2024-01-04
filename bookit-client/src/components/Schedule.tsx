import React, { useContext, useState } from 'react';
import { IEvent, IWorkingHours } from '../types/types';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { ModalContext } from '../context/modal';
import {
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SlArrowLeft, SlArrowRight, SlCalender } from 'react-icons/sl';
import { FloatingAddButton } from './FloatingAddButton';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import 'dayjs/locale/he';

type ScheduleProps = {
  events: IEvent[];
  initView: 'day' | 'week' | 'month';
  workingHours: IWorkingHours[];
  day: Date;
};

type ScheduleFactoryProps = {
  onPressEvent: (event: IEvent) => void;
} & ScheduleProps;

const ScheduleFactory = (props: ScheduleFactoryProps) => {
  const { initView, ...rest } = props;
  if (initView === 'day') {
    return <DayView {...rest} />;
  }
  if (initView === 'week') {
    return <WeekView {...rest} />;
  }
  return <div>Not implemented</div>;
};

const StyledDateCalendar = styled(DateCalendar)({
  '& .Mui-selected': {
    backgroundColor: 'lightblue',
    color: 'white',
    '&:hover': {
      backgroundColor: 'lightblue',
    },
  },
});

const Schedule = ({
  events,
  initView = 'week',
  workingHours,
  day,
}: ScheduleProps) => {
  const { state } = useAuthContext();
  const { user } = state;

  const [view, setView] = useState(initView);
  const { modal, handleSetModal } = useContext(ModalContext) as any;
  const [date, setDate] = useState(dayjs(day));

  const onPressEvent = (event: IEvent) => {
    handleSetModal('event', event);
  };

  const handleClose = () => {
    handleSetModal('', {});
  };

  const handleSelectDate = (date: Dayjs) => {
    setDate(date);
    console.log('date:', date);
  };

  const handleChangeView = (event: any) => {
    setView(event.target.value);
  };

  return (
    <div className="h-full overflow-auto pb-32 flex flex-col">
      <div className="flex items-center gap-4 h-12 ml-[0.2rem]">
        <div
          className="flex items-center gap-4 h-12 ml-4"
          onClick={() => {
            handleSetModal('dateSelector', {});
          }}
        >
          <SlCalender className="text-black text-2xl" />
          <div className="font-bold text-lg">
            {dayjs(date).locale('he').format('DD/MM/YYYY dddd')}
          </div>
        </div>
        <SlArrowLeft
          onClick={() => {
            handleSelectDate(date.subtract(1, 'day'));
          }}
        />
        <SlArrowRight
          onClick={() => {
            handleSelectDate(date.add(1, 'day'));
          }}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">View</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={view}
            onChange={handleChangeView}
          >
            <MenuItem value="day">יומי</MenuItem>
            <MenuItem value="week">חצי שבועי</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ScheduleFactory
        events={events}
        workingHours={workingHours}
        initView={view}
        day={date.toDate()}
        onPressEvent={onPressEvent}
      />
      <Drawer
        anchor={'top'}
        open={modal.type === 'dateSelector'}
        onClose={handleClose}
        transitionDuration={500}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
          <StyledDateCalendar
            defaultValue={dayjs(day)}
            onChange={updatedDate => {
              if (!updatedDate) return;
              handleSelectDate(updatedDate as Dayjs);
            }}
          />
        </LocalizationProvider>
      </Drawer>
      <Link to={`/admin/circular/${user.shopId}`}>
        <FloatingAddButton />
      </Link>
    </div>
  );
};

export default Schedule;
