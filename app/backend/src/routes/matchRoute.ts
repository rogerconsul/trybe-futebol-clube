import { Router } from 'express';
import matchController from '../controllers/matchController';

const matchRoute = Router();

matchRoute.get('/matches', matchController.getAll);
// matchRoute.get('/login/validate', matchController.loginValidate);

export default matchRoute;
