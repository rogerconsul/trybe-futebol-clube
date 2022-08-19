import { Request, Response } from 'express';
import passwordChecker from '../utils/passwordChecker';
import userService from '../services/userService';

// const regex = /\S+@\S+\.\S+/;

const loginController = {
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    // if (!regex.test(email)) {
    //   return res.status(401).json({ message: 'Incorrect email or password' });
    // }
    const result = await userService.loginUser(email);
    if (result.payload) {
      const check = passwordChecker(result.payload, password);
      if (!check) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    }
    res.status(result.status).json(result.message);
  },
};

export default loginController;
