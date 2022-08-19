import { Router } from 'express';
import teamController from '../controllers/teamController';

const teamRoute = Router();

teamRoute.get('/teams', teamController.getAll);
teamRoute.get('/teams/:id', teamController.getById);

export default teamRoute;
