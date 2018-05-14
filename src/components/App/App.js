import React from 'react';
import axios from 'axios';
import Registration from '../Registration';
import Game from '../Game';
import Button from 'wix-style-react/Button';
import s from './App.scss';
import {gameStatus} from '../../gameService';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      ...this.getDefaultState(),
      leaderBoard: window.__LEADER_BOARD__ || {}
    };
  }

  handleCellClick = async ({cIndex, rIndex}) => {
    const board = this.state.board.map(row => [...row]);
    if (board[rIndex][cIndex] !== '') return;
    board[rIndex][cIndex] = this.state.currentPlayer;
    const status = gameStatus(board);
    if (status === this.state.currentPlayer) {
      let {data: leaderBoard} = await axios.post('/api/leader-board', {
        name: this.getPlayerName(this.state.currentPlayer)
      });
      this.setState({
        leaderBoard,
        winner: this.state.currentPlayer
      });
    } else if (status === 'XO') {
      this.setState({tie: true});
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({board, currentPlayer: nextPlayer});
  }

  handleSave = async () => {
    await axios.post('/api/game', {
      board: this.state.board,
      player1: this.state.player1,
      player2: this.state.player2
    });
  }

  handleLoad = async () => {
    const res = await axios.get('/api/game');
    const {board, player1, player2} = res.data;
    this.setState({board, player1, player2});
  }
  getDefaultState = () => {
    return {
      player1: '',
      player2: '',
      winner: '',
      tie: false,
      currentPlayer: 'X',
      board: [['', '', ''], ['', '', ''], ['', '', '']]
    }
  }
  handleNewGame = () => {
    this.setState(
      this.getDefaultState()
    );
  }
  getPlayerName = (value) => value === 'X' ? this.state.player1 : this.state.player2

  render() {
    return (
      <div className={s.root}>
        {(!this.state.player1 || !this.state.player2) &&
          <Registration onNewGame={({player1, player2}) => this.setState({player1, player2})}/>
        }
        {this.state.player1 && this.state.player2 &&
        <Game onCellClick={this.handleCellClick} board={this.state.board} player1={this.state.player1}
              player2={this.state.player2}/>
        }
        {this.state.player1 && this.state.player2 &&
          <div> Current player:
            <div data-hook="current-player-name">
              {this.getPlayerName(this.state.currentPlayer)}
            </div>
          </div>
        }
        <div data-hook='leader-board'>
          {Object.entries(this.state.leaderBoard).map(([key, value]) => `${key}:${value}`).join(',')}
        </div>
        {this.state.winner &&
        <div data-hook="winner">{`${this.getPlayerName(this.state.winner)} Won!`}</div>}
        {this.state.tie && <div data-hook="winner">Tie!</div>}
        <div>
          <Button dataHook="save-game" onClick={this.handleSave}>Save Game</Button>
          <Button dataHook="load-game" onClick={this.handleLoad}>Load Game</Button>
          <Button dataHook="new-game" onClick={this.handleNewGame}>New Game</Button>
        </div>
      </div>
    );
  }
}

export default App;
