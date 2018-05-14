const gameStatus = board => {
  const isWin = symbol =>
    board.find(row => row.every(cell => cell === symbol)) ||
    [0, 1, 2].find(i => board.every(row => row[i] === symbol)) !== undefined ||
    (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) ||
    (board[2][0] === symbol && board[1][1] === symbol && board[0][2] === symbol);

  if (isWin('X')) {
    return 'X';
  }
  if (isWin('O')) {
    return 'O';
  }
  if (board.every(row => row.every(cell => cell !== ''))) {
    return 'XO';
  }
};

export {gameStatus};
