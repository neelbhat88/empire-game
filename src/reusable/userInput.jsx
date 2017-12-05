import React from 'react';

class UserInput extends React.Component {
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

export default UserInput;
