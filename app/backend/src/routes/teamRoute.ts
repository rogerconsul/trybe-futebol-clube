import { Router } from 'express';
import teamController from '../controllers/teamController';

const teamRoute = Router();

teamRoute.get('/teams', teamController.getAll);

export default teamRoute;
