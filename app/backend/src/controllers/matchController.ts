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
  async createMatch(req: Request, res: Response) {
    const payload = req.body;
    if (payload.homeTeam) {
      const link = await matchService.create(payload);
      return res.status(201).json(link);
    }
    return res.status(404).json({ message: 'Solicitação inválida e/ou faltando dados' });
    // const send = await matchService.create(payload);
    // if (!send) {
    //   res.status(500).json('Algo ruim');
    // } FALTA VERIFICAR O PAYLOAD ALI EM CIMA
  },
};

export default matchController;
