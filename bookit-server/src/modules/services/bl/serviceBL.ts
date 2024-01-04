import { ServiceModel, ShopModel } from '../../../models';
import { Service } from '../../../models/types';
import { v4 as uuidv4 } from 'uuid';

export const getServiceByUuid = async (uuid: string): Promise<Service | null> =>
  ServiceModel.findOne({ uuid }).lean();

export const getServiceById = async (
  serviceId: string
): Promise<Service | null> => ServiceModel.findById(serviceId).lean();

export const getServices = async () => ServiceModel.find().lean();

export const getServicesByShop = async (shopUuid: string) => {
  const shop = await ShopModel.findOne({ uuid: shopUuid }).lean();
  if (!shop) throw new Error('Shop not found');
  const services = await ServiceModel.find({ shopId: shop._id }).lean();
  return services;
};

export const createService = async (serviceData: any) => {
  const { shopUuid, ...rest } = serviceData;
  const shop = await ShopModel.findOne({ uuid: shopUuid });
  if (!shop) throw new Error('Shop not found');
  const uuid = uuidv4();
  const service = await ServiceModel.create({
    ...rest,
    uuid,
    shopId: shop._id,
  });
  return service;
};

export const editService = async (serviceId: string, serviceData: any) => {
  const { serviceImage, ...data } = serviceData;

  const updatedService = await ServiceModel.findOneAndUpdate(
    { _id: serviceId },
    { $set: data },
    { new: true }
  );

  if (!updatedService) throw new Error('Service not found');
  if (serviceImage) {
    updatedService.serviceImage = serviceImage;
    await updatedService.save();
  }
  return updatedService;
};

export const deleteService = async (serviceId: string) => {
  const service = await ServiceModel.findOneAndUpdate(
    { _id: serviceId },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!service) throw new Error('Service not found');
  return service;
};
