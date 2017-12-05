import React from 'react';

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

export default NewGame;
