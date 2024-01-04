import { ShopModel } from '../../../models';

export const createShop = async (shopData: any) => {
  const shop = await ShopModel.create(shopData);
  return shop;
};

export const getAllShops = async () => ShopModel.find();

export const getShopByUuid = async (uuid: string) =>
  ShopModel.findOne({ uuid }).lean();
