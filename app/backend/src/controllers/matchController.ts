import { Request, Response } from 'express';
import Match from '../database/models/MatchModel';
import matchService from '../services/matchService';
import teamService from '../services/teamService';

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
      if (payload.homeTeam === payload.awayTeam) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const verifyExistingTeam1 = await teamService
        .getById(payload.homeTeam);
      const verifyExistingTeam2 = await teamService
        .getById(payload.awayTeam);

      if (verifyExistingTeam1.status === 404 || verifyExistingTeam2.status === 404) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      const link = await matchService.create(payload);
      return res.status(201).json(link);
    }
    return res.status(404).json({ message: 'Solicitação inválida e/ou faltando dados' });
    // const send = await matchService.create(payload);
    // if (!send) {
    //   res.status(500).json('Algo ruim');
    // } FALTA VERIFICAR O PAYLOAD ALI EM CIMA
  },
  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const numberfy = Number(id);
    await matchService.updateMatch(numberfy);
    res.status(200).json({ message: 'Finished' });
  },
  async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    const numberfy = Number(id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const payload = {
      homeTeamGoals,
      awayTeamGoals,
    };
    await matchService.updateMatchProgress(numberfy, payload);
    res.status(200).json(payload);
  },
};
export default matchController;
