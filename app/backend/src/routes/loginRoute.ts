import { Router } from 'express';
import loginController from '../controllers/loginController';

const loginRoute = Router();

loginRoute.post('/login', loginController.loginUser);

export default loginRoute;
