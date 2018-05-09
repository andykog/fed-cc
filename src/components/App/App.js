import React from 'react';
import Registration from '../Registration';
import Game from '../Game';
import s from './App.scss';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      player1: '',
      player2: '',
      board: [['', '', ''], ['', '', ''], ['', '', '']]
    };
  }
  handleCellClick = ({cIndex, rIndex}) => {
    const board = this.state.board.map(row => [...row]);
    board[rIndex][cIndex] = 'X';
    this.setState({board});
  }
  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={({player1, player2}) => this.setState({player1, player2})}/>
        <Game onCellClick={this.handleCellClick} board={this.state.board} player1={this.state.player1} player2={this.state.player2}/>
      </div>
    );
  }
}

export default App;
