import React from 'react';
import PropTypes from 'prop-types';
import Label from 'wix-style-react/Label';

function Game({player1, player2}) {
  return (
    <div>
      <Label dataHook="p1-title">{player1}</Label>
      <Label dataHook="p2-title">{player2}</Label>
    </div>
  )
}

Game.proptypes = {
  player1: PropTypes.string,
  player2: PropTypes.string,
}

export default Game
