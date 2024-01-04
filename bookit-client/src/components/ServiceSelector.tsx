import React from 'react';
import { IoClose } from 'react-icons/io5';
import ServiceList from './ServiceList';
import { MdOutlineDesignServices } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

interface Service {
  name: string;
  serviceImage: string;
}

interface ServiceSelectorProps {
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  showModal: boolean;
  toggleModal: () => void;
  handleServicePick: () => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  selectedService,
  setSelectedService,
  showModal,
  toggleModal,
  handleServicePick,
}) => {
  const { t } = useTranslation(['circular']);
  return (
    <div className="flex flex-col mt-8">
      <div className="flex justify-end">
        <div className="flex justify-center items-center gap-2">
          <span className="flex order-2">
            <MdOutlineDesignServices size={22} />
          </span>
          <div className="flex order-1">
            {selectedService ? (
              <div
                onClick={() => setSelectedService(null)}
                className="cursor-pointer flex items-center gap-4"
              >
                <h3 className="text-[#3C3744] font-bold">
                  {selectedService.name}
                </h3>

                <img
                  src={selectedService.serviceImage}
                  alt="service"
                  className="rounded-full w-10 h-10 object-fill"
                />
              </div>
            ) : (
              <button
                onClick={toggleModal}
                className="block text-white font-bold py-1 px-4 rounded-full bg-[#546CC9]"
                type="button"
              >
                {t('service')}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border border-gray-200 mt-2 w-full"></div>

      {showModal && (
        <div className="bottom-tran flex flex-col items-center justify-center fixed top-0 left-0 right-0 z-50  w-full p-1  inset-0  max-h-full overflow-y-hidden overflow-x-hidden bg-gray-900 bg-opacity-50">
          <div className=" relative bg-white rounded-lg shadow overflow-y-auto">
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-[#3C3744]">
                {t('service')}
              </h3>
              <button onClick={toggleModal} className="text-[#3C3744]">
                <IoClose size={30} />
              </button>
            </div>

            <div className="h-[19em] w-full">
              <div onClick={handleServicePick}>
                <ServiceList handleServicePick={handleServicePick} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
