import { Request, Response } from 'express';
import Team from '../database/models/TeamModel';
import matchService from '../services/matchService';
import { whoWon, aproveitamento, saldoGols } from '../utils/leaderboardsUtils';
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
  efficiency: 0,
};
let leaderBoard: tempObject[] = [];

const usingWhoWon = async (gp: number, gc: number) => {
  const who = await whoWon(gp, gc);
  switch (who) {
    case 'home': {
      temp.totalVictories += 1;
      temp.totalPoints += 3;
      break;
    }
    case 'away': {
      temp.totalLosses += 1;
      temp.totalPoints += 0;
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
    efficiency: 0,
  };
};

const organizador = (array: tempObject[]) => {
  const first = array.sort((a: tempObject, b: tempObject) => {
    if (b.totalPoints > a.totalPoints) return 1;
    if (b.totalPoints < a.totalPoints) return -1;
    if (b.goalsBalance > a.goalsBalance) return 1;
    if (b.goalsBalance < a.goalsBalance) return -1;
    if (b.goalsFavor > a.goalsFavor) return 1;
    if (b.goalsFavor < a.goalsFavor) return -1;
    if (b.goalsOwn > a.goalsOwn) return 1;
    if (b.goalsOwn < a.goalsOwn) return -1;
    return 0;
  });
  return first;
};

const leaderboardController = {
  async generateLeaderboardHome(_req: Request, res: Response) {
    const teams = await Team.findAll();
    teams.forEach(async (team) => {
      const matchesTheTeamPlayedAsHome = await matchService.getByHomeTeamId(team.id);
      temp.name = team.teamName;
      temp.totalGames = matchesTheTeamPlayedAsHome.length;
      matchesTheTeamPlayedAsHome.forEach(async (match) => {
        await usingWhoWon(match.homeTeamGoals, match.awayTeamGoals);
        temp.goalsFavor += match.homeTeamGoals;
        temp.goalsOwn += match.awayTeamGoals;
        temp.goalsBalance += saldoGols(match.homeTeamGoals, match.awayTeamGoals);
      });
      temp.efficiency = parseFloat(aproveitamento(temp.totalPoints, temp.totalGames).toFixed(2));
      leaderBoard.push(temp);
      reset();
    });
    const sort = organizador(leaderBoard);
    res.status(200).json(sort);
    leaderBoard = [];
  },
};

export default leaderboardController;
