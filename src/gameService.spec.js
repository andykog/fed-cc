import {expect} from 'chai';
import {gameStatus} from './gameService';
it('X should win for first row', () => {
  const board = [
    ['X', 'X', 'X'],
    ['', '', ''],
    ['', '', ''],
  ];
  expect(gameStatus(board)).to.equal('X');
});
