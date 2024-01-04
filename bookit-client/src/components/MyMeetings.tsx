import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  MEETING_QUERY,
  SOON_QUERY,
  HISTORY_QUERY,
  HISTORY_MEETINGS_QUERY,
} from '../constants';
import MeetingCard from './MeetingCard';
import { FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { meetingsService } from '../services/meetings.service';
import { useTranslation } from 'react-i18next';
import { TailSpin } from 'react-loader-spinner';

interface Meeting {
  _id: string;
  date: string;
  serviceId: {
    serviceImage: string;
    name: string;
    duration: number;
    price: number;
  };
}

const MyMeetings: React.FC = () => {
  const { t } = useTranslation(['my-meetings']);
  const queryClient = useQueryClient();
  const [active, setActive] = useState<string>(SOON_QUERY);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const { state } = useAuthContext();
  const { user } = state;

  const { data, isLoading } = useQuery<Meeting[]>(
    [MEETING_QUERY, user?.id],
    async () => {
      try {
        const response = await meetingsService.getSoonMeetingsByUserId(
          user?.id
        );
        return response;
      } catch (error) {
        throw new Error(`Error fetching meetings data: ${error}`);
      }
    }
  );

  const deleteMeetingMutation = useMutation(
    (meetingId: string) => meetingsService.removeMeeting(meetingId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([MEETING_QUERY, user?.id]);
        queryClient.invalidateQueries([HISTORY_MEETINGS_QUERY]);
        queryClient.invalidateQueries([SOON_QUERY, user?.id]);
      },
    }
  );
  const { data: historyMeetings } = useQuery<Meeting[]>(
    [HISTORY_MEETINGS_QUERY],
    async () => {
      try {
        const response = await meetingsService.getHistoryMeetingsByUserId(
          user?.id
        );

        return response;
      } catch (error) {
        throw new Error(`Error fetching meetings data: ${error}`);
      }
    }
  );

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 1) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <TailSpin color="#546CC9" height={80} width={80} />
        </div>
      )}
      <div className="flex flex-col">
        <div
          className={
            isScrolling ? 'sticky top-0 z-40 bg-white' : 'sticky top-0 z-40'
          }
        >
          <h1 className="text-2xl text-center font-bold mt-5 mb-5">
            {t('my-meetings')}
          </h1>
          <div className="flex justify-around">
            <div
              onClick={() => setActive(HISTORY_QUERY)}
              className="flex items-center relative"
            >
              <h1
                className={
                  active === HISTORY_QUERY
                    ? 'text-lg font-bold text-[#546cc9] cursor-pointer'
                    : 'text-lg cursor-pointer'
                }
              >
                {t('history')}
              </h1>
              {active === HISTORY_QUERY && !isScrolling && (
                <hr className="border-[1.5px] border-[#546CC9] absolute bottom-[-9px] w-full" />
              )}
            </div>
            <div
              onClick={() => setActive(SOON_QUERY)}
              className="flex items-center relative"
            >
              <h1
                className={
                  active === SOON_QUERY
                    ? 'text-lg font-bold text-[#546cc9] cursor-pointer'
                    : 'text-lg cursor-pointer'
                }
              >
                {t('soon')}
              </h1>
              {active === SOON_QUERY && !isScrolling && (
                <hr className="border-[1.5px] border-[#546CC9] absolute bottom-[-9px] w-full" />
              )}
            </div>
          </div>
        </div>
        <hr className="border-1 border-gray-300 mt-2 mb-3" />
        {active === SOON_QUERY && (
          <div className="flex flex-col ">
            {data?.map(meeting => (
              <MeetingCard
                key={meeting._id}
                meeting={meeting}
                onDelete={deleteMeetingMutation.mutateAsync}
              />
            ))}
          </div>
        )}
        {active === HISTORY_QUERY && (
          <div className="flex flex-col">
            {historyMeetings?.map(meeting => (
              <MeetingCard
                key={meeting._id}
                meeting={meeting}
                onDelete={deleteMeetingMutation.mutateAsync}
              />
            ))}
          </div>
        )}
        <Link
          to={`/${user?.shopId}/schedule`}
          className="flex justify-center items-center fixed bottom-20 left-5 w-12 h-12 rounded-full bg-[#546CC9] text-white z-40"
        >
          <FaPlus className="text-xl" />
        </Link>
      </div>
    </>
  );
};

export default MyMeetings;
