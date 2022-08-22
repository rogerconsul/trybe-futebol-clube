import { verify, sign } from 'jsonwebtoken';
import { ipayload } from '../interfaces';
import User from '../database/models/UserModel';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'ChatubaDeMesquita';

type ReqResult = {
  status: number;
  message: string | User | { token: string } | { message: string };
  payload?: User | undefined | null;
};

const userService = {
  async loginUser(email: string): Promise<ReqResult> {
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return { status: 401, message: { message: 'Incorrect email or password' } };
    }
    const token: string = sign({ result }, secret);
    return { status: 200, message: { token }, payload: result };
  },
  async validateUser(token: string): Promise<ipayload> {
    const decode = await verify(token, secret);
    return decode as ipayload;
  },
};

export default userService;
