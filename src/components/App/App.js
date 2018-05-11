import React from 'react';
import Registration from '../Registration';
import Game from '../Game';
import s from './App.scss';
import {gameStatus} from '../../gameService';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      player1: '',
      player2: '',
      winner: '',
      currentPlayer: 'X',
      board: [['', '', ''], ['', '', ''], ['', '', '']]
    };
  }
  handleCellClick = ({cIndex, rIndex}) => {
    const board = this.state.board.map(row => [...row]);
    board[rIndex][cIndex] = this.state.currentPlayer;
    if (gameStatus(board) === this.state.currentPlayer) {
      this.setState({winner: this.state.currentPlayer});
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({board, currentPlayer: nextPlayer});
  }
  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={({player1, player2}) => this.setState({player1, player2})}/>
        <Game onCellClick={this.handleCellClick} board={this.state.board} player1={this.state.player1} player2={this.state.player2}/>
        {this.state.winner && <div data-hook="winner">{`${this.state.winner === 'X' ? this.state.player1 : this.state.player2} Won!`}</div>}
      </div>
    );
  }
}

export default App;
