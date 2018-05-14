import React from 'react';
import PropTypes from 'prop-types';
import Label from 'wix-style-react/Label';

function Game({player1, player2, board, onCellClick}) {
  return (
    <div data-hook="game-board">
      <Label dataHook="p1-title">{player1}</Label>
      <Label dataHook="p2-title">{player2}</Label>
      <table>
        {board.map((row, rIndex) => (
          <tr key={rIndex}>
            {row.map((cell, cIndex) => (
              <td onClick={() => onCellClick({cIndex, rIndex})} key={cIndex}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

Game.propTypes = {
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onCellClick: PropTypes.func.isRequired
};

export default Game;
