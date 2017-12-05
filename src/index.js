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
      numPlayers: undefined,
      playerWords: [],
      step: GAME_STEPS["new"],
    }
  }

  restartGame = () => {
    this.setState({
      numPlayers: undefined,
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
      playerWords: Array(numPlayers).fill().map((u) => u = {name: "", word: ""})
    });
  }

  setPlayerWords = (playerWords) => {
    this.setState({
      playerWords: playerWords,
      step: GAME_STEPS["ready"],
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
        step = <GameReady restartGame={this.restartGame} viewEditWords={this.initializeGame} />
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
      numPlayers: parseInt(props.numPlayers),
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

  setNumPlayers = (numPlayers) => {
    this.setState({
      numPlayers: parseInt(numPlayers),
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

class WordChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerIndex: 0,
      playerWords: props.playerWords.slice(),
    };
  }

  setPlayerName = (name) => {
    let playerWords = this.state.playerWords.slice();
    playerWords[this.state.playerIndex]["name"] = name;

    this.setState({
      playerWords: playerWords,
    });
  }

  setPlayerWord = (word) => {
    let playerWords = this.state.playerWords.slice();
    playerWords[this.state.playerIndex]["word"] = word;

    this.setState({
      playerWords: playerWords,
    });
  }

  nextPlayer = () => {
    let currentIndex = this.state.playerIndex;

    currentIndex += 1;
    if (currentIndex === this.state.playerWords.length) {
      currentIndex = 0;
    }

    this.setState({
      playerIndex: currentIndex,
    });
  }

  prevPlayer = () => {
    let currentIndex = this.state.playerIndex;

    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = this.state.playerWords.length - 1;
    }

    this.setState({
      playerIndex: currentIndex,
    });
  }

  finishWordChooser = () => {
    if (!this.allWordsSet()) { return; }

    this.props.setPlayerWordsCallback(this.state.playerWords);
  }

  allWordsSet() {
    const playerNames = this.state.playerWords.filter(a => a.name !== "")
    const playerWords = this.state.playerWords.filter(a => a.word !== "")

    if (playerNames.length != this.props.playerWords.length || playerWords.length != this.props.playerWords.length) {
      return false;
    }

    return true;
  }

  render() {
    const playerIndex = this.state.playerIndex;

    return (
      <div>
        <UserInput id={"playerName" + playerIndex} label={"Player " + (playerIndex + 1) + " name"}
                   value={this.state.playerWords[playerIndex]["name"]}
                   onChangeCallback={this.setPlayerName}
        />
        <HideableUserInput id={"playerWord" + playerIndex} label={"Player " + (playerIndex + 1) + " word"}
                           defaultHidden={this.state.playerWords[playerIndex]["word"] !== "" ? true : false}
                           value={this.state.playerWords[playerIndex]["word"]}
                           onChangeCallback={this.setPlayerWord}
        />

        <div>
          <button onClick={this.prevPlayer}>Back</button>
          <button onClick={this.nextPlayer}>Next Player</button>
        </div>

        <div>
          <button disabled={!this.allWordsSet()}
                  onClick={this.finishWordChooser}>Done</button>
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

class HideableUserInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: props.defaultHidden,
    }
  }

  toggleDisplay = () => {
    if (this.state.hidden) {
      this.setState({
        hidden: false,
      });
    }
    else {
      this.setState({
        hidden: true,
      });
    }
  }

  render() {
    const userInput = this.state.hidden ? '' :
                      <UserInput id={this.props.id} label={this.props.label} type={this.props.type}
                                 placeholder={this.props.placeholder} value={this.props.value}
                                 onChangeCallback={this.props.onChangeCallback} />
    return (
      <div>
        {userInput}
        <div onClick={this.toggleDisplay}>{this.state.hidden ? "Show Word" : "Hide Word"}</div>
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
        <button className="secondary" onClick={props.restartGame}>Restart Game</button>
        <button className="secondary" onClick={props.viewEditWords}>View/Edit Words</button>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
