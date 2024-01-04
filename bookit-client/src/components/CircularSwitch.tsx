import React from 'react';
import Switch from '@mui/material/Switch';
import { PiArrowsClockwise } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

interface CircularSwitchProps {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CircularSwitch: React.FC<CircularSwitchProps> = ({
  checked,
  handleChange,
}) => {
  const { t } = useTranslation(['circular']);
  return (
    <div className="flex flex-col mt-8">
      <div className="flex justify-end">
        <div className="flex justify-between items-center gap-5 w-full">
          <span className="flex order-2">
            <PiArrowsClockwise size={22} />
          </span>
          <div className="flex flex-col order-1 w-[8em]">
            <span className="text-[#3C3744] w-[10em] font-bold">
              {t('choose')}
            </span>
          </div>
          <div className="flex w-full">
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
      </div>
      <div className="border border-gray-200 mt-1 w-full"></div>
    </div>
  );
};

export default CircularSwitch;
