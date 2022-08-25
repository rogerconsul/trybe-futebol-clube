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

// const organizador = (array: tempObject[]) => {
//   const first = array.sort((a: tempObject, b: tempObject) => {
//     (a.totalPoints < b.totalPoints) ? 1 : -1;
//     (a.totalVictories < b.totalVictories) ? 1 : -1;
//     (a.goalsBalance < b.goalsBalance) ? 1 : -1;
//     (a.goalsFavor < b.goalsFavor) ? 1 : -1;
//     (a.goalsOwn < b.goalsOwn) ? 1 : -1;
//     return 0;
//   });
//   return first;
// };
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
    teams.forEach(async (team) => {
      const matchesTheTeamPlayedAsHome = await matchService.getByHomeTeamId(team.id);
      temp.name = team.teamName;
      temp.totalGames = matchesTheTeamPlayedAsHome.length;
      matchesTheTeamPlayedAsHome.forEach(async (match) => {
        await usingWhoWon(match.homeTeamGoals, match.awayTeamGoals);
      });
      temp.efficiency = aproveitamento(temp.totalPoints, temp.totalGames).toFixed(2);
      leaderBoard.push(temp);
      reset();
    });
    const sort = organizador(leaderBoard);
    res.status(200).json(sort);
    leaderBoard = [];
  },
};

export default leaderboardController;
