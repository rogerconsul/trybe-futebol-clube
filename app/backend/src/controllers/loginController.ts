import { Request, Response } from 'express';
import userService from '../services/userService';

const regex = /\S+@\S+\.\S+/;

const loginController = {
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!regex.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const result = await userService.loginUser(email);
    res.status(result.status).json(result.message);
  },
};

export default loginController;
