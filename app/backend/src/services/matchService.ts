// import QueryString = require('qs');
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { iReqBodyMatch } from '../interfaces';

const teamService = {
  async getAll() {
    const result = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
      ] });
    if (!result) {
      return { status: 500, message: [] };
    }
    return { status: 200, message: result };
  },
  async create(payload: Match) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = payload;
      const process = await Match.create({
        homeTeam,
        homeTeamGoals,
        awayTeam,
        awayTeamGoals,
        inProgress: true,
      });
      return process;
    } catch (error) {
      console.log(error);
    }
  },
  async updateMatch(id: number) {
    const update = await Match.update(
      { inProgress: false },
      { where: { id } },
    );
    return update;
  },
  async updateMatchProgress(id: number, payload: iReqBodyMatch) {
    const { homeTeamGoals, awayTeamGoals } = payload;
    const update = await Match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return update;
  },
  // async searchByQuery(query: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[])
  //   : Promise<Match[]> {
  //   const result = await Match.findAll({ where: { query: true } });
  //   if (!result) {
  //     return { status: 404, message: 'Match not Found' };
  //   }
  //   return { status: 200, message: query };
  // },
};

export default teamService;
