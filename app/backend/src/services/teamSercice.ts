import Team from '../database/models/TeamModel';

type ReqResult = {
  status: number;
  message: string | Team[];
};

const teamService = {
  async getAll(): Promise<ReqResult> {
    const result = await Team.findAll();
    if (!result) {
      return { status: 500, message: 'Deu ruim no getAll dos Teams' };
    }
    return { status: 200, message: result };
  },
};

export default teamService;
