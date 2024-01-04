import React from 'react';

import { useNavigate } from 'react-router-dom';
import { httpService } from '../utils/http.service';
import dayjs from 'dayjs';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';

interface ConfirmModalProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const { t } = useTranslation(['modal']);
  const { state } = useAuthContext();
  const { user } = state;
  const navigate = useNavigate();
  const meeting = JSON.parse(localStorage.getItem('selectedService') || '{}');

  const handleScheduleMeeting = async () => {
    const data = {
      date: meeting.date,
      hour: meeting.hour,
      duration: meeting.duration,
      price: meeting.price,
      serviceName: meeting.name,
      serviceUuid: meeting.uuid,
      userId: user.id,
      userUuid: user.uid,
      shopUuid: user.shopId,
    };

    const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
    const hourRegex = /(\d{2}):(\d{2})/;
    const date = data.date.replace(dateRegex, '$3-$2-$1');
    const hour = data.hour.replace(hourRegex, '$1:$2:00');
    data.date = dayjs(`${date} ${hour}`).format('YYYY-MM-DD HH:mm:ss');

    try {
      await httpService.post('appointments', data);
      localStorage.removeItem('selectedService');
      navigate('/');
    } catch (error) {
      navigate('/error');
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        openModal ? 'block' : 'hidden'
      }`}
    >
      <div className="flex justify-center pt-4 px-4 pb-20 text-center items-center h-full">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className=" bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-6 flex flex-col items-center w-full text-[#3C3744] md:w-[70%]">
          <button
            onClick={() => setOpenModal(false)}
            className="absolute top-[5px] right-[5px]
                "
          >
            <IoClose size={30} className="text-[#3C3744]" />
          </button>
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col text-center mt-3 w-full">
              <h3 className="text-2xl leading-6 font-bold">
                {t('meeting-details')}
              </h3>
              <div className="flex justify-center mt-6">
                <img
                  src={meeting.serviceImage}
                  alt="service"
                  className="w-28 h-28 object-fill"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col w-full">
              <h3 className="flex text-start text-md leading-6 text-gray-400">
                {t('service-name')}
              </h3>
              <h3 className="text-md leading-6 font-bold">{meeting.name}</h3>
            </div>
            <div className="border border-gray-200 mt-1 w-full"></div>

            <div className="mt-3 flex flex-col w-full">
              <h3 className="text-md leading-6 text-gray-400">{t('date')}</h3>
              <h3 className="text-md leading-6 font-bold">
                {meeting.date} at {meeting.hour}
              </h3>
            </div>
            <div className="border border-gray-200 mt-1 w-full"></div>

            <div className="mt-3 flex flex-col w-full">
              <h3 className="text-md leading-6 text-gray-400">{t('price')}</h3>
              <h3 className="text-md leading-6 font-bold">₪ {meeting.price}</h3>
            </div>
            <div className="border border-gray-200 mt-1 w-full"></div>
            <div className="mt-8 flex flex-col w-1/2 mx-auto">
              <button
                onClick={handleScheduleMeeting}
                className="bg-[#546CC9] text-white  font-bold py-2 px-4 rounded"
              >
                {t('schedule')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
