import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaWaze } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { BsTelephoneFill } from 'react-icons/bs';
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import MeetingCard from '../components/MeetingCard';
import { meetingsService } from '../services/meetings.service';
import { useTranslation } from 'react-i18next';
import { TailSpin } from 'react-loader-spinner';
import { useAuthContext } from '../hooks/useAuthContext';

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

interface Shop {
  name: string;
}

const Home: React.FC = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const { t } = useTranslation(['home']);
  const queryClient = useQueryClient();
  const { shopId } = useParams<{ shopId: string }>();

  const { data: shop } = useQuery<Shop>(['shop'], async () => {
    try {
      const response = await meetingsService.getShopById(shopId);

      if (!response) {
        throw new Error('No data returned from API');
      }

      return response;
    } catch (error) {
      throw new Error(`Error fetching shop data: ${error}`);
    }
  });

  const { data: meetings, isLoading } = useQuery<Meeting[]>(
    ['meetings'],
    async () => {
      try {
        const meetings = await meetingsService.getMeetingsByUserId(user?.id);
        console.log('meetings:', meetings);
        return meetings;
      } catch (error) {
        throw new Error(`Error fetching meetings data: ${error}`);
      }
    }
  );

  const deleteMeetingMutation = useMutation(
    (meetingId: string) => meetingsService.removeMeeting(meetingId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['meetings']);
      },
    }
  );

  const getNextMeeting = (meetings: Meeting[]) => {
    const now = new Date();
    const nextMeeting = meetings.find(meeting => {
      const meetingDate = new Date(meeting.date);
      return meetingDate > now;
    });

    return nextMeeting;
  };

  const nextMeeting = getNextMeeting(meetings || []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <TailSpin color="#546CC9" height={80} width={80} />
        </div>
      )}
      <section className="flex flex-col h-[93.1vh]">
        <div className="flex flex-col items-center py-[0.8rem] justify-center font-bold text-3xl text-[#3C3744] shadow-sm">
          <div className="flex flex-col items-center justify-center py-2">
            <img
              className="w-[5em] h-[5em] rounded-full object-cover"
              src="/images/cartoon.jpg"
              alt="cartoon"
            />
            <span className="flex font-sans font-xl mt-2">{shop?.name}</span>
            <div className="flex mt-2 gap-3">
              <div
                className="flex items-center justify-center rounded-md shadow-md bg-white p-1.5
							hover:bg-slate-300 transition duration-300 ease-in-out
							cursor-pointer
							"
              >
                <AiFillInstagram size={30} />
              </div>
              <div
                className="flex items-center justify-center rounded-md shadow-md bg-white p-1.5
							hover:bg-slate-300 transition duration-300 ease-in-out
							cursor-pointer
							"
              >
                <AiFillFacebook size={30} />
              </div>
              <div
                className="flex items-center justify-center rounded-md shadow-md bg-white p-1.5
							hover:bg-slate-300 transition duration-300 ease-in-out
							cursor-pointer
							"
              >
                <IoLogoWhatsapp size={30} />
              </div>
            </div>

            <div
              className="absolute top-[30px] right-[16px] shadow-md
              bg-white p-2.5 rounded-md
				hover:bg-slate-300 transition duration-300 ease-in-out
				cursor-pointer
			  "
            >
              <FaWaze className="text-2xl text-[#3C3744]" />
            </div>
            <div
              className="absolute top-[80px] right-[16px] flex items-center shadow-md
            bg-white p-2.5 rounded-md
				hover:bg-slate-300 transition duration-300 ease-in-out
				cursor-pointer
			"
            >
              <BsTelephoneFill className="text-2xl rounded-md text-[#3C3744]" />
            </div>
          </div>
        </div>
        {nextMeeting ? (
          <div className="flex flex-col items-center justify-center gap-2 py-2">
            <h1 className="flex mt-2 font-bold text-xl text-[#3C3744]">
              {t('next-meeting')}
            </h1>
            <div className="flex w-full flex-col mt-4 gap-3">
              <MeetingCard
                meeting={nextMeeting}
                onDelete={deleteMeetingMutation.mutateAsync}
              />
            </div>
          </div>
        ) : (
          <div className="flex pt-[0.5rem] pb-[2.5rem] items-center justify-center relative">
            <img
              className="w-[20em] h-[20em] object-cover"
              src="/images/result.png"
              alt="no-meeting"
            />
            <div className="absolute top-[78%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-xl font-bold text-[#3C3744]">
                {t('no-meetings')}
              </h1>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center fixed bottom-20 w-full">
          <Link
            to={`/${shopId}/schedule`}
            className="flex items-center justify-center bg-[#546CC9] rounded-full
            w-[19em] py-[11px] transition duration-300 ease-in-out shadow-md"
          >
            <span className="font-bold text-white">{t('book')}</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
