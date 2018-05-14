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
      player1: '',
      player2: '',
      winner: '',
      tie: false,
      currentPlayer: 'X',
      board: [['', '', ''], ['', '', ''], ['', '', '']]
    };
  }

  handleCellClick = ({cIndex, rIndex}) => {
    const board = this.state.board.map(row => [...row]);
    if (board[rIndex][cIndex] !== '') return;
    board[rIndex][cIndex] = this.state.currentPlayer;
    const status = gameStatus(board);
    if (status === this.state.currentPlayer) {
      this.setState({winner: this.state.currentPlayer});
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
              {this.state.currentPlayer === 'X' ? this.state.player1 : this.state.player2}
            </div>
          </div>
        }
        {this.state.winner &&
        <div data-hook="winner">{`${this.state.winner === 'X' ? this.state.player1 : this.state.player2} Won!`}</div>}
        {this.state.tie && <div data-hook="winner">Tie!</div>}
        <div>
          <Button dataHook="save-game" onClick={() => this.handleSave()}>Save Game</Button>
          <Button dataHook="load-game" onClick={() => this.handleLoad()}>Load Game</Button>
        </div>
      </div>
    );
  }
}

export default App;
