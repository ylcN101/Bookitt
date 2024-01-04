import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingsService } from '../services/meetings.service';
import { useAuthContext } from '../hooks/useAuthContext';
import { uploadService } from '../utils/upload';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Service {
  name: string;
  price: string;
  duration: string;
  serviceImage: string;
  shopId?: string;
}

const AddService: React.FC = () => {
  const { t } = useTranslation(['admin']);
  const queryClient = useQueryClient();
  const { state } = useAuthContext();
  const navigate = useNavigate();

  const [service, setService] = useState<Service>({
    name: '',
    price: '',
    duration: '',
    serviceImage: '',
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!service.name || !service.price || !service.duration) {
      toast.error('Please fill all fields');
      return;
    }
    addMutate.mutateAsync({ ...service, shopId: state.user.shopId });
    toast.success('Service added successfully');
    navigate(`/admin/services/${state.user.shopId}`);
  };

  const handleImageUpload = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      const { secure_url: url } = await uploadService.uploadImg(
        ev.target.files[0]
      );
      setService({ ...service, serviceImage: url });
    }
  };

  const addMutate = useMutation(
    (newService: Service) => meetingsService.addService(newService),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['services']);
      },
    }
  );

  return (
    <div className="h-screen py-4">
      <div className="flex items-center justify-center">
        <div className="w-full bg-white rounded-md">
          <h2 className="text-center text-3xl font-extrabold">
            {t('add-service')}
          </h2>
          <form onSubmit={handleFormSubmit} className="py-6 px-9 ">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-[#3C3744] font-bold"
              >
                {t('service-name')}
              </label>
              <input
                onChange={e => setService({ ...service, name: e.target.value })}
                type="name"
                name="name"
                id="name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#546CC9] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="price"
                className="mb-3 block text-[#3C3744] font-bold"
              >
                {t('service-price')}
              </label>
              <input
                onChange={e =>
                  setService({ ...service, price: e.target.value })
                }
                type="number"
                name="price"
                id="price"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#546CC9] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="duration"
                className="mb-3 block text-[#3C3744] font-bold"
              >
                {t('service-duration')}
              </label>
              <input
                onChange={e =>
                  setService({ ...service, duration: e.target.value })
                }
                type="number"
                name="duration"
                id="duration"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#546CC9] focus:shadow-md"
              />
            </div>

            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl text-[#3C3744] font-bold">
                {t('upload-file')}
              </label>

              <div className="mb-8">
                <input
                  onChange={handleImageUpload}
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                />

                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-4 text-center"
                >
                  {service.serviceImage ? (
                    <img
                      src={service.serviceImage}
                      alt="service"
                      className="object-fit rounded-md h-48 w-full"
                    />
                  ) : (
                    <div>
                      <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium ">
                        {t('browse')}
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#546CC9] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                {t('add-service')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
