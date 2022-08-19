import Team from '../database/models/TeamModel';

type ReqResult = {
  status: number;
  message: string | Team[] | Team | {
    id: number;
    teamName: string;
  }[];
};

const teamService = {
  async getAll(): Promise<ReqResult> {
    const result = await Team.findAll();
    if (!result) {
      return { status: 500, message: 'Deu ruim no getAll dos Teams' };
    }
    return { status: 200, message: result };
  },
  async getById(id: number): Promise<ReqResult> {
    const result = await Team.findOne({ where: { id } });
    if (!result) {
      return { status: 404, message: 'Team not Found' };
    }
    return { status: 200, message: result };
  },
};

export default teamService;
