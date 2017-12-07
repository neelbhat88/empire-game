import React from 'react';

import {GAME_STEPS} from '../utils/constants';

import UserInput from '../reusable/userInput';

import GameReady from './gameReady';
import InitializeGame from './initializeGame';
import NewGame from './newGame';
import WordChooser from './wordChooser';
import WordReader from './wordReader';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numPlayers: 2,
      playerWords: [{name: "neel", word: "bhat"}, {name: "nam", word: "donkey"}],
      step: GAME_STEPS["ready"],
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

  readWords = () => {
    this.setState({
      step: GAME_STEPS["playing"],
    });
  }

  setReadyState = () => {
    this.setState({
      step: GAME_STEPS["ready"],
    });
  }

  viewEditWords = () => {
    this.setState({
      step: GAME_STEPS["editing"],
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
        step = <GameReady restartGame={this.restartGame} viewEditWords={this.viewEditWords} readWords={this.readWords} />
        break;
      case GAME_STEPS["playing"]:
        step = <WordReader words={this.state.playerWords.map(w => w.word)} finishCallback={this.setReadyState} />
        break;
      case GAME_STEPS["editing"]:
        step = <WordChooser playerWords={this.state.playerWords} setPlayerWordsCallback={this.setPlayerWords}
                            editing={true} />
        break;
      default:
        step = <NewGame beginGameCallback={this.initializeGame} />
        break;
    }
    return (
      <div>
        {step}
      </div>
    );
  }
}

export default Game;
