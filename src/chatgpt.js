// this file is for the buttons to prompt, the formgpt file is for the form to prompt

import React, { useState } from 'react';
import { API_KEY } from '../config';

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

function ChatGPT(props) {
    const [chatRes, setChatRes] = useState('')

    // extract the words themselves from props.words
    // props.words is an array of objects where each element has a word property
    const actualWords = [];
    for (let i = 0; i < props.words.length; i++){
        actualWords.push(props.words[i].word)
    }
    
    // this is what's gonna go in the chatGPT request
    const sentenceData = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 100,
        messages: [
          {
          role: 'user',
          content: `generate a sentence that software engineers would find funny (in all lowercase) with these words: ${actualWords}`
          }
        ]
      };
    const inspoData = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 60,
        messages: [
            {
            role: 'user',
            content: 'generate an inspirational sentence for software engineers (in all lowercase)'
            }
        ]
    };

    function chatButtonHandler(data) {
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              setChatRes(data.choices[0].message.content)
            //   console.log(data.choices[0].message.content)
            })
            .catch((error) => console.error(error));
    }
      

    return (

        <div >
          <div>
            <button className="sentenceButton" onClick={() => chatButtonHandler(sentenceData)}>generate a sentence with all these words</button>
          </div>
          <div>
            <button className="inspoButton" onClick={() => chatButtonHandler(inspoData)}>generate an inspirational sentence</button>
          </div>
          {chatRes}
        </div>
      );
}

export default ChatGPT;



