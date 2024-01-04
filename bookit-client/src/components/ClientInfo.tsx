import React from 'react';
import { BsPersonAdd } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

interface ClientInfoProps {
  phone: string;
  setPhone: (phone: string) => void;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ phone, setPhone }) => {
  const { t } = useTranslation(['circular']);
  return (
    <div className="flex overflow-hidden flex-col mt-8">
      <div className="flex justify-end">
        <div className="flex justify-center items-center">
          <span className="flex order-2">
            <BsPersonAdd size={22} />
          </span>
          <div className="flex justify-end px-2">
            <input
              type="number"
              placeholder={t('phone')}
              className="text-[#3C3744] font-bold text-center ml-0 no-arrows flex w-1/4"
              maxLength={10}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="border border-gray-200 mt-1 w-full"></div>
    </div>
  );
};

export default ClientInfo;
