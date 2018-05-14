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

it('X should win for diagonal 1', () => {
  const board = [
    ['X', '', ''],
    ['', 'X', ''],
    ['', '', 'X'],
  ];
  expect(gameStatus(board)).to.equal('X');
});

it('X should win for diagonal 2', () => {
  const board = [
    ['', '', 'X'],
    ['', 'X', ''],
    ['X', '', ''],
  ];
  expect(gameStatus(board)).to.equal('X');
});

it('X should win for last row', () => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['X', 'X', 'X'],
  ];
  expect(gameStatus(board)).to.equal('X');
});

it('X should win for first col', () => {
  const board = [
    ['O', '', ''],
    ['O', '', ''],
    ['O', '', ''],
  ];
  expect(gameStatus(board)).to.equal('O');
});

it('X should win for first col', () => {
  const board = [
    ['', 'X', ''],
    ['', 'X', ''],
    ['', 'X', ''],
  ];
  expect(gameStatus(board)).to.equal('X');
});

it('X should win for first col', () => {
  const board = [
    ['X', 'X', 'O'],
    ['O', 'O', 'X'],
    ['X', 'O', 'X'],
  ];
  const board2 = [
    ['X', 'O', 'X'],
    ['O', 'O', 'X'],
    ['X', 'X', 'O'],
  ];
  expect(gameStatus(board)).to.equal('XO');
  expect(gameStatus(board2)).to.equal('XO');
});
