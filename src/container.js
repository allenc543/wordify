import React, { useState } from 'react';
import Flashcard from './flashcard';
import './styles.css';

function Container(props) {

    const [words, setWords] = useState(props.words);
    // remember props.words are not the actual words themselves, but word documents including definition, id, difficulty properties etc
 
    const easy = [];
    const normal = [];
    const hard = [];
    // divide words into 3 groups: easy, normal, hard - using loop
    for (let i = 0; i < words.length; i++){
        if (words[i].difficulty === 'easy')
            easy.push(
                <Flashcard 
                    key={words[i]._id} 
                    word={words[i].word} 
                    definition={words[i].definition} 
                    setWords={setWords}
                    difficulty='easy'
                />
            )
        if (words[i].difficulty === 'normal')
        normal.push(
            <Flashcard 
                key={words[i]._id} 
                word={words[i].word} 
                definition={words[i].definition} 
                setWords={setWords}
                difficulty='normal'
            />
        )
        if (words[i].difficulty === 'hard')
        hard.push(
            <Flashcard 
                key={words[i]._id} 
                word={words[i].word} 
                definition={words[i].definition} 
                setWords={setWords}
                difficulty='hard'
            />
        )
    }

  return (
    <div className="container">
      <h1>words to learn:</h1>
      <div className="flashcard-container" >
        <div className="difficulty-column">
            <h3 style={{color:'green'}}>easy words</h3>
            {easy}
        </div>
        <div className="difficulty-column">
            <h3 style={{color:'blue'}}>normal words</h3>
            {normal}
        </div>
        <div className="difficulty-column">
            <h3 style={{color:'red'}}>hard words</h3>
            {hard}
        </div>
        
      </div>
    </div>
  );
}

export default Container;
