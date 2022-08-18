import { sign } from 'jsonwebtoken';
import User from '../database/models/UserModel';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'ChatubaDeMesquita';

type ReqResult = {
  status: number;
  message: string | User | { token: string };
};

const userService = {
  async loginUser(email: string): Promise<ReqResult> {
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return { status: 404, message: 'User not found' };
    }
    const token: string = sign({ data: result }, secret);
    return { status: 200, message: { token } };
  },
};

export default userService;
