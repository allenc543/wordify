
import React, { useState } from 'react';

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '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';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};


function FormGPT(props) {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 60,
        messages: [
          {
          role: 'user',
          content: prompt
          }
        ]
    };

    // this function will be executed on every keystroke in the form
    // if I tried to setPrompt only when form is submitted, I wouldn't have access event.target.value
    function handlePromptChange(event) {
        setPrompt(event.target.value);
    }

    function formHandler(event) {
        event.preventDefault();
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              setResponse(data.choices[0].message.content)
            })
            .catch((error) => console.error(error));
    }

    function hideResponse(){
        setResponse('')
    }
      

    return (
        <div onClick={hideResponse}>
            <form onSubmit={formHandler}>
                <input type="text" value={prompt} onChange={handlePromptChange} placeholder="Enter your prompt here" />
                <button type="submit">Submit</button>
            </form>
            {response}
        </div>
    );
}

export default FormGPT;

