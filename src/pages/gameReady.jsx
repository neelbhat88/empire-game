import React from 'react';

function GameReady(props) {
  return (
    <div>
      <h1>Ready to play!</h1>
      <h3>
        {"Looks like you're ready to play! I'll be your Narrator so everyone gets to participate.\
          When everyone is ready and can see the screen, tell me to 'Read Words' and we'll start."}
      </h3>
      <div>
        <button className="primary" onClick={props.readWords}>Read Words</button>
        <button className="secondary" onClick={props.restartGame}>Restart Game</button>
        <button className="secondary" onClick={props.viewEditWords}>View/Edit Words</button>
      </div>
    </div>
  );
}

export default GameReady;
