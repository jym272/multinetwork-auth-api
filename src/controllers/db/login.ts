import { Request, Response } from 'express';
import { controllerErrorWithMessage } from '@utils/index';

export const loginController = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await sequelize.transaction(async () => {
        return await Person.destroy({
          where: {
            id: Number(id)
          }
        });
      });
      if (!result) return res.status(404).json({ message: 'Person not found.' });
      return res.json({ message: `Person with id ${id} deleted.` });
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Delete person failed.');
    }
  };
};
