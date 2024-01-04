import * as ServiceBL from './bl/serviceBL';

export const getServicesByShop = async (req: any, res: any) => {
  try {
    const services = await ServiceBL.getServicesByShop(req.params.shopUuid);
    res.status(200).json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const createService = async (req: any, res: any) => {
  try {
    const { shopId: shopUuid } = req.body;

    const service = await ServiceBL.createService({ ...req.body, shopUuid });
    res.status(200).json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const editService = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const service = await ServiceBL.editService(id, req.body);
    res.status(200).json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const deleteService = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await ServiceBL.deleteService(id);
    res.status(200).json({ message: 'Service deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};
