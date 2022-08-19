import { Request, Response } from 'express';
import teamService from '../services/teamSercice';

const teamController = {
  async getAll(req: Request, res: Response) {
    const result = await teamService.getAll();
    res.status(result.status).json(result.message);
  },
};

export default teamController;
