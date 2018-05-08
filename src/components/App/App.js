import React from 'react';
import {translate} from 'react-i18next';
import Registration from '../Registration';
import Game from '../Game';
import s from './App.scss';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      player1: '',
      player2: ''
    }
  }
  render() {
    const {t} = this.props;
    return (
      <div className={s.root}>
        <Registration onNewGame={({player1, player2}) => this.setState({player1, player2})} />
        <Game player1={this.state.player1} player2={this.state.player2} />
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
