import React from 'react';

function GameReady(props) {
  return (
    <div>
      <div>
        {"Looks like you're ready to play! I'll be your Narrator so everyone gets to participate.\
          When you're ready, tell me to 'Read the Words' or 'Restart the Game'"}
      </div>
      <div>
        <button className="primary" onClick={props.readWords}>Read Words</button>
        <button className="secondary" onClick={props.restartGame}>Restart Game</button>
        <button className="secondary" onClick={props.viewEditWords}>View/Edit Words</button>
      </div>
    </div>
  );
}

export default GameReady;
