import * as userBL from './bl/userBL';

export const getUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const user = await userBL.getUserById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const user = await userBL.updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};
