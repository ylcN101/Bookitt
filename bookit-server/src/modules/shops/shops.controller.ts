import * as shopBL from './bl/shopBL';
import { getAllShopsMapper, getShopMapper } from '../../mappers/shop';

export const getAllShops = async (req: any, res: any) => {
  try {
    const shops = await shopBL.getAllShops();

    res.status(200).json(getAllShopsMapper(shops));
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const createShop = async (req: any, res: any) => {
  try {
    const shop = await shopBL.createShop(req.body);

    res.status(201).json(shop);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getShop = async (req: any, res: any) => {
  try {
    const shop = await shopBL.getShopByUuid(req.params.uuid);
    res.status(200).json(getShopMapper(shop));
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};
