import React from 'react';

import UserInput from '../reusable/userInput';
import HideableUserInput from '../reusable/hideableUserInput';

class WordChooser extends React.Component {
  constructor(props) {
    super(props);

    let editing = false;
    if (props.editing !== undefined) {
      editing = props.editing
    }

    this.state = {
      playerIndex: 0,
      playerWords: props.playerWords.slice(),
      editing: editing,
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

    if (playerNames.length !== this.props.playerWords.length || playerWords.length !== this.props.playerWords.length) {
      return false;
    }

    return true;
  }

  render() {
    const playerIndex = this.state.playerIndex;

    return (
      <div>
        <h1>Choose your word</h1>
        <h3>Choose your word, press 'Next' and then pass it on!</h3>

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
          {
            this.state.editing ? <button onClick={this.prevPlayer}>Back</button> : ''
          }
          <button className="primary" onClick={this.nextPlayer}
                  disabled={this.allWordsSet() && !this.state.editing}>Next Player</button>

                <button className="primary" disabled={!this.allWordsSet()}
                  onClick={this.finishWordChooser}>Done</button>
        </div>
      </div>
    );
  }
}

export default WordChooser;
