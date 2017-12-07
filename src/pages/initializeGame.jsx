import React from 'react';

import UserInput from '../reusable/userInput';
import WordChooser from './wordChooser';

class InitializeGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numPlayers: parseInt(props.numPlayers, 10),
    }
  }

  selectPlayers() {
    return (
      <div>
        <h1>Select Players</h1>
        <UserInput id="numPlayers" placeholder="How many players?" type="number" value={this.state.numPlayers}
                   onChangeCallback={this.setNumPlayers}
        />
        <button className="primary" onClick={this.submitNumPlayers}>Next</button>
      </div>
    );
  }

  setNumPlayers = (numPlayers) => {
    this.setState({
      numPlayers: parseInt(numPlayers, 10),
    });
  }

  submitNumPlayers = () => {
    // Validations here
    if (this.state.numPlayers <= 0) {
      return;
    }

    this.props.setNumPlayersCallback(this.state.numPlayers);
  }

  render() {
    let view;
    if (this.props.numPlayers === undefined || this.props.numPlayers === 0) {
      view = this.selectPlayers();
    }
    else {
      view = <WordChooser playerWords={this.props.playerWords} setPlayerWordsCallback={this.props.setPlayerWordsCallback} />
    }

    return (
      <div>
        <div>
          {view}
        </div>
        <div className="reset-btn-container">
          <button onClick={this.props.resetGameCallback}>Reset Game</button>
        </div>
      </div>
    );
  }
}

export default InitializeGame;
