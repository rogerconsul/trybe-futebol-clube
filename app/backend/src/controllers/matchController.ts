import { Request, Response } from 'express';
import matchService from '../services/matchService';

const matchController = {
  async getAll(req: Request, res: Response) {
    const result = await matchService.getAll();
    res.status(result.status).json(result.message);
  },
  // async getById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const idNum = Number(id);
  //   const result = await matchService.getById(idNum);
  //   res.status(result.status).json(result.message);
  // },
};

export default matchController;
