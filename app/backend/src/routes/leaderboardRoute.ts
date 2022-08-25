import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const LBRoute = Router();

LBRoute.get('/leaderboard/home', leaderboardController.generateLeaderboardHome);

export default LBRoute;
