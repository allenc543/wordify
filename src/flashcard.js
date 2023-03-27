

import React, { useState, useEffect } from 'react';
import './styles.css';

function Flashcard(props) {
  const [showDefinition, setShowDefinition] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  // used in updateDifficulty and deleteCards
  // each time we update database, we need to re-render the container
  function fetchWords() {
    fetch('http://localhost:3000/api')
      .then(response => response.json())
      .then(words => {
        props.setWords(words);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function deleteCard() {
    fetch(`http://localhost:3000/api/${props.word}`, {
      method: 'DELETE',
    })
      .then(res => {
        console.log(`"${props.word}" deleted successfully`);
        fetchWords();
      })
      .catch(err => console.log('error deleting word'))
  }

  function markAsEasy() {
    updateDifficulty('easy');
  }
  function markAsNormal() {
    updateDifficulty('normal');
  }
  function markAsHard() {
    updateDifficulty('hard');
  }

  function updateDifficulty(difficulty) {
    fetch(`http://localhost:3000/api/${props.word}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        difficulty: difficulty
      })
    })
      .then(res => {
        console.log(`"${props.word}" marked as ${difficulty}`);
        fetchWords();
      })
      .catch(err => console.log(`error marking "${props.word}" as ${difficulty}`));
  }
  

  useEffect(() => {
    if (showDefinition) setShowButtons(false); 
    else setShowButtons(true);
  }, [showDefinition, showButtons]); // whenever state variables in the array change it re-renders, the callback function in useEffect executes
  // we need this because if we put the setShowButtons(false) inside the if (showDefinition), it's going to run the useState code up to set showDefinition as false as well

  let definition = null;
  if (showDefinition) {
    definition = <div className="flashcard-definition">{props.definition}</div>;
  }

  let buttons = null;
  if (showButtons) {
    buttons = (
      <div className="buttons">
        <button className="easy-button" onClick={markAsEasy}>easy</button>
        <button className="normal-button" onClick={markAsNormal}>normal</button>
        <button className="hard-button" onClick={markAsHard}>hard</button>
        <button className="delete-button" onClick={deleteCard}>!delete card!</button>
      </div>
    )
  }

  return (
    <div className={props.difficulty} onClick={() => setShowDefinition(!showDefinition)}>
      <div className="flashcard-word"><strong>{props.word}</strong></div>
      <div>
        {buttons}
      </div>
      <div>{definition}</div>
    </div>
  );
}

export default Flashcard;



