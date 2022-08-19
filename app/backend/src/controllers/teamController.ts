import { Request, Response } from 'express';
import teamService from '../services/teamService';

const teamController = {
  async getAll(req: Request, res: Response) {
    const result = await teamService.getAll();
    res.status(result.status).json(result.message);
  },
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const idNum = Number(id);
    const result = await teamService.getById(idNum);
    res.status(result.status).json(result.message);
  },
};

export default teamController;
