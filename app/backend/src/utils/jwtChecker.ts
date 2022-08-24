import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { ipayload } from '../interfaces';
import User from '../database/models/UserModel';

const secret = process.env.JWT_SECRET || 'ChatubaDeMesquita';

const jwtChecker = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(404).json({ message: 'Token not found' });
  }
  try {
    const decode = verify(authorization, secret) as ipayload;
    if (decode.result) {
      const user = await User.findOne({ where: { email: decode.result.email } });
      if (user) {
        next();
      }
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default jwtChecker;
