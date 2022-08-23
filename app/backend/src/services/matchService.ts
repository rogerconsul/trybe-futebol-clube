// import QueryString = require('qs');
import Match from '../database/models/MatchModel';

const teamService = {
  async getAll() {
    const result = await Match.findAll();
    if (!result) {
      return { status: 500, message: [] };
    }
    return { status: 200, message: result };
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
