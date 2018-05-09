import React from 'react';
import PropTypes from 'prop-types';
import Label from 'wix-style-react/Label';

function Game({player1, player2}) {
  return (
    <div>
      <Label dataHook="p1-title">{player1}</Label>
      <Label dataHook="p2-title">{player2}</Label>
      <table><tr><td>X</td></tr></table>
    </div>
  );
}

Game.propTypes = {
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
};

export default Game;
