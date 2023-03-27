import React from 'react';
import Container from './container';
import ChatGPT from './chatgpt';
import FormGPT from './formgpt';

function App(props) {
  return (
    <div className="App">
      <ChatGPT words={props.words}/>
        <Container words={props.words}/>
      <FormGPT/>  
    </div>
  );
}

export default App;
