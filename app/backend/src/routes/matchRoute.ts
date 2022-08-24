import { Router } from 'express';
import jwtChecker from '../utils/jwtChecker';
import matchController from '../controllers/matchController';

const matchRoute = Router();

matchRoute.get('/matches', matchController.getAll);
matchRoute.post('/matches', jwtChecker, matchController.createMatch);
matchRoute.patch('/matches/:id/finish', matchController.updateMatch);
matchRoute.patch('/matches/:id', matchController.updateMatchProgress);
// matchRoute.get('/login/validate', matchController.loginValidate);

export default matchRoute;
