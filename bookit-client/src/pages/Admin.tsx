import React from 'react';
import Schedule from '../components/Schedule';
import { useQuery } from '@tanstack/react-query';
import { meetingsService } from '../services/meetings.service';
import { useParams } from 'react-router-dom';

const workingHours: any = [
  {
    uuid: '1',

    date: new Date(2024, 0, 1),
    workingHours: [
      {
        start: new Date(2024, 0, 1, 7, 0, 0),
        end: new Date(2024, 0, 1, 20, 0, 0),
      },
    ],
  },
];

const AdminHome = () => {
  const shopUuid = useParams<{ shopId: string }>().shopId;
  const day = new Date();
  const { data: events } = useQuery(['meetings', shopUuid], () =>
    meetingsService.getAdminMeetings(shopUuid)
  );
  return (
    <div>
      <Schedule
        events={events}
        workingHours={workingHours}
        initView="week"
        day={day}
      />
    </div>
  );
};

export default AdminHome;
