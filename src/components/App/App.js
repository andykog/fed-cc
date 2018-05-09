import React from 'react';
import Registration from '../Registration';
import Game from '../Game';
import s from './App.scss';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      player1: '',
      player2: ''
    };
  }
  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={({player1, player2}) => this.setState({player1, player2})}/>
        <Game player1={this.state.player1} player2={this.state.player2}/>
      </div>
    );
  }
}

export default App;
