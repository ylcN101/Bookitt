import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularHeader from '../components/CircularHeader';
import DateTimePicker from '../components/DateTimePicker';
import ClientInfo from '../components/ClientInfo';
import ServiceSelector from '../components/ServiceSelector';
import CircularSwitch from '../components/CircularSwitch';
import NumberOfWeeks from '../components/NumberOfWeeks';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/he';
import { meetingsService } from '../services/meetings.service';

const Circular = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['circular']);
  const { shopId } = JSON.parse(localStorage.getItem('user') || '{}');
  const [dateValue, setDateValue] = useState<any>(dayjs().toDate());
  console.log('dateValue:', dateValue);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState<string>('');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [checked, setChecked] = useState(false);
  const [numberOfWeeks, setNumberOfWeeks] = useState<number>(0);
  const [parentSelectedSlide, setParentSelectedSlide] = useState(0);
  const [timeSelected, setTimeSelected] = useState<any>(
    dayjs().hour(8).minute(0)
  );

  const sendData = () => {
    const date = dayjs(dateValue).format('YYYY-MM-DD');
    const time = dayjs(timeSelected).format('HH:mm:ss');
    const dateTime = `${date} ${time}`;
    const phoneWithCode = `+972${phone.slice(1)}`;
    const data = {
      date: dateTime,
      name,
      phone: phoneWithCode,
      serviceUuid: selectedService.uuid,
      shopUuid: shopId,
      checked,
      numberOfWeeks,
    };

    try {
      meetingsService.adminCreateMeeting(data);
      navigate(`/admin/${shopId}}`);
      toast.success('התור נקבע בהצלחה');
    } catch (error) {
      toast.error('אירעה שגיאה');
      navigate('/error');
    }
  };

  const handleParentSelectedSlideChange = (slideIndex: number) => {
    setParentSelectedSlide(slideIndex);
    setNumberOfWeeks(slideIndex);
  };

  const handleEndDate = () => {
    if (numberOfWeeks === 0 || numberOfWeeks === -1) {
      return `סיום החזרות - ${dayjs(dateValue).format('DD.MM.YYYY')}`;
    }
    const selectedDate = dayjs(dateValue);
    const endDate = selectedDate.add(numberOfWeeks, 'week');
    return `סיום החזרות - ${endDate.format('DD.MM.YYYY')}`;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleServicePick = () => {
    const selectedService = JSON.parse(
      localStorage.getItem('selectedService') || '{}'
    );
    setSelectedService(selectedService);
    setShowModal(false);
  };

  return (
    <div className="h-screen flex flex-col px-10">
      <CircularHeader navigate={navigate} shopId={shopId} />
      <h1 className="flex justify-end text-2xl font-bold text-[#3C3744] text-center mt-8">
        {t('book')}
      </h1>
      <div className="flex flex-col gap-6">
        <DateTimePicker
          dateValue={dateValue}
          setDateValue={setDateValue}
          timeSelected={timeSelected}
          setTimeSelected={setTimeSelected}
        />
        <ClientInfo phone={phone} setPhone={setPhone} />
        <ServiceSelector
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          showModal={showModal}
          toggleModal={toggleModal}
          handleServicePick={handleServicePick}
        />
        <CircularSwitch checked={checked} handleChange={handleChange} />
        {checked && (
          <NumberOfWeeks
            parentSelectedSlide={parentSelectedSlide}
            handleParentSelectedSlideChange={handleParentSelectedSlideChange}
            handleEndDate={handleEndDate}
          />
        )}
      </div>
      <button
        onClick={sendData}
        className="flex self-center justify-center mt-4 bg-[#546CC9] text-white font-bold py-2 w-[30%] rounded-full"
      >
        {t('save')}
      </button>
    </div>
  );
};

export default Circular;
