import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from 'wix-style-react/Input';
import Button from 'wix-style-react/Button';
export default class Registration extends Component {
  static propTypes = {
    onNewGame: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      player1: '',
      player2: ''
    };
  }

  render() {
    return (
      <div data-hook="registration-form">
        <Input dataHook="p1-input" onChange={evt => this.setState({player1: evt.target.value})}/>
        <Input dataHook="p2-input" onChange={evt => this.setState({player2: evt.target.value})}/>
        <Button dataHook="new-game" onClick={() => this.props.onNewGame({player1: this.state.player1, player2: this.state.player2})}>New Game</Button>
      </div>
    );
  }
}
