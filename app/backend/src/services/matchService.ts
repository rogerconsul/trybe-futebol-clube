import Match from '../database/models/MatchModel';

const teamService = {
  async getAll() {
    const result = await Match.findAll();
    if (!result) {
      return { status: 500, message: 'Deu ruim no getAll dos Matchs' };
    }
    return { status: 200, message: result };
  },
  // async getById(id: number): Promise<ReqResult> {
  //   const result = await Match.findOne({ where: { id } });
  //   if (!result) {
  //     return { status: 404, message: 'Match not Found' };
  //   }
  //   return { status: 200, message: result };
  // },
};

export default teamService;
