const whoWon = (homeGoals: number, awayGoals: number) => {
  if (homeGoals > awayGoals) {
    return 'home';
  }
  if (awayGoals > homeGoals) {
    return 'away';
  }
  return 'draw';
};

const aproveitamento = (P: number, J: number) => (P / (J * 3)) * 100;

const saldoGols = (gp: number, gc: number) => gp - gc;

export {
  whoWon,
  aproveitamento,
  saldoGols,
};
