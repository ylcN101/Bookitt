import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';
import { AiFillHome, AiFillSchedule } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation(['footer']);
  const { state } = useAuthContext();
  const { user } = state;
  return (
    <footer className="bg-[#546CC9] flex justify-around fixed bottom-0 z-50 h-14 w-full py-[32px] pt-[35px]">
      <div className="flex items-center">
        <Link
          to={
            user?.isAdmin
              ? `/admin/services/${user.shopId}`
              : `/my-meetings/${user?.id}`
          }
          className="text-white font-bold flex flex-col items-center"
        >
          <AiFillSchedule className="text-white text-2xl" />
          <p className="text-white">
            {user?.isAdmin ? t('services') : t('myMeetings')}
          </p>
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          to={
            user?.isAdmin
              ? `/admin/circular/${user.shopId}`
              : `/profile/${user?.id}`
          }
          className="text-white font-bold flex flex-col items-center"
        >
          <FaUserEdit className="text-white text-2xl" />
          <p className="text-white">
            {user?.isAdmin ? t('working-hours') : t('profile')}
          </p>
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          to={user?.isAdmin ? `/admin/${user?.shopId}` : `/${user?.shopId}`}
          className="text-white font-bold flex flex-col items-center"
        >
          <AiFillHome className="text-white text-2xl" />
          <p className="text-white">{t('home')}</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
