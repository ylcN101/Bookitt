import { useState, useEffect, useRef } from 'react';
import ServiceList from '../components/ServiceList';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingsService } from '../services/meetings.service';
import { useAuthContext } from '../hooks/useAuthContext';
import { uploadService } from '../utils/upload';
import AdminServiceForm from '../components/AdminServiceForm';
import { FloatingAddButton } from '../components/FloatingAddButton';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AdminServices = () => {
  const { t } = useTranslation(['admin']);
  const { state } = useAuthContext();
  const { shopId } = state.user;
  const queryClient = useQueryClient();
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const imageRef = useRef(null);

  const [selectedService, setSelectedService] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [warningModalIsOpen, setWarningModalIsOpen] = useState(false);

  const handleServiceClick = () => {
    const service = JSON.parse(localStorage.getItem('selectedService'));
    setSelectedService(service);
    setModalIsOpen(true);
  };

  useEffect(() => {}, [selectedService]);

  const handleEditClick = () => {
    const updatedService = {
      ...selectedService,
      name: nameRef.current.value,
      price: priceRef.current.value,
    };
    setSelectedService(updatedService);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    editMutate.mutateAsync(selectedService);
    setModalIsOpen(false);
  };
  const editMutate = useMutation(
    service => meetingsService.editService(service),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('services');
      },
    }
  );
  const uploadImage = async ev => {
    const { secure_url: url } = await uploadService.uploadImg(ev);
    const updatedService = {
      ...selectedService,
      serviceImage: url,
    };
    setSelectedService(updatedService);
    editMutate.mutateAsync(updatedService);
  };

  const handleDelete = () => {
    setWarningModalIsOpen(true);
    setModalIsOpen(false);
    const { _id } = selectedService;
    deleteMutate.mutateAsync(_id);
    setWarningModalIsOpen(false);
    toast.success('Service deleted successfully');
  };

  const deleteMutate = useMutation(
    service => meetingsService.deleteService(service),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('services');
      },
    }
  );

  return (
    <div className="mt-10">
      <div className="flex flex-col justify-center">
        <h2 className="text-center text-3xl font-extrabold text-[#3C3744]">
          {t('my-services')}
        </h2>
        <div onClick={handleServiceClick}>
          <ServiceList />
        </div>
      </div>

      {warningModalIsOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex justify-center pt-4 px-4 pb-20 text-center items-center h-full">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className=" bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-6 flex flex-col items-center w-full text-[#3C3744]">
              <h2 className="text-2xl font-bold text-center">
                Are you sure you want to delete this service?
              </h2>
              <button
                onClick={() => setWarningModalIsOpen(false)}
                className="absolute top-[5px] right-[5px]
                  "
              >
                <IoClose size={30} className="text-[#3C3744]" />
              </button>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setWarningModalIsOpen(false)}
                  className="bg-[#546CC9] text-white rounded-md px-4 py-2 mx-2"
                >
                  No
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="bg-[#546CC9] text-white rounded-md px-4 py-2 mx-2"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalIsOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex justify-center pt-4 px-4 pb-20 text-center items-center h-full">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className=" bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-6 flex flex-col items-center w-full text-[#3C3744]">
              <h2 className="text-2xl font-bold text-center">
                {t('edit-service')}
              </h2>
              <button
                onClick={() => setModalIsOpen(false)}
                className="absolute top-[5px] right-[5px]
                  "
              >
                <IoClose size={30} className="text-[#3C3744]" />
              </button>
              <button
                onClick={handleDelete}
                className="absolute top-[5px] left-[5px]"
              >
                <MdDelete size={30} className="text-red-500" />
              </button>

              <AdminServiceForm
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                handleEditClick={handleEditClick}
                handleFormSubmit={handleFormSubmit}
                nameRef={nameRef}
                priceRef={priceRef}
                imageRef={imageRef}
                uploadImage={uploadImage}
              />
            </div>
          </div>
        </div>
      )}
      <Link to={`/admin/${shopId}/addService`}>
        <FloatingAddButton />
      </Link>
    </div>
  );
};

export default AdminServices;
