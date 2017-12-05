import React from 'react';

class WordReader extends React.Component {
  constructor(props) {
    super(props);

    let words = props.words.slice();
    words.unshift("Go!");
    words.unshift("Ready?");

    this.state = {
      wordIndex: 0,
      words: words,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.nextWord();
    }, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  nextWord = () => {
    let nextIndex = this.state.wordIndex + 1;

    if (nextIndex === this.state.words.length) {
      this.props.finishCallback();
      return;
    }

    this.setState({
      wordIndex: nextIndex,
    });
  }

  render() {
    return (
      <div>
        {this.state.words[this.state.wordIndex]}
      </div>
    );
  }
}

export default WordReader;
