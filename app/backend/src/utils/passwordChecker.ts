import { compareSync } from 'bcryptjs';
import User from '../database/models/UserModel';

const passwordChecker = (payload: User, password: string): boolean => {
  const check = compareSync(password, payload.password);
  console.log(payload.password, password, check);
  return check;
};

export default passwordChecker;
