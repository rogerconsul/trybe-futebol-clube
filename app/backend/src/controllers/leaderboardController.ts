import { Request, Response } from 'express';
import Team from '../database/models/TeamModel';
import matchService from '../services/matchService';
import { whoWon, aproveitamento } from '../utils/leaderboardsUtils';
import { tempObject } from '../interfaces';

let temp = {
  name: 'Palmeiras',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0',
};

let leaderBoard: tempObject[] = [];

const usingWhoWon = async (gp: number, gc: number) => {
  const who = whoWon(gp, gc);
  temp.goalsFavor += gp;
  temp.goalsOwn += gc;
  temp.goalsBalance += (gp - gc);
  switch (who) {
    case 'home': {
      temp.totalVictories += 1;
      temp.totalPoints += 3;
      break;
    }
    case 'away': { temp.totalLosses += 1;
      break;
    }
    default: {
      temp.totalDraws += 1;
      temp.totalPoints += 1;
    }
  }
};

const reset = () => {
  temp = {
    name: 'Palmeiras',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '0',
  };
};

const organizador = (array: tempObject[]) => array.sort(
  (a, b) =>
    b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn,
);

const leaderboardController = {
  async generateLeaderboardHome(_req: Request, res: Response) {
    const teams = await Team.findAll();
    const bigTask = teams.map(async (team) => {
      const matchesTheTeamPlayedAsHome = await matchService.getByHomeTeamId(team.id);
      temp.name = team.teamName;
      temp.totalGames = matchesTheTeamPlayedAsHome.length;
      const tarefas = matchesTheTeamPlayedAsHome.map(async (match) => {
        await usingWhoWon(match.homeTeamGoals, match.awayTeamGoals);
      });
      await Promise.all(tarefas);
      temp.efficiency = aproveitamento(temp.totalPoints, temp.totalGames).toFixed(2);
      leaderBoard.push(temp);
      reset();
    });
    await Promise.all(bigTask);
    const sort = organizador(leaderBoard);
    res.status(200).json(sort);
    leaderBoard = [];
  },
};

export default leaderboardController;
