import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const GAME_STEPS = Object.freeze({
  new: "newGame",
  initialize: "initialize",
  ready: "gameReady",
  playing: "playing",
});

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numPlayers: null,
      playerWords: [],
      step: GAME_STEPS["new"],
    }
  }

  restartGame = () => {
    this.setState({
      numPlayers: null,
      playerWords: [],
      step: GAME_STEPS["new"],
    });
  }

  initializeGame = () => {
    this.setState({
      step: GAME_STEPS["initialize"],
    });
  }

  setNumPlayers = (numPlayers) => {
    this.setState({
      numPlayers: numPlayers,
    });
  }

  setPlayerWords = (playerWords) => {
    this.setState({
      playerWords: playerWords,
    });
  }

  render() {
    let step;
    switch(this.state.step) {
      case GAME_STEPS["new"]:
        step = <NewGame beginGameCallback={this.initializeGame} />
        break;
      case GAME_STEPS["initialize"]:
        step = <InitializeGame numPlayers={this.state.numPlayers} playerWords={this.state.playerWords}
                               setNumPlayersCallback={this.setNumPlayers}
                               setPlayerWordsCallback={this.setPlayerWords}
                               resetGameCallback={this.restartGame} />
        break;
      case GAME_STEPS["ready"]:
        step = <GameReady restartGame={this.restartGame} />
        break;
    }
    return (
      <div>
        {step}
      </div>
    );
  }
}

function NewGame(props) {
  return (
    <div>
      <div>
        {"Welcome to Empire. This is a quick description of the game and rules"}
      </div>
      <div>
        <button onClick={props.beginGameCallback}>Let's Play!</button>
      </div>
    </div>
  );
}

class InitializeGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numPlayers: props.numPlayers,
    }
  }

  selectPlayers() {
    return (
      <div>
        <UserInput id="numPlayers" label="How many players?" type="number" value={this.state.numPlayers}
                   onChangeCallback={this.setNumPlayers}
        />
        <button onClick={this.submitNumPlayers}>Next</button>
      </div>
    );
  }

  chooseWords() {
    return (
      <div>Player 1 word?</div>
    );
  }

  setNumPlayers = (numPlayers) => {
    this.setState({
      numPlayers: numPlayers,
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
    if (this.props.numPlayers === null || this.props.numPlayers === 0) {
      view = this.selectPlayers();
    }
    else {
      view = this.chooseWords();
    }

    return (
      <div>
        <div>
          We are initializing the game! Currently, {this.props.numPlayers} players selected.
        </div>
        <div>
          {view}
        </div>
        <div>
          <button onClick={this.props.resetGameCallback}>Reset Game</button>
        </div>
      </div>
    );
  }
}

class UserInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleInput(e) {
    const value = e.target.value;
    this.props.onChangeCallback(value);
  }

  render() {
    return (
      <div>
        <div>{this.props.label}</div>
        <input type={this.props.type} placeholder={this.props.placeholder}
                  id={this.props.id} value={this.props.value}
                  onChange={(e) => this.handleInput(e)} />
      </div>
    );
  }
}

function GameReady(props) {
  return (
    <div>
      <div>
        {"Looks like you're ready to play! I'll be your Narrator so everyone gets to participate.\
          When you're ready, tell me to 'Read the Words' or 'Restart the Game'"}
      </div>
      <div>
        <button className="primary">Read Words</button>
        <button className="secondary" onClick={() => props.restartGame()}>Restart Game</button>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
