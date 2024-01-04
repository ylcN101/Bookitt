import React, { useState } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/he';
import { MdOutlineDelete } from 'react-icons/md';
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

const hebrewDayNames = [
  'ראשון',
  'שני',
  'שלישי',
  'רביעי',
  'חמישי',
  'שישי',
  'שבת',
];

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

interface MeetingCardProps {
  meeting?: Meeting;
  onDelete: (meetingId: string) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onDelete }) => {
  const { t } = useTranslation(['common']);
  const localDate = moment.utc(meeting?.date).tz('Asia/Jerusalem');
  localDate.subtract(2, 'hours');
  localDate.locale('he');

  const [openMenu, setOpenMenu] = useState(false);

  const handleDelete = (meetingId: string) => () => {
    onDelete(meetingId);
    setOpenMenu(false);
  };

  const day = hebrewDayNames[localDate.day()];

  return (
    <>
      <section className="flex flex-col items-end mr-6 text-[#3C3744]  relative">
        <div className="flex justify-center">
          <img
            src={meeting?.serviceId?.serviceImage}
            alt="shop"
            className="w-14 h-14 rounded-full order-2"
          />
          <div className="flex flex-col gap-1 items-end mr-3">
            <div className="flex">
              <p className="flex font-bold text-[14px]">
                {meeting?.serviceId?.name}
              </p>

              <div
                onClick={() => setOpenMenu(!openMenu)}
                className="absolute top-1 left-5"
              >
                <PiDotsThreeOutlineVerticalBold
                  size={20}
                  className="text-[#3C3744] cursor-pointer"
                />
              </div>
              {openMenu && (
                <div className="absolute z-20 top-5 left-7 bg-white rounded-lg shadow-lg py-2 px-3  flex flex-col gap-1 text-[#3C3744]">
                  <button
                    onClick={() => setOpenMenu(false)}
                    className="absolute top-1 left-1"
                  />
                  <button
                    onClick={handleDelete(meeting?._id ?? '')}
                    className="flex pb-1 gap-1"
                  >
                    <MdOutlineDelete size={20} />
                    <p className="font-bold text-[13px]">{t('delete')}</p>
                  </button>
                </div>
              )}
            </div>

            <p className="flex order-1 text-[14px]">
              {day}, {localDate.format('DD/MM - HH:mm')}
            </p>

            <p className="flex order-1 text-[14px] text-[#928e98]">
              {t('minutes')} {meeting?.serviceId?.duration} | ₪{' '}
              {meeting?.serviceId?.price}
            </p>
          </div>
        </div>
      </section>
      <hr className="w-full border-[#E4E4E7] mt-4 mb-4" />
    </>
  );
};

export default MeetingCard;
