import React from 'react';

import UserInput from './userInput';

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

export default HideableUserInput;
