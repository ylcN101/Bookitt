import { createService } from '../serviceBL';
import { ServiceModel, ShopModel } from '../../../../models';
import { v4 as uuidv4 } from 'uuid';

describe('createService', () => {
  const mockShop = { _id: '123', name: 'Test Shop' };
  const mockUuid = 'uuid-1234';
  const serviceData = {
    shopUuid: 'shop-uuid-123',
    serviceName: 'Test Service',
  };

  beforeEach(() => {
    jest.spyOn(ShopModel, 'findOne').mockResolvedValue(mockShop);
    jest.spyOn(ServiceModel, 'create').mockResolvedValue({
      ...serviceData,
      uuid: mockUuid,
      shopId: mockShop._id,
    });
    jest.spyOn({ v4: uuidv4 }, 'v4').mockReturnValue(mockUuid);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create a service when shop is found', async () => {
    const result = await createService(serviceData);

    expect(ShopModel.findOne).toHaveBeenCalledWith({
      uuid: serviceData.shopUuid,
    });

    expect(result).toEqual({
      ...serviceData,
      uuid: mockUuid,
      shopId: mockShop._id,
    });
  });

  it('should throw an error when shop is not found', async () => {
    jest.spyOn(ShopModel, 'findOne').mockResolvedValue(null);

    await expect(createService(serviceData)).rejects.toThrow('Shop not found');
  });

  // Add more tests for different scenarios and edge cases
});
