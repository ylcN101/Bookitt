import { UserModel } from '../../../models';

export const getUserByUuid = async (uid: string): Promise<any> =>
  UserModel.findOne({ uid }).lean();

export const updateUser = async (id: string, data: any) =>
  UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  }).lean();

export const getUserByPhone = async (phone: string): Promise<any> =>
  UserModel.findOne({ phone }).lean();

export const getUserById = async (id: string): Promise<any> =>
  UserModel.findOne({ _id: id }).lean();
