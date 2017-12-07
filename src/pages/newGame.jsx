import React from 'react';

function NewGame(props) {
  return (
    <div>
      <h1>
        {"Welcome to Empire."}
      </h1>
      <div className="btn-container">
        <button className="primary" onClick={props.beginGameCallback}>Let's Play!</button>
      </div>
    </div>
  );
}

export default NewGame;
