import { ScheduleModel } from '../../../models';

export const getScheduleByUuid = async (uuid: string) =>
  ScheduleModel.find({ uuid }).lean();

export const getScheduleByShopId = async (shopId: string, date: Date) => {
  const formattedDate = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return ScheduleModel.findOne({ shopId, date: formattedDate }).lean();
};
