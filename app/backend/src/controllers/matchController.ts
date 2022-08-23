import { Request, Response } from 'express';
import Match from '../database/models/MatchModel';
import matchService from '../services/matchService';

const matchController = {
  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const result = await matchService.getAll();
    if (inProgress !== undefined) {
      const verify = (inProgress === 'true') ? 1 : 0;
      // const parsedResult = JSON.parse(result.message);
      const filtered = result.message
        .filter((match: Match) => match.inProgress === verify);
      return res.status(result.status).json(filtered);
    }
    // if (inProgress !== undefined) {
    //   const result = await matchService.searchByQuery(inProgress);
    //   return res.status(result.status).json(req.query);
    // }
    return res.status(result.status).json(result.message);
  },
};

export default matchController;
