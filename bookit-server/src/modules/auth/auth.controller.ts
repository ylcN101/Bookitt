import { UserModel } from '../../models';
import bcrypt from 'bcrypt';
import { signToken } from '../../middlewares/jwt';
import { v4 as uuidv4 } from 'uuid';

import createError from '../../utils/createError';

export const register = async (req: any, res: any, next: any) => {
  try {
    const { password, ...rest } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      ...rest,
      password: hash,
      uid: uuidv4(),
      shopId: '1022455',
    });
    await newUser.save();
    const token = signToken(newUser._id);

    const { password: pwd, ...info } = newUser.toJSON();
    res.cookie('accessToken', token, { httpOnly: true }).status(200).json(info);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: any, res: any, next: any) => {
  try {
    const user = await UserModel.findOne({
      phone: req.body.phone,
      uid: req.body.uid,
    });

    console.log('user:', user);

    if (!user) {
      console.log('create new user');
      const newUser = new UserModel({
        ...req.body,
        shopId: '1022455',
      });
      await newUser.save();
      const token = signToken(newUser._id);

      const { password, ...info } = newUser.toJSON();
      return res
        .cookie('accessToken', token, { httpOnly: true })
        .status(200)
        .json(info);
    }

    if (user?.uid !== req.body.uid) {
      return next(createError(400, 'Invalid credentials'));
    }

    const token = signToken(user._id);

    const { password, ...info } = user.toJSON();
    res.cookie('accessToken', token, { httpOnly: true }).status(200).json(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: any, res: any, next: any) => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};
