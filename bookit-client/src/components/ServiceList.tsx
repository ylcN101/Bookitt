import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ServicesCard from './ServicesCard';
import { meetingsService } from '../services/meetings.service';
import { TailSpin } from 'react-loader-spinner';

interface Service {
  _id: string;
  isDeleted: boolean;
  name: string;
  description: string;
  serviceImage?: string;
  duration: number;
  price: number;
}

interface ServiceListProps {
  setStep?: () => void;
  handleServicePick?: (service: Service) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ setStep }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { shopId } = useParams<{ shopId: string }>();
  const { data, isLoading } = useQuery<Service[]>(['services'], async () => {
    try {
      const response = await meetingsService.getServicesByShopId(shopId);
      const filteredServices = response.filter(
        (service: Service) => !service.isDeleted
      );
      return filteredServices;
    } catch (error) {
      console.log(error);
    }
  });

  const handleServiceClick = (serviceId: string) => () => {
    const selectedService = data?.find(service => service._id === serviceId);
    if (selectedService) {
      localStorage.setItem('selectedService', JSON.stringify(selectedService));
      setSelectedService(selectedService);
    }
  };

  return (
    <div className=" flex flex-col">
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <TailSpin color="#546CC9" height={80} width={80} />
        </div>
      )}
      <div
        className="grid grid-cols-1 gap-4 mt-8 cursor-pointer p-4"
        onClick={setStep}
      >
        {data?.map(service => (
          <ServicesCard
            key={service._id}
            service={service}
            onClick={handleServiceClick(service._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
