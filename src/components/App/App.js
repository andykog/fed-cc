import React from 'react';
import {translate} from 'react-i18next';
import Input from 'wix-style-react/Input';
import Button from 'wix-style-react/Button';
import Label from 'wix-style-react/Label';
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
        <Input dataHook="p1-input" onChange={evt => this.setState({player1: evt.target.value})}/>
        <Input dataHook="p2-input" onChange={evt => this.setState({player2: evt.target.value})}/>
        <Button dataHook="new-game">New Game</Button>
        <Label dataHook="p1-title">{this.state.player1}</Label>
        <Label dataHook="p2-title">{this.state.player2}</Label>
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
